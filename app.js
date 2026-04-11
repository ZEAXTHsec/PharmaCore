/* =====================
   STATE
   ===================== */
const state = {
  subject:  null,
  mode:     null,
  questions:   [],
  current:     0,
  score:       0,
  wrong:       [],
  timerInterval: null,
  timerSeconds:  0,
};

let ALL_QUESTIONS = [];

/* =====================
   LOCALSTORAGE
   ===================== */
const LS = {
  key: 'dpharma_progress',

  load() {
    try { return JSON.parse(localStorage.getItem(this.key)) || {}; }
    catch { return {}; }
  },

  save(data) {
    try { localStorage.setItem(this.key, JSON.stringify(data)); } catch {}
  },

  markWrong(id) {
    const d = this.load();
    if (!d[id]) d[id] = { wrongCount: 0, lastSeen: null };
    d[id].wrongCount++;
    d[id].lastSeen = Date.now();
    this.save(d);
  },

  markKnown(id) {
    const d = this.load();
    if (!d[id]) d[id] = { wrongCount: 0, lastSeen: null };
    d[id].lastSeen = Date.now();
    this.save(d);
  },

  getWrongIds() {
    const d = this.load();
    return Object.keys(d).filter(id => d[id].wrongCount > 0);
  },

  saveSession(subject, mode) {
    const d = this.load();
    d._lastSession = { subject, mode, time: Date.now() };
    this.save(d);
  },

  getTheme() { return localStorage.getItem('dpharma_theme') || 'dark'; },
  setTheme(t) { localStorage.setItem('dpharma_theme', t); }
};

/* =====================
   THEME
   ===================== */
function initTheme() {
  const t = LS.getTheme();
  document.documentElement.setAttribute('data-theme', t);
  toggleThemeIcons(t);
}

function toggleThemeIcons(t) {
  document.getElementById('icon-moon').classList.toggle('hidden', t === 'light');
  document.getElementById('icon-sun').classList.toggle('hidden', t === 'dark');
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const curr = document.documentElement.getAttribute('data-theme');
  const next = curr === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  toggleThemeIcons(next);
  LS.setTheme(next);
});

/* =====================
   SCREEN MANAGEMENT
   ===================== */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('back-btn').classList.toggle('hidden', id === 'screen-home');
  window.scrollTo(0, 0);
}

document.getElementById('back-btn').addEventListener('click', () => {
  const active = document.querySelector('.screen.active').id;
  if (active === 'screen-engine') {
    showScreen('screen-home');
    resetEngineSteps();
  } else if (active === 'screen-quiz') {
    clearTimer();
    showScreen('screen-engine');
  } else if (active === 'screen-result') {
    showScreen('screen-engine');
    resetEngineSteps();
  } else if (active === 'screen-paper') {
    showScreen('screen-home');
  } else {
    showScreen('screen-home');
  }
});

/* =====================
   HOME NAV
   ===================== */
document.getElementById('btn-exam-engine').addEventListener('click', () => {
  showScreen('screen-engine');
  resetEngineSteps();
  showStep('step-subject');
});

document.getElementById('btn-paper-view').addEventListener('click', () => {
  showScreen('screen-paper');
  renderPaper();
});

document.getElementById('btn-notes').addEventListener('click', () => {
  showScreen('screen-notes');
});

document.getElementById('btn-notes-back').addEventListener('click', () => {
  showScreen('screen-engine');
});

/* =====================
   ENGINE STEPS
   ===================== */
function showStep(id) {
  const steps = ['step-subject', 'step-mode', 'step-start'];
  const idx = steps.indexOf(id);
  steps.forEach((s, i) => {
    const el = document.getElementById(s);
    if (el) {
      el.classList.toggle('hidden', i > idx);
    }
  });
}

function resetEngineSteps() {
  state.subject = null;
  state.mode    = null;
  document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
  showStep('step-subject');
}

/* ---- SUBJECT ---- */
document.querySelectorAll('.subject-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.subject = btn.dataset.subject;
    showStep('step-mode');
    updateStartSummary();
  });
});

/* ---- MODE ---- */
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.mode = btn.dataset.mode;
    showStep('step-start');
    updateStartSummary();
  });
});

