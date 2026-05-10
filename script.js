document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CUSTOM CURSOR (Desktop only) ---
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");
    
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mousemove", (e) => {
            if(cursor && follower) {
                cursor.style.left = e.clientX + "px";
                cursor.style.top = e.clientY + "px";
                setTimeout(() => {
                    follower.style.left = e.clientX + "px";
                    follower.style.top = e.clientY + "px";
                }, 50);
            }
        });
    }

    // --- 2. SCROLL ANIMATIONS (Fade In Effekt) ---
    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach((el) => observer.observe(el));

    // --- 3. TYPEWRITER EFFEKT (Hero Section) ---
    const words = ["Web Applications.", "User Interfaces.", "Digital Experiences."];
    let i = 0; 
    let j = 0; 
    let isDeleting = false;
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
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();
});

// --- 4. LIGHTBOX FUNKTION (Bilder groß anzeigen) ---
window.openLightbox = function(src) {
    const modal = document.getElementById("imageModal");
    const fullImg = document.getElementById("fullImage");
    if(modal && fullImg) {
        modal.style.display = "flex";
        fullImg.src = src;
    }
}

// Modal Schließen Logik
const modalClose = document.querySelector(".modal-close");
if(modalClose) {
    modalClose.onclick = () => {
        document.getElementById("imageModal").style.display = "none";
    }
}

window.onclick = (e) => {
    const modal = document.getElementById("imageModal");
    if (e.target === modal) modal.style.display = "none";
}

// --- 5. MULTI-LANGUAGE LOGIK (EN, DE, CS) ---
const translations = {
    "en": {
        "nav_home": "Home", "nav_about": "About", "nav_skills": "Skills", "nav_projects": "Projects", "nav_contact": "Contact",
        "hero_title": "Hi, I'm <span class='highlight'>Edi Kolgeci</span>",
        "hero_subtitle": "I build ",
        "hero_p": "Transforming complex problems into elegant, high-performance web solutions.",
        "btn_view_work": "View My Work",
        "section_about": "About Me",
        "about_p": "As a passionate web developer, I love working at the intersection of design and technology. I focus on creating user-centric experiences.",
        "stat_exp": "Years Experience", "stat_projects": "Projects", "stat_satisfaction": "Satisfaction",
        "section_skills": "Technical Skills", "skill_front": "Frontend", "skill_back": "Backend", "skill_tools": "Tools",
        "section_projects": "Selected Projects",
        "proj1_title": "E-Commerce App", "proj1_desc": "A full-stack shopping solution with Stripe integration.",
        "proj2_title": "AI Dashboard", "proj2_desc": "Real-time data visualization platform using OpenAI APIs.",
        "section_contact": "Let's Connect", "btn_send": "Send Message"
    },
    "de": {
        "nav_home": "Start", "nav_about": "Über mich", "nav_skills": "Skills", "nav_projects": "Projekte", "nav_contact": "Kontakt",
        "hero_title": "Hallo, ich bin <span class='highlight'>Edi Kolgeci</span>",
        "hero_subtitle": "Ich entwickle ",
        "hero_p": "Ich verwandle komplexe Probleme in elegante, leistungsstarke Web-Lösungen.",
        "btn_view_work": "Projekte ansehen",
        "section_about": "Über Mich",
        "about_p": "Als leidenschaftlicher Webentwickler liebe ich es, an der Schnittstelle von Design und Technologie zu arbeiten.",
        "stat_exp": "Jahre Erfahrung", "stat_projects": "Projekte", "stat_satisfaction": "Zufriedenheit",
        "section_skills": "Fähigkeiten", "skill_front": "Frontend", "skill_back": "Backend", "skill_tools": "Tools",
        "section_projects": "Ausgewählte Projekte",
        "proj1_title": "E-Commerce App", "proj1_desc": "Eine Full-Stack-Lösung mit Stripe-Integration.",
        "proj2_title": "AI Dashboard", "proj2_desc": "Echtzeit-Datenvisualisierung mit OpenAI APIs.",
        "section_contact": "Kontakt aufnehmen", "btn_send": "Nachricht senden"
    },
    "cs": {
        "nav_home": "Domů", "nav_about": "O mně", "nav_skills": "Dovednosti", "nav_projects": "Projekty", "nav_contact": "Kontakt",
        "hero_title": "Ahoj, já jsem <span class='highlight'>Edi Kolgeci</span>",
        "hero_subtitle": "Tvořím ",
        "hero_p": "Proměňuji složité problémy v elegantní a výkonná webová řešení.",
        "btn_view_work": "Moje práce",
        "section_about": "O mně",
        "about_p": "Jako vášnivý webový vývojář rád pracuji na pomezí designu a technologie.",
        "stat_exp": "Let zkušeností", "stat_projects": "Projektů", "stat_satisfaction": "Spokojenost",
        "section_skills": "Dovednosti", "skill_front": "Frontend", "skill_back": "Backend", "skill_tools": "Nástroje",
        "section_projects": "Vybrané projekty",
        "proj1_title": "E-Commerce App", "proj1_desc": "Full-stack nákupní řešení s integrací Stripe.",
        "proj2_title": "AI Dashboard", "proj2_desc": "Platforma pro vizualizaci dat v reálném čase s OpenAI API.",
        "section_contact": "Spojme se", "btn_send": "Odeslat zprávu"
    }
};

window.setLanguage = function(lang) {
    // Buttons updaten
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.textContent.trim().toLowerCase() === lang.toLowerCase()) {
            btn.classList.add('active');
        }
    });

    // Texte mit data-key Attribut übersetzen
    const elements = document.querySelectorAll("[data-key]");
    elements.forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // Placeholder im Kontaktformular anpassen
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const messageInput = document.querySelector('textarea[name="message"]');

    const placeholders = {
        "en": ["Full Name", "Email Address", "Your Message"],
        "de": ["Vollständiger Name", "E-Mail-Adresse", "Deine Nachricht"],
        "cs": ["Celé jméno", "E-mailová adresa", "Vaše zpráva"]
    };

    if(nameInput) nameInput.placeholder = placeholders[lang][0];
    if(emailInput) emailInput.placeholder = placeholders[lang][1];
    if(messageInput) messageInput.placeholder = placeholders[lang][2];
};
