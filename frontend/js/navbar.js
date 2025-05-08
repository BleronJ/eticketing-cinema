function loadNavbar() {
    const navbar = `
        <nav class="navbar">
            <a href="index.html" class="navbar-logo">ETicketing Cinema</a>
            <div class="navbar-menu">
                <a href="films.html" ${window.location.pathname.includes('films') ? 'class="active"' : ''}>Movies</a>
                <a href="events.html" ${window.location.pathname.includes('events') ? 'class="active"' : ''}>Events</a>
                <a href="cinemas.html" ${window.location.pathname.includes('cinemas') ? 'class="active"' : ''}>Cinemas</a>
                <a href="getroom.html" ${window.location.pathname.includes('getroom') ? 'class="active"' : ''}>Get a Free Room</a>
                <a href="contact.html" ${window.location.pathname.includes('contact') ? 'class="active"' : ''}>Contact Us</a>
            </div>
            <div class="navbar-actions">
                <a href="login.html" class="login">Login</a>
                <a href="register.html" class="register">Register</a>
            </div>
        </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', navbar);
}

// Load navbar when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavbar); 