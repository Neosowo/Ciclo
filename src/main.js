import './style.css';

// ============================================
// CICLO - Menstrual Cycle Tracker
// Professional, Clean, No Emojis
// ============================================

// SVG Icons
const ICONS = {
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  chevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
  chevronRight: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  sun: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  moon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  settings: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  upload: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  heart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  activity: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
  droplet: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`,
  zap: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  alertCircle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  target: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  refresh: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  leaf: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`,
  cloudRain: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path></svg>`
};

// Phase Data
const PHASES = {
  menstrual: {
    name: 'Fase Menstrual',
    shortName: 'Menstrual',
    icon: 'droplet',
    color: 'menstrual',
    description: 'El cuerpo está liberando el revestimiento uterino. Es normal sentirse más cansada y necesitar más descanso durante estos días.',
    affection: 'Mayor necesidad de comprensión y apoyo emocional. Puede preferir actividades tranquilas y reconfortantes.',
    mood: { energy: 30, mood: 40, libido: 20 },
    symptoms: ['Cólicos', 'Fatiga', 'Sensibilidad', 'Antojos'],
    tips: [
      'Ofrecer bebidas calientes y comida reconfortante',
      'Proponer actividades relajantes en casa',
      'Tener analgésicos disponibles si los necesita',
      'Mostrar apoyo sin esperar demasiada energía',
      'Ser especialmente paciente y comprensivo'
    ]
  },
  follicular: {
    name: 'Fase Folicular',
    shortName: 'Folicular',
    icon: 'leaf',
    color: 'follicular',
    description: 'Los niveles de estrógeno aumentan. Período de renovación con más energía, optimismo y creatividad.',
    affection: 'Mayor disposición para actividades sociales y proyectos nuevos. Buena receptividad emocional.',
    mood: { energy: 70, mood: 80, libido: 60 },
    symptoms: ['Mayor energía', 'Optimismo', 'Creatividad', 'Sociabilidad'],
    tips: [
      'Planificar salidas y actividades nuevas',
      'Buen momento para ejercicio conjunto',
      'Receptiva a conversaciones importantes',
      'Apoyar sus proyectos y metas',
      'Ideal para crear recuerdos juntos'
    ]
  },
  ovulation: {
    name: 'Fase de Ovulación',
    shortName: 'Ovulación',
    icon: 'star',
    color: 'ovulation',
    description: 'El óvulo es liberado. Niveles hormonales en su punto máximo. Período de máxima fertilidad.',
    affection: 'Punto más alto de conexión emocional y física. Mayor interés en intimidad y romanticismo.',
    mood: { energy: 90, mood: 95, libido: 95 },
    symptoms: ['Energía alta', 'Mayor atractivo', 'Sociabilidad', 'Flujo claro'],
    tips: [
      'Momento ideal para citas románticas',
      'Mayor interés en intimidad física',
      'Sorpresas y detalles son bien recibidos',
      'PERÍODO MÁS FÉRTIL - precaución necesaria',
      'Planificar algo especial estos días'
    ]
  },
  luteal: {
    name: 'Fase Lútea',
    shortName: 'Lútea',
    icon: 'moon',
    color: 'luteal',
    description: 'La progesterona aumenta. El cuerpo se prepara para un posible embarazo. Energía más introspectiva.',
    affection: 'Puede necesitar más espacio personal. Preferencia por actividades tranquilas y rutinarias.',
    mood: { energy: 50, mood: 55, libido: 40 },
    symptoms: ['Hinchazón leve', 'Cambios de humor', 'Antojos', 'Sensibilidad'],
    tips: [
      'Proponer actividades tranquilas y relajantes',
      'Un baño o spa casero puede ayudar',
      'Ambiente tranquilo y música relajante',
      'Comidas nutritivas y reconfortantes',
      'Respetar si necesita más descanso'
    ]
  },
  pms: {
    name: 'Síndrome Premenstrual',
    shortName: 'SPM',
    icon: 'cloudRain',
    color: 'pms',
    description: 'Los niveles hormonales caen drásticamente. Fase más desafiante emocionalmente antes del período.',
    affection: 'Puede experimentar irritabilidad o tristeza. Es importante no tomar las reacciones de forma personal.',
    mood: { energy: 25, mood: 30, libido: 25 },
    symptoms: ['Irritabilidad', 'Ansiedad', 'Tristeza', 'Dolor de cabeza'],
    tips: [
      'Evitar discusiones o temas sensibles',
      'Comida reconfortante sin comentarios',
      'No hacer observaciones sobre su humor',
      'Pequeños gestos significan mucho',
      'Paciencia extra - es temporal'
    ]
  }
};

// Month names
const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const WEEKDAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// App State
let state = {
  lastPeriodDate: null,
  cycleLength: 28,
  periodLength: 5,
  currentMonth: new Date().getMonth(),
  currentYear: new Date().getFullYear(),
  periodHistory: [],
  notes: {},
  theme: 'light'
};

// ============================================
// CYCLE CALCULATION FUNCTIONS
// ============================================

function calculateCycle(lastPeriodDate, cycleLength = 28, periodLength = 5) {
  const startDate = new Date(lastPeriodDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cycles = [];
  let cycleStart = new Date(startDate);

  while (cycleStart > new Date(today.getFullYear(), today.getMonth() - 3, 1)) {
    cycleStart.setDate(cycleStart.getDate() - cycleLength);
  }

  for (let i = 0; i < 12; i++) {
    const cycle = calculateSingleCycle(new Date(cycleStart), cycleLength, periodLength);
    cycles.push(cycle);
    cycleStart.setDate(cycleStart.getDate() + cycleLength);
  }

  return cycles;
}

function calculateSingleCycle(startDate, cycleLength, periodLength) {
  const cycle = {
    start: new Date(startDate),
    phases: {}
  };

  cycle.phases.menstrual = {
    start: new Date(startDate),
    end: addDays(startDate, periodLength - 1)
  };

  const ovulationDay = cycleLength - 14;

  cycle.phases.follicular = {
    start: addDays(startDate, periodLength),
    end: addDays(startDate, ovulationDay - 2)
  };

  cycle.phases.ovulation = {
    start: addDays(startDate, ovulationDay - 1),
    end: addDays(startDate, ovulationDay + 1)
  };

  cycle.fertileWindow = {
    start: addDays(startDate, ovulationDay - 5),
    end: addDays(startDate, ovulationDay + 1)
  };

  cycle.phases.luteal = {
    start: addDays(startDate, ovulationDay + 2),
    end: addDays(startDate, cycleLength - 7)
  };

  cycle.phases.pms = {
    start: addDays(startDate, cycleLength - 6),
    end: addDays(startDate, cycleLength - 1)
  };

  cycle.nextPeriod = addDays(startDate, cycleLength);

  return cycle;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getPhaseForDate(date, cycles) {
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);

  for (const cycle of cycles) {
    for (const [phaseName, phase] of Object.entries(cycle.phases)) {
      if (checkDate >= phase.start && checkDate <= phase.end) {
        return {
          phase: phaseName,
          ...PHASES[phaseName],
          isFertile: checkDate >= cycle.fertileWindow.start && checkDate <= cycle.fertileWindow.end
        };
      }
    }
  }

  return null;
}

function getDaysUntilNextPeriod(cycles) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const cycle of cycles) {
    if (cycle.nextPeriod > today) {
      const diffTime = cycle.nextPeriod - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }

  return null;
}

function getCurrentDayOfCycle(cycles) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const cycle of cycles) {
    const cycleEnd = addDays(cycle.start, state.cycleLength - 1);
    if (today >= cycle.start && today <= cycleEnd) {
      const diffTime = today - cycle.start;
      return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
  }

  return null;
}

function getCurrentPhaseInfo(cycles) {
  const today = new Date();
  return getPhaseForDate(today, cycles);
}

// ============================================
// STORAGE FUNCTIONS
// ============================================

function saveState() {
  localStorage.setItem('ciclo_state', JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem('ciclo_state');
  if (saved) {
    const parsed = JSON.parse(saved);
    state = { ...state, ...parsed };
    if (state.lastPeriodDate) {
      state.lastPeriodDate = new Date(state.lastPeriodDate);
    }
    state.periodHistory = (state.periodHistory || []).map(d => new Date(d));
  }

  // Apply theme
  document.documentElement.setAttribute('data-theme', state.theme);
}

function exportData() {
  const dataStr = JSON.stringify(state, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ciclo-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      state = { ...state, ...data };
      if (state.lastPeriodDate) {
        state.lastPeriodDate = new Date(state.lastPeriodDate);
      }
      state.periodHistory = (state.periodHistory || []).map(d => new Date(d));
      saveState();
      renderApp();
    } catch (err) {
      alert('Error al importar el archivo. Asegúrate de que sea un archivo válido.');
    }
  };
  reader.readAsText(file);
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  saveState();
  renderApp();
}

// ============================================
// RENDER FUNCTIONS
// ============================================

function renderApp() {
  const app = document.getElementById('app');

  if (!state.lastPeriodDate) {
    app.innerHTML = renderSetupView();
    attachSetupListeners();
  } else {
    const cycles = calculateCycle(state.lastPeriodDate, state.cycleLength, state.periodLength);
    app.innerHTML = renderMainView(cycles);
    attachMainListeners(cycles);
  }
}

function renderHeader() {
  return `
    <header class="header">
      <div class="header__brand">
        <svg class="header__logo" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:var(--color-primary)"/>
              <stop offset="100%" style="stop-color:var(--color-secondary)"/>
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="45" fill="url(#logoGrad)"/>
          <path d="M50 20 A30 30 0 0 1 50 80" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/>
          <circle cx="50" cy="20" r="6" fill="white"/>
        </svg>
        <h1 class="header__title">Ciclo</h1>
      </div>
      <div class="header__actions">
        <button class="header__btn" id="theme-toggle" title="Cambiar tema">
          ${state.theme === 'light' ? ICONS.moon : ICONS.sun}
        </button>
      </div>
    </header>
  `;
}

function renderSetupView() {
  const today = new Date().toISOString().split('T')[0];

  return `
    ${renderHeader()}
    
    <main class="animate-slide-up">
      <div class="card">
        <div class="card__header">
          <div>
            <h2 class="card__title">
              <span class="card__icon">${ICONS.calendar}</span>
              Configuración Inicial
            </h2>
            <p class="card__subtitle">Ingresa la información para comenzar el seguimiento</p>
          </div>
        </div>
        
        <form id="setup-form">
          <div class="form-group">
            <label class="form-label">Fecha del primer día del último período</label>
            <input 
              type="date" 
              id="last-period" 
              class="form-input" 
              max="${today}"
              required
            />
            <p class="form-hint">El primer día es cuando comienza el sangrado real, no el manchado previo.</p>
          </div>
          
          <div class="form-group">
            <label class="form-label">Duración promedio del ciclo</label>
            <div class="form-range-wrapper">
              <input 
                type="range" 
                id="cycle-length" 
                class="form-range"
                min="21" 
                max="35" 
                value="28"
              />
              <span class="form-range-value"><span id="cycle-length-value">28</span> días</span>
            </div>
            <p class="form-hint">El ciclo promedio es de 28 días (rango normal: 21-35 días)</p>
          </div>
          
          <div class="form-group">
            <label class="form-label">Duración promedio del período</label>
            <div class="form-range-wrapper">
              <input 
                type="range" 
                id="period-length" 
                class="form-range"
                min="3" 
                max="7" 
                value="5"
              />
              <span class="form-range-value"><span id="period-length-value">5</span> días</span>
            </div>
            <p class="form-hint">Días de sangrado activo</p>
          </div>
          
          <button type="submit" class="btn btn-primary btn-full">
            ${ICONS.check}
            Comenzar seguimiento
          </button>
        </form>
      </div>
      
      <div class="card animate-slide-up stagger-2">
        <h3 class="card__title">
          <span class="card__icon">${ICONS.info}</span>
          Acerca de esta aplicación
        </h3>
        <p style="color: var(--color-text-secondary); line-height: 1.7;">
          Esta aplicación te ayuda a entender y anticipar las diferentes fases del ciclo menstrual. 
          Conocer estas fases permite comprender mejor los cambios de energía, humor y necesidades 
          emocionales a lo largo del mes. Toda la información se guarda localmente en tu dispositivo.
        </p>
      </div>
    </main>
  `;
}

function renderMainView(cycles) {
  const currentPhase = getCurrentPhaseInfo(cycles);
  const daysUntilPeriod = getDaysUntilNextPeriod(cycles);
  const currentDay = getCurrentDayOfCycle(cycles);
  const today = new Date().toISOString().split('T')[0];

  return `
    ${renderHeader()}
    
    <main>
      ${renderCycleVisualization(currentDay, currentPhase)}
      
      ${daysUntilPeriod !== null ? renderCountdown(daysUntilPeriod) : ''}
      
      ${renderStats(cycles)}
      
      ${currentPhase ? renderPhasePanel(currentPhase) : ''}
      
      ${renderCalendar(cycles)}
      
      ${renderLegend()}
      
      ${renderHistorySection(today)}
      
      ${renderSettingsSection()}
    </main>
  `;
}

function renderCycleVisualization(currentDay, currentPhase) {
  if (!currentDay) return '';

  const progress = (currentDay / state.cycleLength) * 100;
  const circumference = 2 * Math.PI * 110;
  const offset = circumference - (progress / 100) * circumference;

  const phaseColor = currentPhase ? `var(--color-${currentPhase.color})` : 'var(--color-primary)';

  return `
    <div class="card animate-fade-in">
      <div class="cycle-ring">
        <svg class="cycle-ring__svg" viewBox="0 0 280 280">
          <circle class="cycle-ring__bg" cx="140" cy="140" r="110"/>
          <circle 
            class="cycle-ring__progress" 
            cx="140" cy="140" r="110"
            stroke="${phaseColor}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${offset}"
          />
        </svg>
        <div class="cycle-ring__center">
          <div class="cycle-ring__day" style="color: ${phaseColor}">Día ${currentDay}</div>
          <div class="cycle-ring__label">de ${state.cycleLength}</div>
          ${currentPhase ? `
            <div class="cycle-ring__phase" style="background: var(--color-${currentPhase.color}-bg); color: var(--color-${currentPhase.color});">
              ${currentPhase.shortName}
            </div>
          ` : ''}
        </div>
      </div>
      
      <div class="phase-indicator">
        ${Object.keys(PHASES).map(phase => `
          <div class="phase-indicator__segment phase-indicator__segment--${phase} ${currentPhase?.phase === phase ? 'phase-indicator__segment--active' : ''}"></div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderCountdown(days) {
  let note = '';
  if (days <= 3) {
    note = 'Se aproxima el próximo período';
  } else if (days <= 7) {
    note = 'Aproximadamente una semana';
  } else {
    note = 'Estimación basada en el ciclo promedio';
  }

  return `
    <div class="countdown animate-slide-up stagger-1">
      <p class="countdown__label">Próximo período estimado en</p>
      <div class="countdown__value">
        <span>${days}</span>
        <span class="countdown__unit">${days === 1 ? 'día' : 'días'}</span>
      </div>
      <p class="countdown__note">${note}</p>
    </div>
  `;
}

function renderStats(cycles) {
  const today = new Date();
  const currentPhase = getCurrentPhaseInfo(cycles);

  let daysUntilOvulation = null;
  for (const cycle of cycles) {
    if (cycle.phases.ovulation.start > today) {
      daysUntilOvulation = Math.ceil((cycle.phases.ovulation.start - today) / (1000 * 60 * 60 * 24));
      break;
    }
  }

  let isFertile = false;
  for (const cycle of cycles) {
    if (today >= cycle.fertileWindow.start && today <= cycle.fertileWindow.end) {
      isFertile = true;
      break;
    }
  }

  return `
    <div class="stats-grid animate-slide-up stagger-2">
      <div class="stat-card">
        <div class="stat-card__icon">${ICONS.activity}</div>
        <div class="stat-card__value">${currentPhase?.shortName || '—'}</div>
        <div class="stat-card__label">Fase actual</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-card__icon">${ICONS.refresh}</div>
        <div class="stat-card__value">${state.cycleLength}</div>
        <div class="stat-card__label">Días del ciclo</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-card__icon">${isFertile ? ICONS.alertCircle : ICONS.check}</div>
        <div class="stat-card__value">${isFertile ? 'Sí' : 'No'}</div>
        <div class="stat-card__label">Período fértil</div>
      </div>
      
      <div class="stat-card">
        <div class="stat-card__icon">${ICONS.target}</div>
        <div class="stat-card__value">${daysUntilOvulation ?? '—'}</div>
        <div class="stat-card__label">Días p/ ovulación</div>
      </div>
    </div>
  `;
}

function renderPhasePanel(phase) {
  return `
    <div class="phase-panel animate-slide-up stagger-3">
      <div class="phase-panel__header">
        <div class="phase-panel__badge phase-panel__badge--${phase.color}">
          ${ICONS[phase.icon]}
        </div>
        <div>
          <h2 class="phase-panel__title">${phase.name}</h2>
          <p class="phase-panel__subtitle">Información de la fase actual</p>
        </div>
      </div>
      
      <div class="phase-panel__grid">
        <div class="phase-panel__section">
          <h4 class="phase-panel__section-title">Descripción</h4>
          <p class="phase-panel__section-text">${phase.description}</p>
        </div>
        
        <div class="phase-panel__section">
          <h4 class="phase-panel__section-title">Nivel de afecto</h4>
          <p class="phase-panel__section-text">${phase.affection}</p>
        </div>
        
        <div class="phase-panel__section">
          <h4 class="phase-panel__section-title">Niveles estimados</h4>
          <div class="mood-bars">
            <div class="mood-bar">
              <div class="mood-bar__header">
                <span>Energía</span>
                <span>${phase.mood.energy}%</span>
              </div>
              <div class="mood-bar__track">
                <div class="mood-bar__fill mood-bar__fill--energy" style="width: ${phase.mood.energy}%"></div>
              </div>
            </div>
            <div class="mood-bar">
              <div class="mood-bar__header">
                <span>Estado de ánimo</span>
                <span>${phase.mood.mood}%</span>
              </div>
              <div class="mood-bar__track">
                <div class="mood-bar__fill mood-bar__fill--mood" style="width: ${phase.mood.mood}%"></div>
              </div>
            </div>
            <div class="mood-bar">
              <div class="mood-bar__header">
                <span>Libido</span>
                <span>${phase.mood.libido}%</span>
              </div>
              <div class="mood-bar__track">
                <div class="mood-bar__fill mood-bar__fill--libido" style="width: ${phase.mood.libido}%"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="phase-panel__section">
          <h4 class="phase-panel__section-title">Síntomas comunes</h4>
          <div class="symptoms-tags">
            ${phase.symptoms.map(s => `<span class="symptom-tag">${s}</span>`).join('')}
          </div>
        </div>
      </div>
      
      <div class="phase-panel__section" style="margin-top: var(--space-lg);">
        <h4 class="phase-panel__section-title">Recomendaciones</h4>
        <div class="tips-list">
          ${phase.tips.map(tip => `
            <div class="tip-item">
              <span class="tip-item__icon">${ICONS.check}</span>
              <p class="tip-item__text">${tip}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderCalendar(cycles) {
  const year = state.currentYear;
  const month = state.currentMonth;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startingDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let daysHTML = '';

  for (let i = 0; i < startingDay; i++) {
    daysHTML += '<div class="calendar__day calendar__day--empty"></div>';
  }

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);

    const phaseInfo = getPhaseForDate(date, cycles);
    const isToday = date.getTime() === today.getTime();

    let classes = ['calendar__day'];

    if (isToday) classes.push('calendar__day--today');

    if (phaseInfo) {
      classes.push(`calendar__day--${phaseInfo.phase}`);
      if (phaseInfo.isFertile) {
        classes.push('calendar__day--fertile');
      }
    }

    daysHTML += `
      <div class="${classes.join(' ')}" data-date="${date.toISOString()}">
        <span>${day}</span>
      </div>
    `;
  }

  return `
    <div class="calendar animate-slide-up stagger-4">
      <div class="calendar__header">
        <div class="calendar__nav">
          <button class="calendar__nav-btn" id="prev-month">
            ${ICONS.chevronLeft}
          </button>
          <button class="calendar__nav-btn" id="next-month">
            ${ICONS.chevronRight}
          </button>
        </div>
        <h3 class="calendar__month-year">${MONTH_NAMES[month]} ${year}</h3>
      </div>
      
      <div class="calendar__weekdays">
        ${WEEKDAY_NAMES.map(day => `<div class="calendar__weekday">${day}</div>`).join('')}
      </div>
      
      <div class="calendar__days">
        ${daysHTML}
      </div>
    </div>
  `;
}

function renderLegend() {
  return `
    <div class="legend">
      <div class="legend__item">
        <div class="legend__color legend__color--menstrual"></div>
        <span>Menstruación</span>
      </div>
      <div class="legend__item">
        <div class="legend__color legend__color--follicular"></div>
        <span>Folicular</span>
      </div>
      <div class="legend__item">
        <div class="legend__color legend__color--ovulation"></div>
        <span>Ovulación</span>
      </div>
      <div class="legend__item">
        <div class="legend__color legend__color--luteal"></div>
        <span>Lútea</span>
      </div>
      <div class="legend__item">
        <div class="legend__color legend__color--pms"></div>
        <span>SPM</span>
      </div>
    </div>
  `;
}

function renderHistorySection(today) {
  return `
    <div class="card">
      <div class="card__header">
        <div>
          <h3 class="card__title">
            <span class="card__icon">${ICONS.plus}</span>
            Registrar período
          </h3>
          <p class="card__subtitle">Añade un nuevo registro cuando inicie el período</p>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Fecha de inicio</label>
        <input 
          type="date" 
          id="new-period-date" 
          class="form-input" 
          max="${today}"
        />
      </div>
      
      <button id="add-period-btn" class="btn btn-primary btn-full mb-lg">
        ${ICONS.plus}
        Registrar
      </button>
      
      ${state.periodHistory.length > 0 ? `
        <div class="settings-section">
          <h4 class="card__title" style="font-size: var(--font-size-sm); margin-bottom: var(--space-md);">
            Historial de registros
          </h4>
          <div class="history-list">
            ${state.periodHistory.slice().reverse().map((date, index) => `
              <div class="history-item">
                <div class="history-item__date">
                  <span class="history-item__icon">${ICONS.calendar}</span>
                  ${formatDate(date)}
                </div>
                <button class="history-item__delete" data-index="${state.periodHistory.length - 1 - index}">
                  ${ICONS.x}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

function renderSettingsSection() {
  return `
    <div class="card">
      <div class="card__header">
        <div>
          <h3 class="card__title">
            <span class="card__icon">${ICONS.settings}</span>
            Ajustes
          </h3>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Duración del ciclo</label>
        <div class="form-range-wrapper">
          <input 
            type="range" 
            id="adjust-cycle" 
            class="form-range"
            min="21" 
            max="35" 
            value="${state.cycleLength}"
          />
          <span class="form-range-value">${state.cycleLength} días</span>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Duración del período</label>
        <div class="form-range-wrapper">
          <input 
            type="range" 
            id="adjust-period" 
            class="form-range"
            min="3" 
            max="7" 
            value="${state.periodLength}"
          />
          <span class="form-range-value">${state.periodLength} días</span>
        </div>
      </div>
      
      <div class="settings-section">
        <h4 style="font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-secondary); margin-bottom: var(--space-md);">
          Datos
        </h4>
        <div class="data-actions">
          <button id="export-btn" class="btn btn-secondary">
            ${ICONS.download}
            Exportar
          </button>
          <label class="btn btn-secondary" style="cursor: pointer;">
            ${ICONS.upload}
            Importar
            <input type="file" id="import-input" accept=".json" style="display: none;" />
          </label>
          <button id="reset-btn" class="btn btn-danger">
            ${ICONS.trash}
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  `;
}

function formatDate(date) {
  const d = new Date(date);
  return `${d.getDate()} de ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

// ============================================
// EVENT LISTENERS
// ============================================

function attachSetupListeners() {
  // Theme toggle
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  // Range sliders
  const cycleLengthSlider = document.getElementById('cycle-length');
  const periodLengthSlider = document.getElementById('period-length');

  cycleLengthSlider?.addEventListener('input', (e) => {
    document.getElementById('cycle-length-value').textContent = e.target.value;
  });

  periodLengthSlider?.addEventListener('input', (e) => {
    document.getElementById('period-length-value').textContent = e.target.value;
  });

  // Form submission
  document.getElementById('setup-form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const lastPeriod = document.getElementById('last-period').value;
    const cycleLength = parseInt(document.getElementById('cycle-length').value);
    const periodLength = parseInt(document.getElementById('period-length').value);

    if (lastPeriod) {
      state.lastPeriodDate = new Date(lastPeriod);
      state.cycleLength = cycleLength;
      state.periodLength = periodLength;
      state.periodHistory = [new Date(lastPeriod)];

      saveState();
      renderApp();
    }
  });
}

function attachMainListeners(cycles) {
  // Theme toggle
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);

  // Calendar navigation
  document.getElementById('prev-month')?.addEventListener('click', () => {
    state.currentMonth--;
    if (state.currentMonth < 0) {
      state.currentMonth = 11;
      state.currentYear--;
    }
    renderApp();
  });

  document.getElementById('next-month')?.addEventListener('click', () => {
    state.currentMonth++;
    if (state.currentMonth > 11) {
      state.currentMonth = 0;
      state.currentYear++;
    }
    renderApp();
  });

  // Calendar day clicks
  document.querySelectorAll('.calendar__day:not(.calendar__day--empty)').forEach(day => {
    day.addEventListener('click', () => {
      const date = new Date(day.dataset.date);
      const phaseInfo = getPhaseForDate(date, cycles);

      if (phaseInfo) {
        showDayModal(date, phaseInfo);
      }
    });
  });

  // Add new period
  document.getElementById('add-period-btn')?.addEventListener('click', () => {
    const dateInput = document.getElementById('new-period-date');
    if (dateInput.value) {
      const newDate = new Date(dateInput.value);
      state.lastPeriodDate = newDate;
      state.periodHistory.push(newDate);
      saveState();
      renderApp();
    }
  });

  // Delete history item
  document.querySelectorAll('.history-item__delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      state.periodHistory.splice(index, 1);

      if (state.periodHistory.length > 0) {
        state.lastPeriodDate = state.periodHistory[state.periodHistory.length - 1];
      } else {
        state.lastPeriodDate = null;
      }

      saveState();
      renderApp();
    });
  });

  // Adjust cycle length
  document.getElementById('adjust-cycle')?.addEventListener('change', (e) => {
    state.cycleLength = parseInt(e.target.value);
    saveState();
    renderApp();
  });

  // Adjust period length
  document.getElementById('adjust-period')?.addEventListener('change', (e) => {
    state.periodLength = parseInt(e.target.value);
    saveState();
    renderApp();
  });

  // Export data
  document.getElementById('export-btn')?.addEventListener('click', exportData);

  // Import data
  document.getElementById('import-input')?.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      importData(e.target.files[0]);
    }
  });

  // Reset button
  document.getElementById('reset-btn')?.addEventListener('click', () => {
    if (confirm('¿Confirmas que deseas eliminar todos los datos? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('ciclo_state');
      state = {
        lastPeriodDate: null,
        cycleLength: 28,
        periodLength: 5,
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        periodHistory: [],
        notes: {},
        theme: state.theme
      };
      renderApp();
    }
  });
}

function showDayModal(date, phaseInfo) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay modal-overlay--active';
  modal.innerHTML = `
    <div class="modal">
      <button class="modal__close">${ICONS.x}</button>
      
      <div class="modal__header">
        <h3 class="modal__title">${formatDate(date)}</h3>
        <p class="modal__subtitle">${phaseInfo.name}</p>
      </div>
      
      <div class="phase-panel__section mb-md">
        <h4 class="phase-panel__section-title">Descripción</h4>
        <p class="phase-panel__section-text">${phaseInfo.description}</p>
      </div>
      
      <div class="phase-panel__section mb-md">
        <h4 class="phase-panel__section-title">Nivel de afecto</h4>
        <p class="phase-panel__section-text">${phaseInfo.affection}</p>
      </div>
      
      ${phaseInfo.isFertile ? `
        <div class="phase-panel__section fertile-warning">
          <h4 class="phase-panel__section-title fertile-warning__title">
            <span class="fertile-warning__icon">${ICONS.alertCircle}</span>
            Período fértil
          </h4>
          <p class="phase-panel__section-text">
            Alta probabilidad de embarazo. Tomar precauciones si no se desea concebir.
          </p>
        </div>
      ` : ''}
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('.modal__close')) {
      modal.classList.remove('modal-overlay--active');
      setTimeout(() => modal.remove(), 250);
    }
  });
}

// ============================================
// INITIALIZE APP
// ============================================

loadState();
renderApp();

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, app still works
    });
  });
}
