/**
 * @module researcher
 * @description Knowledge retrieval agent for NEXUS. Uses TF-IDF-based
 * similarity via the NLP engine to locate the best-matching topic in the
 * knowledge base, then assembles a rich, multi-section HTML explanation.
 *
 * Response template:
 *   1. Intro paragraph
 *   2. Key concepts list
 *   3. Analogy box
 *   4. Takeaway callout
 *   5. Related topics
 *
 * When no KB topic exceeds the similarity threshold, the agent
 * **searches Wikipedia** for real information and renders it inline.
 *
 * @requires ../engine/nlp.js
 * @requires ../engine/cache.js
 * @requires ../engine/webSearch.js
 * @requires ../data/knowledgeBase.js
 * @requires ../data/knowledgeGraph.js
 */

import { findBestMatch, extractTopics, normalizeText, computeSimilarity } from '../engine/nlp.js';
import { generateKey } from '../engine/cache.js';
import { researchTopic, renderWebResult } from '../engine/webSearch.js';
import { knowledgeBase } from '../data/knowledgeBase.js';
import { getRelatedTopics } from '../data/knowledgeGraph.js';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

/** Minimum similarity score required to accept a KB match. */
const SIMILARITY_THRESHOLD = 0.3;

/** Agent identifier used in metadata. */
const AGENT_NAME = 'researcher';

/* ------------------------------------------------------------------ */
/*  HTML builders                                                     */
/* ------------------------------------------------------------------ */

/**
 * Builds the introduction section for a found topic.
 * @param {object} topic — KB topic record.
 * @returns {string} HTML string.
 */
function buildIntro(topic) {
  const difficulty = topic.difficulty || 'intermediate';
  const diffBadge = {
    beginner: '🟢 Beginner',
    intermediate: '🟡 Intermediate',
    advanced: '🔴 Advanced',
  }[difficulty] || '🟡 Intermediate';

  return `
    <div class="research-section research-intro">
      <h3>📚 ${topic.title || topic.name}</h3>
      <span class="difficulty-badge">${diffBadge}</span>
      <p>${topic.summary || topic.description || 'Exploring this topic in depth.'}</p>
    </div>`;
}

/**
 * Builds a key-concepts bullet list.
 * @param {object} topic — KB topic record.
 * @returns {string} HTML string.
 */
function buildKeyConcepts(topic) {
  const concepts = topic.keyConcepts || topic.concepts || topic.keyPoints || [];
  if (concepts.length === 0) return '';

  const items = concepts.map((c) => `<li>${typeof c === 'string' ? c : c.name || c.label}</li>`).join('\n      ');

  return `
    <div class="research-section research-concepts">
      <h4>🔑 Key Concepts</h4>
      <ul>
      ${items}
      </ul>
    </div>`;
}

/**
 * Builds the analogy box.
 * @param {object} topic — KB topic record.
 * @returns {string} HTML string.
 */
function buildAnalogyBox(topic) {
  const analogy = topic.analogy || topic.metaphor;
  if (!analogy) return '';

  return `
    <div class="analogy-box">
      <h4>💡 Think of it this way…</h4>
      <p>${analogy}</p>
    </div>`;
}

/**
 * Builds the detailed explanation section.
 * @param {object} topic — KB topic record.
 * @returns {string} HTML string.
 */
function buildExplanation(topic) {
  const explanation = topic.explanation || topic.content || topic.details;
  if (!explanation) return '';

  // If the explanation is an array of paragraphs, join them
  const text = Array.isArray(explanation)
    ? explanation.map((p) => `<p>${p}</p>`).join('\n')
    : `<p>${explanation}</p>`;

  return `
    <div class="research-section research-explanation">
      <h4>📖 In-Depth Explanation</h4>
      ${text}
    </div>`;
}

/**
 * Builds the takeaway callout.
 * @param {object} topic — KB topic record.
 * @returns {string} HTML string.
 */