/* ---- FILTER + SUMMARY ---- */
function getFilteredQuestions() {
  let pool = ALL_QUESTIONS;

  if (state.subject && state.subject !== 'all') {
    pool = pool.filter(q => q.subject === state.subject);
  }

  if (state.mode === 'weak') {
    const wrongIds = LS.getWrongIds();
    pool = pool.filter(q => wrongIds.includes(String(q.id)));
  }

  if (state.mode === 'lastday') pool = pool.filter(q => q.priority === 4);
  if (state.mode === 'parta')   pool = pool.filter(q => q.part === 'A');

  pool.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  return pool;
}

function updateStartSummary() {
  if (!state.subject || !state.mode) return;

  const pool = getFilteredQuestions();
  const modeLabels = {
    mcq: 'MCQ Quiz', flashcard: 'Flashcard', weak: 'Weak Questions',
    timer: 'Timer Mode', lastday: 'Last Day', parta: 'Part A Focus'
  };

  const subLabel = state.subject === 'all'
    ? 'All Subjects'
    : state.subject.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());

  document.getElementById('session-summary').innerHTML = `
    <strong>Subject:</strong> ${subLabel}<br>
    <strong>Mode:</strong> ${modeLabels[state.mode]}<br>
    <strong>Questions:</strong> ${pool.length}
  `;
}

/* ---- START ---- */
document.getElementById('start-btn').addEventListener('click', () => {
  const pool = getFilteredQuestions();
  if (pool.length === 0) {
    alert('No questions match. Try a different mode or subject.');
    return;
  }
  state.questions = shuffle(pool);
  state.current   = 0;
  state.score     = 0;
  state.wrong     = [];
  LS.saveSession(state.subject, state.mode);
  showScreen('screen-quiz');
  loadQuestion();
  if (state.mode === 'timer') startTimer();
});

/* =====================
   ANSWER FORMATTER
   ===================== */
function formatAnswer(raw) {
  if (!raw) return '';
  let s = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Section labels ending with colon
  s = s.replace(/\b([A-Z][A-Za-z /\-]+):/g,
    '<br><span class="ans-label">$1:</span>');

  // Numbered points
  s = s.replace(/(\s)(\d+)\.\s/g, '<br><strong>$2.</strong> ');

  // Bullets
  s = s.replace(/•\s*/g, '<br><span class="ans-bullet">&bull;</span> ');

  // Arrows
  s = s.replace(/→/g, '<span class="ans-arrow"> → </span>');

  // Clean leading <br>
  s = s.replace(/^(<br>\s*)+/, '');

  return s;
}

/* =====================
   QUIZ LOGIC
   ===================== */
function loadQuestion() {
  const q   = state.questions[state.current];
  const tot = state.questions.length;

  const pct = (state.current / tot) * 100;
  document.getElementById('quiz-progress-fill').style.width = pct + '%';
  document.getElementById('quiz-counter').textContent = `${state.current + 1} / ${tot}`;

  const badge = document.getElementById('quiz-priority-badge');
  if (q.priority) {
    badge.textContent = `${q.priority}yr`;
    badge.style.display = '';
  } else {
    badge.style.display = 'none';
  }

  document.getElementById('question-subject-tag').textContent =
    (q.subject || '').replace(/-/g, ' ').toUpperCase();

  document.getElementById('question-text').textContent = q.q;

  hide('mcq-options');
  hide('flashcard-answer');
  hide('btn-reveal');
  hide('btn-next');

  if (state.mode === 'parta') {
    loadPartA(q);
  } else {
    loadMCQ(q);
  }
}

/* ---- AUTO OPTIONS ---- */
function buildOptions(q) {
  if (q.options && q.options.length === 4) {
    return { options: q.options, correct: q.correct };
  }

  const correctAns = (q.a || '').trim();
  const pool = ALL_QUESTIONS
    .filter(x => x.id !== q.id && x.a && x.a.trim() !== correctAns)
    .map(x => x.a.trim());

  const unique  = [...new Set(pool)];
  const shuffled = shuffle(unique);
  const distractors = shuffled.slice(0, 3);

  const correctPos = Math.floor(Math.random() * 4);
  const options = [...distractors];
  options.splice(correctPos, 0, correctAns);

  return { options, correct: correctPos };
}

