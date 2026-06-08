// Список поддерживаемых языков на сайте
const supportedLanguages = ['ru', 'en'];

// Определяем стартовый язык пользователя
let currentLang = localStorage.getItem('site_lang') || 'ru';

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
        // Подтягиваем нужный JSON из структуры /assets/i118n/
        const response = await fetch(`/assets/i118n/${lang}.json`);
        if (!response.ok) throw new Error(`Не удалось загрузить локализацию: ${lang}`);

        currentTranslations = await response.json();

        // Сначала переводим весь статический HTML
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
}

// 4. Функция, которая вызывается при смене выбора в select
function changeLanguage(langCode) {
    if (!supportedLanguages.includes(langCode)) return;
    currentLang = langCode;
    localStorage.setItem('site_lang', currentLang);

    // Просто запускаем загрузку, она сама внутри себя пнёт updateView() и calculate() когда надо
    loadTranslations(currentLang);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    buildLangSelect();
    loadTranslations(currentLang);
});
if (typeof window.buildEpochSelect === 'function') {
    window.buildEpochSelect();
}