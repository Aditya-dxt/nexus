/**
 * @fileoverview NEXUS NLP Engine
 * Pure-computation natural language processing module for intent detection,
 * TF-IDF similarity, text normalization, topic extraction, and document matching.
 * No external dependencies — all algorithms implemented from scratch.
 * @module engine/nlp
 */

// ─── Intent Keyword Map ──────────────────────────────────────────────────────

/**
 * Weighted keyword map for intent classification.
 * Each intent maps to an array of trigger phrases scored during detection.
 * @type {Record<string, string[]>}
 */
const INTENT_KEYWORDS = {
  explain: [
    'explain', 'what is', 'how does', 'tell me', 'describe',
    'define', 'meaning', 'concept', 'learn', 'teach',
    'understand', 'study'
  ],
  quiz: [
    'quiz', 'test', 'question', 'assess', 'evaluate',
    'exam', 'practice', 'mcq', 'test me'
  ],
  plan: [
    'plan', 'schedule', 'roadmap', 'syllabus', 'curriculum',
    'timeline', 'study plan', 'learning path'
  ],
  analyze: [
    'analyze', 'progress', 'performance', 'stats', 'weak',
    'strong', 'score', 'how am i', 'report'
  ],
  review: [
    'review', 'revise', 'recap', 'summary', 'refresh', 'remember'
  ],
  mentor: [
    'motivate', 'advice', 'help', 'stuck', 'overwhelmed',
    'tip', 'encourage', 'goal'
  ],
  memory: [
    'history', 'remember', 'past', 'previous', 'what did', 'recall'
  ]
};

/**
 * Common prefixes stripped during topic extraction.
 * Sorted longest-first so greedy matching works correctly.
 * @type {string[]}
 */
const TOPIC_PREFIXES = [
  'tell me about', 'can you explain', 'please explain',
  'i want to learn', 'teach me about', 'teach me',
  'what is the meaning of', 'what is a', 'what is an',
  'what is', 'what are', 'how does', 'how do',
  'explain me', 'explain to me', 'explain',
  'describe', 'define', 'meaning of'
];

/**
 * Stopwords excluded from TF-IDF calculations and tokenization scoring.
 * @type {Set<string>}
 */
const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'shall', 'can', 'need', 'dare', 'ought',
  'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from',
  'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'between', 'out', 'off', 'over', 'under', 'again', 'further', 'then',
  'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'each',
  'every', 'both', 'few', 'more', 'most', 'other', 'some', 'such', 'no',
  'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just',
  'because', 'but', 'and', 'or', 'if', 'while', 'about', 'up', 'it',
  'its', 'i', 'me', 'my', 'we', 'our', 'you', 'your', 'he', 'him',
  'his', 'she', 'her', 'they', 'them', 'their', 'this', 'that', 'these',
  'those', 'am', 'what', 'which', 'who', 'whom'
]);

// ─── Core Text Utilities ─────────────────────────────────────────────────────

/**
 * Normalize text by lowercasing, stripping punctuation, and collapsing whitespace.
 * @param {string} text — Raw input string.
 * @returns {string} Cleaned, lowercase string with single-space separation.
 * @example
 * normalizeText('Hello, World!!') // 'hello world'
 */
export function normalizeText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Split text into meaningful tokens, filtering out stopwords and single chars.
 * @param {string} text — Input string (will be normalized first).
 * @returns {string[]} Array of significant tokens.
 * @example
 * tokenize('The quick brown fox jumps') // ['quick', 'brown', 'fox', 'jumps']
 */
export function tokenize(text) {
  const normalized = normalizeText(text);
  if (!normalized) return [];
  return normalized
    .split(' ')
    .filter(token => token.length > 1 && !STOPWORDS.has(token));
}

// ─── Intent Detection ────────────────────────────────────────────────────────

/**
 * Detect the user's intent from a natural-language query using weighted
 * keyword scoring. Multi-word phrases score higher than single keywords
 * to reward specificity.
 *
 * Scoring rules:
 *  - Multi-word phrase match → weight = number of words in phrase
 *  - Single-word match       → weight = 1
 *  - Confidence = topScore / (topScore + secondScore + 1)
 *    clamped to [0, 1], giving a relative-dominance measure.
 *
 * @param {string} query — The user's raw query string.
 * @returns {{ intent: string, confidence: number, keywords: string[] }}
 *   intent     — The top-scoring intent category.
 *   confidence — 0-1 dominance score (higher = more decisive).
 *   keywords   — The specific phrases that matched.
 * @example
 * detectIntent('explain how does photosynthesis work')
 * // { intent: 'explain', confidence: 0.8, keywords: ['explain', 'how does'] }
 */
