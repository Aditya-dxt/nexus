/**
 * @module analyst
 * @description Analytics agent for NEXUS. Performs 100 % local computation on
 * the learner's data to produce a rich stats dashboard. Never makes external
 * API calls.
 *
 * Computed metrics:
 *   - Total topics studied & sessions completed
 *   - Average quiz score & per-topic breakdown
 *   - Learning velocity (topics / week)
 *   - Stagnation detection
 *   - Weak areas (score < 60 %) & strong areas (score > 80 %)
 *   - Cache efficiency
 *
 * @requires ../engine/cache.js
 * @requires ../engine/spacedRepetition.js
 * @requires ../engine/learnerProfile.js
 */

import { getCacheStats } from '../engine/cache.js';
import { calculateLearningVelocity, detectStagnation } from '../engine/spacedRepetition.js';
import { getWeakAreas, getStrongAreas, getStudyStreak, getHeatmapData, getStudyHistory } from '../engine/learnerProfile.js';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const AGENT_NAME = 'analyst';
const WEAK_THRESHOLD = 60;
const STRONG_THRESHOLD = 80;

/* ------------------------------------------------------------------ */
/*  Pure computation helpers                                          */
/* ------------------------------------------------------------------ */

/**
 * Extracts a flat list of numeric scores from the scores map.
 * @param {object} scores — `{ topicId: number | number[] | {score}[] }`
 * @returns {{ topic: string, avg: number, count: number }[]}
 */
function computePerTopicStats(scores) {
  if (!scores || typeof scores !== 'object') return [];

  return Object.entries(scores).map(([topic, raw]) => {
    const list = Array.isArray(raw) ? raw : [raw];
    const nums = list.map((v) => (typeof v === 'number' ? v : v?.score ?? 0));
    const avg = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
    return { topic, avg: parseFloat(avg.toFixed(1)), count: nums.length };
  });
}

/**
 * Overall average score across all topics.
 * @param {{ avg: number }[]} perTopic
 * @returns {number}
 */
function overallAverage(perTopic) {
  if (perTopic.length === 0) return 0;
  return parseFloat((perTopic.reduce((s, t) => s + t.avg, 0) / perTopic.length).toFixed(1));
}

/**
 * Determine a performance label and colour.
 * @param {number} score
 * @returns {{ label: string, colour: string, emoji: string }}
 */
function performanceLabel(score) {
  if (score >= 90) return { label: 'Excellent', colour: '#22c55e', emoji: '🌟' };
  if (score >= 80) return { label: 'Great', colour: '#3b82f6', emoji: '💪' };
  if (score >= 60) return { label: 'Good', colour: '#f59e0b', emoji: '👍' };
  if (score >= 40) return { label: 'Needs Work', colour: '#f97316', emoji: '📈' };
  return { label: 'Getting Started', colour: '#ef4444', emoji: '🚀' };
}

/* ------------------------------------------------------------------ */
/*  HTML builders                                                     */
/* ------------------------------------------------------------------ */

/**
 * Stat card component.
 * @param {string} title
 * @param {string|number} value
 * @param {string} emoji
 * @param {string} colour
 * @returns {string}
 */
function statCard(title, value, emoji, colour = '#3b82f6') {
  return `
    <div class="stat-card" style="border-left: 4px solid ${colour};">
      <div class="stat-emoji">${emoji}</div>
      <div class="stat-value">${value}</div>
      <div class="stat-label">${title}</div>
    </div>`;
}

/**
 * Builds the top-level stats grid.
 */
function buildStatsGrid(totalTopics, totalSessions, avgScore, streak, velocity) {
  const perf = performanceLabel(avgScore);
  return `
    <div class="stats-grid">
      ${statCard('Topics Studied', totalTopics, '📚', '#8b5cf6')}
      ${statCard('Sessions', totalSessions, '📅', '#3b82f6')}
      ${statCard('Avg Score', `${avgScore}%`, perf.emoji, perf.colour)}
      ${statCard('Study Streak', `${streak} day${streak !== 1 ? 's' : ''}`, '🔥', '#f97316')}
      ${statCard('Learning Velocity', `${velocity} topics/wk`, '⚡', '#06b6d4')}
    </div>`;
}