/* ---- MCQ ---- */
function loadMCQ(q) {
  const { options, correct } = buildOptions(q);
  q._opts    = options;
  q._correct = correct;

  show('mcq-options');
  const btns = document.querySelectorAll('.option-btn');
  const letters = ['A','B','C','D'];
  btns.forEach((btn, i) => {
    btn.querySelector('.opt-text').textContent = options[i] || '';
    btn.querySelector('.opt-letter').textContent = letters[i];
    btn.className  = 'option-btn';
    btn.disabled   = false;
    btn.onclick    = () => handleMCQ(i, q);
  });
}

function handleMCQ(chosen, q) {
  const btns = document.querySelectorAll('.option-btn');
  btns.forEach(b => b.disabled = true);

  const correctIdx = (q._correct !== undefined) ? q._correct : q.correct;

  if (chosen === correctIdx) {
    btns[chosen].classList.add('correct');
    state.score++;
    LS.markKnown(q.id);
  } else {
    btns[chosen].classList.add('wrong');
    btns[correctIdx].classList.add('correct');
    state.wrong.push(q);
    LS.markWrong(q.id);
  }

  show('btn-next');
}

/* ---- FLASHCARD ---- */
function loadFlashcard(q) {
  show('btn-reveal');
  document.getElementById('answer-text').innerHTML = formatAnswer(q.a);
  hide('flashcard-answer');
}

document.getElementById('btn-reveal').addEventListener('click', () => {
  hide('btn-reveal');
  show('flashcard-answer');
});

document.getElementById('btn-knew').addEventListener('click', () => {
  const q = state.questions[state.current];
  state.score++;
  LS.markKnown(q.id);
  nextQuestion();
});

document.getElementById('btn-didnt').addEventListener('click', () => {
  const q = state.questions[state.current];
  state.wrong.push(q);
  LS.markWrong(q.id);
  nextQuestion();
});

/* ---- PART A ---- */
function loadPartA(q) {
  document.getElementById('answer-text').innerHTML = formatAnswer(q.a);
  show('flashcard-answer');
  document.getElementById('flashcard-actions').style.display = 'none';
  document.getElementById('answer-label').style.display = 'none';
  show('btn-next');
}

/* ---- NEXT ---- */
document.getElementById('btn-next').addEventListener('click', nextQuestion);

function nextQuestion() {
  // Reset flashcard actions visibility
  document.getElementById('flashcard-actions').style.display = '';
  document.getElementById('answer-label').style.display = '';

  state.current++;
  if (state.current >= state.questions.length) {
    endSession();
  } else {
    loadQuestion();
  }
}

/* =====================
   TIMER
   ===================== */
function startTimer() {
  const mins = state.questions.length > 30 ? 180 : 30;
  state.timerSeconds = mins * 60;

  const display = document.getElementById('quiz-timer-display');
  display.classList.remove('hidden');

  state.timerInterval = setInterval(() => {
    state.timerSeconds--;
    const m = String(Math.floor(state.timerSeconds / 60)).padStart(2, '0');
    const s = String(state.timerSeconds % 60).padStart(2, '0');
    document.getElementById('quiz-timer-text').textContent = `${m}:${s}`;

    if (state.timerSeconds <= 0) {
      clearTimer();
      endSession();
    }
  }, 1000);
}

function clearTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
  document.getElementById('quiz-timer-display').classList.add('hidden');
}

/* =====================
   RESULT
   ===================== */
function endSession() {
  clearTimer();
  showScreen('screen-result');

  const tot   = state.questions.length;
  const score = state.score;
  const pct   = tot > 0 ? Math.round((score / tot) * 100) : 0;

  // Pick emoji based on score
  const emoji = pct >= 80 ? '🎉' : pct >= 60 ? '👍' : pct >= 40 ? '📚' : '💪';
  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-score').textContent = `${pct}%`;
  document.getElementById('result-breakdown').innerHTML = `
    ${score} correct out of ${tot}<br>
    ${state.wrong.length} questions to review
  `;

  document.getElementById('btn-retry-weak').classList.toggle('hidden', state.wrong.length === 0);
}

