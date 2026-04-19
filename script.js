document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const icon = mobileMenuBtn.querySelector('i');

    function toggleMobileMenu() {
        mobileNav.classList.toggle('active');
        if (mobileNav.classList.contains('active')) {
            icon.classList.remove('ri-menu-line');
            icon.classList.add('ri-close-line');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
            document.body.style.overflow = '';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // --- Navbar Scrolled State ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('ri-moon-line');
        themeIcon.classList.add('ri-sun-line');
    }
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('ri-sun-line');
            themeIcon.classList.add('ri-moon-line');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('ri-moon-line');
            themeIcon.classList.add('ri-sun-line');
        }
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
    
    // Initial reveal trigger for elements already in viewport
    setTimeout(() => {
        revealElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 50) {
                el.classList.add('visible');
            }
        });
    }, 100);

});
