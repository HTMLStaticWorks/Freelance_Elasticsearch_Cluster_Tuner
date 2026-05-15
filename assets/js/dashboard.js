// Dashboard specific JS
document.addEventListener('DOMContentLoaded', function() {
    // Example: Highlight active sidebar link
    const path = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });

    // Mock Chart or Data updates could go here
    console.log("Dashboard initialized");
});