document.getElementById('btn-retry-weak').addEventListener('click', () => {
  if (state.wrong.length === 0) return;
  state.questions = shuffle([...state.wrong]);
  state.current   = 0;
  state.score     = 0;
  state.wrong     = [];
  showScreen('screen-quiz');
  loadQuestion();
});

document.getElementById('btn-new-session').addEventListener('click', () => {
  showScreen('screen-engine');
  resetEngineSteps();
});

/* =====================
   PAPER VIEW
   ===================== */
let paperState = {
  years:   4,
  subject: 'all',
  part:    'all',
};

// Wire up year chips
document.querySelectorAll('#year-chips .chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#year-chips .chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    paperState.years = Number(btn.dataset.years);
    renderPaper();
  });
});

// Wire up subject chips
document.querySelectorAll('#subj-chips .chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#subj-chips .chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    paperState.subject = btn.dataset.subject;
    renderPaper();
  });
});

// Wire up part chips
document.querySelectorAll('#part-chips .chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#part-chips .chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    paperState.part = btn.dataset.part;
    renderPaper();
  });
});

function getPaperQuestions() {
  let pool = ALL_QUESTIONS;

  // Filter by years (priority)
  pool = pool.filter(q => (q.priority || 1) >= paperState.years);

  if (paperState.subject !== 'all') {
    pool = pool.filter(q => q.subject === paperState.subject);
  }

  if (paperState.part !== 'all') {
    pool = pool.filter(q => q.part === paperState.part);
  }

  // Sort: Part A first, then B, then C; within each by priority desc
  const partOrder = { A: 0, B: 1, C: 2 };
  pool.sort((a, b) => {
    const pDiff = (partOrder[a.part] || 2) - (partOrder[b.part] || 2);
    if (pDiff !== 0) return pDiff;
    return (b.priority || 0) - (a.priority || 0);
  });

  return pool;
}

function subjectLabel(s) {
  const map = {
    'pharmaceutics': 'Pharmaceutics',
    'pharmacognosy': 'Pharmacognosy',
    'pharm-chemistry': 'Pharm Chemistry',
    'anatomy': 'Anatomy',
    'social-pharmacy': 'Social Pharmacy'
  };
  return map[s] || s;
}

function renderPaper() {
  const pool = getPaperQuestions();
  document.getElementById('paper-count').textContent = pool.length;
  const list = document.getElementById('paper-list');

  list.innerHTML = pool.map((q, idx) => {
    const badgeClass = `badge-${q.part}`;
    const partLabel  = q.part === 'A' ? '5 marks' : q.part === 'B' ? '3 marks' : 'MCQ';
    const yrLabel    = q.priority ? `${q.priority}yr` : '';

    return `
      <div class="paper-item" data-idx="${idx}">
        <div class="paper-q" onclick="togglePaperItem(this)">
          <div class="paper-meta">
            <span class="paper-part-badge ${badgeClass}">${q.part}</span>
            ${yrLabel ? `<span class="paper-yr">${yrLabel}</span>` : ''}
          </div>
          <div class="paper-q-text">${escapeHtml(q.q)}</div>
          <svg class="paper-expand-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="paper-ans">
          <div class="paper-ans-inner">
            <div class="paper-subj-tag">${subjectLabel(q.subject)} · Part ${q.part} · ${partLabel}</div>
            ${formatAnswer(q.a)}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function togglePaperItem(el) {
  const item = el.closest('.paper-item');
  item.classList.toggle('open');
}

function escapeHtml(s) {
  return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* =====================
   UTILITIES
   ===================== */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

/* =====================
   INIT
   ===================== */
function init() {
  const sources = [
    window.pharmaceutics,
    window.pharmacognosy,
    window.pharmChemistry,
    window.anatomy,
    window.socialPharmacy
  ];

  sources.forEach(src => {
    if (Array.isArray(src)) ALL_QUESTIONS = ALL_QUESTIONS.concat(src);
  });

  ALL_QUESTIONS.forEach((q, i) => {
    if (!q.id) q.id = i;
  });

  // Update home stats
  const totalEl = document.getElementById('stat-total');
  if (totalEl) totalEl.textContent = ALL_QUESTIONS.length;

  initTheme();
  showScreen('screen-home');
}

document.addEventListener('DOMContentLoaded', init);
