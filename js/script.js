document.addEventListener("DOMContentLoaded", () => {
    // 1. Typing Animation
    const words = ["System Engineer", "Platform Engineer", "DevOps Engineer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpan = document.querySelector(".typing-text");

    function type() {
        if (!typingSpan) return;
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    
    if (typingSpan) {
        setTimeout(type, 1000);
    }

    // 2. Navbar Scroll Shrink & Active Link Synchronization
    const navbar = document.querySelector(".navbar-clean");
    const navLinks = document.querySelectorAll(".navbar-clean .nav-link-custom");
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        // Navbar Shrink
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-shrink");
        } else {
            navbar.classList.remove("navbar-shrink");
        }

        // Active Section Tracker
        let currentSectionId = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight a little early as user scrolls down
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // 3. Scroll Reveal Animation using IntersectionObserver
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Skills Progress Bar Fill Animation
    const skillsSection = document.getElementById("skills");
    const progressFills = document.querySelectorAll(".progress-bar-fill");

    if (skillsSection && progressFills.length > 0) {
        const skillsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressFills.forEach(fill => {
                        const targetWidth = fill.getAttribute("data-width");
                        fill.style.width = targetWidth;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        skillsObserver.observe(skillsSection);
    }
});
