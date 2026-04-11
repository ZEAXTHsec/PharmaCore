/* =====================
   STATE
   ===================== */
const state = {
  subject:  null,
  priority: 'all',
  part:     'all',
  topic:    'all',
  mode:     null,
  questions:   [],
  current:     0,
  score:       0,
  wrong:       [],
  timerInterval: null,
  timerSeconds:  0,
};

/* =====================
   ALL QUESTIONS POOL
   (populated from data files)
   ===================== */
let ALL_QUESTIONS = [];

/* =====================
   LOCALSTORAGE HELPERS
   ===================== */
const LS = {
  key: 'dpharma_progress',

  load() {
    try { return JSON.parse(localStorage.getItem(this.key)) || {}; }
    catch { return {}; }
  },

  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
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

  getTheme() {
    return localStorage.getItem('dpharma_theme') || 'dark';
  },

  setTheme(t) {
    localStorage.setItem('dpharma_theme', t);
  }
};

/* =====================
   THEME
   ===================== */
function initTheme() {
  const t = LS.getTheme();
  document.documentElement.setAttribute('data-theme', t);
  document.getElementById('theme-toggle').textContent = t === 'dark' ? '☀️' : '🌙';
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  const curr = document.documentElement.getAttribute('data-theme');
  const next = curr === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  document.getElementById('theme-toggle').textContent = next === 'dark' ? '☀️' : '🌙';
  LS.setTheme(next);
});

/* =====================
   SCREEN MANAGEMENT
   ===================== */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  const backBtn = document.getElementById('back-btn');
  backBtn.classList.toggle('hidden', id === 'screen-home');
}

// Back button logic
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
  } else if (active === 'screen-notes') {
    showScreen('screen-home');
  } else {
    showScreen('screen-home');
  }
});

/* =====================
   HOME
   ===================== */
document.getElementById('btn-exam-engine').addEventListener('click', () => {
  showScreen('screen-engine');
  resetEngineSteps();
  showStep('step-subject');
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
      if (i <= idx) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  });
}

function resetEngineSteps() {
  state.subject  = null;
  state.priority = 'all';
  state.part     = 'all';
  state.topic    = 'all';
  state.mode     = null;

  document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));

  showStep('step-subject');
}

/* ---- SUBJECT SELECTION ---- */
document.querySelectorAll('.subject-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.subject = btn.dataset.subject;
    showStep('step-mode');
    updateStartSummary();
  });
});

/* ---- MODE SELECTION ---- */
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    state.mode = btn.dataset.mode;
    showStep('step-start');
    updateStartSummary();
  });
});

/* ---- SESSION SUMMARY ---- */
function getFilteredQuestions() {
  let pool = ALL_QUESTIONS;

  // subject
  if (state.subject && state.subject !== 'all') {
    pool = pool.filter(q => q.subject === state.subject);
  }

  // mode overrides
  if (state.mode === 'weak') {
    const wrongIds = LS.getWrongIds();
    pool = pool.filter(q => wrongIds.includes(String(q.id)));
  }

  if (state.mode === 'lastday') {
    pool = pool.filter(q => q.priority === 4);
  }

  if (state.mode === 'parta') {
    pool = pool.filter(q => q.part === 'A');
  }

  // filters
  if (state.priority !== 'all') {
    pool = pool.filter(q => q.priority === Number(state.priority));
  }

  if (state.part !== 'all') {
    pool = pool.filter(q => q.part === state.part);
  }

  if (state.topic !== 'all') {
    pool = pool.filter(q => q.topic === state.topic);
  }

  // sort by priority desc
  pool.sort((a, b) => (b.priority || 0) - (a.priority || 0));

  return pool;
}

