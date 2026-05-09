/**
 * EDI KOLGECI - PORTFOLIO SCRIPT
 * Enthält: Multi-Language, Typewriter, Custom Cursor, Scroll Reveal
 */

/* --- 1. SPRACH-KONFIGURATION --- */

// Texte für den Schreibmaschinen-Effekt (Typewriter) in den drei Sprachen
const typewriterTexts = {
    'en': ["Frontend Developer", "Web Designer", "Problem Solver"],
    'de': ["Frontend Entwickler", "Webdesigner", "Problemlöser"],
    'cs': ["Frontend vývojář", "Webdesignér", "Řešitel problémů"]
};

let currentLang = localStorage.getItem('preferredLang') || 'en';
let typewriterTimeout; // Variable, um die Animation bei Sprachwechsel zu stoppen

// Hauptfunktion zum Wechseln der Sprache
window.setLanguage = async function(lang) {
    console.log("Wechsle Sprache zu:", lang);
    
    try {
        // Lade die Übersetzungsdatei
        const response = await fetch('lang.json');
        if (!response.ok) throw new Error('Sprachdatei konnte nicht geladen werden.');
        const translations = await response.json();

        // Alle Elemente mit dem Attribut [data-key] finden und Text ersetzen
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                
                // Sonderfall: Formular-Platzhalter (Input & Textarea)
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    // Normaler Text (unterstützt HTML wie <span>)
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        // Einstellungen speichern
        localStorage.setItem('preferredLang', lang);
        currentLang = lang;
        document.documentElement.lang = lang;

        // Den Schreibmaschinen-Effekt für die neue Sprache neu starten
        initTypewriter();

    } catch (error) {
        console.error("Fehler beim Sprachwechsel:", error);
    }
}

/* --- 2. TYPEWRITER (SCHREIBMASCHINEN) EFFEKT --- */

function initTypewriter() {
    const span = document.querySelector('.typewriter');
    if (!span) return;

    // Bestehende Animation löschen, falls vorhanden (wichtig bei Sprachwechsel!)
    clearTimeout(typewriterTimeout);
    
    let charIndex = 0;
    let textIndex = 0;
    let isDeleting = false;
    const texts = typewriterTexts[currentLang];

    function type() {
        const currentWord = texts[textIndex];
        
        if (isDeleting) {
            span.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            span.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause, wenn das Wort fertig geschrieben ist
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause vor dem nächsten Wort
        }

        typewriterTimeout = setTimeout(type, typeSpeed);
    }

    type();
}

/* --- 3. CUSTOM CURSOR EFFEKT --- */

function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    // Bewegung des Cursors
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Follower mit leichter Verzögerung
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 40);
    });

    // Interaktion mit klickbaren Elementen
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(2)';
            follower.style.borderColor = 'var(--accent-color)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = 'var(--accent-color)';
        });
    });
}

/* --- 4. SCROLL REVEAL (EINBLEND-EFFEKT) --- */

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
}

/* --- 5. INITIALISIERUNG --- */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sprache setzen
    window.setLanguage(currentLang);
    
    // 2. Cursor aktivieren
    initCursor();
    
    // 3. Scroll-Beobachter aktivieren
    initScrollReveal();
    
    // Sticky Navigation Effekt beim Scrollen
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 8%';
            navbar.style.background = 'rgba(8, 8, 8, 0.95)';
        } else {
            navbar.style.padding = '20px 8%';
            navbar.style.background = 'rgba(8, 8, 8, 0.9)';
        }
    });
});
