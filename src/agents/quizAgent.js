/**
 * @module quizAgent
 * @description Adaptive quiz generation agent for NEXUS. Selects questions
 * from the quiz bank, adjusts difficulty based on the learner's historical
 * scores, and returns an interactive HTML quiz with radio-button options and
 * reveal-answer sections.
 *
 * When the requested topic is not in the quiz bank, the agent falls back to
 * generating basic conceptual questions derived from knowledge-base data.
 *
 * @requires ../engine/nlp.js
 * @requires ../engine/cache.js
 * @requires ../data/quizBank.js
 * @requires ../data/knowledgeBase.js
 */

import { findBestMatch, normalizeText, extractTopics } from '../engine/nlp.js';
import { generateKey } from '../engine/cache.js';
import { quizBank, getQuizForTopic, generateAdaptiveQuiz } from '../data/quizBank.js';
import { knowledgeBase } from '../data/knowledgeBase.js';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const AGENT_NAME = 'quizAgent';
const SIMILARITY_THRESHOLD = 0.25;

/* ------------------------------------------------------------------ */
/*  Difficulty helpers                                                */
/* ------------------------------------------------------------------ */

/**
 * Determines appropriate quiz difficulty from past performance.
 *
 * @param {string} topicId — Topic identifier.
 * @param {object} scores  — `context.scores` mapping.
 * @returns {'easy'|'medium'|'hard'} Recommended difficulty.
 */
function determineDifficulty(topicId, scores) {
  if (!scores) return 'medium';

  const topicScores = scores[topicId];
  if (!topicScores || (Array.isArray(topicScores) && topicScores.length === 0)) return 'easy';

  const scoreList = Array.isArray(topicScores) ? topicScores : [topicScores];
  const avg = scoreList.reduce((a, b) => a + (typeof b === 'number' ? b : b.score || 0), 0) / scoreList.length;

  if (avg >= 80) return 'hard';
  if (avg >= 50) return 'medium';
  return 'easy';
}

/**
 * Creates a unique quiz ID for tracking.
 * @param {string} topic
 * @returns {string}
 */
function makeQuizId(topic) {
  return `quiz_${(topic || 'general').replace(/\s+/g, '_').toLowerCase()}_${Date.now()}`;
}

/* ------------------------------------------------------------------ */
/*  HTML renderers                                                    */
/* ------------------------------------------------------------------ */

/**
 * Renders a single question block with radio options and a hidden answer.
 *
 * @param {object} question — Question record.
 * @param {number} index    — 1-based question number.
 * @param {string} quizId   — Parent quiz identifier.
 * @returns {string} HTML string.
 */
function renderQuestion(question, index, quizId) {
  const options = question.options || question.choices || [];
  const correctIndex = question.correctIndex ?? question.answer ?? 0;
  const explanation = question.explanation || question.rationale || 'Review the topic material for a detailed explanation.';

  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
  const radioName = `${quizId}_q${index}`;

  const optionsHtml = options
    .map((opt, i) => {
      const label = optionLabels[i] || String(i + 1);
      const text = typeof opt === 'string' ? opt : opt.text || opt.label || String(opt);
      const isCorrect = i === correctIndex;
      return `
        <label class="quiz-option" data-correct="${isCorrect}">
          <input type="radio" name="${radioName}" value="${i}" />
          <span class="option-label">${label}.</span>
          <span class="option-text">${text}</span>
        </label>`;
    })
    .join('\n');

  const correctLabel = optionLabels[correctIndex] || String(correctIndex + 1);
  const correctText = typeof options[correctIndex] === 'string'
    ? options[correctIndex]
    : options[correctIndex]?.text || options[correctIndex]?.label || '';

  return `
    <div class="quiz-question" data-question-index="${index}">
      <h4>Question ${index}</h4>
      <p class="question-text">${question.question || question.text || question.prompt}</p>
      <div class="quiz-options">
        ${optionsHtml}
      </div>
      <details class="answer-reveal">
        <summary>🔍 Reveal Answer</summary>
        <div class="answer-content">
          <p><strong>✅ Correct Answer:</strong> ${correctLabel}. ${correctText}</p>
          <p class="answer-explanation">${explanation}</p>
        </div>
      </details>
    </div>`;
}