function updateStartSummary() {
  if (!state.subject || !state.mode) return;

  const pool = getFilteredQuestions();
  const modeLabels = {
    flashcard: 'Flashcard',
    mcq:       'MCQ Quiz',
    weak:      'Weak Questions',
    timer:     'Timer Mode',
    lastday:   'Last Day',
    parta:     'Part A Focus'
  };

  const subjectLabel = state.subject === 'all'
    ? 'All Subjects'
    : state.subject.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());

  document.getElementById('session-summary').innerHTML = `
    <strong>Subject:</strong> ${subjectLabel}<br>
    <strong>Mode:</strong> ${modeLabels[state.mode]}<br>
    <strong>Questions:</strong> ${pool.length}<br>
    ${state.priority !== 'all' ? `<strong>Priority:</strong> ${state.priority} Year<br>` : ''}
    ${state.part !== 'all' ? `<strong>Part:</strong> Part ${state.part}<br>` : ''}
    ${state.topic !== 'all' ? `<strong>Topic:</strong> ${state.topic}<br>` : ''}
  `;
}

/* ---- START ---- */
document.getElementById('start-btn').addEventListener('click', () => {
  const pool = getFilteredQuestions();

  if (pool.length === 0) {
    alert('No questions match your filters. Try adjusting them.');
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
   QUIZ LOGIC
   ===================== */
function loadQuestion() {
  const q   = state.questions[state.current];
  const tot = state.questions.length;

  // progress
  const pct = ((state.current) / tot) * 100;
  document.getElementById('quiz-progress-fill').style.width = pct + '%';
  document.getElementById('quiz-counter').textContent = `${state.current + 1} / ${tot}`;

  // priority badge
  const badge = document.getElementById('quiz-priority-badge');
  if (q.priority) {
    badge.textContent = `${q.priority}yr`;
    badge.style.display = 'inline';
  } else {
    badge.style.display = 'none';
  }

  // subject tag
  document.getElementById('question-subject-tag').textContent =
    (q.subject || '').replace('-', ' ').toUpperCase();

  // question text
  document.getElementById('question-text').textContent = q.q;

  // hide all action areas
  hide('mcq-options');
  hide('flashcard-answer');
  hide('btn-reveal');
  hide('btn-next');

  // mode routing — everything shows MCQ options except Part A (reading mode)
  if (state.mode === 'parta') {
    loadPartA(q);
  } else {
    loadMCQ(q);
  }
}

/* ---- AUTO-GENERATE OPTIONS for questions without them ---- */
function buildOptions(q) {
  if (q.options && q.options.length === 4) {
    return { options: q.options, correct: q.correct };
  }

  // Pick wrong answers from same subject first, then global
  const correctAns = (q.a || '').trim();
  let pool = ALL_QUESTIONS
    .filter(x => x.id !== q.id && x.a && x.a.trim() !== correctAns)
    .map(x => x.a.trim());

  const unique = [...new Set(pool)];
  const shuffledPool = shuffle(unique);
  const distractors = shuffledPool.slice(0, 3);

  // Insert correct answer at random position
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
  btns.forEach((btn, i) => {
    btn.textContent = options[i] || '';
    btn.className   = 'option-btn';
    btn.disabled    = false;
    btn.onclick     = () => handleMCQ(i, q);
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
  document.getElementById('answer-text').textContent = q.a;
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

/* ---- PART A FOCUS ---- */
function loadPartA(q) {
  // show answer immediately — this mode is for reading practice
  document.getElementById('answer-text').textContent = q.a;
  show('flashcard-answer');
  hide('flashcard-actions'); // no marking needed in reading mode
  document.getElementById('flashcard-answer').style.marginTop = '1rem';
  show('btn-next');
}

/* ---- NEXT ---- */
document.getElementById('btn-next').addEventListener('click', nextQuestion);

function nextQuestion() {
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
    display.textContent = `${m}:${s}`;

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

  document.getElementById('result-score').textContent = `${pct}%`;
  document.getElementById('result-breakdown').innerHTML = `
    ${score} correct out of ${tot}<br>
    ${state.wrong.length} questions to review
  `;

  const retryBtn = document.getElementById('btn-retry-weak');
  if (state.wrong.length === 0) {
    retryBtn.classList.add('hidden');
  } else {
    retryBtn.classList.remove('hidden');
  }
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
  // collect all questions from data files
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

  // assign ids if missing
  ALL_QUESTIONS.forEach((q, i) => {
    if (!q.id) q.id = i;
  });

  initTheme();
  showScreen('screen-home');
}

document.addEventListener('DOMContentLoaded', init);