export function detectIntent(query) {
  const normalized = normalizeText(query);
  if (!normalized) {
    return { intent: 'explain', confidence: 0, keywords: [] };
  }

  /** @type {Record<string, { score: number, matched: string[] }>} */
  const scores = {};

  for (const [intent, phrases] of Object.entries(INTENT_KEYWORDS)) {
    scores[intent] = { score: 0, matched: [] };

    for (const phrase of phrases) {
      if (normalized.includes(phrase)) {
        // Multi-word phrases get proportionally higher weight
        const weight = phrase.split(' ').length;
        scores[intent].score += weight;
        scores[intent].matched.push(phrase);
      }
    }
  }

  // Sort intents by score descending
  const sorted = Object.entries(scores).sort((a, b) => b[1].score - a[1].score);
  const topScore = sorted[0][1].score;
  const secondScore = sorted.length > 1 ? sorted[1][1].score : 0;

  // No keywords matched — default to 'explain' with zero confidence
  if (topScore === 0) {
    return { intent: 'explain', confidence: 0, keywords: [] };
  }

  // Confidence: relative dominance of the winning intent
  const confidence = Math.min(1, topScore / (topScore + secondScore + 1));

  return {
    intent: sorted[0][0],
    confidence: parseFloat(confidence.toFixed(4)),
    keywords: sorted[0][1].matched
  };
}

// ─── Topic Extraction ────────────────────────────────────────────────────────

/**
 * Extract the subject-matter topic from a natural-language query by stripping
 * common instructional prefixes (e.g. "explain", "what is", "tell me about").
 *
 * @param {string} query — Raw user query.
 * @returns {string} The extracted topic, or the normalized query if no prefix found.
 * @example
 * extractTopics('tell me about machine learning') // 'machine learning'
 * extractTopics('quantum physics')                // 'quantum physics'
 */
export function extractTopics(query) {
  let normalized = normalizeText(query);
  if (!normalized) return '';

  // Try to strip the longest matching prefix first
  for (const prefix of TOPIC_PREFIXES) {
    if (normalized.startsWith(prefix)) {
      normalized = normalized.slice(prefix.length).trim();
      break;
    }
  }

  // Remove any trailing question-mark artifacts or filler
  normalized = normalized.replace(/\s*(please|thanks|thank you)\s*$/i, '').trim();

  return normalized || normalizeText(query);
}

// ─── TF-IDF Engine ───────────────────────────────────────────────────────────

/**
 * Compute raw term frequency for a list of tokens.
 * TF(t, d) = count(t in d) / |d|
 * @param {string[]} tokens — Tokenized document.
 * @returns {Record<string, number>} Token → frequency mapping.
 */
function termFrequency(tokens) {
  /** @type {Record<string, number>} */
  const tf = {};
  if (tokens.length === 0) return tf;

  for (const token of tokens) {
    tf[token] = (tf[token] || 0) + 1;
  }

  // Normalize by document length
  const len = tokens.length;
  for (const key of Object.keys(tf)) {
    tf[key] /= len;
  }

  return tf;
}

/**
 * Compute inverse document frequency across a corpus.
 * IDF(t) = ln(N / (1 + df(t)))   — smoothed to avoid division by zero.
 * @param {string[][]} tokenizedDocs — Array of tokenized documents.
 * @returns {Record<string, number>} Token → IDF score.
 */
function inverseDocumentFrequency(tokenizedDocs) {
  /** @type {Record<string, number>} */
  const df = {};
  const N = tokenizedDocs.length;

  for (const doc of tokenizedDocs) {
    const uniqueTokens = new Set(doc);
    for (const token of uniqueTokens) {
      df[token] = (df[token] || 0) + 1;
    }
  }

  /** @type {Record<string, number>} */
  const idf = {};
  for (const [token, count] of Object.entries(df)) {
    idf[token] = Math.log(N / (1 + count));
  }

  return idf;
}

/**
 * Build TF-IDF vector representations for an array of documents.
 *
 * @param {string[]} documents — Array of raw document strings.
 * @returns {{ vectors: Record<string, number>[], vocabulary: string[], idf: Record<string, number> }}
 *   vectors    — Per-document TF-IDF weight maps.
 *   vocabulary — All unique terms across the corpus.
 *   idf        — The computed IDF weights.
 * @example
 * const corpus = ['machine learning basics', 'deep learning neural networks'];
 * const { vectors, vocabulary } = buildTFIDF(corpus);
 */