function buildTakeaway(topic) {
  const takeaway = topic.takeaway || topic.keyTakeaway || topic.tldr;
  if (!takeaway) {
    return `
    <div class="research-section takeaway-callout">
      <h4>🎯 Key Takeaway</h4>
      <p>Understanding <strong>${topic.title || topic.name}</strong> is a foundational step.
      Practice applying these concepts in real-world scenarios to solidify your understanding.</p>
    </div>`;
  }

  return `
    <div class="research-section takeaway-callout">
      <h4>🎯 Key Takeaway</h4>
      <p>${takeaway}</p>
    </div>`;
}

/**
 * Builds related topics section using the knowledge graph.
 * @param {string} topicId — Current topic identifier.
 * @returns {string} HTML string.
 */
function buildRelatedTopics(topicId) {
  let related;
  try {
    related = getRelatedTopics(topicId);
  } catch {
    related = [];
  }

  if (!related || related.length === 0) return '';

  const links = related
    .slice(0, 5)
    .map((r) => {
      const label = typeof r === 'string' ? r : r.name || r.title || r.id;
      return `<span class="topic-chip">${label}</span>`;
    })
    .join(' ');

  return `
    <div class="research-section research-related">
      <h4>🔗 Related Topics</h4>
      <div class="topic-chips">${links}</div>
    </div>`;
}

/* ------------------------------------------------------------------ */
/*  Fallback template for unknown topics                              */
/* ------------------------------------------------------------------ */

/**
 * Generates a best-effort response when no KB match is found.
 * @param {string} query — Original query text.
 * @param {string|string[]} extractedTopics — Topics extracted from the query.
 * @returns {string} HTML string.
 */
function buildFallbackResponse(query, extractedTopics) {
  const topicLabel = typeof extractedTopics === 'string'
    ? (extractedTopics || query)
    : (extractedTopics.length > 0 ? extractedTopics.join(', ') : query);

  return `
    <div class="research-section research-fallback">
      <h3>🔍 Exploring: ${topicLabel}</h3>
      <p>I don't have a specific entry for <strong>${topicLabel}</strong> in my knowledge base yet,
      but here's a framework to guide your study:</p>

      <div class="research-section">
        <h4>📋 Suggested Study Approach</h4>
        <ol>
          <li><strong>Define it</strong> — Write down a one-sentence definition in your own words.</li>
          <li><strong>Break it down</strong> — Identify the 3–5 core sub-concepts or components.</li>
          <li><strong>Find an analogy</strong> — Relate it to something you already know well.</li>
          <li><strong>Practice</strong> — Work through a small, hands-on example.</li>
          <li><strong>Teach it</strong> — Explain the concept aloud as if teaching a peer.</li>
        </ol>
      </div>

      <div class="takeaway-callout">
        <h4>💡 Tip</h4>
        <p>Try asking me about related topics — I might have information on prerequisite
        or adjacent concepts that can help you build understanding from the ground up.</p>
      </div>
    </div>`;
}

/* ------------------------------------------------------------------ */
/*  Response cache (in-memory, per session)                           */
/* ------------------------------------------------------------------ */

/** @type {Map<string, {response: string, metadata: object, timestamp: number}>} */
const responseCache = new Map();
const RESPONSE_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

/* ------------------------------------------------------------------ */
/*  Main entry point                                                  */
/* ------------------------------------------------------------------ */

/**
 * Process a research / explanation query.
 *
 * @param {string} query — The user's natural-language question.
 * @param {object} context — Shared NEXUS context.
 * @param {Map}    context.cache — Global cache map.
 * @param {Array}  context.kbTopics — List of KB topic IDs.
 * @param {object} context.scores — Per-topic scores.
 * @param {object} context.learnerProfile — Current learner profile.
 * @returns {Promise<{response: string, metadata: object}>}
 *
 * @example
 *   const res = await process('What are JavaScript closures?', context);
 *   document.getElementById('answer').innerHTML = res.response;
 */
