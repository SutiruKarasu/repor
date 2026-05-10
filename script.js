document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CUSTOM CURSOR ---
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");
    
    // Nur aktivieren, wenn es kein Touchscreen ist (Desktop)
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
            // Follower folgt leicht verzögert
            setTimeout(() => {
                follower.style.left = e.clientX + "px";
                follower.style.top = e.clientY + "px";
            }, 50);
        });
    }

    // --- 2. SCROLL ANIMATIONS (Fade in) ---
    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach((el) => observer.observe(el));

    // --- 3. TYPEWRITER EFFEKT ---
    const words = ["Web Applications.", "User Interfaces.", "Digital Experiences."];
    let i = 0; let j = 0; let isDeleting = false;
    const typewriterElement = document.querySelector(".typewriter");

    function type() {
        if(!typewriterElement) return;
        const currentWord = words[i];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, j - 1);
            j--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, j + 1);
            j++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && j === currentWord.length) {
            typeSpeed = 2000; // Pause wenn Wort komplett
            isDeleting = true;
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length; // Nächstes Wort
            typeSpeed = 500; // Pause bevor neues Wort startet
        }

        setTimeout(type, typeSpeed);
    }
    type();
});

// --- 4. LIGHTBOX (Bild Klick) ---
function openLightbox(src) {
    const modal = document.getElementById("imageModal");
    const fullImg = document.getElementById("fullImage");
    modal.style.display = "flex";
    fullImg.src = src;
}

// Schließen beim Klick auf X oder den dunklen Hintergrund
document.querySelector(".modal-close").onclick = () => {
    document.getElementById("imageModal").style.display = "none";
}
window.onclick = (e) => {
    const modal = document.getElementById("imageModal");
    if (e.target === modal) modal.style.display = "none";
}

// --- 5. SPRACHUMSCHALTUNG (Spielerei) ---
const translations = {
    "en": {
        "hero_title": "Hi, I'm <span class='highlight'>Edi Kolgeci</span>",
        "hero_subtitle": "I build ",
        "hero_p": "Transforming complex problems into elegant, high-performance web solutions.",
        "nav_about": "About", "nav_projects": "Projects",
        "section_about": "About Me",
        "about_p": "As a passionate web developer, I love working at the intersection of design and technology. I focus on creating user-centric experiences that look fantastic and perform flawlessly."
    },
    "de": {
        "hero_title": "Hallo, ich bin <span class='highlight'>Edi Kolgeci</span>",
        "hero_subtitle": "Ich entwickle ",
        "hero_p": "Ich verwandle komplexe Probleme in elegante, leistungsstarke Web-Lösungen.",
        "nav_about": "Über mich", "nav_projects": "Projekte",
        "section_about": "Über Mich",
        "about_p": "Als leidenschaftlicher Webentwickler liebe ich es, an der Schnittstelle von Design und Technologie zu arbeiten. Mein Fokus liegt auf nutzerzentrierten Erlebnissen, die fantastisch aussehen und fehlerfrei funktionieren."
    }
};

window.setLanguage = function(lang) {
    // Buttons updaten
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Texte updaten
    const elements = document.querySelectorAll("[data-key]");
    elements.forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key]; // innerHTML wegen dem <span> im Titel
        }
    });
}
