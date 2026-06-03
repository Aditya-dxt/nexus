/**
 * @fileoverview NEXUS Learner Profile Engine
 * Manages learner profiles with localStorage persistence, study session tracking,
 * skill-level calculation, streaks, goals, and heatmap data generation.
 * All computation is local — no external APIs.
 * @module engine/learnerProfile
 */

// ─── Constants ───────────────────────────────────────────────────────────────

/** localStorage key for the learner profile. */
const STORAGE_KEY = 'nexus_learner_profile';

/** Milliseconds in one day. */
const MS_PER_DAY = 86_400_000;

/**
 * Get local date string in YYYY-MM-DD format, avoiding UTC offset bugs.
 * @param {Date} [date] 
 * @returns {string}
 */
function getLocalDateStr(date = new Date()) {
  const offsetMs = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offsetMs).toISOString().split('T')[0];
}

// ─── Profile Factory ─────────────────────────────────────────────────────────

/**
 * Create a default learner profile with empty history and sensible defaults.
 *
 * @returns {Object} A fresh learner profile.
 */
function createDefaultProfile() {
  return {
    id: 'learner_001',
    createdAt: new Date().toISOString(),
    totalSessions: 0,
    totalStudyTime: 0,
    streak: { current: 0, best: 0, lastDate: null },
    skills: {},           // category → { level, sessions, avgScore }
    topicHistory: [],     // { topic, category, score, duration, date }
    goals: [],            // { id, text, status, createdAt, completedAt }
    preferences: { dailyGoal: 30, focusAreas: [] },
    interactions: []      // { query, response, agent, timestamp }
  };
}

// ─── Persistence ──────────────────────────────────────────────────────────────

/**
 * Load the learner profile from localStorage.
 *
 * Returns the stored profile if found and valid JSON, otherwise creates
 * and returns a fresh default profile.
 *
 * @returns {Object} The learner profile.
 * @example
 * const profile = loadProfile();
 * console.log(profile.totalSessions);
 */
export function loadProfile() {
  try {
    if (typeof localStorage === 'undefined') {
      return createDefaultProfile();
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle schema migrations gracefully
      return { ...createDefaultProfile(), ...parsed };
    }
  } catch {
    // Corrupted data — start fresh
  }

  return createDefaultProfile();
}

/**
 * Save the learner profile to localStorage.
 *
 * @param {Object} profile — The profile object to persist.
 * @returns {boolean} `true` if saved successfully, `false` on error.
 * @example
 * saveProfile(profile); // persists to localStorage
 */