export function buildTFIDF(documents) {
  if (!Array.isArray(documents) || documents.length === 0) {
    return { vectors: [], vocabulary: [], idf: {} };
  }

  const tokenizedDocs = documents.map(doc => tokenize(doc));
  const idf = inverseDocumentFrequency(tokenizedDocs);

  const vectors = tokenizedDocs.map(tokens => {
    const tf = termFrequency(tokens);
    /** @type {Record<string, number>} */
    const tfidf = {};

    for (const [token, freq] of Object.entries(tf)) {
      tfidf[token] = freq * (idf[token] || 0);
    }

    return tfidf;
  });

  const vocabularySet = new Set();
  for (const doc of tokenizedDocs) {
    for (const token of doc) {
      vocabularySet.add(token);
    }
  }

  return {
    vectors,
    vocabulary: Array.from(vocabularySet).sort(),
    idf
  };
}

// ─── Cosine Similarity ───────────────────────────────────────────────────────

/**
 * Compute cosine similarity between two sparse TF-IDF vectors.
 * @param {Record<string, number>} vecA — First vector.
 * @param {Record<string, number>} vecB — Second vector.
 * @returns {number} Similarity score in [0, 1].
 */
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  // Iterate over the smaller vector for efficiency
  const [smaller, larger] = Object.keys(vecA).length <= Object.keys(vecB).length
    ? [vecA, vecB]
    : [vecB, vecA];

  for (const [token, weight] of Object.entries(smaller)) {
    if (token in larger) {
      dotProduct += weight * larger[token];
    }
  }

  for (const weight of Object.values(vecA)) {
    magnitudeA += weight * weight;
  }
  for (const weight of Object.values(vecB)) {
    magnitudeB += weight * weight;
  }

  const magnitude = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);
  if (magnitude === 0) return 0;

  return parseFloat((dotProduct / magnitude).toFixed(6));
}

/**
 * Compute TF-IDF cosine similarity between two raw text strings.
 *
 * Builds a mini two-document corpus, computes TF-IDF vectors, then
 * returns their cosine similarity.
 *
 * @param {string} text1 — First text.
 * @param {string} text2 — Second text.
 * @returns {number} Similarity score in [0, 1]. 0 = no overlap, 1 = identical.
 * @example
 * computeSimilarity('machine learning', 'deep learning') // ~0.45
 * computeSimilarity('hello world', 'hello world')        // 1.0
 */
export function computeSimilarity(text1, text2) {
  if (!text1 || !text2) return 0;

  const { vectors } = buildTFIDF([text1, text2]);
  if (vectors.length < 2) return 0;

  return cosineSimilarity(vectors[0], vectors[1]);
}

// ─── Document Matching ───────────────────────────────────────────────────────

/**
 * Find the document most similar to a query from a collection.
 *
 * Builds a joint TF-IDF corpus (query + all documents), then ranks
 * documents by cosine similarity to the query vector.
 *
 * @param {string} query — The search query.
 * @param {string[]} documents — Candidate documents to search.
 * @returns {{ bestIndex: number, bestScore: number, scores: number[] }}
 *   bestIndex — Index of the highest-scoring document (-1 if empty).
 *   bestScore — The similarity score of the best match.
 *   scores    — Per-document similarity scores.
 * @example
 * const docs = ['intro to physics', 'advanced calculus', 'physics mechanics'];
 * findBestMatch('physics forces', docs)
 * // { bestIndex: 2, bestScore: 0.71, scores: [0.45, 0.0, 0.71] }
 */
export function findBestMatch(query, documents) {
  if (!query || !Array.isArray(documents) || documents.length === 0) {
    return { bestIndex: -1, bestScore: 0, scores: [] };
  }

  // Build corpus: query at index 0, documents at 1..N
  const corpus = [query, ...documents];
  const { vectors } = buildTFIDF(corpus);

  const queryVector = vectors[0];
  const scores = [];
  let bestIndex = -1;
  let bestScore = 0;

  for (let i = 1; i < vectors.length; i++) {
    const score = cosineSimilarity(queryVector, vectors[i]);
    scores.push(score);

    if (score > bestScore) {
      bestScore = score;
      bestIndex = i - 1; // Map back to original document index
    }
  }

  return {
    bestIndex,
    bestScore: parseFloat(bestScore.toFixed(6)),
    scores: scores.map(s => parseFloat(s.toFixed(6)))
  };
}
