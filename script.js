// Funktion zum Setzen der Sprache
async function setLanguage(lang) {
    try {
        // 1. Die Übersetzungsdatei laden
        const response = await fetch('lang.json');
        if (!response.ok) throw new Error('Sprachdatei konnte nicht geladen werden');
        const translations = await response.json();

        // 2. Alle Elemente mit dem Attribut [data-key] finden
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            
            // Text austauschen, wenn der Key in der JSON existiert
            if (translations[lang] && translations[lang][key]) {
                // innerHTML wird genutzt, damit auch <span> (wie bei den Highlights) funktionieren
                element.innerHTML = translations[lang][key];
            }
        });

        // 3. Sprache im Browser speichern (damit sie beim Refresh bleibt)
        localStorage.setItem('preferredLang', lang);
        
        // 4. HTML lang Attribut aktualisieren (gut für SEO)
        document.documentElement.lang = lang;

    } catch (error) {
        console.error('Fehler beim Sprachwechsel:', error);
    }
}

// Beim Laden der Seite die gespeicherte Sprache prüfen
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    setLanguage(savedLang);
});

/* --- Dein restlicher Code (Typewriter, Cursor, etc.) kommt hier darunter --- */

document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Typewriter
    const text = ["Frontend Developer", "Backend Engineer", "Code Wizard"];
    let i = 0, j = 0, isDeleting = false;
    const target = document.querySelector(".typewriter");

    function type() {
        const current = text[i];
        if (isDeleting) {
            target.textContent = current.substring(0, j - 1);
            j--;
        } else {
            target.textContent = current.substring(0, j + 1);
            j++;
        }

        if (!isDeleting && j === current.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % text.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }
    type();

    // Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
});
