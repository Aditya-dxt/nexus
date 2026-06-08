import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNexus } from './context/NexusContext';
import { AGENTS, PANELS, QUICK_PROMPTS } from './utils/constants';
import { timeAgo } from './utils/formatters';
import { knowledgeBase, searchTopics, getCategories, getTopicsByCategory } from './data/knowledgeBase';
import { knowledgeGraph } from './data/knowledgeGraph';
import { getQuizForTopic, getQuizTopics } from './data/quizBank';
import { loadProfile, getStudyStreak, addStudySession, saveProfile, getHeatmapData } from './engine/learnerProfile';
import {
  LayoutDashboard, MessageSquare, FlaskConical, BookOpen, Share2,
  CalendarDays, BarChart3, Settings, Send, Menu, X, ChevronRight,
  Zap, Brain, Target, TrendingUp, Award, Clock, Search, Filter
} from 'lucide-react';
import './App.css';

// ═══ Icon Mapping ════════════════════════════════════════════════════════════
const ICON_MAP = { LayoutDashboard, MessageSquare, FlaskConical, BookOpen, Share2, CalendarDays, BarChart3, Settings };

// ═══ Background Effects ══════════════════════════════════════════════════════
function BackgroundEffects() {
  return (
    <div className="background-effects">
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="grid-lines" />
      <div className="noise-overlay" />
    </div>
  );
}

// ═══ Login ═══════════════════════════════════════════════════════════════════
function LoginScreen() {
  const { dispatch } = useNexus();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      dispatch({ type: 'LOGIN', payload: { name: name.trim(), email: email.trim() } });
    }
  };

  return (
    <div className="login-screen" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', position: 'relative', zIndex: 10 }}>
      <div className="login-card" style={{ background: 'var(--bg-secondary)', padding: '40px', borderRadius: '16px', border: '1px solid var(--glass-border)', width: '100%', maxWidth: '400px', backdropFilter: 'blur(20px)' }}>
        <div className="login-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="login-logo" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 800, color: 'white', margin: '0 auto 16px' }}>N</div>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Welcome to NEXUS</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Your Autonomous Study Assistant</p>
        </div>
        <form onSubmit={handleLogin} className="login-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Enter your name" style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '14px', outline: 'none' }} />
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Enter your email" style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '14px', outline: 'none' }} />
          </div>
          <button type="submit" className="login-btn" style={{ marginTop: '8px', padding: '14px', borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', color: 'white', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: '14px' }}>Get Started</button>
        </form>
      </div>
    </div>
  );
}

