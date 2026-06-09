// /assets/js/header.js

const path = window.location.pathname || '/';

function detectTitleKey() {
    if (path.includes('/data/calculator/')) return 'site_title_calculator';
    if (path.includes('/data/lookups/')) return 'site_title_lookups';
    return 'main_h1';
}

function createNavHTML() {
    return `
        <div class="button-container">
            <a href="/" class="btn btn--primary">
                <span class="icon-chip material-icons" aria-hidden="true">home</span>
                <span data-i18n="btn_home">Главная страница</span>
            </a>
            <a href="/data/lookups/index.html" class="btn btn--tonal">
                <span class="icon-chip material-icons" aria-hidden="true">analytics</span>
                <span data-i18n="btn_lookups">Характеристики эпох</span>
            </a>
            <a href="/data/calculator/index.html" class="btn btn--tonal">
                <span class="icon-chip material-icons" aria-hidden="true">calculate</span>
                <span data-i18n="btn_calculator">Калькулятор двигателя</span>
            </a>
            <a href="https://store.steampowered.com/app/1674170/Sprocket/" class="btn btn--steam" target="_blank" rel="noopener">
                <span class="icon-chip"><span class="ico-steam" aria-hidden="true"></span></span>
                <span data-i18n="btn_steam">Игра в Steam</span>
            </a>
            <a href="https://www.donationalerts.com/r/emil1man" class="btn btn--primary" target="_blank" rel="noopener">
                <span class="icon-chip material-icons" aria-hidden="true">favorite</span>
                <span data-i18n="btn_donate">Поддержать автора</span>
            </a>
            <div class="lang-select-group">
                <select id="langSelect" onchange="changeLanguage(this.value)">
                    <option value="ru">RU</option>
                    <option value="en">EN</option>
                </select>
            </div>
            <button id="themeToggle" class="btn btn--tonal theme-btn-nav" title="Toggle theme">
                <span class="material-icons" id="themeIcon">dark_mode</span>
            </button>
        </div>
    `;
}

function mountHeader() {
    const mount = document.getElementById('siteHeader');
    if (!mount) return;

    const variant = mount.getAttribute('data-header-variant') || 'horizontal';
    const titleKey = detectTitleKey();

    if (variant === 'vertical') {
        // Главная страница: центрированная карточка
        mount.innerHTML = `
            <span class="material-icons brand-icon">settings_suggest</span>
            <h1 class="site-title" data-i18n="${titleKey}">-</h1>
            <p data-i18n="main_p">-</p>
            <div class="status-badge">
                <span class="status-dot" style="width:8px;height:8px;background-color:#b3261e;border-radius:50%;display:inline-block;animation:blink 1.5s infinite ease-in-out;"></span>
                <span data-i18n="status_developing">Проект разрабатывается</span>
            </div>
            <div class="nav-container">${createNavHTML()}</div>
        `;
    } else {
        // Внутренние страницы: полноценная горизонтальная шапка со своим H1
        mount.innerHTML = `
            <header class="site-header" style="background: transparent; box-shadow: none; padding: 16px 0 24px 0;">
                <div class="header-inner">
                    <h1 class="site-title" data-i18n="${titleKey}" style="margin-bottom: 20px;">-</h1>
                    <div class="nav-container">
                        ${createNavHTML()}
                    </div>
                </div>
            </header>
        `;
    }

    // Восстановление выбранного языка
    const savedLang = localStorage.getItem('site_lang') || 'ru';
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.value = savedLang;
    }

    // Синхронизация иконки темы при рендере
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        if (typeof updateThemeIcon === 'function') {
            updateThemeIcon();
        } else {
            const isDark = document.body.classList.contains('dark-theme') || localStorage.getItem('theme') === 'dark';
            const themeIcon = document.getElementById('themeIcon');
            if (themeIcon) {
                themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
            }
        }
    }

    // Применение переводов
    if (typeof applyTranslations === 'function') {
        applyTranslations();
    }

    // Переинициализация селекторов эпох, если они есть на странице
    if (typeof window.buildEpochSelect === 'function') {
        window.buildEpochSelect();
    }

    try {
        document.dispatchEvent(new Event('siteHeaderMounted'));
    } catch (e) { }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountHeader);
} else {
    mountHeader();
}

window.renderSiteHeader = mountHeader;
export { mountHeader };