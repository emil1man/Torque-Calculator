// RU: Управление темой интерфейса. Сохраняет выбор пользователя в localStorage.
// EN: UI theme management. Persists user preference to localStorage.
// Purpose: Ensure consistent light/dark theme across pages.
// Reason: improves accessibility and UX.

function setTheme(isDark) {
    const themeIcon = document.getElementById('themeIcon');
    if (isDark) {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.textContent = 'light_mode';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        if (themeIcon) themeIcon.textContent = 'dark_mode';
        localStorage.setItem('theme', 'light');
    }
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setTheme(true);
    } else if (savedTheme === 'light') {
        setTheme(false);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark);
    }
}

function attachThemeToggle() {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;
    themeToggleBtn.addEventListener('click', () => {
        const isDarkNow = document.body.classList.contains('dark-theme');
        setTheme(!isDarkNow);
    });
}

function initThemeWhenReady() {
    initTheme();
    attachThemeToggle();
}

// RU: Запускаем инициализацию темы либо сразу на DOMContentLoaded
// EN: Run theme initialization either on DOMContentLoaded (if header already present)
if (document.getElementById('siteHeader')) {
    window.addEventListener('DOMContentLoaded', initThemeWhenReady);
} else {
    // RU: Ждём, когда header вставится в DOM
    // EN: Wait for header to be mounted
    document.addEventListener('siteHeaderMounted', initThemeWhenReady);
}
