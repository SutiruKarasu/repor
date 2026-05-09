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
