/**
 * @module memory
 * @description Memory Agent — manages interaction history and learner profile data.
 */

import { loadProfile, getStudyStreak, getStudyHistory } from '../engine/learnerProfile.js';

/**
 * @param {string} query
 * @param {object} context
 */
export async function process(query, context) {
  const startTime = Date.now();
  const profile = loadProfile();
  const streak = getStudyStreak(profile);

  let html = `<div class="research-section"><h3>🧬 Learning Memory</h3>`;

  html += `<div style="background:rgba(139,92,246,0.1);padding:12px;border-radius:8px;margin-bottom:12px;">`;
  html += `<strong>📋 Learner Profile</strong><br/>`;
  html += `• Total Sessions: <strong>${profile.totalSessions || 0}</strong><br/>`;
  html += `• Study Streak: <strong>${streak.current} days</strong> (Best: ${streak.best} days)<br/>`;
  html += `• Topics Explored: <strong>${(profile.topicHistory || []).length}</strong><br/>`;
  html += `• Total Study Time: <strong>${Math.round((profile.totalStudyTime || 0) / 60)} min</strong></div>`;

  const interactions = (profile.interactions || []).slice(-15).reverse();
  if (interactions.length > 0) {
    html += `<strong style="color:var(--accent-cyan);">📝 Recent Interactions</strong><br/>`;
    interactions.forEach(i => {
      const ago = timeAgo(i.timestamp);
      html += `<div style="border-left:2px solid var(--glass-border);padding-left:12px;margin:8px 0;">`;
      html += `<span style="opacity:0.6;font-size:0.85em;">${ago} • ${i.agent || 'system'}</span><br/>`;
      html += `<span style="color:var(--text-secondary);">${i.query || 'interaction'}</span></div>`;
    });
  } else {
    const topicHistory = (profile.topicHistory || []).slice(-10).reverse();
    if (topicHistory.length > 0) {
      html += `<strong style="color:var(--accent-cyan);">📚 Study History</strong><br/>`;
      topicHistory.forEach(e => {
        const ago = timeAgo(e.date);
        const sc = (e.score || 0) >= 70 ? 'var(--success)' : 'var(--warning)';
        html += `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--glass-border);">`;
        html += `<span>${e.topic}</span><span style="color:${sc}">${e.score ? e.score + '%' : '—'} • ${ago}</span></div>`;
      });
    } else {
      html += `<p style="color:var(--text-secondary);">No study history yet. Start exploring topics to build your memory!</p>`;
    }
  }

  const skills = profile.skills || {};
  if (Object.keys(skills).length > 0) {
    html += `<br/><strong style="color:var(--accent-purple);">🎯 Skills</strong><br/>`;
    Object.entries(skills).forEach(([cat, data]) => {
      const lvl = Math.min(100, data.level || 0);
      const clr = lvl >= 70 ? 'var(--success)' : lvl >= 40 ? 'var(--warning)' : 'var(--danger)';
      html += `<div style="margin:6px 0;"><div style="display:flex;justify-content:space-between;"><span>${cat}</span><span>${Math.round(lvl)}%</span></div>`;
      html += `<div style="background:var(--glass);border-radius:4px;height:6px;overflow:hidden;"><div style="width:${lvl}%;height:100%;background:${clr};border-radius:4px;"></div></div></div>`;
    });
  }

  html += `</div>`;
  return {
    response: html,
    metadata: { agent: 'memory', intent: 'memory', cached: false, confidence: 0.9, tokensUsed: 0, timestamp: Date.now(), processingTime: Date.now() - startTime }
  };
}

function timeAgo(ts) {
  if (!ts) return 'unknown';
  const s = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s/60)}m ago`;
  if (s < 86400) return `${Math.floor(s/3600)}h ago`;
  return `${Math.floor(s/86400)}d ago`;
}
