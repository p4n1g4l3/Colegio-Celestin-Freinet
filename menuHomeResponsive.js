function toggleMenu() {
    const menu = document.querySelector('.main-menu');
    menu.classList.toggle('active');
}

function toggleSubmenu(event) {
    event.preventDefault();
    const submenu = event.target.nextElementSibling;
    submenu.classList.toggle('active');
}
