document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // THEME TOGGLE & MANAGEMENT
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    // ==========================================================================
    // CUSTOM CURSOR GLOW EFFECT
    // ==========================================================================
    const cursorGlow = document.querySelector('.cursor-glow');

    window.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });
    // ==========================================================================
    // MOBILE NAVIGATION MENU
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    // ==========================================================================
    // STICKY HEADER & ACTIVE SCROLL LINK
    // ==========================================================================
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky header styling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
    // ==========================================================================
    // HERO TEXT ROTATOR
    // ==========================================================================
    const textRotator = document.getElementById('text-rotator');
    if (textRotator) {
        const words = JSON.parse(textRotator.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';

        function typeEffect() {
            const fullWord = words[wordIndex];

            if (isDeleting) {
                currentText = fullWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullWord.substring(0, charIndex + 1);
                charIndex++;
            }

            textRotator.textContent = currentText;

            let typingSpeed = isDeleting ? 40 : 100;

            if (!isDeleting && charIndex === fullWord.length) {
                // Word is fully typed, pause before deleting
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Word is fully deleted, move to next word
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 500;
            }

            setTimeout(typeEffect, typingSpeed);
        }

        // Start effect after 1 second
        setTimeout(typeEffect, 1000);
    }
    // ==========================================================================
    // EXPERIENCE TABS
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active classes
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.setAttribute('hidden', 'true');
            });

            // Add active classes to current tab
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');

            const targetPanelId = button.getAttribute('aria-controls');
            const targetPanel = document.getElementById(targetPanelId);

            targetPanel.classList.add('active');
            targetPanel.removeAttribute('hidden');
        });
    });
    // ==========================================================================
    // PROFILE PICTURE MODAL (INSTAGRAM/FACEBOOK STYLE DP VIEWER)
    // ==========================================================================
    const logoImg = document.querySelector('.logo-img');
    const profileModal = document.getElementById('profile-modal');
    const modalClose = document.querySelector('.profile-modal-close');

    if (logoImg && profileModal) {
        logoImg.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent standard page reload link anchor action
            e.stopPropagation();
            profileModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        });

        const closeModal = () => {
            profileModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore background scrolling
        };

        modalClose.addEventListener('click', closeModal);

        // Close when clicking background
        profileModal.addEventListener('click', (e) => {
            if (e.target === profileModal) {
                closeModal();
            }
        });

        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && profileModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
