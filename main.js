// Ciclo - Rastreador de Ciclo Menstrual
// Toda la lógica de la aplicación

(function() {
    'use strict';

    // ===== Constants =====
    const STORAGE_KEY = 'ciclo_data';
    const PHASE_INFO = {
        menstrual: {
            name: 'Menstrual',
            days: '1-5',
            description: 'Tu cuerpo está liberando el revestimiento uterino. Es normal experimentar calambres, fatiga y cambios de humor. Escucha a tu cuerpo y descansa cuando lo necesites.',
            symptoms: ['Calambres abdominales', 'Fatiga y cansancio', 'Dolor de espalda baja', 'Sensibilidad en los senos', 'Cambios de humor'],
            recommendations: ['Descanso adecuado', 'Calor local para calambres', 'Hidratación abundante', 'Ejercicio suave', 'Alimentos ricos en hierro'],
            color: 'menstrual',
            gradient: 'menstrualGradient'
        },
        follicular: {
            name: 'Folicular',
            days: '6-13',
            description: 'Después del período, tus niveles de estrógeno comienzan a subir. Probablemente sientas más energía, optimismo y creatividad. Es un buen momento para comenzar nuevos proyectos.',
            symptoms: ['Aumento de energía', 'Mayor concentración', 'Piel más clara', 'Mejor estado de ánimo', 'Mayor creatividad'],
            recommendations: ['Ejercicio intenso', 'Iniciar nuevos proyectos', 'Socializar más', 'Planificar actividades', 'Dieta equilibrada'],
            color: 'follicular',
            gradient: 'follicularGradient'
        },
        ovulation: {
            name: 'Ovulación',
            days: '~14',
            description: 'Tu óvulo es liberado y estás en tu punto máximo de fertilidad. La energía y la confianza suelen estar en su punto más alto. Es cuando te sientes más social y comunicativa.',
            symptoms: ['Máxima energía', 'Mayor deseo', 'Dolor ovulatorio leve', 'Flujo más abundante', 'Mayor confianza'],
            recommendations: ['Actividades sociales', 'Ejercicio de alto impacto', 'Comunicación importante', 'Citas y eventos', 'Protección si no deseas embarazo'],
            color: 'ovulation',
            gradient: 'ovulationGradient'
        },
        luteal: {
            name: 'Lútea',
            days: '15-22',
            description: 'Después de la ovulación, la progesterona aumenta. Puedes sentirte más introspectiva y preferir actividades tranquilas. Es momento de completar tareas pendientes.',
            symptoms: ['Energía estable', 'Mayor apetito', 'Retención de líquidos leve', 'Sensibilidad emocional', 'Necesidad de descanso'],
            recommendations: ['Completar proyectos', 'Ejercicio moderado', 'Alimentos nutritivos', 'Tiempo a solas', 'Preparar para el SPM'],
            color: 'luteal',
            gradient: 'lutealGradient'
        },
        pms: {
            name: 'SPM',
            days: '23-28',
            description: 'Los días previos al período pueden traer síntomas premenstruales. La progesterona cae y puedes experimentar cambios de humor, antojos y fatiga. Sé amable contigo misma.',
            symptoms: ['Cambios de humor', 'Antojos de comida', 'Hinchazón', 'Sensibilidad en senos', 'Irritabilidad'],
            recommendations: ['Reducir cafeína y sal', 'Ejercicio ligero', 'Dormir más', 'Manejar el estrés', 'Preparar para el período'],
            color: 'pms',
            gradient: 'pmsGradient'
        }
    };

    const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    // ===== State =====
    let state = {
        lastPeriodDate: null,
        cycleLength: 28,
        periodLength: 5,
        periodLogs: [],
        theme: 'light'
    };

    let currentCalendarDate = new Date();
    let deferredPrompt = null;

    // ===== DOM Elements =====
    const elements = {};

    // ===== Initialize =====
    function init() {
        cacheElements();
        loadData();
        setupEventListeners();
        updateUI();
        registerServiceWorker();
    }

    function cacheElements() {
        elements.themeToggle = document.getElementById('themeToggle');
        elements.menuToggle = document.getElementById('menuToggle');
        elements.settingsPanel = document.getElementById('settingsPanel');
        elements.settingsOverlay = document.getElementById('settingsOverlay');
        elements.closeSettings = document.getElementById('closeSettings');
        elements.currentDay = document.getElementById('currentDay');
        elements.currentPhase = document.getElementById('currentPhase');
        elements.progressRing = document.getElementById('progressRing');
        elements.fertileWindow = document.getElementById('fertileWindow');
        elements.ovulationDate = document.getElementById('ovulationDate');
        elements.nextPeriod = document.getElementById('nextPeriod');
        elements.phaseTitle = document.getElementById('phaseTitle');
        elements.phaseBadge = document.getElementById('phaseBadge');
        elements.phaseDescription = document.getElementById('phaseDescription');
        elements.symptomsList = document.getElementById('symptomsList');
        elements.recommendationsList = document.getElementById('recommendationsList');
        elements.calendarTitle = document.getElementById('calendarTitle');
        elements.calendarGrid = document.getElementById('calendarGrid');
        elements.prevMonth = document.getElementById('prevMonth');
        elements.nextMonth = document.getElementById('nextMonth');
        elements.periodLogList = document.getElementById('periodLogList');
        elements.addPeriodBtn = document.getElementById('addPeriodBtn');
        elements.addPeriodModal = document.getElementById('addPeriodModal');
        elements.modalOverlay = document.getElementById('modalOverlay');
        elements.closeModal = document.getElementById('closeModal');
        elements.cancelModal = document.getElementById('cancelModal');
        elements.savePeriod = document.getElementById('savePeriod');
        elements.newPeriodDate = document.getElementById('newPeriodDate');
        elements.lastPeriodDate = document.getElementById('lastPeriodDate');
        elements.cycleLength = document.getElementById('cycleLength');
        elements.cycleLengthValue = document.getElementById('cycleLengthValue');
        elements.periodLength = document.getElementById('periodLength');
        elements.periodLengthValue = document.getElementById('periodLengthValue');
        elements.exportData = document.getElementById('exportData');
        elements.importData = document.getElementById('importData');
        elements.importFile = document.getElementById('importFile');
        elements.clearData = document.getElementById('clearData');
        elements.toast = document.getElementById('toast');
        elements.toastMessage = document.getElementById('toastMessage');
        elements.installPrompt = document.getElementById('installPrompt');
        elements.installApp = document.getElementById('installApp');
        elements.dismissInstall = document.getElementById('dismissInstall');
    }

    function setupEventListeners() {
        // Theme toggle
        elements.themeToggle.addEventListener('click', toggleTheme);

        // Settings panel
        elements.menuToggle.addEventListener('click', () => togglePanel(true));
        elements.closeSettings.addEventListener('click', () => togglePanel(false));
        elements.settingsOverlay.addEventListener('click', () => togglePanel(false));

        // Settings inputs
        elements.lastPeriodDate.addEventListener('change', handleLastPeriodChange);
        elements.cycleLength.addEventListener('input', handleCycleLengthChange);
        elements.periodLength.addEventListener('input', handlePeriodLengthChange);

        // Calendar navigation
        elements.prevMonth.addEventListener('click', () => navigateMonth(-1));
        elements.nextMonth.addEventListener('click', () => navigateMonth(1));

        // Add period modal
        elements.addPeriodBtn.addEventListener('click', () => toggleModal(true));
        elements.closeModal.addEventListener('click', () => toggleModal(false));
        elements.cancelModal.addEventListener('click', () => toggleModal(false));
        elements.modalOverlay.addEventListener('click', () => toggleModal(false));
        elements.savePeriod.addEventListener('click', savePeriod);

        // Data management
        elements.exportData.addEventListener('click', exportData);
        elements.importData.addEventListener('click', () => elements.importFile.click());
        elements.importFile.addEventListener('change', importData);
        elements.clearData.addEventListener('click', clearData);

        // Install prompt
        elements.installApp.addEventListener('click', installApp);
        elements.dismissInstall.addEventListener('click', dismissInstall);

        // PWA install event
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            setTimeout(() => {
                elements.installPrompt.classList.add('active');
            }, 3000);
        });
    }

    // ===== Data Management =====
    function loadData() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                state = { ...state, ...data };
                if (state.lastPeriodDate) {
                    state.lastPeriodDate = new Date(state.lastPeriodDate);
                }
                state.periodLogs = (state.periodLogs || []).map(log => ({
                    ...log,
                    date: new Date(log.date)
                }));
            } catch (e) {
                console.error('Error loading data:', e);
            }
        }
        
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', state.theme);
    }

    function saveData() {
        const dataToSave = {
            ...state,
            lastPeriodDate: state.lastPeriodDate ? state.lastPeriodDate.toISOString() : null,
            periodLogs: state.periodLogs.map(log => ({
                ...log,
                date: log.date.toISOString()
            }))
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    }

    // ===== Cycle Calculations =====
    function getCycleDay() {
        if (!state.lastPeriodDate) return null;
        const today = new Date();
        const diffTime = today - state.lastPeriodDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        // Handle cycles that have passed
        if (diffDays > state.cycleLength) {
            return ((diffDays - 1) % state.cycleLength) + 1;
        }
        return diffDays;
    }

    function getPhaseForDay(day) {
        if (!day || day < 1) return null;
        
        const ovulationDay = state.cycleLength - 14;
        const pmsStart = state.cycleLength - 6;

        if (day <= state.periodLength) return 'menstrual';
        if (day < ovulationDay - 2) return 'follicular';
        if (day >= ovulationDay - 2 && day <= ovulationDay + 1) return 'ovulation';
        if (day > ovulationDay + 1 && day < pmsStart) return 'luteal';
        return 'pms';
    }

    function getFertileWindow() {
        if (!state.lastPeriodDate) return null;
        
        const ovulationDay = state.cycleLength - 14;
        const fertileStart = ovulationDay - 5;
        const fertileEnd = ovulationDay + 1;
        
        return { start: fertileStart, end: fertileEnd };
    }

    function getOvulationDate() {
        if (!state.lastPeriodDate) return null;
        
        const ovulationDay = state.cycleLength - 14;
        const ovulationDate = new Date(state.lastPeriodDate);
        ovulationDate.setDate(ovulationDate.getDate() + ovulationDay - 1);
        
        return ovulationDate;
    }

    function getNextPeriodDate() {
        if (!state.lastPeriodDate) return null;
        
        const nextPeriod = new Date(state.lastPeriodDate);
        const today = new Date();
        
        while (nextPeriod <= today) {
            nextPeriod.setDate(nextPeriod.getDate() + state.cycleLength);
        }
        
        return nextPeriod;
    }

    function getDaysUntil(date) {
        if (!date) return null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = new Date(date);
        target.setHours(0, 0, 0, 0);
        const diffTime = target - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // ===== UI Updates =====
    function updateUI() {
        updateCycleRing();
        updateQuickStats();
        updatePhaseInfo();
        updateCalendar();
        updatePeriodLog();
        updateSettings();
    }

    function updateCycleRing() {
        const day = getCycleDay();
        const phase = getPhaseForDay(day);
        
        if (day && phase) {
            elements.currentDay.textContent = day;
            elements.currentPhase.textContent = PHASE_INFO[phase].name;
            
            // Set phase color on badge
            elements.currentPhase.style.background = `var(--color-${phase})`;
            elements.currentPhase.style.color = 'white';
            
            // Update ring progress
            const progress = day / state.cycleLength;
            const circumference = 2 * Math.PI * 85; // radius = 85
            const offset = circumference * (1 - progress);
            elements.progressRing.style.strokeDasharray = circumference;
            elements.progressRing.style.strokeDashoffset = offset;
            elements.progressRing.style.stroke = `url(#${PHASE_INFO[phase].gradient})`;
        } else {
            elements.currentDay.textContent = '--';
            elements.currentPhase.textContent = 'Sin datos';
            elements.currentPhase.style.background = '';
            elements.currentPhase.style.color = '';
            elements.progressRing.style.strokeDashoffset = 534;
        }
    }

    function updateQuickStats() {
        const fertile = getFertileWindow();
        const ovulation = getOvulationDate();
        const nextPeriod = getNextPeriodDate();
        
        if (fertile) {
            const cycleDay = getCycleDay();
            if (cycleDay >= fertile.start && cycleDay <= fertile.end) {
                elements.fertileWindow.textContent = 'Ahora';
            } else if (cycleDay < fertile.start) {
                elements.fertileWindow.textContent = `En ${fertile.start - cycleDay} días`;
            } else {
                elements.fertileWindow.textContent = 'Pasada';
            }
        } else {
            elements.fertileWindow.textContent = '--';
        }

        if (ovulation) {
            const daysUntil = getDaysUntil(ovulation);
            if (daysUntil === 0) {
                elements.ovulationDate.textContent = 'Hoy';
            } else if (daysUntil > 0) {
                elements.ovulationDate.textContent = `En ${daysUntil} días`;
            } else {
                elements.ovulationDate.textContent = formatDate(ovulation);
            }
        } else {
            elements.ovulationDate.textContent = '--';
        }

        if (nextPeriod) {
            const daysUntil = getDaysUntil(nextPeriod);
            if (daysUntil === 0) {
                elements.nextPeriod.textContent = 'Hoy';
            } else if (daysUntil === 1) {
                elements.nextPeriod.textContent = 'Mañana';
            } else {
                elements.nextPeriod.textContent = `En ${daysUntil} días`;
            }
        } else {
            elements.nextPeriod.textContent = '--';
        }
    }

    function updatePhaseInfo() {
        const day = getCycleDay();
        const phase = getPhaseForDay(day);
        
        if (phase) {
            const info = PHASE_INFO[phase];
            elements.phaseTitle.textContent = 'Fase actual';
            elements.phaseBadge.textContent = `${info.name} - Días ${info.days}`;
            elements.phaseBadge.style.background = `var(--color-${phase})`;
            elements.phaseDescription.textContent = info.description;
            
            elements.symptomsList.innerHTML = info.symptoms.map(s => `<li>${s}</li>`).join('');
            elements.recommendationsList.innerHTML = info.recommendations.map(r => `<li>${r}</li>`).join('');
        } else {
            elements.phaseTitle.textContent = 'Configura tu ciclo';
            elements.phaseBadge.textContent = 'Sin datos';
            elements.phaseBadge.style.background = '';
            elements.phaseDescription.textContent = 'Ingresa la fecha del primer día de tu último período en la configuración para comenzar a rastrear tu ciclo.';
            elements.symptomsList.innerHTML = '<li>--</li>';
            elements.recommendationsList.innerHTML = '<li>--</li>';
        }
    }

    function updateCalendar() {
        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth();
        
        elements.calendarTitle.textContent = `${MONTHS[month]} ${year}`;
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let html = '';
        
        // Previous month days
        const prevMonth = new Date(year, month, 0);
        const prevMonthDays = prevMonth.getDate();
        for (let i = startingDay - 1; i >= 0; i--) {
            const day = prevMonthDays - i;
            const date = new Date(year, month - 1, day);
            const phase = getPhaseForDate(date);
            const classes = ['calendar-day', 'other-month'];
            if (phase) classes.push(phase);
            html += `<div class="${classes.join(' ')}">${day}</div>`;
        }
        
        // Current month days
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(year, month, day);
            date.setHours(0, 0, 0, 0);
            const phase = getPhaseForDate(date);
            const isFertile = isDateInFertileWindow(date);
            const isToday = date.getTime() === today.getTime();
            
            const classes = ['calendar-day'];
            if (isToday) classes.push('today');
            if (phase) classes.push(phase);
            if (isFertile && phase !== 'ovulation') classes.push('fertile');
            
            html += `<div class="${classes.join(' ')}">${day}</div>`;
        }
        
        // Next month days
        const remainingDays = 42 - (startingDay + totalDays);
        for (let day = 1; day <= remainingDays; day++) {
            const date = new Date(year, month + 1, day);
            const phase = getPhaseForDate(date);
            const classes = ['calendar-day', 'other-month'];
            if (phase) classes.push(phase);
            html += `<div class="${classes.join(' ')}">${day}</div>`;
        }
        
        elements.calendarGrid.innerHTML = html;
    }

    function getPhaseForDate(date) {
        if (!state.lastPeriodDate) return null;
        
        const diffTime = date - state.lastPeriodDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        if (diffDays < 1) return null;
        
        const cycleDay = ((diffDays - 1) % state.cycleLength) + 1;
        return getPhaseForDay(cycleDay);
    }

    function isDateInFertileWindow(date) {
        if (!state.lastPeriodDate) return false;
        
        const diffTime = date - state.lastPeriodDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
        if (diffDays < 1) return false;
        
        const cycleDay = ((diffDays - 1) % state.cycleLength) + 1;
        const fertile = getFertileWindow();
        
        return fertile && cycleDay >= fertile.start && cycleDay <= fertile.end;
    }

    function updatePeriodLog() {
        if (state.periodLogs.length === 0) {
            elements.periodLogList.innerHTML = '<div class="empty-log">No hay períodos registrados</div>';
            return;
        }
        
        const sortedLogs = [...state.periodLogs].sort((a, b) => b.date - a.date);
        
        let html = '';
        for (let i = 0; i < sortedLogs.length; i++) {
            const log = sortedLogs[i];
            const nextLog = sortedLogs[i + 1];
            const cycleDays = nextLog ? Math.round((log.date - nextLog.date) / (1000 * 60 * 60 * 24)) : null;
            
            html += `
                <div class="period-log-item" data-date="${log.date.toISOString()}">
                    <div>
                        <span class="period-log-date">${formatDate(log.date)}</span>
                        ${cycleDays ? `<span class="period-log-days">Ciclo de ${cycleDays} días</span>` : ''}
                    </div>
                    <button class="period-log-delete" onclick="app.deletePeriodLog('${log.date.toISOString()}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            `;
        }
        
        elements.periodLogList.innerHTML = html;
    }

    function updateSettings() {
        if (state.lastPeriodDate) {
            elements.lastPeriodDate.value = formatDateInput(state.lastPeriodDate);
        }
        elements.cycleLength.value = state.cycleLength;
        elements.cycleLengthValue.textContent = state.cycleLength;
        elements.periodLength.value = state.periodLength;
        elements.periodLengthValue.textContent = state.periodLength;
    }

    // ===== Event Handlers =====
    function toggleTheme() {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        saveData();
    }

    function togglePanel(show) {
        if (show) {
            elements.settingsPanel.classList.add('active');
        } else {
            elements.settingsPanel.classList.remove('active');
        }
    }

    function toggleModal(show) {
        if (show) {
            elements.newPeriodDate.value = formatDateInput(new Date());
            elements.addPeriodModal.classList.add('active');
        } else {
            elements.addPeriodModal.classList.remove('active');
        }
    }

    function handleLastPeriodChange(e) {
        const date = new Date(e.target.value + 'T00:00:00');
        if (!isNaN(date.getTime())) {
            state.lastPeriodDate = date;
            
            // Also add to period logs if not exists
            const exists = state.periodLogs.some(log => 
                formatDateInput(log.date) === formatDateInput(date)
            );
            if (!exists) {
                state.periodLogs.push({ date: date });
            }
            
            saveData();
            updateUI();
            showToast('Fecha actualizada');
        }
    }

    function handleCycleLengthChange(e) {
        state.cycleLength = parseInt(e.target.value);
        elements.cycleLengthValue.textContent = state.cycleLength;
        saveData();
        updateUI();
    }

    function handlePeriodLengthChange(e) {
        state.periodLength = parseInt(e.target.value);
        elements.periodLengthValue.textContent = state.periodLength;
        saveData();
        updateUI();
    }

    function navigateMonth(direction) {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
        updateCalendar();
    }

    function savePeriod() {
        const dateValue = elements.newPeriodDate.value;
        if (!dateValue) {
            showToast('Selecciona una fecha');
            return;
        }
        
        const date = new Date(dateValue + 'T00:00:00');
        
        // Check if already exists
        const exists = state.periodLogs.some(log => 
            formatDateInput(log.date) === formatDateInput(date)
        );
        
        if (exists) {
            showToast('Esta fecha ya está registrada');
            return;
        }
        
        state.periodLogs.push({ date: date });
        
        // Update last period date if this is the most recent
        if (!state.lastPeriodDate || date > state.lastPeriodDate) {
            state.lastPeriodDate = date;
        }
        
        saveData();
        updateUI();
        toggleModal(false);
        showToast('Período registrado');
    }

    function deletePeriodLog(dateString) {
        const date = new Date(dateString);
        state.periodLogs = state.periodLogs.filter(log => 
            log.date.getTime() !== date.getTime()
        );
        
        // Update last period date if needed
        if (state.periodLogs.length > 0) {
            const sortedLogs = [...state.periodLogs].sort((a, b) => b.date - a.date);
            state.lastPeriodDate = sortedLogs[0].date;
        } else {
            state.lastPeriodDate = null;
        }
        
        saveData();
        updateUI();
        showToast('Registro eliminado');
    }

    function exportData() {
        const dataToExport = {
            version: 1,
            exportDate: new Date().toISOString(),
            data: {
                lastPeriodDate: state.lastPeriodDate ? state.lastPeriodDate.toISOString() : null,
                cycleLength: state.cycleLength,
                periodLength: state.periodLength,
                periodLogs: state.periodLogs.map(log => ({
                    date: log.date.toISOString()
                }))
            }
        };
        
        const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ciclo-backup-${formatDateInput(new Date())}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showToast('Datos exportados');
    }

    function importData(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const imported = JSON.parse(event.target.result);
                
                if (imported.data) {
                    state.lastPeriodDate = imported.data.lastPeriodDate ? new Date(imported.data.lastPeriodDate) : null;
                    state.cycleLength = imported.data.cycleLength || 28;
                    state.periodLength = imported.data.periodLength || 5;
                    state.periodLogs = (imported.data.periodLogs || []).map(log => ({
                        date: new Date(log.date)
                    }));
                    
                    saveData();
                    updateUI();
                    showToast('Datos importados correctamente');
                } else {
                    showToast('Archivo no válido');
                }
            } catch (error) {
                console.error('Import error:', error);
                showToast('Error al importar');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    }

    function clearData() {
        if (confirm('¿Estás segura de que quieres borrar todos los datos? Esta acción no se puede deshacer.')) {
            localStorage.removeItem(STORAGE_KEY);
            state = {
                lastPeriodDate: null,
                cycleLength: 28,
                periodLength: 5,
                periodLogs: [],
                theme: state.theme
            };
            saveData();
            updateUI();
            showToast('Datos eliminados');
        }
    }

    function installApp() {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choice) => {
                if (choice.outcome === 'accepted') {
                    showToast('¡Gracias por instalar Ciclo!');
                }
                deferredPrompt = null;
                elements.installPrompt.classList.remove('active');
            });
        }
    }

    function dismissInstall() {
        elements.installPrompt.classList.remove('active');
    }

    // ===== Utilities =====
    function formatDate(date) {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }

    function formatDateInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function showToast(message) {
        elements.toastMessage.textContent = message;
        elements.toast.classList.add('active');
        setTimeout(() => {
            elements.toast.classList.remove('active');
        }, 3000);
    }

    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(() => console.log('Service Worker registrado'))
                .catch(err => console.log('Error SW:', err));
        }
    }

    // ===== Public API =====
    window.app = {
        deletePeriodLog: deletePeriodLog
    };

    // ===== Start =====
    document.addEventListener('DOMContentLoaded', init);
})();
