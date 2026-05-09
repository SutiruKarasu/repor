document.addEventListener('DOMContentLoaded', () => {

    // 1. Custom Cursor Logik
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Kleine Verzögerung für den Follower für einen weichen Effekt
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });

    // 2. Typing Effect im Hero Bereich
    const textArray = ["Frontend Developer", "Backend Engineer", "UI/UX Enthusiast", "Code Wizard"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Pause zwischen den Wörtern
    let textArrayIndex = 0;
    let charIndex = 0;
    const typewriterElement = document.querySelector(".typewriter");

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typewriterElement.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typewriterElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing effect
    if(textArray.length) setTimeout(type, newTextDelay + 250);


    // 3. Scroll Reveal Animationen (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Feuert, wenn 15% des Elements sichtbar sind
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Animation nur einmal abspielen
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    // 4. Aktiven Navigations-Link beim Scrollen hervorheben
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                // Hier könntest du z.B. noch eine extra Klasse .active stylen im CSS
                link.style.color = 'var(--accent-color)';
            } else {
                link.style.color = 'var(--text-color)';
            }
        });
    });
});