export async function process(query, context) {
  const startTime = performance.now();

  // --- Normalise & extract topics ---
  const normalised = normalizeText(query);
  const extractedTopics = extractTopics(normalised);

  // --- Check response cache ---
  const cacheKey = generateKey(`research:${normalised}`);
  const cachedEntry = responseCache.get(cacheKey);
  if (cachedEntry && Date.now() - cachedEntry.timestamp < RESPONSE_CACHE_TTL) {
    return {
      response: cachedEntry.response,
      metadata: { ...cachedEntry.metadata, cached: true, processingTime: parseFloat((performance.now() - startTime).toFixed(1)) },
    };
  }

  // --- Search knowledge base ---
  const kbEntries = Array.isArray(knowledgeBase)
    ? knowledgeBase
    : Object.values(knowledgeBase);

  const kbSearchTexts = kbEntries.map(
    (t) => `${t.title || t.name || ''} ${t.summary || t.description || ''} ${(t.tags || []).join(' ')}`
  );

  const { bestIndex, similarity } = findBestMatch(normalised, kbSearchTexts);

  let response;
  let matchedTopic = null;
  let confidence = 0;

  if (bestIndex >= 0 && similarity >= SIMILARITY_THRESHOLD) {
    // ---- Good KB match ----
    matchedTopic = kbEntries[bestIndex];
    confidence = Math.min(similarity * 100, 100);

    const topicId = matchedTopic.id || matchedTopic.name || matchedTopic.title || '';

    response = [
      buildIntro(matchedTopic),
      buildKeyConcepts(matchedTopic),
      buildAnalogyBox(matchedTopic),
      buildExplanation(matchedTopic),
      buildTakeaway(matchedTopic),
      buildRelatedTopics(topicId),
    ]
      .filter(Boolean)
      .join('\n');

    // Wrap in container
    response = `<div class="research-response">${response}</div>`;

    // Store explained topic in context for memory
    if (context && !context._explainedTopics) context._explainedTopics = [];
    if (context) {
      context._explainedTopics.push({
        id: topicId,
        title: matchedTopic.title || matchedTopic.name,
        timestamp: Date.now(),
      });
    }
  } else {
    // ---- Fallback: search Wikipedia ----
    const searchQuery = (typeof extractedTopics === 'string' && extractedTopics) ? extractedTopics : query;
    try {
      const webResult = await researchTopic(searchQuery);
      if (webResult.found) {
        confidence = 70; // web source — decent confidence
        response = `<div class="research-response">${renderWebResult(webResult)}</div>`;
      } else {
        confidence = similarity ? Math.min(similarity * 100, 30) : 5;
        response = `<div class="research-response">${buildFallbackResponse(query, extractedTopics)}</div>`;
      }
    } catch (err) {
      console.warn('[researcher] Web search failed, using fallback:', err.message);
      confidence = similarity ? Math.min(similarity * 100, 30) : 5;
      response = `<div class="research-response">${buildFallbackResponse(query, extractedTopics)}</div>`;
    }
  }

  // --- Build metadata ---
  const elapsed = (performance.now() - startTime).toFixed(1);
  const metadata = {
    agent: AGENT_NAME,
    intent: 'research',
    cached: false,
    confidence: parseFloat(confidence.toFixed(1)),
    tokensUsed: context?.agentTokens?.researcher ?? 0,
    timestamp: Date.now(),
    processingTime: parseFloat(elapsed),
    matchedTopic: matchedTopic ? (matchedTopic.title || matchedTopic.name) : null,
    similarity: similarity ? parseFloat(similarity.toFixed(3)) : 0,
    extractedTopics,
  };

  // --- Store in cache ---
  responseCache.set(cacheKey, { response, metadata, timestamp: Date.now() });

  return { response, metadata };
}
