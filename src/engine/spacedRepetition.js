/**
 * @fileoverview NEXUS Spaced Repetition Engine
 * Implements the SM-2 algorithm and Ebbinghaus forgetting curve for optimal
 * review scheduling. All computation is local — no external dependencies.
 * @module engine/spacedRepetition
 */

// ─── Constants ───────────────────────────────────────────────────────────────

/** Minimum ease factor — prevents intervals from collapsing too aggressively. */
const MIN_EASE_FACTOR = 1.3;

/** Default ease factor for new topics (SM-2 standard). */
const DEFAULT_EASE_FACTOR = 2.5;

/** Retention threshold — topics below this are considered "due". */
const RETENTION_THRESHOLD = 0.7;

/** Milliseconds in one day. */
const MS_PER_DAY = 86_400_000;

// ─── Ebbinghaus Forgetting Curve ─────────────────────────────────────────────

/**
 * Calculate current memory retention using the Ebbinghaus forgetting curve.
 *
 * Formula: R = e^(-t / S)
 *   where t = elapsed time (days), S = stability (days).
 *
 * @param {string|number|Date} lastReviewDate — When the topic was last reviewed.
 *   Accepts ISO string, epoch ms, or Date object.
 * @param {number} stability — Memory stability in days (higher = slower decay).
 *   Must be > 0; defaults to 1 if invalid.
 * @returns {number} Retention probability in [0, 1].
 *   1 = perfect recall, 0 = fully forgotten.
 * @example
 * // Reviewed 3 days ago with stability of 10 days
 * calculateRetention('2026-06-04T10:00:00Z', 10) // ~0.7408
 */
export function calculateRetention(lastReviewDate, stability) {
  if (!lastReviewDate) return 0;

  const lastReview = new Date(lastReviewDate).getTime();
  if (isNaN(lastReview)) return 0;

  const now = Date.now();
  const elapsedDays = Math.max(0, (now - lastReview) / MS_PER_DAY);
  const safeStability = stability > 0 ? stability : 1;

  const retention = Math.exp(-elapsedDays / safeStability);
  return parseFloat(retention.toFixed(6));
}

// ─── SM-2 Algorithm ──────────────────────────────────────────────────────────

/**
 * Update a topic's scheduling data after a review using the SM-2 algorithm.
 *
 * SM-2 rules:
 *  - EF' = EF + (0.1 - (5 - q) × (0.08 + (5 - q) × 0.02))
 *  - EF is clamped to a minimum of 1.3
 *  - If quality < 3: reset repetitions to 0, interval to 1
 *  - Interval progression: I(1)=1, I(2)=6, I(n)=I(n-1)×EF
 *
 * @param {Object} topicData — Current state of the topic.
 * @param {number} [topicData.easeFactor=2.5] — Current ease factor.
 * @param {number} [topicData.interval=0] — Current interval in days.
 * @param {number} [topicData.repetitions=0] — Successful repetition count.
 * @param {string|null} [topicData.lastReviewDate=null] — ISO date of last review.
 * @param {number} quality — Review quality score, 0 (blackout) to 5 (perfect).
 * @returns {Object} Updated topic data with new EF, interval, repetitions,
 *   lastReviewDate, and nextReviewDate.
 * @example
 * const topic = { easeFactor: 2.5, interval: 1, repetitions: 1 };
 * updateAfterReview(topic, 4);
 * // { easeFactor: 2.5, interval: 6, repetitions: 2, ... }
 */
export function updateAfterReview(topicData, quality) {
  const q = Math.max(0, Math.min(5, Math.round(quality)));

  let ef = topicData.easeFactor ?? DEFAULT_EASE_FACTOR;
  let interval = topicData.interval ?? 0;
  let repetitions = topicData.repetitions ?? 0;

  // Update ease factor
  const efDelta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
  ef = Math.max(MIN_EASE_FACTOR, ef + efDelta);

  if (q < 3) {
    // Failed recall — reset to beginning
    repetitions = 0;
    interval = 1;
  } else {
    // Successful recall — advance interval
    repetitions += 1;

    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * ef);
    }
  }

  const now = new Date();
  const nextReview = new Date(now.getTime() + interval * MS_PER_DAY);

  return {
    ...topicData,
    easeFactor: parseFloat(ef.toFixed(4)),
    interval,
    repetitions,
    lastReviewDate: now.toISOString(),
    nextReviewDate: nextReview.toISOString()
  };
}

/**
 * Calculate the optimal next review date for a topic.
 *
 * Uses the existing interval from SM-2 scheduling. If no interval is set,
 * defaults to reviewing in 1 day.
 *
 * @param {Object} topicData — Topic scheduling state.
 * @param {string|null} [topicData.lastReviewDate] — ISO date of last review.
 * @param {number} [topicData.interval=1] — Interval in days until next review.
 * @returns {{ nextReviewDate: string, daysUntilReview: number, isOverdue: boolean }}
 * @example
 * getNextReviewDate({ lastReviewDate: '2026-06-06T10:00:00Z', interval: 3 })
 * // { nextReviewDate: '2026-06-09T10:00:00Z', daysUntilReview: 2, isOverdue: false }
 */
