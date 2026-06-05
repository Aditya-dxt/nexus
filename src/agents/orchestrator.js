/**
 * @module orchestrator
 * @description Central orchestration agent for NEXUS. Detects user intent via
 * weighted keyword scoring from the NLP engine, caches routing decisions for
 * repeat queries, and delegates work to the correct specialist agent.
 *
 * Pipeline Steps:
 *   1. Normalize & detect intent
 *   2. Check routing cache
 *   3. Route to specialist agent
 *   4. Collect response
 *   5. Update pipeline status
 *
 * @requires ../engine/nlp.js
 * @requires ../engine/cache.js
 */

import { detectIntent, normalizeText } from '../engine/nlp.js';
import { generateKey, getCacheStats } from '../engine/cache.js';
import { process as researcherProcess } from './researcher.js';
import { process as quizProcess } from './quizAgent.js';
import { process as analystProcess } from './analyst.js';
import { process as plannerProcess } from './planner.js';
import { process as memoryProcess } from './memory.js';
import { process as reviewerProcess } from './reviewer.js';
import { process as mentorProcess } from './mentor.js';

/* ------------------------------------------------------------------ */
/*  Intent → Agent mapping                                            */
/* ------------------------------------------------------------------ */

/**
 * @typedef {'research'|'quiz'|'analytics'|'plan'|'memory'|'review'|'mentor'|'greeting'} IntentType
 */

/** @type {Record<IntentType, string>} */
const INTENT_AGENT_MAP = {
  research: 'researcher',
  explain: 'researcher',
  quiz: 'quizAgent',
  test: 'quizAgent',
  analytics: 'analyst',
  stats: 'analyst',
  progress: 'analyst',
  plan: 'planner',
  schedule: 'planner',
  memory: 'memory',
  history: 'memory',
  review: 'reviewer',
  feedback: 'reviewer',
  mentor: 'mentor',
  motivate: 'mentor',
  greeting: 'mentor',
  goals: 'mentor',
  streak: 'mentor',
};

/** @type {Record<string, Function>} */
const AGENT_PROCESSORS = {
  researcher: researcherProcess,
  quizAgent: quizProcess,
  analyst: analystProcess,
  planner: plannerProcess,
  memory: memoryProcess,
  reviewer: reviewerProcess,
  mentor: mentorProcess,
};

/* ------------------------------------------------------------------ */
/*  Pipeline definitions per intent family                            */
/* ------------------------------------------------------------------ */

/** @type {Record<string, string[]>} */
const PIPELINE_STEPS = {
  researcher: ['detect_intent', 'check_cache', 'search_kb', 'web_search', 'assemble_response', 'store_memory', 'review'],
  quizAgent: ['detect_intent', 'check_cache', 'select_difficulty', 'generate_quiz', 'store_memory'],
  analyst: ['detect_intent', 'compute_stats', 'detect_weak_areas', 'build_dashboard'],
  planner: ['detect_intent', 'load_profile', 'traverse_graph', 'generate_plan', 'store_memory'],
  memory: ['detect_intent', 'search_history', 'format_timeline'],
  reviewer: ['detect_intent', 'evaluate_response', 'suggest_topics'],
  mentor: ['detect_intent', 'check_engagement', 'select_message', 'generate_goals'],
};

/* ------------------------------------------------------------------ */
/*  Routing cache (in-memory)                                         */
/* ------------------------------------------------------------------ */

/** @type {Map<string, {agent: string, intent: string, timestamp: number}>} */
const routingCache = new Map();
const ROUTING_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Look up a cached routing decision.
 * @param {string} cacheKey
 * @returns {{agent: string, intent: string} | null}
 */
function getCachedRoute(cacheKey) {
  const entry = routingCache.get(cacheKey);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > ROUTING_CACHE_TTL) {
    routingCache.delete(cacheKey);
    return null;
  }
  return { agent: entry.agent, intent: entry.intent };
}

/**
 * Store a routing decision in cache.
 * @param {string} cacheKey
 * @param {string} agent
 * @param {string} intent
 */
function setCachedRoute(cacheKey, agent, intent) {
  routingCache.set(cacheKey, { agent, intent, timestamp: Date.now() });
  // Evict oldest entries if cache grows too large
  if (routingCache.size > 500) {
    const oldest = routingCache.keys().next().value;
    routingCache.delete(oldest);
  }
}

/* ------------------------------------------------------------------ */
/*  Exported helpers                                                  */
/* ------------------------------------------------------------------ */

/**
 * Maps a detected intent string to the appropriate agent name.
 *
 * @param {string} intent — The intent string produced by the NLP engine.
 * @returns {string} Agent module name (e.g. 'researcher', 'quizAgent').
 *
 * @example
 *   getAgentForIntent('research'); // => 'researcher'
 *   getAgentForIntent('quiz');     // => 'quizAgent'
 */