/**
 * Builds a list section (weak / strong areas).
 * @param {string} title
 * @param {string} emoji
 * @param {{topic: string, avg: number}[]} items
 * @param {string} colour
 * @returns {string}
 */
function buildAreaList(title, emoji, items, colour) {
  if (items.length === 0) {
    return `
      <div class="area-section" style="border-left: 4px solid ${colour};">
        <h4>${emoji} ${title}</h4>
        <p class="no-data">No data yet — keep studying!</p>
      </div>`;
  }

  const rows = items
    .map((item) => {
      const barWidth = Math.max(item.avg, 5);
      return `
        <div class="area-row">
          <span class="area-topic">${item.topic}</span>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${barWidth}%; background: ${colour};"></div>
          </div>
          <span class="area-score">${item.avg}%</span>
        </div>`;
    })
    .join('\n');

  return `
    <div class="area-section" style="border-left: 4px solid ${colour};">
      <h4>${emoji} ${title}</h4>
      ${rows}
    </div>`;
}

/**
 * Builds cache efficiency section.
 */
function buildCacheSection(cacheStats) {
  if (!cacheStats) return '';

  const hitRate = cacheStats.hits != null && cacheStats.total
    ? ((cacheStats.hits / cacheStats.total) * 100).toFixed(1)
    : 'N/A';

  return `
    <div class="cache-section">
      <h4>⚙️ System Efficiency</h4>
      <div class="stats-grid mini">
        ${statCard('Cache Hit Rate', `${hitRate}%`, '💾', '#64748b')}
        ${statCard('Cached Items', cacheStats.size ?? 0, '📦', '#64748b')}
      </div>
    </div>`;
}

/**
 * Builds recommendations section.
 */
function buildRecommendations(weakAreas, stagnation, avgScore) {
  const tips = [];

  if (weakAreas.length > 0) {
    const topWeak = weakAreas.slice(0, 3).map((w) => `<strong>${w.topic || w}</strong>`).join(', ');
    tips.push(`🎯 Focus your next sessions on: ${topWeak}`);
  }

  if (stagnation && stagnation.isStagnating) {
    tips.push('🔄 You seem to be plateauing — try mixing in new topics or different question types.');
  }

  if (avgScore < 50) {
    tips.push('📖 Consider revisiting foundational concepts before moving to advanced material.');
  } else if (avgScore >= 80) {
    tips.push('🚀 Great performance! Challenge yourself with harder quizzes or new topics.');
  }

  if (tips.length === 0) {
    tips.push('✅ You\'re on track! Keep up your current study rhythm.');
  }

  const items = tips.map((t) => `<li>${t}</li>`).join('\n');
  return `
    <div class="recommendations-section">
      <h4>💡 Recommendations</h4>
      <ul class="recommendation-list">${items}</ul>
    </div>`;
}

/* ------------------------------------------------------------------ */
/*  Main entry point                                                  */
/* ------------------------------------------------------------------ */

/**
 * Process an analytics / progress query.
 *
 * All data is computed locally from `context` — no external calls.
 *
 * @param {string} query   — User query.
 * @param {object} context — Shared NEXUS context.
 * @param {object} context.scores  — Per-topic score data.
 * @param {Array}  context.sessions — Study session records.
 * @param {object} context.cache   — Global cache.
 * @param {object} context.learnerProfile — Learner profile data.
 * @returns {Promise<{response: string, metadata: object}>}
 *
 * @example
 *   const res = await process('Show my progress', context);
 */