/**
 * Renders the complete quiz shell.
 *
 * @param {object[]} questions — Array of question records.
 * @param {string}   topicName — Display name for the topic.
 * @param {string}   difficulty — Difficulty label.
 * @param {string}   quizId — Unique quiz ID.
 * @returns {string} Full HTML quiz.
 */
function renderQuiz(questions, topicName, difficulty, quizId) {
  const diffEmoji = { easy: '🟢', medium: '🟡', hard: '🔴' }[difficulty] || '🟡';

  const questionsHtml = questions
    .map((q, i) => renderQuestion(q, i + 1, quizId))
    .join('\n');

  return `
    <div class="quiz-container" data-quiz-id="${quizId}">
      <div class="quiz-header">
        <h3>📝 Quiz: ${topicName}</h3>
        <div class="quiz-meta">
          <span class="difficulty-badge">${diffEmoji} ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
          <span class="question-count">${questions.length} question${questions.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      <div class="quiz-instructions">
        <p>Select the best answer for each question. Click <em>"Reveal Answer"</em> to check your response and read the explanation.</p>
      </div>

      <div class="quiz-body">
        ${questionsHtml}
      </div>

      <div class="quiz-footer">
        <p>📊 Quiz ID: <code>${quizId}</code> — your results will be tracked for adaptive learning.</p>
      </div>
    </div>`;
}

/* ------------------------------------------------------------------ */
/*  KB-fallback question generator                                    */
/* ------------------------------------------------------------------ */

/**
 * Generates basic conceptual questions from a knowledge-base entry when
 * no quiz-bank questions exist for the topic.
 *
 * @param {object} kbEntry — A KB topic record.
 * @returns {object[]} Array of generated question objects.
 */
function generateQuestionsFromKB(kbEntry) {
  const questions = [];
  const title = kbEntry.title || kbEntry.name || 'this topic';
  const concepts = kbEntry.keyConcepts || kbEntry.concepts || kbEntry.keyPoints || [];

  // Q1 — definitional
  questions.push({
    question: `Which of the following best describes <strong>${title}</strong>?`,
    options: [
      kbEntry.summary || kbEntry.description || `A core concept in the subject area`,
      `A debugging tool used only in production environments`,
      `An outdated practice no longer recommended`,
      `A hardware-level optimisation technique`,
    ],
    correctIndex: 0,
    explanation: kbEntry.summary || kbEntry.description || `${title} is a foundational concept worth understanding deeply.`,
  });

  // Q2 — key concept identification (if available)
  if (concepts.length >= 2) {
    const correctConcept = typeof concepts[0] === 'string' ? concepts[0] : concepts[0].name || concepts[0].label;
    questions.push({
      question: `Which of the following is a key concept of <strong>${title}</strong>?`,
      options: [
        correctConcept,
        'Garbage collection tuning',
        'Network packet inspection',
        'Hardware interrupt handling',
      ],
      correctIndex: 0,
      explanation: `"${correctConcept}" is one of the foundational concepts within ${title}.`,
    });
  }

  // Q3 — application question
  questions.push({
    question: `When would you most likely apply knowledge of <strong>${title}</strong>?`,
    options: [
      `When solving problems related to ${title.toLowerCase()}`,
      `Only during initial project setup`,
      `Exclusively in legacy codebases`,
      `Never — it is purely theoretical`,
    ],
    correctIndex: 0,
    explanation: `Understanding ${title} has practical applications whenever you encounter related problems.`,
  });

  return questions;
}

/* ------------------------------------------------------------------ */
/*  Main entry point                                                  */
/* ------------------------------------------------------------------ */

