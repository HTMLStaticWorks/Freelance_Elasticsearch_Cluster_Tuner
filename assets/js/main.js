// Main JS for Freelance Elasticsearch Cluster Tuner

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-bs-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        const icon = themeToggle ? themeToggle.querySelector('i') : null;
        if (icon) {
            if (theme === 'dark') {
                icon.classList.remove('bi-moon-fill');
                icon.classList.add('bi-sun-fill');
            } else {
                icon.classList.remove('bi-sun-fill');
                icon.classList.add('bi-moon-fill');
            }
        }
    }

    // RTL Toggle
    const rtlToggle = document.getElementById('rtlToggle');
    const savedRtl = localStorage.getItem('rtl') === 'true';

    if (savedRtl) {
        enableRtl();
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const isRtl = htmlElement.getAttribute('dir') === 'rtl';
            if (isRtl) {
                disableRtl();
            } else {
                enableRtl();
            }
        });
    }

    function enableRtl() {
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.setAttribute('lang', 'ar');
        localStorage.setItem('rtl', 'true');
        if (rtlToggle) {
            const span = rtlToggle.querySelector('span');
            if (span) span.textContent = 'LTR';
        }
    }

    function disableRtl() {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.setAttribute('lang', 'en');
        localStorage.setItem('rtl', 'false');
        if (rtlToggle) {
            const span = rtlToggle.querySelector('span');
            if (span) span.textContent = 'RTL';
        }
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