export function saveProfile(profile) {
  try {
    if (typeof localStorage === 'undefined') {
      return false;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    return true;
  } catch {
    return false;
  }
}

// ─── Study Sessions ──────────────────────────────────────────────────────────

/**
 * Record a study session in the learner profile.
 *
 * Updates aggregate counters, per-category skill data, topic history,
 * and streak tracking.
 *
 * @param {Object} profile — The learner profile (mutated in place).
 * @param {string} topic — The topic studied.
 * @param {number} duration — Session duration in minutes.
 * @param {number} score — Score achieved (0-100).
 * @param {string} [category='general'] — Subject category for skill tracking.
 * @returns {Object} The updated profile.
 * @example
 * const profile = loadProfile();
 * addStudySession(profile, 'Photosynthesis', 25, 85, 'biology');
 * saveProfile(profile);
 */
export function addStudySession(profile, topic, duration, score, category = 'general') {
  const now = new Date();
  const dateStr = getLocalDateStr(now); // YYYY-MM-DD

  // Update aggregates
  profile.totalSessions = (profile.totalSessions || 0) + 1;
  profile.totalStudyTime = (profile.totalStudyTime || 0) + duration;

  // Update topic history
  if (!Array.isArray(profile.topicHistory)) {
    profile.topicHistory = [];
  }
  profile.topicHistory.push({
    topic,
    category,
    score,
    duration,
    date: now.toISOString()
  });

  // Update skill for category
  if (!profile.skills) profile.skills = {};
  if (!profile.skills[category]) {
    profile.skills[category] = { level: 0, sessions: 0, avgScore: 0 };
  }

  const skill = profile.skills[category];
  const totalScore = skill.avgScore * skill.sessions + score;
  skill.sessions += 1;
  skill.avgScore = parseFloat((totalScore / skill.sessions).toFixed(2));
  // Level: weighted average score clamped to 0-100
  skill.level = Math.min(100, Math.round(skill.avgScore));

  // Update streak
  if (!profile.streak) {
    profile.streak = { current: 0, best: 0, lastDate: null };
  }

  _updateStreak(profile.streak, dateStr);

  return profile;
}

/**
 * Internal helper to update the study streak.
 * @param {Object} streak — The streak sub-object.
 * @param {string} todayStr — Today's date as YYYY-MM-DD.
 * @private
 */
function _updateStreak(streak, todayStr) {
  if (!streak.lastDate) {
    // First ever session
    streak.current = 1;
    streak.best = 1;
    streak.lastDate = todayStr;
    return;
  }

  if (streak.lastDate === todayStr) {
    // Already studied today — no change to streak
    return;
  }

  const lastDate = new Date(streak.lastDate + 'T00:00:00');
  const today = new Date(todayStr + 'T00:00:00');
  const daysDiff = Math.round((today.getTime() - lastDate.getTime()) / MS_PER_DAY);

  if (daysDiff === 1) {
    // Consecutive day — extend streak
    streak.current += 1;
  } else if (daysDiff > 1) {
    // Gap — reset streak
    streak.current = 1;
  }
  // daysDiff <= 0 shouldn't happen but is safe (no-op)

  streak.best = Math.max(streak.best, streak.current);
  streak.lastDate = todayStr;
}

// ─── Skill Analysis ──────────────────────────────────────────────────────────

/**
 * Get the skill level for a specific category.
 *
 * @param {Object} profile — The learner profile.
 * @param {string} category — The category to look up.
 * @returns {number} Skill level 0-100, or 0 if no data.
 * @example
 * getSkillLevel(profile, 'mathematics') // 78
 */
export function getSkillLevel(profile, category) {
  if (!profile.skills || !profile.skills[category]) return 0;
  return profile.skills[category].level;
}

/**
 * Get weak areas — categories where the learner scores below 50
 * or has very few sessions.
 *
 * @param {Object} profile — The learner profile.
 * @returns {Array<{ category: string, level: number, sessions: number, avgScore: number }>}
 *   Sorted by level ascending (weakest first).
 * @example
 * getWeakAreas(profile)
 * // [{ category: 'calculus', level: 35, sessions: 3, avgScore: 35.2 }]
 */
export function getWeakAreas(profile) {
  if (!profile.skills) return [];

  return Object.entries(profile.skills)
    .filter(([, data]) => data.level < 50)
    .map(([category, data]) => ({ category, ...data }))
    .sort((a, b) => a.level - b.level);
}

/**
 * Get strong areas — categories where the learner scores 70 or above
 * with at least 3 sessions.
 *
 * @param {Object} profile — The learner profile.
 * @returns {Array<{ category: string, level: number, sessions: number, avgScore: number }>}
 *   Sorted by level descending (strongest first).
 * @example
 * getStrongAreas(profile)
 * // [{ category: 'physics', level: 92, sessions: 12, avgScore: 91.5 }]
 */
export function getStrongAreas(profile) {
  if (!profile.skills) return [];

  return Object.entries(profile.skills)
    .filter(([, data]) => data.level >= 70 && data.sessions >= 3)
    .map(([category, data]) => ({ category, ...data }))
    .sort((a, b) => b.level - a.level);
}

// ─── Streak ──────────────────────────────────────────────────────────────────

/**
 * Get the current and best study streak.
 *
 * Recalculates the current streak against today's date to handle the case
 * where the user hasn't studied today yet but the streak is still valid.
 *
 * @param {Object} profile — The learner profile.
 * @returns {{ current: number, best: number, lastDate: string|null }}
 * @example
 * getStudyStreak(profile) // { current: 5, best: 12, lastDate: '2026-06-07' }
 */
export function getStudyStreak(profile) {
  const streak = profile.streak || { current: 0, best: 0, lastDate: null };

  if (!streak.lastDate) {
    return { current: 0, best: streak.best || 0, lastDate: null };
  }

  // Check if streak is still alive (last session was today or yesterday)
  const today = new Date();
  const todayStr = getLocalDateStr(today);
  const lastDate = new Date(streak.lastDate + 'T00:00:00');
  const daysDiff = Math.round((new Date(todayStr + 'T00:00:00').getTime() - lastDate.getTime()) / MS_PER_DAY);

  if (daysDiff > 1) {
    // Streak is broken (missed more than 1 day)
    return { current: 0, best: streak.best, lastDate: streak.lastDate };
  }

  return {
    current: streak.current,
    best: streak.best,
    lastDate: streak.lastDate
  };
}

// ─── Goals ───────────────────────────────────────────────────────────────────

/**
 * Add a learning goal to the profile.
 *
 * @param {Object} profile — The learner profile (mutated in place).
 * @param {string} goal — The goal text.
 * @returns {Object} The newly created goal object.
 * @example
 * const goal = addGoal(profile, 'Complete linear algebra by July');
 * // { id: 'goal_1686...',  text: '...', status: 'active', ... }
 */
export function addGoal(profile, goal) {
  if (!Array.isArray(profile.goals)) {
    profile.goals = [];
  }

  const newGoal = {
    id: `goal_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    text: goal,
    status: 'active',
    createdAt: new Date().toISOString(),
    completedAt: null
  };

  profile.goals.push(newGoal);
  return newGoal;
}

/**
 * Update the status of an existing goal.
 *
 * @param {Object} profile — The learner profile.
 * @param {string} goalId — The ID of the goal to update.
 * @param {string} status — New status: 'active', 'completed', 'paused', or 'abandoned'.
 * @returns {Object|null} The updated goal, or `null` if not found.
 * @example
 * updateGoal(profile, 'goal_168600000_abc123', 'completed');
 */
export function updateGoal(profile, goalId, status) {
  if (!Array.isArray(profile.goals)) return null;

  const goal = profile.goals.find(g => g.id === goalId);
  if (!goal) return null;

  goal.status = status;

  if (status === 'completed') {
    goal.completedAt = new Date().toISOString();
  }

  return goal;
}

// ─── Study History ───────────────────────────────────────────────────────────

/**
 * Get study history for the last N days.
 *
 * @param {Object} profile — The learner profile.
 * @param {number} [days=7] — Number of days to look back.
 * @returns {Object[]} Filtered topic history entries within the window,
 *   sorted chronologically (oldest first).
 * @example
 * getStudyHistory(profile, 30) // last 30 days of sessions
 */
export function getStudyHistory(profile, days = 7) {
  if (!Array.isArray(profile.topicHistory)) return [];

  const cutoff = Date.now() - days * MS_PER_DAY;

  return profile.topicHistory
    .filter(entry => new Date(entry.date).getTime() >= cutoff)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// ─── Heatmap ─────────────────────────────────────────────────────────────────

/**
 * Generate 365-day heatmap data for visualizing study consistency.
 *
 * Returns one entry per day for the past 365 days, with `count` indicating
 * how many study sessions occurred on that day.
 *
 * @param {Object} profile — The learner profile.
 * @returns {Array<{ date: string, count: number }>} 365 entries,
 *   each with a YYYY-MM-DD date and session count.
 * @example
 * getHeatmapData(profile)
 * // [
 * //   { date: '2025-06-08', count: 0 },
 * //   ...
 * //   { date: '2026-06-07', count: 3 },
 * // ]
 */
export function getHeatmapData(profile) {
  // Build a date → count lookup from topic history
  /** @type {Record<string, number>} */
  const dateCounts = {};

  if (Array.isArray(profile.topicHistory)) {
    for (const entry of profile.topicHistory) {
      const dateStr = getLocalDateStr(new Date(entry.date));
      dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
    }
  }

  // Generate 365-day grid
  const heatmap = [];
  const todayStr = getLocalDateStr();
  const todayLocal = new Date(todayStr + 'T00:00:00');

  for (let i = 364; i >= 0; i--) {
    const date = new Date(todayLocal.getTime() - i * MS_PER_DAY);
    const dateStr = getLocalDateStr(date);

    heatmap.push({
      date: dateStr,
      count: dateCounts[dateStr] || 0
    });
  }

  return heatmap;
}
