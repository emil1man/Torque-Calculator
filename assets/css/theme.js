// theme.js
const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function setTheme(isDark) {
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

// Проверяем, есть ли кнопка на этой конкретной странице
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDarkNow = document.body.classList.contains('dark-theme');
        setTheme(!isDarkNow);
    });
}

// Запускаем инициализацию темы
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
});