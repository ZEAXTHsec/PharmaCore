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
  } else if (active === 'screen-lastday') {
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

document.getElementById('btn-lastday').addEventListener('click', () => {
  showScreen('screen-lastday');
  initLastDay();
});

document.getElementById('btn-notes').addEventListener('click', () => {
  showScreen('screen-notes');
});

document.getElementById('btn-notes-back').addEventListener('click', () => {
  showScreen('screen-engine');
});

// Nav brand = go home
document.getElementById('nav-brand').addEventListener('click', () => {
  showScreen('screen-home');
  resetEngineSteps();
  clearTimer();
});

/* =====================
   ENGINE STEPS
   ===================== */
function showStep(id) {
  const steps = ['step-subject', 'step-mode', 'step-start'];
  const idx = steps.indexOf(id);
  steps.forEach((s, i) => {
    const el = document.getElementById(s);
    if (el) el.classList.toggle('hidden', i > idx);
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

  s = s.replace(/\b([A-Z][A-Za-z /\-]+):/g,
    '<br><span class="ans-label">$1:</span>');
  s = s.replace(/(\s)(\d+)\.\s/g, '<br><strong>$2.</strong> ');
  s = s.replace(/•\s*/g, '<br><span class="ans-bullet">&bull;</span> ');
  s = s.replace(/→/g, '<span class="ans-arrow"> → </span>');
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
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
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
  } else if (state.mode === 'flashcard') {
    loadFlashcard(q);
  } else {
    loadMCQ(q);
  }
}

/* ---- AUTO OPTIONS ---- */
function buildOptions(q) {
  if (q.options && q.options.length === 4) {
    return { options: q.options, correct: q.correct };
  }

  const correctAns = (q.a || '').split('\n')[0].trim().substring(0, 60);
  const pool = ALL_QUESTIONS
    .filter(x => x.id !== q.id && x.a)
    .map(x => {
      // Use only first line and truncate for MCQ readability
      const ans = x.a.trim().split('\n')[0].trim();
      return ans.length > 60 ? ans.substring(0, 57) + '…' : ans;
    })
    .filter(a => a !== correctAns);

  const unique   = [...new Set(pool)];
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
    btn.className = 'option-btn';
    btn.disabled  = false;
    btn.onclick   = () => handleMCQ(i, q);
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

document.querySelectorAll('#year-chips .chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#year-chips .chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    paperState.years = Number(btn.dataset.years);
    renderPaper();
  });
});

document.querySelectorAll('#subj-chips .chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#subj-chips .chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    paperState.subject = btn.dataset.subject;
    renderPaper();
  });
});

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

  pool = pool.filter(q => (q.priority || 1) >= paperState.years);

  if (paperState.subject !== 'all') {
    pool = pool.filter(q => q.subject === paperState.subject);
  }

  if (paperState.part !== 'all') {
    pool = pool.filter(q => q.part === paperState.part);
  }

  const partOrder = { A: 0, B: 1, C: 2 };
  pool.sort((a, b) => {
    const pDiff = (partOrder[a.part] || 2) - (partOrder[b.part] || 2);
    if (pDiff !== 0) return pDiff;
    return (b.priority || 0) - (a.priority || 0);
  });

  return pool;
}

const subjectNames = {
  'pharmaceutics': 'Pharmaceutics',
  'pharmacognosy': 'Pharmacognosy',
  'pharm-chemistry': 'Pharm Chemistry',
  'anatomy': 'Anatomy',
  'social-pharmacy': 'Social Pharmacy'
};

function renderPaper() {
  const pool = getPaperQuestions();

  // Update count
  const countEl = document.getElementById('paper-count-label');
  if (countEl) countEl.textContent = `${pool.length} Questions`;

  // Split by part
  const grouped = { A: [], B: [], C: [] };
  pool.forEach(q => {
    const p = q.part || 'B';
    if (!grouped[p]) grouped[p] = [];
    grouped[p].push(q);
  });

  const hasAny = pool.length > 0;

  ['A','B','C'].forEach(part => {
    const section = document.getElementById(`paper-section-${part}`);
    const list    = document.getElementById(`plist-${part}`);
    const qs      = grouped[part] || [];

    if (qs.length === 0 || !hasAny) {
      section.classList.add('hidden');
      return;
    }

    section.classList.remove('hidden');
    list.innerHTML = qs.map((q, idx) => buildPaperItem(q, idx + 1, part)).join('');
  });

  const emptyEl = document.getElementById('paper-empty');
  emptyEl.classList.toggle('hidden', hasAny);

  // Add toggle listeners
  document.querySelectorAll('.paper-q').forEach(el => {
    el.addEventListener('click', () => {
      el.closest('.paper-item').classList.toggle('open');
    });
  });
}

