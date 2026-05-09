/* --- 1. SPRACH-LOGIK (JSON & MULTI-LANG) --- */

// Texte für den Schreibmaschinen-Effekt in verschiedenen Sprachen
const typewriterTexts = {
    'en': ["Frontend Developer", "Web Designer", "Problem Solver"],
    'de': ["Frontend Entwickler", "Webdesigner", "Problemlöser"],
    'cs': ["Frontend vývojář", "Webdesignér", "Řešitel problémů"]
};

let currentLang = localStorage.getItem('preferredLang') || 'en';

// Funktion zum Wechseln der Sprache
window.setLanguage = async function(lang) {
    try {
        const response = await fetch('lang.json');
        if (!response.ok) throw new Error('JSON konnte nicht geladen werden');
        const translations = await response.json();

        // Alle Elemente mit data-key Attribut übersetzen
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });

        // Sprache speichern und HTML-Attribut setzen
        localStorage.setItem('preferredLang', lang);
        currentLang = lang;
        document.documentElement.lang = lang;

        // Typewriter neu starten mit der neuen Sprache
        initTypewriter();

    } catch (error) {
        console.error("Fehler beim Sprachwechsel:", error);
    }
}

/* --- 2. TYPEWRITER EFFEKT --- */
let typewriterTimeout;
function initTypewriter() {
    const span = document.querySelector('.typewriter');
    if (!span) return;

    // Vorherige Animation stoppen
    clearTimeout(typewriterTimeout);
    
    let charIndex = 0;
    let textIndex = 0;
    let isDeleting = false;
    const texts = typewriterTexts[currentLang];

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            span.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            span.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause am Ende des Wortes
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        typewriterTimeout = setTimeout(type, typeSpeed);
    }

    type();
}

/* --- 3. CUSTOM CURSOR --- */
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Der Follower bewegt sich leicht verzögert
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Effekt bei Links
    document.querySelectorAll('a, button').forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(2)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

/* --- 4. SCROLL REVEAL ANIMATION --- */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
}

/* --- INITIALISIERUNG BEIM LADEN --- */
document.addEventListener('DOMContentLoaded', () => {
    // Sprache laden
    window.setLanguage(currentLang);
    
    // Cursor starten
    initCursor();
    
    // Scroll Animationen starten
    initScrollReveal();
});
