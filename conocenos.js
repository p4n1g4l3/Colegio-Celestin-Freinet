function toggleMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const submenuItem = event.target.closest('.has-submenu');
    const wasActive = submenuItem.classList.contains('active');
    
    // Cerrar todos los submenús primero
    document.querySelectorAll('.has-submenu').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abrir el actual si no estaba activo
    if (!wasActive) {
        submenuItem.classList.add('active');
    }
}

// Cerrar submenús al hacer clic en cualquier parte
document.addEventListener('click', function() {
    document.querySelectorAll('.has-submenu').forEach(item => {
        item.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('mainMenu');
    
    // Toggle del menú principal
    menuToggle.addEventListener('click', function() {
        mainMenu.classList.toggle('open');
        document.body.style.overflow = mainMenu.classList.contains('open') ? 'hidden' : 'auto';
    });
    
    // Manejo de submenús (modificado para que no cierre el menú)
    document.querySelectorAll('.has-submenu > a').forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const submenu = this.nextElementSibling;
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                
                // Evita que el clic se propague y cierre el menú
                e.stopPropagation();
            }
        });
    });
    
    // Cierra el menú solo al hacer clic en enlaces principales (no submenús)
    document.querySelectorAll('.main-menu > li > a:not(.has-submenu > a)').forEach(link => {
        link.addEventListener('click', function() {
            if(window.innerWidth <= 992) {
                mainMenu.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
    });
});