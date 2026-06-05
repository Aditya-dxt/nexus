/**
 * @module mentor
 * @description Mentor Agent — provides motivational messages, study tips, daily goals, and streak tracking.
 */

import { mentorMessages } from '../data/mentorMessages.js';
import { loadProfile, getWeakAreas, getStudyStreak } from '../engine/learnerProfile.js';

/**
 * @param {string} query
 * @param {object} context
 */
export async function process(query, context) {
  const startTime = Date.now();
  const profile = loadProfile();
  const streak = getStudyStreak(profile);
  const weakAreas = getWeakAreas(profile);
  const q = query.toLowerCase();

  let html = `<div class="research-section">`;

  if (q.includes('goal') || q.includes('daily')) {
    html += `<h3>🎯 Your Daily Goals</h3>`;
    const goals = pick(mentorMessages.dailyGoals || [], 3);
    goals.forEach((g, i) => {
      html += `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:rgba(124,111,255,0.08);border-radius:8px;margin-bottom:8px;">`;
      html += `<span style="width:24px;height:24px;border-radius:50%;border:2px solid var(--accent-purple);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;">${i + 1}</span>`;
      html += `<span>${g}</span></div>`;
    });
    if (weakAreas.length > 0) {
      html += `<div style="background:rgba(245,158,11,0.1);padding:12px;border-radius:8px;margin-top:12px;">`;
      html += `<strong style="color:var(--warning);">⚡ Focus:</strong> ${weakAreas[0]?.topic || weakAreas[0]?.category || 'Review weak topics'}</div>`;
    }
  } else if (q.includes('tip') || q.includes('advice') || q.includes('how to study')) {
    html += `<h3>💡 Study Tips</h3>`;
    pick(mentorMessages.studyTips || [], 4).forEach(t => {
      html += `<div style="padding:10px 14px;border-left:3px solid var(--accent-cyan);margin-bottom:8px;background:rgba(56,189,248,0.05);border-radius:0 8px 8px 0;">${t}</div>`;
    });
  } else if (q.includes('motivat') || q.includes('encourage') || q.includes('stuck') || q.includes('overwhelm') || q.includes('help')) {
    html += `<h3>💪 You've Got This!</h3>`;
    const msg = rand(mentorMessages.encouragement || ['Keep going! You\'re doing great!']);
    html += `<div style="font-size:1.1em;padding:16px;background:linear-gradient(135deg,rgba(124,111,255,0.1),rgba(56,189,248,0.1));border-radius:12px;margin-bottom:12px;text-align:center;">`;
    html += `<p style="font-size:1.2em;margin-bottom:8px;">${msg}</p></div>`;
    const extra = rand(mentorMessages.encouragement || []);
    if (extra && extra !== msg) html += `<p style="color:var(--text-secondary);font-style:italic;text-align:center;">${extra}</p>`;
  } else {
    const greeting = rand(mentorMessages.greetings || ['Hello, scholar! 🌟']);
    html += `<h3>🎯 Mentor Check-In</h3>`;
    html += `<p style="font-size:1.1em;margin-bottom:16px;">${greeting}</p>`;
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;">`;
    html += `<div style="background:rgba(124,111,255,0.1);padding:12px;border-radius:8px;text-align:center;"><div style="font-size:1.5em;font-weight:700;">${streak.current}</div><div style="font-size:0.85em;opacity:0.7;">Day Streak 🔥</div></div>`;
    html += `<div style="background:rgba(34,197,94,0.1);padding:12px;border-radius:8px;text-align:center;"><div style="font-size:1.5em;font-weight:700;">${profile.totalSessions || 0}</div><div style="font-size:0.85em;opacity:0.7;">Sessions</div></div></div>`;
    if (streak.current > 0) {
      const sm = mentorMessages.streakMessages || {};
      const key = Object.keys(sm).map(Number).sort((a, b) => b - a).find(k => streak.current >= k);
      if (key && sm[key]) html += `<div style="background:rgba(245,158,11,0.1);padding:10px;border-radius:8px;margin-bottom:12px;text-align:center;">${sm[key]}</div>`;
    }
    const tip = rand(mentorMessages.studyTips || ['Try studying a new topic today!']);
    html += `<div style="border-left:3px solid var(--accent-cyan);padding-left:12px;margin-top:12px;"><strong>💡 Suggestion:</strong> ${tip}</div>`;
  }

  html += `</div>`;
  return {
    response: html,
    metadata: { agent: 'mentor', intent: 'mentor', cached: false, confidence: 0.95, tokensUsed: 0, timestamp: Date.now(), processingTime: Date.now() - startTime }
  };
}

function rand(arr) { return arr.length ? arr[Math.floor(Math.random() * arr.length)] : ''; }
function pick(arr, n) { return [...arr].sort(() => Math.random() - 0.5).slice(0, n); }
