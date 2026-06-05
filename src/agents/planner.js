/**
 * @module planner
 * @description Study Planner Agent — generates personalized multi-day study plans
 * by analyzing the knowledge graph, prerequisites, and learner weak areas.
 */

import { knowledgeBase, searchTopics } from '../data/knowledgeBase.js';
import { getPrerequisites, getRelatedTopics } from '../data/knowledgeGraph.js';
import { loadProfile, getWeakAreas } from '../engine/learnerProfile.js';

/**
 * Process a study plan request.
 * @param {string} query
 * @param {object} context
 * @returns {Promise<{response: string, metadata: object}>}
 */
export async function process(query, context) {
  const startTime = Date.now();
  const profile = loadProfile();
  const weakAreas = getWeakAreas(profile);

  let topicsToStudy = [];
  const cleaned = query.toLowerCase().replace(/plan|study|schedule|roadmap|create|make|for|me|a|the|my/gi, '').trim();
  const searchResults = searchTopics(cleaned);

  if (searchResults.length > 0) {
    const mainTopic = searchResults[0];
    const prereqs = getPrerequisites(mainTopic.id);
    prereqs.forEach(pId => {
      const t = knowledgeBase.find(k => k.id === pId);
      if (t && !topicsToStudy.find(x => x.id === t.id)) topicsToStudy.push(t);
    });
    if (!topicsToStudy.find(x => x.id === mainTopic.id)) topicsToStudy.push(mainTopic);
    const related = getRelatedTopics(mainTopic.id);
    related.forEach(rId => {
      const t = knowledgeBase.find(k => k.id === rId);
      if (t && !topicsToStudy.find(x => x.id === t.id) && topicsToStudy.length < 7) topicsToStudy.push(t);
    });
  } else if (weakAreas.length > 0) {
    topicsToStudy = weakAreas.slice(0, 7).map(w => {
      const found = searchTopics(w.topic || w.category);
      return found[0] || null;
    }).filter(Boolean);
  }

  if (topicsToStudy.length === 0) {
    topicsToStudy = knowledgeBase.filter(t => t.difficulty <= 2).slice(0, 7);
  }
  topicsToStudy = topicsToStudy.slice(0, 7);

  let html = `<div class="research-section"><h3>📅 Personalized Study Plan</h3>`;
  html += `<p style="color:var(--text-secondary);margin-bottom:16px;">A ${topicsToStudy.length}-day learning roadmap tailored for you.</p>`;

  topicsToStudy.forEach((topic, i) => {
    const day = i + 1;
    const stars = '⭐'.repeat(topic.difficulty);
    const time = 20 + topic.difficulty * 10;
    html += `<div style="background:rgba(124,111,255,0.08);border-left:3px solid var(--accent-purple);padding:12px 16px;margin-bottom:12px;border-radius:0 8px 8px 0;">`;
    html += `<strong style="color:var(--accent-purple);">Day ${day} — ${topic.title}</strong> <span style="opacity:0.5">${stars}</span><br/>`;
    html += `<span style="color:var(--accent-cyan);">📌 Goal:</span> Master ${topic.keyConcepts[0]?.term || 'core concepts'} and ${topic.keyConcepts[1]?.term || 'key ideas'}<br/>`;
    html += `<span style="color:var(--success);">📚 Study (${time} min):</span> ${topic.introduction}<br/>`;
    html += `<span style="color:var(--warning);">🧪 Practice:</span> Take a quiz on ${topic.title} and review key concepts<br/>`;
    html += `<span style="opacity:0.5;font-size:0.85em;">${topic.category} • ${topic.subcategory}</span></div>`;
  });

  html += `<div style="margin-top:16px;padding:12px;background:rgba(34,197,94,0.1);border-radius:8px;">`;
  html += `<strong style="color:var(--success);">💡 Tips:</strong><br/>`;
  html += `• Review each topic before the next day<br/>• Take quizzes after studying<br/>• Revisit topics where you scored below 70%</div></div>`;

  return {
    response: html,
    metadata: { agent: 'planner', intent: 'plan', cached: false, confidence: 0.85, tokensUsed: 0, timestamp: Date.now(), processingTime: Date.now() - startTime }
  };
}
