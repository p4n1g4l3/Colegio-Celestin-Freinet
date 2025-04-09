// config.js
function actualizarMenuPrematriculas() {
    // Obtener el estado de localStorage (simulando servidor)
    const habilitado = localStorage.getItem('prematriculasHabilitadas') !== 'false';
    
    // Ocultar/mostrar en todas las páginas
    const menuItems = document.querySelectorAll('#menuPrematricula, .menu-prematricula');
    menuItems.forEach(item => {
        if (item) {
            item.style.display = habilitado ? 'block' : 'none';
        }
    });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', actualizarMenuPrematriculas);

// También ejecutar cuando cambie el estado (para otras pestañas)
window.addEventListener('storage', actualizarMenuPrematriculas);

// Escuchar nuestro evento personalizado
window.addEventListener('prematriculaChanged', actualizarMenuPrematriculas);