export function getNextReviewDate(topicData) {
  const interval = topicData.interval ?? 1;
  const lastReview = topicData.lastReviewDate
    ? new Date(topicData.lastReviewDate).getTime()
    : Date.now();

  if (isNaN(lastReview)) {
    const fallback = new Date(Date.now() + MS_PER_DAY);
    return {
      nextReviewDate: fallback.toISOString(),
      daysUntilReview: 1,
      isOverdue: false
    };
  }

  const nextReviewMs = lastReview + interval * MS_PER_DAY;
  const now = Date.now();
  const daysUntilReview = parseFloat(((nextReviewMs - now) / MS_PER_DAY).toFixed(2));

  return {
    nextReviewDate: new Date(nextReviewMs).toISOString(),
    daysUntilReview,
    isOverdue: daysUntilReview < 0
  };
}

// ─── Due Topics ──────────────────────────────────────────────────────────────

/**
 * Filter a list of topics to find those due for review.
 *
 * A topic is "due" when its current retention (Ebbinghaus curve) falls
 * below the threshold of 0.7.
 *
 * @param {Object[]} topics — Array of topic objects.
 * @param {string} topics[].lastReviewDate — ISO date of last review.
 * @param {number} topics[].interval — Current SM-2 interval (used as stability).
 * @returns {Object[]} Topics with retention < 0.7, sorted by retention ascending
 *   (most forgotten first). Each result includes a `retention` property.
 * @example
 * const topics = [
 *   { name: 'Calculus', lastReviewDate: '2026-06-01', interval: 3 },
 *   { name: 'Physics',  lastReviewDate: '2026-06-07', interval: 10 }
 * ];
 * getDueTopics(topics); // [{ name: 'Calculus', ..., retention: 0.13 }]
 */
export function getDueTopics(topics) {
  if (!Array.isArray(topics)) return [];

  const due = [];

  for (const topic of topics) {
    const stability = topic.interval || 1;
    const retention = calculateRetention(topic.lastReviewDate, stability);

    if (retention < RETENTION_THRESHOLD) {
      due.push({ ...topic, retention });
    }
  }

  // Most forgotten first
  due.sort((a, b) => a.retention - b.retention);

  return due;
}

// ─── Learning Analytics ──────────────────────────────────────────────────────

/**
 * Calculate learning velocity — topics learned per time period.
 *
 * Velocity = unique topics reviewed in last 7 days / 7.
 * Also computes a 30-day average for comparison.
 *
 * @param {Object[]} sessions — Array of study session records.
 * @param {string} sessions[].date — ISO date string of the session.
 * @param {string} sessions[].topic — Topic studied.
 * @returns {{ daily: number, weekly: number, monthly: number, trend: string }}
 *   daily   — Average unique topics per day (last 7 days).
 *   weekly  — Total unique topics in the last 7 days.
 *   monthly — Total unique topics in the last 30 days.
 *   trend   — 'improving' | 'stable' | 'declining'.
 * @example
 * calculateLearningVelocity([
 *   { date: '2026-06-07', topic: 'Physics' },
 *   { date: '2026-06-06', topic: 'Math' },
 * ])
 */
export function calculateLearningVelocity(sessions) {
  if (!Array.isArray(sessions) || sessions.length === 0) {
    return { daily: 0, weekly: 0, monthly: 0, trend: 'stable' };
  }

  const now = Date.now();
  const weekAgo = now - 7 * MS_PER_DAY;
  const twoWeeksAgo = now - 14 * MS_PER_DAY;
  const monthAgo = now - 30 * MS_PER_DAY;

  const weekTopics = new Set();
  const prevWeekTopics = new Set();
  const monthTopics = new Set();

  for (const session of sessions) {
    const sessionTime = new Date(session.date).getTime();
    if (isNaN(sessionTime)) continue;

    if (sessionTime >= weekAgo) {
      weekTopics.add(session.topic);
    } else if (sessionTime >= twoWeeksAgo) {
      prevWeekTopics.add(session.topic);
    }

    if (sessionTime >= monthAgo) {
      monthTopics.add(session.topic);
    }
  }

  const weekly = weekTopics.size;
  const prevWeekly = prevWeekTopics.size;
  const daily = parseFloat((weekly / 7).toFixed(2));
  const monthly = monthTopics.size;

  let trend = 'stable';
  if (weekly > prevWeekly * 1.2) {
    trend = 'improving';
  } else if (weekly < prevWeekly * 0.8) {
    trend = 'declining';
  }

  return { daily, weekly, monthly, trend };
}

/**
 * Detect if learning has stalled based on recent session history.
 *
 * Stagnation signals:
 *  - No sessions in the last 3 days.
 *  - Scores plateauing (std deviation < 5 over last 10 sessions).
 *  - Velocity declining.
 *
 * @param {Object[]} sessions — Array of study session records.
 * @param {string} sessions[].date — ISO date string.
 * @param {number} sessions[].score — Score achieved (0-100).
 * @param {string} sessions[].topic — Topic studied.
 * @returns {{ isStagnant: boolean, reasons: string[], daysSinceLastSession: number }}
 * @example
 * detectStagnation([]) // { isStagnant: true, reasons: ['No study sessions recorded'], ... }
 */
