/**
 * @fileoverview NEXUS Utility Functions
 * @module utils/constants
 */

export const AGENTS = {
  orch: { id: 'orch', name: 'Orchestrator', emoji: '🧠', color: '#7c6fff', description: 'Routes queries to the right agent' },
  res: { id: 'res', name: 'Researcher', emoji: '📚', color: '#38bdf8', description: 'Explains topics and generates notes' },
  quiz: { id: 'quiz', name: 'Quiz Master', emoji: '🧪', color: '#22c55e', description: 'Generates adaptive quizzes' },
  anal: { id: 'anal', name: 'Analyst', emoji: '📊', color: '#f59e0b', description: 'Tracks progress and performance' },
  plan: { id: 'plan', name: 'Planner', emoji: '📅', color: '#06b6d4', description: 'Creates personalized study plans' },
  mem: { id: 'mem', name: 'Memory', emoji: '🧬', color: '#8b5cf6', description: 'Manages your learning history' },
  rev: { id: 'rev', name: 'Reviewer', emoji: '✅', color: '#10b981', description: 'Validates response quality' },
  ment: { id: 'ment', name: 'Mentor', emoji: '🎯', color: '#f43f5e', description: 'Provides guidance and motivation' }
};

export const PANELS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'chat', label: 'Agent Chat', icon: 'MessageSquare' },
  { id: 'quiz', label: 'Quiz Arena', icon: 'FlaskConical' },
  { id: 'kb', label: 'Knowledge Base', icon: 'BookOpen' },
  { id: 'graph', label: 'Knowledge Graph', icon: 'Share2' },
  { id: 'planner', label: 'Study Planner', icon: 'CalendarDays' },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
  { id: 'settings', label: 'Settings', icon: 'Settings' }
];

export const DEFAULT_SETTINGS = {
  cache: true,
  sem: true,
  mock: true,
  local: true,
  batch: true,
  compress: true,
  analyst: true,
  orchcache: true,
  autoQuiz: true,
  spacedRep: true,
  mentorNudges: true,
  graphAutoUpdate: true
};

export const QUICK_PROMPTS = [
  { text: 'Explain Neural Networks', emoji: '🧠', query: 'explain neural networks', panel: 'chat' },
  { text: 'Quantum Physics', emoji: '⚛️', query: 'explain quantum mechanics', panel: 'chat' },
  { text: 'DNA Replication', emoji: '🧬', query: 'explain DNA replication', panel: 'chat' },
  { text: 'My Progress', emoji: '📊', query: 'analyze my progress', panel: 'analytics' },
  { text: 'Quiz: Data Structures', emoji: '🧪', query: 'quiz me on arrays', panel: 'quiz', payload: 'cs_data_structures' },
  { text: 'Study Plan', emoji: '📅', query: 'create a study plan for algorithms', panel: 'planner' },
  { text: 'Daily Goals', emoji: '🎯', query: 'what are my daily goals', panel: 'planner' },
  { text: 'Study Tips', emoji: '💡', query: 'give me study tips', panel: 'chat' }
];