function buildPaperItem(q, num, part) {
  const freqClass = `freq-${q.priority || 1}`;
  const freqLabel = q.priority ? `${q.priority}yr` : '';
  const subjLabel = subjectNames[q.subject] || q.subject || '';

  // Build answer section
  let ansHtml = '';
  if (part === 'C' && q.options && q.options.length) {
    // MCQ — show options + highlight correct
    const letters = ['A','B','C','D'];
    const optsHtml = q.options.map((opt, i) => {
      const isCorrect = i === q.correct;
      return `<div class="paper-mcq-opt ${isCorrect ? 'correct-opt' : ''}">
        <span class="pmo-letter">${letters[i]}.</span>
        <span>${escapeHtml(opt)}</span>
        ${isCorrect ? '<span style="margin-left:4px;font-size:11px;">✓</span>' : ''}
      </div>`;
    }).join('');
    ansHtml = `
      <div class="paper-ans-label">Options</div>
      <div class="paper-mcq-options">${optsHtml}</div>
      ${q.a ? `<div class="paper-ans-label" style="margin-top:10px;">Answer</div>
      <div class="paper-ans-text">${formatAnswer(q.a)}</div>` : ''}
    `;
  } else {
    ansHtml = `
      <div class="paper-ans-label">Answer</div>
      <div class="paper-ans-text">${formatAnswer(q.a)}</div>
    `;
  }

  return `
    <div class="paper-item">
      <div class="paper-q">
        <span class="paper-qnum">${num}.</span>
        <div class="paper-q-body">
          <div class="paper-q-text">${escapeHtml(q.q)}</div>
          <div class="paper-q-meta">
            ${freqLabel ? `<span class="paper-freq-badge ${freqClass}">${freqLabel}</span>` : ''}
            <span class="paper-subj-tag">${subjLabel}</span>
          </div>
        </div>
        <svg class="paper-expand-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
      </div>
      <div class="paper-ans">
        <div class="paper-ans-inner">
          ${ansHtml}
        </div>
      </div>
    </div>
  `;
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
   LAST DAY GUIDE
   ===================== */
let ldState = {
  lang: 'english',
  subject: null,
};

function initLastDay() {
  if (!window.lastDayData) return;
  ldState.subject = window.lastDayData.subjects[0].id;
  renderLdTabs();
  renderLdContent();

  // Lang toggle
  document.querySelectorAll('.ld-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.ld-lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ldState.lang = btn.dataset.lang;
      renderLdContent();
    });
  });
}

function renderLdTabs() {
  const tabsEl = document.getElementById('ld-subject-tabs');
  tabsEl.innerHTML = window.lastDayData.subjects.map(s => `
    <button class="ld-tab ${s.id === ldState.subject ? 'active' : ''}" 
            data-subj="${s.id}" 
            style="--tab-color:${s.color}">
      <span>${s.icon}</span><span>${s.label}</span>
    </button>
  `).join('');

  tabsEl.querySelectorAll('.ld-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsEl.querySelectorAll('.ld-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ldState.subject = btn.dataset.subj;
      renderLdContent();
      document.getElementById('ld-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function renderLdContent() {
  const subj = window.lastDayData.subjects.find(s => s.id === ldState.subject);
  if (!subj) return;
  const lang = ldState.lang;
  const contentEl = document.getElementById('ld-content');

  contentEl.innerHTML = subj.topics.map((topic, ti) => {
    const data = topic[lang];
    const points = data.points.map((pt, pi) => `
      <div class="ld-point ${pt.highlight ? 'ld-point-hi' : ''}">
        <span class="ld-point-dot">${pt.highlight ? '★' : '·'}</span>
        <span>${escapeHtml(pt.text)}</span>
      </div>
    `).join('');

    const tags = topic.tags.map(t => `<span class="ld-tag">${t}</span>`).join('');

    return `
      <div class="ld-card" data-topic="${topic.id}">
        <div class="ld-card-header" onclick="toggleLdCard(this)">
          <div class="ld-card-left">
            <span class="ld-card-emoji">${topic.emoji}</span>
            <div class="ld-card-info">
              <div class="ld-card-title">${escapeHtml(topic.title)}</div>
              <div class="ld-card-tags">${tags}</div>
            </div>
          </div>
          <svg class="ld-card-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div class="ld-card-body">
          <div class="ld-hook">${escapeHtml(data.hook)}</div>
          <div class="ld-points">${points}</div>
          ${data.memory_trick ? `<div class="ld-trick">${escapeHtml(data.memory_trick)}</div>` : ''}
          ${data.exam_tip ? `<div class="ld-examtip">${escapeHtml(data.exam_tip)}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function toggleLdCard(headerEl) {
  const card = headerEl.closest('.ld-card');
  card.classList.toggle('open');
}

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

  ALL_QUESTIONS.forEach((q, i) => { if (!q.id) q.id = i; });

  // Update home stats
  const totalEl = document.getElementById('stat-total');
  if (totalEl) totalEl.textContent = ALL_QUESTIONS.length;

  const mustEl = document.getElementById('stat-mustkno');
  if (mustEl) mustEl.textContent = ALL_QUESTIONS.filter(q => q.priority === 4).length;

  // Update subject counts
  const subjects = ['all','pharmaceutics','pharmacognosy','pharm-chemistry','anatomy','social-pharmacy'];
  subjects.forEach(s => {
    const el = document.getElementById(`sc-${s}`);
    if (!el) return;
    const count = s === 'all'
      ? ALL_QUESTIONS.length
      : ALL_QUESTIONS.filter(q => q.subject === s).length;
    el.textContent = `${count}q`;
  });

  initTheme();
  showScreen('screen-home');
}

document.addEventListener('DOMContentLoaded', init);
