// RU: Список поддерживаемых языков на сайте
// EN: Supported languages for the site
const supportedLanguages = ['ru', 'en'];

function getInitialLanguage() {
    const saved = localStorage.getItem('site_lang');

    if (saved && supportedLanguages.includes(saved)) {
        return saved;
    }

    const browserLang = (navigator.language || 'en')
        .toLowerCase()
        .split('-')[0];

    if (supportedLanguages.includes(browserLang)) {
        return browserLang;
    }

    return 'en';
}

let currentLang = getInitialLanguage();
document.documentElement.lang = currentLang;

// Объект, куда запишутся данные из скачанного JSON-файла
let currentTranslations = {};

// 1. Строим выпадающий список языков автоматически
function buildLangSelect() {
    const langSelect = document.getElementById('langSelect');
    if (!langSelect) return;

    langSelect.innerHTML = '';
    supportedLanguages.forEach(langCode => {
        const opt = document.createElement('option');
        opt.value = langCode;
        opt.textContent = langCode.toUpperCase();
        langSelect.appendChild(opt);
    });

    langSelect.value = currentLang;
}

// 2. Асинхронно загружаем JSON файл локализации
async function loadTranslations(lang) {
    try {
        // Подтягиваем нужный JSON из структуры /assets/i18n/
        const response = await fetch(`assets/i18n/${lang}.json`);
        if (!response.ok) throw new Error(`Не удалось загрузить локализацию: ${lang}`);

        currentTranslations = await response.json();

        // RU: Сначала переводим весь статический HTML
        // EN: First apply translations to static HTML elements
        applyTranslations();

        // === НАШ ПРАВИЛЬНЫЙ ТРИГГЕР ДЛЯ ДИНАМИЧЕСКИХ СТРАНИЦ ===
        // Теперь они вызываются СТРОГО после того, как новый JSON полностью записался в currentTranslations
        if (typeof window.updateView === 'function') {
            window.updateView();
        }
        if (typeof window.calculate === 'function') {
            window.calculate();
        }

    } catch (error) {
        console.error("Ошибка интернационализации:", error);
    }
}

// 3. Записываем переведенные строки в HTML элементы
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (currentTranslations[key]) {
            // Если элемент — это title страницы, меняем документ, иначе — текст внутри тега
            if (el.tagName.toLowerCase() === 'title') {
                document.title = currentTranslations[key];
            } else {
                el.innerText = currentTranslations[key];
            }
        }
    });

    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = currentLang;

    // Сигнализируем другим скриптам, что переводы применены
    try {
        document.dispatchEvent(new Event('translationsLoaded'));
    } catch (e) {}
}

// RU: Перевод для placeholder у полей ввода
// EN: Translate placeholder attributes for inputs
document.addEventListener('translationsLoaded', () => {
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (currentTranslations && currentTranslations[key]) {
            el.setAttribute('placeholder', currentTranslations[key]);
        }
    });
});

// 4. Функция, которая вызывается при смене выбора в select
// 4. Called when user changes language select
function changeLanguage(langCode) {
    if (!supportedLanguages.includes(langCode)) return;
    currentLang = langCode;
    localStorage.setItem('site_lang', currentLang);
    document.documentElement.lang = langCode;  // ← ДОБАВИТЬ ЭТУ СТРОКУ

    // Просто запускаем загрузку, она сама внутри себя пнёт updateView() и calculate() когда надо
    loadTranslations(currentLang);
}

// RU: Инициализация — запускается после того, как header вставлен в DOM
// EN: Initialization — run after header is present in the DOM
function initLang() {
    buildLangSelect();
    loadTranslations(currentLang);
    if (typeof window.buildEpochSelect === 'function') {
        window.buildEpochSelect();
    }
}

let langInitialized = false;
function tryInitLang() {
    if (langInitialized) return;
    // Инициализируем только когда селект языка уже в DOM
    if (document.getElementById('langSelect')) {
        initLang();
        langInitialized = true;
    }
}

document.addEventListener('siteHeaderMounted', tryInitLang);
document.addEventListener('DOMContentLoaded', tryInitLang);