/**
 * Process a quiz-related query.
 *
 * @param {string} query   — User query (e.g. "Quiz me on closures").
 * @param {object} context — Shared NEXUS context.
 * @param {object} context.scores — Per-topic score history.
 * @param {Map}    context.cache  — Global cache.
 * @returns {Promise<{response: string, metadata: object}>}
 *
 * @example
 *   const res = await process('Test me on React hooks', context);
 */
export async function process(query, context) {
  const startTime = performance.now();

  const normalised = normalizeText(query);
  const extractedTopics = extractTopics(normalised);

  // --- Try quiz bank first ---
  const bankEntries = Array.isArray(quizBank) ? quizBank : Object.values(quizBank);
  const bankLabels = bankEntries.map(
    (e) => `${e.topic || e.title || e.name || ''} ${(e.tags || []).join(' ')}`
  );

  const { bestIndex, similarity } = findBestMatch(normalised, bankLabels);

  let questions = [];
  let topicName = extractedTopics || 'General Knowledge';
  let topicId = '';
  let difficulty = 'medium';
  let source = 'quizBank';

  if (bestIndex >= 0 && similarity >= SIMILARITY_THRESHOLD) {
    const matched = bankEntries[bestIndex];
    topicName = matched.topic || matched.title || matched.name || topicName;
    topicId = matched.id || topicName;
    difficulty = determineDifficulty(topicId, context.scores);

    // Try adaptive generation first, fall back to topic fetch
    try {
      const adaptive = generateAdaptiveQuiz(topicId, difficulty, context.scores);
      questions = adaptive.questions || adaptive;
    } catch {
      try {
        const topicQuiz = getQuizForTopic(topicId);
        questions = topicQuiz.questions || topicQuiz || [];
      } catch {
        questions = matched.questions || [];
      }
    }
  }

  // --- Fallback to KB-generated questions ---
  if (questions.length === 0) {
    source = 'knowledgeBase';
    const kbEntries = Array.isArray(knowledgeBase) ? knowledgeBase : Object.values(knowledgeBase);
    const kbLabels = kbEntries.map(
      (t) => `${t.title || t.name || ''} ${t.summary || t.description || ''} ${(t.tags || []).join(' ')}`
    );
    const kbMatch = findBestMatch(normalised, kbLabels);

    if (kbMatch.bestIndex >= 0 && kbMatch.similarity >= SIMILARITY_THRESHOLD) {
      const kbEntry = kbEntries[kbMatch.bestIndex];
      topicName = kbEntry.title || kbEntry.name || topicName;
      topicId = kbEntry.id || topicName;
      difficulty = determineDifficulty(topicId, context.scores);
      questions = generateQuestionsFromKB(kbEntry);
    }
  }

  // --- Still nothing? generic quiz ---
  if (questions.length === 0) {
    source = 'generated';
    questions = [
      {
        question: `What is the primary purpose of studying <strong>${topicName}</strong>?`,
        options: [
          'To build a solid conceptual foundation',
          'To memorise syntax only',
          'To pass a single exam and forget',
          'It has no real purpose',
        ],
        correctIndex: 0,
        explanation: 'Building a strong conceptual foundation is always the primary goal of deep study.',
      },
    ];
  }

  // --- Render ---
  const quizId = makeQuizId(topicName);
  const response = renderQuiz(questions, topicName, difficulty, quizId);

  const elapsed = (performance.now() - startTime).toFixed(1);

  return {
    response,
    metadata: {
      agent: AGENT_NAME,
      intent: 'quiz',
      cached: false,
      confidence: parseFloat((similarity ? similarity * 100 : 30).toFixed(1)),
      tokensUsed: context?.agentTokens?.quizAgent ?? 0,
      timestamp: Date.now(),
      processingTime: parseFloat(elapsed),
      quizId,
      topicName,
      difficulty,
      questionCount: questions.length,
      source,
    },
  };
}
