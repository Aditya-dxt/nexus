import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { DEFAULT_SETTINGS, AGENTS } from '../utils/constants';
import { loadProfile, addStudySession, saveProfile } from '../engine/learnerProfile';

// ─── Initial State ───────────────────────────────────────────────────────────
const initialAgentStatus = {};
Object.keys(AGENTS).forEach(k => { initialAgentStatus[k] = 'idle'; });

const initialState = {
  activePanel: 'dashboard',
  messages: [],
  kbTopics: [],
  scores: [],
  sessions: 0,
  isProcessing: false,
  cacheHitCount: 0,
  cacheMissCount: 0,
  tokensSaved: 0,
  agentTokens: { orch: 0, res: 0, quiz: 0, anal: 0, plan: 0, mem: 0, rev: 0, ment: 0 },
  agentStatus: { ...initialAgentStatus },
  activities: [],
  settings: { ...DEFAULT_SETTINGS },
  quizState: null,
  pipelineSteps: [],
  studyPlan: null,
  profile: null,
  isAuthenticated: false,
  authUser: null,
  pendingAction: null
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
function nexusReducer(state, action) {
  switch (action.type) {
    case 'SET_ACTIVE_PANEL':
      return { ...state, activePanel: action.payload };
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'ADD_KB_TOPIC':
      if (state.kbTopics.find(t => t.id === action.payload.id)) return state;
      return { ...state, kbTopics: [...state.kbTopics, action.payload] };
    case 'UPDATE_SCORES':
      return { ...state, scores: [...state.scores, action.payload] };
    case 'INCREMENT_SESSIONS':
      return { ...state, sessions: state.sessions + 1 };
    case 'UPDATE_AGENT_STATUS':
      return { ...state, agentStatus: { ...state.agentStatus, [action.payload.agent]: action.payload.status } };
    case 'UPDATE_ALL_AGENT_STATUS':
      return { ...state, agentStatus: { ...state.agentStatus, ...action.payload } };
    case 'INCREMENT_CACHE_HIT':
      return { ...state, cacheHitCount: state.cacheHitCount + 1, tokensSaved: state.tokensSaved + (action.payload || 50) };
    case 'INCREMENT_CACHE_MISS':
      return { ...state, cacheMissCount: state.cacheMissCount + 1 };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'ADD_ACTIVITY':
      return { ...state, activities: [action.payload, ...state.activities].slice(0, 50) };
    case 'SET_QUIZ_STATE':
      return { ...state, quizState: action.payload };
    case 'SET_PIPELINE':
      return { ...state, pipelineSteps: action.payload };
    case 'UPDATE_PIPELINE_STEP':
      return {
        ...state,
        pipelineSteps: state.pipelineSteps.map((s, i) =>
          i === action.payload.index ? { ...s, status: action.payload.status } : s
        )
      };
    case 'SET_STUDY_PLAN':
      return { ...state, studyPlan: action.payload };
    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };
    case 'RESET_AGENT_STATUS':
      return { ...state, agentStatus: { ...initialAgentStatus } };
    case 'LOGIN':
      return { ...state, isAuthenticated: true, authUser: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, authUser: null };
    case 'SET_PENDING_ACTION':
      return { ...state, pendingAction: action.payload };
    case 'CLEAR_PENDING_ACTION':
      return { ...state, pendingAction: null };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
const NexusContext = createContext(null);

export function NexusProvider({ children }) {
  const [state, dispatch] = useReducer(nexusReducer, initialState);

  // Load saved settings & auth on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('nexus_settings');
      if (savedSettings) dispatch({ type: 'UPDATE_SETTINGS', payload: JSON.parse(savedSettings) });
      
      const savedAuth = localStorage.getItem('nexus_auth');
      if (savedAuth) dispatch({ type: 'LOGIN', payload: JSON.parse(savedAuth) });
    } catch (e) { /* ignore */ }
  }, []);

  // Save settings and auth when changed
  useEffect(() => {
    try {
      localStorage.setItem('nexus_settings', JSON.stringify(state.settings));
      if (state.isAuthenticated && state.authUser) {
        localStorage.setItem('nexus_auth', JSON.stringify(state.authUser));
      } else {
        localStorage.removeItem('nexus_auth');
      }
    } catch (e) { /* ignore */ }
  }, [state.settings, state.isAuthenticated, state.authUser]);

  // Process a user query through the agent pipeline
  const processQuery = useCallback(async (query) => {
    if (state.isProcessing || !query.trim()) return;

    dispatch({ type: 'SET_PROCESSING', payload: true });
    dispatch({ type: 'INCREMENT_SESSIONS' });

    // Add user message
    dispatch({
      type: 'ADD_MESSAGE',
      payload: { id: Date.now(), content: query, sender: 'user', timestamp: Date.now() }
    });

    // Set pipeline: orchestrator first
    dispatch({
      type: 'SET_PIPELINE',
      payload: [
        { name: 'Orchestrator', emoji: '🧠', status: 'active' },
        { name: 'Processing', emoji: '⚡', status: 'waiting' },
        { name: 'Response', emoji: '✨', status: 'waiting' }
      ]
    });
    dispatch({ type: 'UPDATE_AGENT_STATUS', payload: { agent: 'orch', status: 'thinking' } });

    try {
      // Dynamic import to avoid circular deps
      const { processQuery: orchProcess } = await import('../agents/orchestrator.js');

      // Simulate orchestrator thinking
      await new Promise(r => setTimeout(r, 400));
      dispatch({ type: 'UPDATE_PIPELINE_STEP', payload: { index: 0, status: 'done' } });
      dispatch({ type: 'UPDATE_PIPELINE_STEP', payload: { index: 1, status: 'active' } });

      // Call orchestrator
      const result = await orchProcess(query, {
        messages: state.messages,
        kbTopics: state.kbTopics,
        scores: state.scores,
        sessions: state.sessions,
        settings: state.settings,
        cacheHitCount: state.cacheHitCount,
        cacheMissCount: state.cacheMissCount,
        tokensSaved: state.tokensSaved,
        agentTokens: state.agentTokens
      });

      // Update pipeline
      dispatch({ type: 'UPDATE_PIPELINE_STEP', payload: { index: 1, status: 'done' } });
      dispatch({ type: 'UPDATE_PIPELINE_STEP', payload: { index: 2, status: 'done' } });

      // Update agent status
      if (result.metadata?.agent) {
        dispatch({ type: 'UPDATE_AGENT_STATUS', payload: { agent: result.metadata.agent, status: 'done' } });
      }

      // Add agent response
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          id: Date.now() + 1,
          content: result.response,
          sender: result.metadata?.agent || 'system',
          timestamp: Date.now(),
          metadata: result.metadata
        }
      });

      // Add to knowledge base if it's an explain response
      if (result.metadata?.intent === 'explain' && result.metadata?.topicData) {
        dispatch({ type: 'ADD_KB_TOPIC', payload: result.metadata.topicData });
      }

      // Add activity
      dispatch({
        type: 'ADD_ACTIVITY',
        payload: {
          id: Date.now(),
          agent: result.metadata?.agent || 'system',
          action: `Processed "${query.slice(0, 40)}${query.length > 40 ? '...' : ''}"`,
          intent: result.metadata?.intent,
          timestamp: Date.now()
        }
      });

      // Update the learner profile so chat sessions count towards the heatmap
      try {
        const profile = loadProfile();
        addStudySession(profile, `Chat: ${query.slice(0, 20)}...`, 1, 100, result.metadata?.intent || 'general');
        saveProfile(profile);
      } catch (e) {
        console.warn('Could not save session to profile:', e);
      }

      // Update cache stats
      if (result.metadata?.cached) {
        dispatch({ type: 'INCREMENT_CACHE_HIT', payload: result.metadata?.tokensUsed || 50 });
      } else {
        dispatch({ type: 'INCREMENT_CACHE_MISS' });
      }

    } catch (error) {
      console.error('NEXUS processing error:', error);
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          id: Date.now() + 1,
          content: `<div style="color:var(--danger);">⚠️ Error processing your request: ${error.message}. Please try again.</div>`,
          sender: 'system',
          timestamp: Date.now(),
          metadata: { agent: 'system', intent: 'error' }
        }
      });
    } finally {
      // Reset states
      dispatch({ type: 'SET_PROCESSING', payload: false });
      setTimeout(() => dispatch({ type: 'RESET_AGENT_STATUS' }), 1500);
    }
  }, [state.isProcessing, state.messages, state.kbTopics, state.scores, state.sessions, state.settings, state.cacheHitCount, state.cacheMissCount, state.tokensSaved, state.agentTokens]);

  return (
    <NexusContext.Provider value={{ state, dispatch, processQuery }}>
      {children}
    </NexusContext.Provider>
  );
}

export function useNexus() {
  const context = useContext(NexusContext);
  if (!context) throw new Error('useNexus must be used within NexusProvider');
  return context;
}
