// Main JS for Freelance Elasticsearch Cluster Tuner

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    const htmlElement = document.documentElement;
    
    // Check for saved theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-bs-theme', currentTheme);
    updateThemeIcons(currentTheme);

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const newTheme = htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });

    function updateThemeIcons(theme) {
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('i');
            const span = btn.querySelector('span');
            if (icon) {
                if (theme === 'dark') {
                    icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
                    if (span) span.textContent = 'Light Mode';
                } else {
                    icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
                    if (span) span.textContent = 'Dark Mode';
                }
            }
        });
    }

    // RTL Toggle
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
    const savedRtl = localStorage.getItem('rtl') === 'true';

    if (savedRtl) {
        enableRtl();
    }

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isRtl = htmlElement.getAttribute('dir') === 'rtl';
            if (isRtl) {
                disableRtl();
            } else {
                enableRtl();
            }
        });
    });

    function enableRtl() {
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.setAttribute('lang', 'ar');
        localStorage.setItem('rtl', 'true');
        rtlToggles.forEach(btn => {
            const span = btn.querySelector('span');
            if (span) span.textContent = 'LTR';
        });
    }

    function disableRtl() {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.setAttribute('lang', 'en');
        localStorage.setItem('rtl', 'false');
        rtlToggles.forEach(btn => {
            const span = btn.querySelector('span');
            if (span) span.textContent = 'RTL';
        });
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            if (backToTop) backToTop.style.display = 'block';
        } else {
            if (backToTop) backToTop.style.display = 'none';
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Password Toggle Logic
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            
            if (targetInput) {
                if (targetInput.type === 'password') {
                    targetInput.type = 'text';
                    this.classList.replace('bi-eye-slash', 'bi-eye');
                } else {
                    targetInput.type = 'password';
                    this.classList.replace('bi-eye', 'bi-eye-slash');
                }
            }
        });
    });
});