// ═══ Sidebar ═════════════════════════════════════════════════════════════════
function Sidebar() {
  const { state, dispatch } = useNexus();
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">N</div>
        <div className="sidebar-brand">
          <span className="brand-title">NEXUS</span>
          <span className="brand-version">v2.0</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {PANELS.map(p => {
          const Icon = ICON_MAP[p.icon];
          return (
            <div key={p.id}
              className={`sidebar-nav-item ${state.activePanel === p.id ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SET_ACTIVE_PANEL', payload: p.id })}>
              {Icon && <Icon size={18} />}
              <span>{p.label}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

// ═══ Topbar ══════════════════════════════════════════════════════════════════
function Topbar() {
  const { state, dispatch } = useNexus();
  const hitRate = state.cacheHitCount + state.cacheMissCount > 0
    ? Math.round((state.cacheHitCount / (state.cacheHitCount + state.cacheMissCount)) * 100) : 0;
  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* Placeholder for mobile menu toggle */}
      </div>
      <div className="topbar-right">
        <div className="topbar-stat"><Zap size={14} /> Cache: <span>{hitRate}%</span></div>
        <div className="topbar-stat"><Clock size={14} /> Queries: <span>{state.sessions}</span></div>
        <button onClick={() => dispatch({ type: 'LOGOUT' })} style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', marginLeft: '8px', fontWeight: 500 }}>Logout</button>
      </div>
    </header>
  );
}

// ═══ Dashboard ═══════════════════════════════════════════════════════════════
function Dashboard() {
  const { state, dispatch, processQuery } = useNexus();
  const profile = useMemo(() => loadProfile(), [state.sessions]);
  const streak = useMemo(() => getStudyStreak(profile), [profile]);
  const hitRate = state.cacheHitCount + state.cacheMissCount > 0
    ? Math.round((state.cacheHitCount / (state.cacheHitCount + state.cacheMissCount)) * 100) : 0;
  const heatmap = useMemo(() => getHeatmapData(profile), [profile]);

  const stats = [
    { icon: '📚', value: profile.totalSessions || 0, label: 'Study Sessions' },
    { icon: '🔥', value: streak.current, label: 'Day Streak' },
    { icon: '🧠', value: state.kbTopics.length || knowledgeBase.length, label: 'Topics Available' },
    { icon: '⚡', value: `${hitRate}%`, label: 'Cache Hit Rate' },
    { icon: '🏆', value: streak.best, label: 'Best Streak' },
    { icon: '🎯', value: state.tokensSaved, label: 'Tokens Saved' },
  ];

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome back, <span className="hero-name">{state.authUser?.name?.split(' ')[0] || 'Scholar'}</span>!
          </h1>
          <p className="hero-subtitle">Ready to conquer new concepts today? Your autonomous learning hub is standing by.</p>
          <div className="hero-actions">
            <button className="hero-btn primary" onClick={() => dispatch({ type: 'SET_ACTIVE_PANEL', payload: 'quiz' })}>
              <FlaskConical size={16} /> Take a Quiz
            </button>
            <button className="hero-btn secondary" onClick={() => dispatch({ type: 'SET_ACTIVE_PANEL', payload: 'planner' })}>
              <CalendarDays size={16} /> Study Plan
            </button>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="hero-orb" />
        </div>
      </div>

      {/* User Profile & Heatmap */}
      <div className="profile-dashboard-section" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
        <div className="profile-card" style={{ flex: '1 1 300px', background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="profile-avatar" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>
            {state.authUser?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="profile-info">
            <h2 style={{ margin: '0 0 4px', fontSize: '20px' }}>{state.authUser?.name || 'User'}</h2>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>{state.authUser?.email || 'user@nexus.study'}</div>
            <div className="profile-streak" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245,158,11,0.15)', color: 'var(--warning)', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
              🔥 {streak.current} Day Streak (Best: {streak.best})
            </div>
          </div>
        </div>

        <div className="heatmap-card" style={{ flex: '2 1 400px', background: 'var(--bg-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>Study Consistency</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Last 90 Days</span>
          </div>
          <div className="heatmap-grid">
            {(heatmap || []).slice(-90).map((d, i) => (
              <div key={i} className={`heatmap-cell ${d.count > 0 ? `level-${Math.min(4, d.count)}` : ''}`}
                title={`${d.date}: ${d.count} sessions`} />
            ))}
          </div>
          <div className="heatmap-labels" style={{ marginTop: '12px' }}>
            <span className="heatmap-label">Less</span>
            <div style={{ display: 'flex', gap: '3px' }}>
              <div className="heatmap-cell" /><div className="heatmap-cell level-1" />
              <div className="heatmap-cell level-2" /><div className="heatmap-cell level-3" /><div className="heatmap-cell level-4" />
            </div>
            <span className="heatmap-label">More</span>
          </div>
        </div>
      </div>

      {/* Quota Meter */}
      <div className="quota-meter">
        <div className="quota-header">
          <div className="quota-title">🛡️ Quota Shield</div>
          <div className="quota-badge">EFFICIENT</div>
        </div>
        <div className="quota-bar">
          <div className="quota-fill" style={{ width: `${Math.min(100, hitRate + 20)}%` }} />
        </div>
        <div className="quota-stats">
          <div className="quota-stat">Cache Hits: <strong>{state.cacheHitCount}</strong></div>
          <div className="quota-stat">Misses: <strong>{state.cacheMissCount}</strong></div>
          <div className="quota-stat">Saved: <strong>{state.tokensSaved} tokens</strong></div>
        </div>
      </div>

      {/* Stats */}
      <div className="section-title">Performance Metrics</div>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Agents */}
      <div className="section-title">Agent Network</div>
      <div className="agent-cards">
        {Object.entries(AGENTS).map(([k, a]) => {
          const status = state.agentStatus[k] || 'idle';
          return (
            <div key={k} className="agent-card" onClick={() => dispatch({ type: 'SET_ACTIVE_PANEL', payload: 'chat' })}>
              <div className="agent-card-header">
                <div className="agent-card-icon">{a.emoji}</div>
                <div className={`agent-card-status ${status}`}>
                  <div className="status-dot" />
                  {status}
                </div>
              </div>
              <div className="agent-card-name">{a.name}</div>
              <div className="agent-card-desc">{a.description}</div>
              <div className="agent-card-bar">
                <div className="agent-card-bar-fill" style={{
                  width: status === 'done' ? '100%' : status === 'thinking' ? '50%' : '10%',
                  background: a.color
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="section-title">Quick Actions</div>
      <div className="quick-prompts">
        {QUICK_PROMPTS.map((p, i) => (
          <button key={i} className="quick-prompt-btn" onClick={() => {
            dispatch({ type: 'SET_ACTIVE_PANEL', payload: p.panel || 'chat' });
            if (p.payload) {
              dispatch({ type: 'SET_PENDING_ACTION', payload: { type: 'start_quiz', data: p.payload } });
            } else if (p.query) {
              setTimeout(() => processQuery(p.query), 300);
            }
          }}>
            {p.emoji} {p.text}
          </button>
        ))}
      </div>

      {/* Activity */}
      <div className="section-title">Recent Activity</div>
      <div className="activity-timeline">
        {state.activities.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <div className="empty-state-title">No activity yet</div>
            <div className="empty-state-desc">Start chatting with NEXUS agents to see your activity here.</div>
          </div>
        ) : state.activities.slice(0, 10).map(act => (
          <div key={act.id} className="timeline-item">
            <div className="timeline-icon">{AGENTS[act.agent]?.emoji || '🧠'}</div>
            <div className="timeline-content">
              <div className="timeline-text">{act.action}</div>
              <div className="timeline-time">{timeAgo(act.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══ Chat Panel ══════════════════════════════════════════════════════════════
function ChatPanel() {
  const { state, processQuery } = useNexus();
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isProcessing]);

  const handleSend = () => {
    if (!input.trim() || state.isProcessing) return;
    processQuery(input.trim());
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div className="chat-panel">
      <div className="panel-header">
        <span>Agent Chat</span>
        <div className="panel-header-accent" />
      </div>

      {/* Pipeline */}
      {state.pipelineSteps.length > 0 && state.isProcessing && (
        <div className="pipeline-visualizer">
          {state.pipelineSteps.map((step, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="pipeline-arrow">→</span>}
              <div className={`pipeline-step ${step.status}`}>
                <span className="pipeline-emoji">{step.emoji}</span>
                {step.name}
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="chat-messages">
        {state.messages.length === 0 && (
          <div className="empty-state" style={{ marginTop: '60px' }}>
            <div className="empty-state-icon" style={{ fontSize: '64px' }}>🧠</div>
            <div className="empty-state-title">Welcome to NEXUS</div>
            <div className="empty-state-desc">Ask me anything — explain a topic, take a quiz, analyze your progress, or get a study plan.</div>
            <div className="quick-prompts" style={{ justifyContent: 'center', marginTop: 20 }}>
              {QUICK_PROMPTS.slice(0, 4).map((p, i) => (
                <button key={i} className="quick-prompt-btn" onClick={() => {
                  dispatch({ type: 'SET_ACTIVE_PANEL', payload: p.panel || 'chat' });
                  if (p.payload) {
                    dispatch({ type: 'SET_PENDING_ACTION', payload: { type: 'start_quiz', data: p.payload } });
                  } else if (p.query) {
                    setTimeout(() => processQuery(p.query), 300);
                  }
                }}>
                  {p.emoji} {p.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {state.messages.map(msg => (
          <div key={msg.id} className={`message-bubble ${msg.sender === 'user' ? 'user' : 'agent'}`}>
            {msg.sender !== 'user' && (
              <div className="message-sender">
                <span className="agent-emoji">{AGENTS[msg.metadata?.routedTo]?.emoji || AGENTS[msg.sender]?.emoji || '🧠'}</span>
                <span style={{ color: AGENTS[msg.metadata?.routedTo]?.color || AGENTS[msg.sender]?.color || '#7c6fff' }}>
                  {AGENTS[msg.metadata?.routedTo]?.name || AGENTS[msg.sender]?.name || 'NEXUS'}
                </span>
              </div>
            )}
            <div className="message-content" dangerouslySetInnerHTML={{ __html: msg.content }} />
            {msg.metadata && (
              <div className="message-meta">
                <span>⏱ {msg.metadata.processingTime?.toFixed?.(0) || '0'}ms</span>
                {msg.metadata.cached && <span>⚡ cached</span>}
                <span>🎯 {msg.metadata.intent}</span>
              </div>
            )}
          </div>
        ))}

        {state.isProcessing && (
          <div className="thinking-indicator">
            <div className="thinking-dots">
              <div className="thinking-dot" /><div className="thinking-dot" /><div className="thinking-dot" />
            </div>
            <span className="thinking-label">Agents processing...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-input-area">
        <input ref={inputRef} className="chat-input" placeholder="Ask NEXUS anything..."
          value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
          disabled={state.isProcessing} />
        <button className="chat-send-btn" onClick={handleSend} disabled={state.isProcessing || !input.trim()}>
          <Send size={16} /> Send
        </button>
      </div>
    </div>
  );
}

// ═══ Quiz Panel ══════════════════════════════════════════════════════════════
function QuizPanel() {
  const { state, dispatch } = useNexus();
  const topics = useMemo(() => getQuizTopics(), []);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const topicLabels = useMemo(() => {
    const map = {};
    knowledgeBase.forEach(t => { map[t.id] = t.title; });
    return map;
  }, []);

  const startQuiz = useCallback((topicId) => {
    setSelectedTopic(topicId);
    setQuestions(getQuizForTopic(topicId, undefined, 5));
    setAnswers({});
    setSubmitted(false);
  }, []);

  useEffect(() => {
    if (state.pendingAction && state.pendingAction.type === 'start_quiz') {
      const topicId = state.pendingAction.data;
      startQuiz(topicId);
      dispatch({ type: 'CLEAR_PENDING_ACTION' });
    }
  }, [state.pendingAction, startQuiz, dispatch]);

  const selectAnswer = (qId, optIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: optIdx }));
  };

  const submitQuiz = () => {
    setSubmitted(true);
    const correct = questions.filter(q => answers[q.id] === q.correctIndex).length;
    const score = Math.round((correct / questions.length) * 100);
    dispatch({ type: 'UPDATE_SCORES', payload: { topic: selectedTopic, score, date: Date.now() } });
    const profile = loadProfile();
    addStudySession(profile, topicLabels[selectedTopic] || selectedTopic, 5, score);
    saveProfile(profile);
  };

  const score = submitted ? questions.filter(q => answers[q.id] === q.correctIndex).length : 0;

  return (
    <div className="quiz-panel">
      <div className="panel-header">
        <span>Quiz Arena</span>
        <div className="panel-header-accent" />
      </div>

      {!selectedTopic ? (
        <>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>Select a topic to start a quiz:</p>
          <div className="quiz-topic-selector">
            {topics.map(t => (
              <button key={t} className="quiz-topic-btn" onClick={() => startQuiz(t)}>
                {topicLabels[t] || t}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <button className="quiz-btn quiz-btn-secondary" onClick={() => setSelectedTopic(null)} style={{ marginBottom: 16 }}>
            ← Back to Topics
          </button>

          {submitted && (
            <div className="quiz-results" style={{ marginBottom: 20 }}>
              <div className="quiz-score" style={{ color: score / questions.length >= 0.7 ? 'var(--success)' : 'var(--warning)' }}>
                {score}/{questions.length}
              </div>
              <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
                {score / questions.length >= 0.8 ? '🎉 Excellent work!' : score / questions.length >= 0.5 ? '👍 Good effort! Keep practicing.' : '📚 Review this topic and try again!'}
              </p>
              <button className="quiz-btn quiz-btn-primary" onClick={() => startQuiz(selectedTopic)} style={{ marginTop: 16 }}>
                🔄 Retry Quiz
              </button>
            </div>
          )}

          {questions.map((q, qi) => (
            <div key={q.id} className="quiz-card" style={{ animationDelay: `${qi * 0.1}s` }}>
              <span className={`quiz-difficulty ${q.difficulty === 1 ? 'easy' : q.difficulty === 2 ? 'medium' : 'hard'}`}>
                {q.difficulty === 1 ? 'Easy' : q.difficulty === 2 ? 'Medium' : 'Hard'}
              </span>
              <div className="quiz-question">Q{qi + 1}. {q.question}</div>
              <div className="quiz-options">
                {q.options.map((opt, oi) => {
                  let cls = 'quiz-option';
                  if (answers[q.id] === oi) cls += ' selected';
                  if (submitted) {
                    if (oi === q.correctIndex) cls += ' correct';
                    else if (answers[q.id] === oi) cls += ' incorrect';
                  }
                  return (
                    <div key={oi} className={cls} onClick={() => selectAnswer(q.id, oi)}>
                      <div className="quiz-option-letter">{String.fromCharCode(65 + oi)}</div>
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>
              {submitted && <div className="quiz-explanation">💡 {q.explanation}</div>}
            </div>
          ))}

          {!submitted && questions.length > 0 && (
            <div className="quiz-actions">
              <button className="quiz-btn quiz-btn-primary" onClick={submitQuiz}
                disabled={Object.keys(answers).length < questions.length}>
                Submit Answers
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ═══ Knowledge Base Panel ════════════════════════════════════════════════════
function KBPanel() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { dispatch, processQuery } = useNexus();

  const categories = useMemo(() => ['All', ...getCategories()], []);
  const filteredTopics = useMemo(() => {
    let topics = activeCategory === 'All' ? knowledgeBase : getTopicsByCategory(activeCategory);
    if (search.trim()) {
      const results = searchTopics(search);
      const ids = new Set(results.map(r => r.id));
      topics = topics.filter(t => ids.has(t.id));
    }
    return topics;
  }, [search, activeCategory]);

  const explainTopic = (topic) => {
    dispatch({ type: 'SET_ACTIVE_PANEL', payload: 'chat' });
    setTimeout(() => processQuery(`explain ${topic.title}`), 200);
  };

  return (
    <div className="kb-panel">
      <div className="panel-header">
        <span>Knowledge Base</span>
        <div className="panel-header-accent" />
      </div>

      <input className="kb-search" placeholder="🔍 Search topics..." value={search}
        onChange={e => setSearch(e.target.value)} />

      <div className="kb-filters">
        {categories.map(c => (
          <button key={c} className={`kb-filter-btn ${activeCategory === c ? 'active' : ''}`}
            onClick={() => setActiveCategory(c)}>
            {c} {c !== 'All' && `(${getTopicsByCategory(c).length})`}
          </button>
        ))}
      </div>

      <div className="kb-grid">
        {filteredTopics.slice(0, 50).map(topic => (
          <div key={topic.id} className="topic-card" onClick={() => explainTopic(topic)}>
            <div className="topic-card-header">
              <div className="topic-card-title">{topic.title}</div>
              <div className="topic-card-category">{topic.subcategory}</div>
            </div>
            <div className="topic-card-intro">{topic.introduction}</div>
            <div className="topic-card-difficulty">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} style={{ opacity: i < topic.difficulty ? 1 : 0.2, fontSize: 12 }}>⭐</span>
              ))}
            </div>
            <div className="topic-card-tags">
              {topic.tags.slice(0, 4).map(tag => (
                <span key={tag} className="topic-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-title">No topics found</div>
          <div className="empty-state-desc">Try adjusting your search or filter.</div>
        </div>
      )}
    </div>
  );
}

// ═══ Knowledge Graph Panel ═══════════════════════════════════════════════════
function GraphPanel() {
  const graphRef = useRef(null);
  const networkRef = useRef(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    let network;
    const initGraph = async () => {
      try {
        const vis = await import('vis-network/standalone');

        const categoryColors = {
          'Computer Science': '#7c6fff',
          'Mathematics': '#38bdf8',
          'Physics': '#f59e0b',
          'Chemistry': '#22c55e',
          'Biology': '#10b981',
          'History': '#f43f5e',
          'Economics': '#8b5cf6'
        };

        const nodes = new vis.DataSet(
          knowledgeGraph.nodes.map(n => ({
            id: n.id,
            label: n.label,
            color: {
              background: categoryColors[n.category] || '#7c6fff',
              border: 'rgba(255,255,255,0.2)',
              highlight: { background: '#fff', border: categoryColors[n.category] || '#7c6fff' }
            },
            font: { color: '#f1f5f9', size: 11 },
            shape: 'dot',
            size: 12,
            title: `${n.label} (${n.category})`
          }))
        );

        const edges = new vis.DataSet(
          knowledgeGraph.edges.map((e, i) => ({
            id: i,
            from: e.from,
            to: e.to,
            color: { color: 'rgba(255,255,255,0.08)', highlight: 'rgba(124,111,255,0.5)' },
            arrows: e.type === 'prerequisite' ? 'to' : '',
            dashes: e.type === 'related',
            width: 1
          }))
        );

        const options = {
          physics: { solver: 'forceAtlas2Based', forceAtlas2Based: { gravitationalConstant: -30, springLength: 100 }, stabilization: { iterations: 100 } },
          interaction: { hover: true, tooltipDelay: 100 },
          nodes: { borderWidth: 1, borderWidthSelected: 2 },
          edges: { smooth: { type: 'continuous' } }
        };

        if (graphRef.current) {
          network = new vis.Network(graphRef.current, { nodes, edges }, options);
          networkRef.current = network;

          network.on('click', (params) => {
            if (params.nodes.length > 0) {
              const nodeId = params.nodes[0];
              const topic = knowledgeBase.find(t => t.id === nodeId);
              setInfo(topic);
            } else {
              setInfo(null);
            }
          });
        }
      } catch (err) {
        console.warn('Graph visualization not available:', err);
      }
    };

    initGraph();
    return () => { if (network) network.destroy(); };
  }, []);

  const categoryColors = {
    'Computer Science': '#7c6fff', 'Mathematics': '#38bdf8', 'Physics': '#f59e0b',
    'Chemistry': '#22c55e', 'Biology': '#10b981', 'History': '#f43f5e', 'Economics': '#8b5cf6'
  };

  return (
    <div className="graph-view">
      <div className="panel-header">
        <span>Knowledge Graph</span>
        <div className="panel-header-accent" />
      </div>
      <div className="graph-legend">
        {Object.entries(categoryColors).map(([cat, color]) => (
          <div key={cat} className="graph-legend-item">
            <div className="graph-legend-dot" style={{ background: color }} />
            <span>{cat}</span>
          </div>
        ))}
      </div>
      <div className="graph-container" ref={graphRef} />
      {info && (
        <div className="quiz-card" style={{ marginTop: 12 }}>
          <h3 style={{ color: 'var(--accent-purple-light)' }}>{info.title}</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>{info.introduction}</p>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-tertiary)' }}>
            {info.category} • {info.subcategory} • Difficulty: {'⭐'.repeat(info.difficulty)}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══ Planner Panel ═══════════════════════════════════════════════════════════
function PlannerPanel() {
  const { processQuery, dispatch } = useNexus();
  const [planTopic, setPlanTopic] = useState('');

  const generatePlan = () => {
    const q = planTopic.trim() || 'algorithms';
    dispatch({ type: 'SET_ACTIVE_PANEL', payload: 'chat' });
    setTimeout(() => processQuery(`create a study plan for ${q}`), 200);
  };

  return (
    <div className="planner-panel">
      <div className="panel-header">
        <span>Study Planner</span>
        <div className="panel-header-accent" />
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>
        Generate a personalized study plan based on your goals and knowledge gaps.
      </p>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input className="chat-input" placeholder="Enter a topic (e.g., machine learning, calculus)..."
          value={planTopic} onChange={e => setPlanTopic(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && generatePlan()} />
        <button className="plan-generate-btn" onClick={generatePlan}>
          📅 Generate Plan
        </button>
      </div>
      <div className="section-title">Suggested Plans</div>
      <div className="agent-cards">
        {['Data Structures & Algorithms', 'Machine Learning', 'Web Development', 'Physics Fundamentals', 'Calculus', 'Database Systems'].map(topic => (
          <div key={topic} className="agent-card" onClick={() => {
            setPlanTopic(topic);
            dispatch({ type: 'SET_ACTIVE_PANEL', payload: 'chat' });
            setTimeout(() => processQuery(`create a study plan for ${topic}`), 200);
          }}>
            <div className="agent-card-icon">📚</div>
            <div className="agent-card-name">{topic}</div>
            <div className="agent-card-desc">Click to generate a structured learning path</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══ Analytics Panel ═════════════════════════════════════════════════════════
function AnalyticsPanel() {
  const { state, processQuery, dispatch } = useNexus();
  const profile = useMemo(() => loadProfile(), [state.sessions]);
  const streak = useMemo(() => getStudyStreak(profile), [profile]);
  const skills = profile.skills || {};
  const topicHistory = (profile.topicHistory || []).slice(-20).reverse();

  return (
    <div className="analytics-panel">
      <div className="panel-header">
        <span>Analytics Dashboard</span>
        <div className="panel-header-accent" />
      </div>

      <button className="plan-generate-btn" style={{ marginBottom: 20 }} onClick={() => {
        dispatch({ type: 'SET_ACTIVE_PANEL', payload: 'chat' });
        setTimeout(() => processQuery('analyze my progress'), 200);
      }}>
        📊 Get Detailed Analysis
      </button>

      <div className="analytics-grid">
        {/* Overview */}
        <div className="analytics-card">
          <div className="analytics-card-title"><TrendingUp size={16} /> Learning Overview</div>
          <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="stat-card"><div className="stat-icon">📚</div><div className="stat-value">{profile.totalSessions || 0}</div><div className="stat-label">Sessions</div></div>
            <div className="stat-card"><div className="stat-icon">🔥</div><div className="stat-value">{streak.current}</div><div className="stat-label">Streak</div></div>
            <div className="stat-card"><div className="stat-icon">⏱️</div><div className="stat-value">{Math.round((profile.totalStudyTime || 0) / 60)}</div><div className="stat-label">Minutes</div></div>
            <div className="stat-card"><div className="stat-icon">🏆</div><div className="stat-value">{streak.best}</div><div className="stat-label">Best Streak</div></div>
          </div>
        </div>

        {/* Skills */}
        <div className="analytics-card">
          <div className="analytics-card-title"><Target size={16} /> Skill Levels</div>
          {Object.keys(skills).length > 0 ? (
            Object.entries(skills).map(([cat, data]) => {
              const lvl = Math.min(100, data.level || 0);
              const clr = lvl >= 70 ? 'var(--success)' : lvl >= 40 ? 'var(--warning)' : 'var(--danger)';
              return (
                <div key={cat} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                    <span>{cat}</span><span style={{ color: clr, fontFamily: 'var(--font-mono)' }}>{Math.round(lvl)}%</span>
                  </div>
                  <div style={{ background: 'var(--glass)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${lvl}%`, height: '100%', background: clr, borderRadius: 4, transition: 'width 0.5s' }} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state" style={{ padding: 20 }}>
              <div className="empty-state-desc">Take quizzes to build your skill profile!</div>
            </div>
          )}
        </div>

        {/* Scores */}
        <div className="analytics-card">
          <div className="analytics-card-title"><Award size={16} /> Recent Scores</div>
          {state.scores.length > 0 ? (
            state.scores.slice(-10).reverse().map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--glass-border)', fontSize: 13 }}>
                <span>{s.topic}</span>
                <span style={{ color: s.score >= 70 ? 'var(--success)' : 'var(--warning)', fontFamily: 'var(--font-mono)' }}>{s.score}%</span>
              </div>
            ))
          ) : (
            <div className="empty-state" style={{ padding: 20 }}>
              <div className="empty-state-desc">Complete quizzes to see your scores here.</div>
            </div>
          )}
        </div>

        {/* History */}
        <div className="analytics-card">
          <div className="analytics-card-title"><Clock size={16} /> Study History</div>
          {topicHistory.length > 0 ? (
            topicHistory.slice(0, 8).map((e, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--glass-border)', fontSize: 13 }}>
                <span style={{ color: 'var(--text-secondary)' }}>{e.topic}</span>
                <span style={{ fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{timeAgo(e.date)}</span>
              </div>
            ))
          ) : (
            <div className="empty-state" style={{ padding: 20 }}>
              <div className="empty-state-desc">Start studying to build your history!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══ Settings Panel ══════════════════════════════════════════════════════════
function SettingsPanel() {
  const { state, dispatch } = useNexus();
  const s = state.settings;

  const toggle = (key) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: !s[key] } });
  };

  const clearData = () => {
    if (window.confirm('Clear all learning data? This cannot be undone.')) {
      localStorage.removeItem('nexus_learner_profile');
      localStorage.removeItem('nexus_settings');
      window.location.reload();
    }
  };

  const settingGroups = [
    {
      title: '⚡ Performance & Caching',
      items: [
        { key: 'cache', label: 'Response Caching', desc: 'Cache agent responses to reduce computation' },
        { key: 'orchcache', label: 'Orchestrator Route Cache', desc: 'Cache intent routing decisions' },
        { key: 'batch', label: 'Smart Batching', desc: 'Batch similar requests for efficiency' },
        { key: 'compress', label: 'Response Compression', desc: 'Compress cached responses' },
      ]
    },
    {
      title: '🧠 Intelligence',
      items: [
        { key: 'sem', label: 'Semantic Analysis', desc: 'Enable NLP-based intent detection' },
        { key: 'local', label: 'Local Processing', desc: 'All computation runs locally' },
        { key: 'analyst', label: 'Auto Analytics', desc: 'Track learning metrics automatically' },
      ]
    },
    {
      title: '🎓 Learning Features',
      items: [
        { key: 'autoQuiz', label: 'Adaptive Quizzes', desc: 'Auto-adjust quiz difficulty based on performance' },
        { key: 'spacedRep', label: 'Spaced Repetition', desc: 'SM-2 algorithm for optimal review timing' },
        { key: 'mentorNudges', label: 'Mentor Nudges', desc: 'Receive motivational messages and study reminders' },
        { key: 'graphAutoUpdate', label: 'Auto Knowledge Graph', desc: 'Update graph as you explore topics' },
      ]
    }
  ];

  return (
    <div className="settings-panel">
      <div className="panel-header">
        <span>Settings</span>
        <div className="panel-header-accent" />
      </div>

      {settingGroups.map(group => (
        <div key={group.title} className="setting-group">
          <div className="setting-group-title">{group.title}</div>
          {group.items.map(item => (
            <div key={item.key} className="setting-item">
              <div>
                <div className="setting-label">{item.label}</div>
                <div className="setting-desc">{item.desc}</div>
              </div>
              <button className={`setting-toggle ${s[item.key] ? 'active' : ''}`}
                onClick={() => toggle(item.key)} />
            </div>
          ))}
        </div>
      ))}

      <div className="setting-group">
        <div className="setting-group-title">🗄️ Data Management</div>
        <button className="setting-action-btn danger" onClick={clearData}>
          🗑️ Clear All Data
        </button>
        <button className="setting-action-btn" onClick={() => {
          const data = { profile: loadProfile(), settings: state.settings };
          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a'); a.href = url; a.download = 'nexus-backup.json'; a.click();
        }}>
          💾 Export Data
        </button>
      </div>
    </div>
  );
}

// ═══ Panel Router ════════════════════════════════════════════════════════════
function PanelRouter() {
  const { state } = useNexus();
  switch (state.activePanel) {
    case 'dashboard': return <Dashboard />;
    case 'chat': return <ChatPanel />;
    case 'quiz': return <QuizPanel />;
    case 'kb': return <KBPanel />;
    case 'graph': return <GraphPanel />;
    case 'planner': return <PlannerPanel />;
    case 'analytics': return <AnalyticsPanel />;
    case 'settings': return <SettingsPanel />;
    default: return <Dashboard />;
  }
}

// ═══ App ═════════════════════════════════════════════════════════════════════
export default function App() {
  const { state } = useNexus();

  if (!state.isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <>
      <BackgroundEffects />
      <div className="app-shell">
        <Sidebar />
        <div className="content-area">
          <Topbar />
          <main className="main-content">
            <PanelRouter />
          </main>
        </div>
      </div>
    </>
  );
}