export function getAgentForIntent(intent) {
  return INTENT_AGENT_MAP[intent] || 'researcher'; // default fallback
}

/**
 * Returns the ordered pipeline steps that will execute for a given intent.
 * Used by the UI to render a pipeline visualisation.
 *
 * @param {string} intent
 * @returns {string[]} Array of step identifiers.
 *
 * @example
 *   getPipelineSteps('research');
 *   // => ['detect_intent','check_cache','search_kb','assemble_response','store_memory','review']
 */
export function getPipelineSteps(intent) {
  const agentName = getAgentForIntent(intent);
  return PIPELINE_STEPS[agentName] || PIPELINE_STEPS.researcher;
}

/* ------------------------------------------------------------------ */
/*  Main entry point                                                  */
/* ------------------------------------------------------------------ */

/**
 * Process an incoming user query through the full NEXUS pipeline.
 *
 * 1. Normalises the query text
 * 2. Detects intent via NLP engine
 * 3. Checks routing cache for repeat queries
 * 4. Delegates to the matched specialist agent
 * 5. Wraps the specialist response with orchestration metadata
 *
 * @param {string} query — Raw user query string.
 * @param {object} context — Shared application state.
 * @param {Map}    context.cache        — Global response cache.
 * @param {Array}  context.kbTopics     — Knowledge-base topic list.
 * @param {object} context.scores       — Per-topic score records.
 * @param {Array}  context.sessions     — Study session history.
 * @param {object} context.learnerProfile — Current learner profile.
 * @param {object} context.settings     — User settings.
 * @param {object} context.agentTokens  — Per-agent token budgets.
 * @returns {Promise<{response: string, metadata: object}>}
 *
 * @example
 *   const result = await processQuery('Explain closures in JavaScript', ctx);
 *   console.log(result.response);   // rich HTML explanation
 *   console.log(result.metadata);   // { agent, intent, cached, ... }
 */
export async function processQuery(query, context) {
  const startTime = performance.now();

  // ------ Step 1: Normalise & detect intent ------
  const normalised = normalizeText(query);
  const { intent, confidence: intentConfidence } = detectIntent(normalised);

  // ------ Step 2: Check routing cache ------
  const cacheKey = generateKey(`route:${normalised}`);
  const cachedRoute = getCachedRoute(cacheKey);
  let agentName;
  let cached = false;

  if (cachedRoute) {
    agentName = cachedRoute.agent;
    cached = true;
  } else {
    agentName = getAgentForIntent(intent);
    setCachedRoute(cacheKey, agentName, intent);
  }

  // ------ Step 3: Resolve processor ------
  const processor = AGENT_PROCESSORS[agentName];
  if (!processor) {
    const elapsed = (performance.now() - startTime).toFixed(1);
    return {
      response: `<div class="error-card"><h3>⚠️ Unknown Agent</h3><p>Could not route intent <code>${intent}</code> to a known agent.</p></div>`,
      metadata: {
        agent: 'orchestrator',
        intent,
        cached,
        confidence: 0,
        tokensUsed: context.agentTokens?.orchestrator ?? 0,
        timestamp: Date.now(),
        processingTime: parseFloat(elapsed),
        pipeline: getPipelineSteps(intent),
        routedTo: agentName,
      },
    };
  }

  // ------ Step 4: Delegate to specialist agent ------
  /** @type {{response: string, metadata: object}} */
  let agentResult;
  try {
    agentResult = await processor(query, {
      ...context,
      _routing: { intent, confidence: intentConfidence, orchestratorCached: cached },
    });
  } catch (err) {
    const elapsed = (performance.now() - startTime).toFixed(1);
    return {
      response: `<div class="error-card"><h3>❌ Agent Error — ${agentName}</h3><p>${err.message}</p></div>`,
      metadata: {
        agent: 'orchestrator',
        intent,
        cached,
        confidence: 0,
        tokensUsed: context.agentTokens?.orchestrator ?? 0,
        timestamp: Date.now(),
        processingTime: parseFloat(elapsed),
        pipeline: getPipelineSteps(intent),
        routedTo: agentName,
        error: err.message,
      },
    };
  }

  // ------ Step 5: Merge metadata & return ------
  const elapsed = (performance.now() - startTime).toFixed(1);
  const pipelineSteps = getPipelineSteps(intent);

  return {
    response: agentResult.response,
    metadata: {
      ...agentResult.metadata,
      agent: 'orchestrator',
      routedTo: agentName,
      intent,
      cached,
      confidence: agentResult.metadata?.confidence ?? intentConfidence,
      tokensUsed: (context.agentTokens?.orchestrator ?? 0) + (agentResult.metadata?.tokensUsed ?? 0),
      timestamp: Date.now(),
      processingTime: parseFloat(elapsed),
      pipeline: pipelineSteps,
    },
  };
}
