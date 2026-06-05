/**
 * @module reviewer
 * @description Reviewer Agent — evaluates response quality, validates KB coverage, suggests next topics.
 */

import { knowledgeBase, searchTopics } from '../data/knowledgeBase.js';
import { getRelatedTopics } from '../data/knowledgeGraph.js';
import { extractTopics } from '../engine/nlp.js';

/**
 * @param {string} query
 * @param {object} context
 */
export async function process(query, context) {
  const startTime = Date.now();
  const messages = context.messages || [];
  const lastUser = [...messages].reverse().find(m => m.sender === 'user');
  let topic = lastUser ? extractTopics(lastUser.content || lastUser.text || query) : extractTopics(query);
  const searchResults = searchTopics(topic);
  const kbMatch = searchResults[0];
  const matchScore = kbMatch ? kbMatch._score : 0;

  let confidence, label, labelColor;
  if (matchScore >= 8) { confidence = 90 + Math.min(10, matchScore - 8); label = 'Verified ✅'; labelColor = 'var(--success)'; }
  else if (matchScore >= 4) { confidence = 60 + Math.min(30, (matchScore - 4) * 5); label = 'Good ⚡'; labelColor = 'var(--warning)'; }
  else if (matchScore > 0) { confidence = 30 + matchScore * 7; label = 'Needs Review ⚠️'; labelColor = 'var(--warning)'; }
  else { confidence = 20; label = 'Low Confidence ❌'; labelColor = 'var(--danger)'; }

  let html = `<div class="research-section"><h3>✅ Response Review</h3>`;
  html += `<div style="background:var(--bg-card);padding:16px;border-radius:12px;margin-bottom:12px;">`;
  html += `<div style="display:flex;justify-content:space-between;margin-bottom:8px;"><span>Confidence</span><span style="color:${labelColor};font-weight:600;">${label} — ${Math.round(confidence)}%</span></div>`;
  html += `<div style="background:var(--glass);border-radius:4px;height:8px;overflow:hidden;"><div style="width:${confidence}%;height:100%;background:${labelColor};border-radius:4px;"></div></div></div>`;

  if (kbMatch) {
    html += `<div style="margin-bottom:12px;"><strong style="color:var(--accent-cyan);">📋 Coverage</strong></div>`;
    html += `<div style="background:rgba(56,189,248,0.08);padding:12px;border-radius:8px;margin-bottom:12px;">`;
    html += `<div>Topic: <strong>${kbMatch.title}</strong></div>`;
    html += `<div>${kbMatch.category} → ${kbMatch.subcategory}</div>`;
    kbMatch.keyConcepts.forEach(kc => { html += `<div style="margin-left:12px;color:var(--text-secondary);">• ${kc.term} ✓</div>`; });
    html += `</div>`;

    const related = getRelatedTopics(kbMatch.id);
    if (related.length > 0) {
      html += `<strong style="color:var(--accent-purple);">🔗 Explore Next</strong><br/>`;
      html += `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:6px;">`;
      related.slice(0, 5).forEach(rId => {
        const n = knowledgeBase.find(k => k.id === rId);
        if (n) html += `<span style="background:var(--glass);padding:4px 10px;border-radius:20px;font-size:0.85em;border:1px solid var(--glass-border);">${n.title}</span>`;
      });
      html += `</div>`;
    }
  } else {
    html += `<p style="color:var(--text-secondary);">No matching topic found for review. Try asking about a specific subject!</p>`;
  }
  html += `</div>`;

  return {
    response: html,
    metadata: { agent: 'reviewer', intent: 'review', cached: false, confidence: confidence / 100, tokensUsed: 0, timestamp: Date.now(), processingTime: Date.now() - startTime }
  };
}