export async function process(query, context) {
  const startTime = performance.now();

  // --- Per-topic stats ---
  const perTopic = computePerTopicStats(context.scores);
  const avgScore = overallAverage(perTopic);
  const totalTopics = perTopic.length;
  const totalSessions = context.sessions ? context.sessions.length : 0;

  // --- Weak & strong areas ---
  let weakAreas, strongAreas;
  try {
    weakAreas = getWeakAreas(context.learnerProfile) || [];
  } catch {
    weakAreas = perTopic.filter((t) => t.avg < WEAK_THRESHOLD);
  }
  try {
    strongAreas = getStrongAreas(context.learnerProfile) || [];
  } catch {
    strongAreas = perTopic.filter((t) => t.avg >= STRONG_THRESHOLD);
  }

  // Ensure we have topic/avg shape
  const weakList = weakAreas.map((w) =>
    typeof w === 'string' ? { topic: w, avg: 0 } : { topic: w.topic || w.name || w, avg: w.avg ?? w.score ?? 0 }
  );
  const strongList = strongAreas.map((s) =>
    typeof s === 'string' ? { topic: s, avg: 100 } : { topic: s.topic || s.name || s, avg: s.avg ?? s.score ?? 100 }
  );

  // --- Streak ---
  let streak = 0;
  try {
    streak = getStudyStreak(context.learnerProfile) || 0;
  } catch {
    // compute locally
    if (context.sessions && context.sessions.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let currentDay = new Date(today);
      streak = 0;
      const sessionDates = context.sessions
        .map((s) => {
          const d = new Date(s.timestamp || s.date || 0);
          d.setHours(0, 0, 0, 0);
          return d.getTime();
        })
        .sort((a, b) => b - a);
      const uniqueDates = [...new Set(sessionDates)];
      for (const dateTs of uniqueDates) {
        if (dateTs === currentDay.getTime()) {
          streak++;
          currentDay.setDate(currentDay.getDate() - 1);
        } else {
          break;
        }
      }
    }
  }

  // --- Learning velocity ---
  let velocity = 0;
  try {
    velocity = calculateLearningVelocity(context.learnerProfile || context.sessions) || 0;
    velocity = parseFloat(velocity.toFixed(1));
  } catch {
    // Compute locally: topics per week
    if (totalTopics > 0 && context.sessions && context.sessions.length > 1) {
      const timestamps = context.sessions.map((s) => s.timestamp || s.date || 0).filter(Boolean);
      if (timestamps.length > 1) {
        const rangeMs = Math.max(...timestamps) - Math.min(...timestamps);
        const weeks = rangeMs / (7 * 24 * 60 * 60 * 1000) || 1;
        velocity = parseFloat((totalTopics / weeks).toFixed(1));
      }
    }
  }

  // --- Stagnation ---
  let stagnation = null;
  try {
    stagnation = detectStagnation(context.learnerProfile || context.sessions);
  } catch {
    // simple heuristic: if last 5 scores are within 5% of each other
    if (perTopic.length >= 5) {
      const recent = perTopic.slice(-5).map((t) => t.avg);
      const range = Math.max(...recent) - Math.min(...recent);
      stagnation = { isStagnating: range < 5 };
    }
  }

  // --- Cache stats ---
  let cacheStats = null;
  try {
    cacheStats = getCacheStats(context.cache);
  } catch {
    if (context.cache) {
      cacheStats = {
        size: context.cache.size ?? Object.keys(context.cache).length ?? 0,
        hits: context.cache._hits ?? null,
        total: context.cache._total ?? null,
      };
    }
  }

  // --- Assemble dashboard ---
  const perf = performanceLabel(avgScore);

  const dashboardHtml = `
    <div class="analytics-dashboard">
      <div class="dashboard-header">
        <h3>📊 Learning Analytics Dashboard</h3>
        <p class="performance-summary">
          Overall Performance: <strong style="color: ${perf.colour};">${perf.emoji} ${perf.label}</strong>
        </p>
      </div>

      ${buildStatsGrid(totalTopics, totalSessions, avgScore, streak, velocity)}

      <div class="areas-container">
        ${buildAreaList('Areas to Improve', '⚠️', weakList, '#ef4444')}
        ${buildAreaList('Strengths', '✅', strongList, '#22c55e')}
      </div>

      ${buildCacheSection(cacheStats)}
      ${buildRecommendations(weakList, stagnation, avgScore)}
    </div>`;

  const elapsed = (performance.now() - startTime).toFixed(1);

  return {
    response: dashboardHtml,
    metadata: {
      agent: AGENT_NAME,
      intent: 'analytics',
      cached: false,
      confidence: totalTopics > 0 ? 95 : 50,
      tokensUsed: context?.agentTokens?.analyst ?? 0,
      timestamp: Date.now(),
      processingTime: parseFloat(elapsed),
      totalTopics,
      totalSessions,
      avgScore,
      streak,
      velocity,
      weakAreaCount: weakList.length,
      strongAreaCount: strongList.length,
      stagnation: stagnation?.isStagnating ?? false,
    },
  };
}