export function detectStagnation(sessions) {
  if (!Array.isArray(sessions) || sessions.length === 0) {
    return {
      isStagnant: true,
      reasons: ['No study sessions recorded'],
      daysSinceLastSession: Infinity
    };
  }

  const reasons = [];
  const now = Date.now();

  // Find most recent session
  let latestTime = 0;
  for (const session of sessions) {
    const t = new Date(session.date).getTime();
    if (!isNaN(t) && t > latestTime) latestTime = t;
  }

  const daysSinceLastSession = latestTime > 0
    ? parseFloat(((now - latestTime) / MS_PER_DAY).toFixed(1))
    : Infinity;

  // Signal 1: No recent activity
  if (daysSinceLastSession > 3) {
    reasons.push(`No study activity for ${daysSinceLastSession} days`);
  }

  // Signal 2: Score plateau (last 10 sessions)
  const recentScores = sessions
    .filter(s => typeof s.score === 'number')
    .slice(-10)
    .map(s => s.score);

  if (recentScores.length >= 5) {
    const mean = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    const variance = recentScores.reduce((sum, s) => sum + (s - mean) ** 2, 0) / recentScores.length;
    const stdDev = Math.sqrt(variance);

    if (stdDev < 5) {
      reasons.push(`Scores plateauing (σ = ${stdDev.toFixed(1)}) over last ${recentScores.length} sessions`);
    }
  }

  // Signal 3: Velocity declining
  const velocity = calculateLearningVelocity(sessions);
  if (velocity.trend === 'declining') {
    reasons.push('Learning velocity is declining week-over-week');
  }

  return {
    isStagnant: reasons.length > 0,
    reasons,
    daysSinceLastSession
  };
}

/**
 * Suggest optimal study session duration based on past session performance.
 *
 * Analyzes score vs. duration correlation to find the sweet spot.
 * Falls back to the Pomodoro standard (25 min) if insufficient data.
 *
 * @param {Object[]} [sessions=[]] — Array of study sessions.
 * @param {number} sessions[].duration — Duration in minutes.
 * @param {number} sessions[].score — Score achieved (0-100).
 * @returns {{ suggestedMinutes: number, confidence: string, reasoning: string }}
 * @example
 * getOptimalStudyTime([
 *   { duration: 20, score: 60 },
 *   { duration: 30, score: 85 },
 *   { duration: 45, score: 80 },
 * ])
 * // { suggestedMinutes: 30, confidence: 'medium', reasoning: '...' }
 */
export function getOptimalStudyTime(sessions = []) {
  const validSessions = sessions.filter(
    s => typeof s.duration === 'number' && typeof s.score === 'number'
      && s.duration > 0 && s.score >= 0
  );

  if (validSessions.length < 5) {
    return {
      suggestedMinutes: 25,
      confidence: 'low',
      reasoning: 'Insufficient data — defaulting to Pomodoro standard (25 min). ' +
        `Need at least 5 sessions, currently have ${validSessions.length}.`
    };
  }

  // Bucket sessions by duration range and find the range with highest avg score
  const buckets = {
    short: { range: '10-20 min', sessions: [], min: 10, max: 20 },
    medium: { range: '20-35 min', sessions: [], min: 20, max: 35 },
    long: { range: '35-50 min', sessions: [], min: 35, max: 50 },
    extended: { range: '50+ min', sessions: [], min: 50, max: Infinity }
  };

  for (const s of validSessions) {
    if (s.duration < 20) buckets.short.sessions.push(s);
    else if (s.duration < 35) buckets.medium.sessions.push(s);
    else if (s.duration < 50) buckets.long.sessions.push(s);
    else buckets.extended.sessions.push(s);
  }

  let bestBucket = null;
  let bestAvg = -1;

  for (const [, bucket] of Object.entries(buckets)) {
    if (bucket.sessions.length >= 2) {
      const avg = bucket.sessions.reduce((sum, s) => sum + s.score, 0) / bucket.sessions.length;
      if (avg > bestAvg) {
        bestAvg = avg;
        bestBucket = bucket;
      }
    }
  }

  if (!bestBucket) {
    return {
      suggestedMinutes: 25,
      confidence: 'low',
      reasoning: 'Sessions too scattered across durations for reliable analysis.'
    };
  }

  // Pick the median duration from the best bucket
  const durations = bestBucket.sessions.map(s => s.duration).sort((a, b) => a - b);
  const medianDuration = durations[Math.floor(durations.length / 2)];

  const confidence = bestBucket.sessions.length >= 8 ? 'high'
    : bestBucket.sessions.length >= 4 ? 'medium'
    : 'low';

  return {
    suggestedMinutes: Math.round(medianDuration / 5) * 5, // Round to nearest 5 min
    confidence,
    reasoning: `Best performance (avg score ${bestAvg.toFixed(1)}) observed in ` +
      `${bestBucket.range} sessions (n=${bestBucket.sessions.length}).`
  };
}
