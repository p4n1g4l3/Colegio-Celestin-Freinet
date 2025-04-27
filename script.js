// CARRUSEL DEL BANNER - Responsivo
let currentIndexBanner = 0;
const slidesBanner = document.querySelectorAll("#carousel-banner .carousel-slide");
const totalSlidesBanner = slidesBanner.length;
let bannerInterval;

function startBannerInterval() {
    bannerInterval = setInterval(() => {
        nextSlideBanner();
    }, 4000);
}

function showSlideBanner(index) {
    const carousel = document.querySelector("#carousel-banner .carousel");
    if (index >= totalSlidesBanner) {
        currentIndexBanner = 0;
    } else if (index < 0) {
        currentIndexBanner = totalSlidesBanner - 1;
    } else {
        currentIndexBanner = index;
    }
    const offset = -currentIndexBanner * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

function nextSlideBanner() {
    showSlideBanner(currentIndexBanner + 1);
}

function prevSlideBanner() {
    showSlideBanner(currentIndexBanner - 1);
}

// Pausar el carrusel cuando el usuario interactúa
document.querySelector("#carousel-banner").addEventListener("mouseenter", () => {
    clearInterval(bannerInterval);
});

document.querySelector("#carousel-banner").addEventListener("mouseleave", () => {
    startBannerInterval();
});

// Iniciar el intervalo
startBannerInterval();

// Ajustar altura del carrusel en dispositivos móviles
function adjustCarouselHeight() {
    const carouselContainer = document.querySelector(".carousel-container");
    if (window.innerWidth <= 768) {
        carouselContainer.style.height = "300px";
    } else if (window.innerWidth <= 992) {
        carouselContainer.style.height = "400px";
    } else {
        carouselContainer.style.height = "550px";
    }
}

// Ejecutar al cargar y al redimensionar
window.addEventListener("load", adjustCarouselHeight);
window.addEventListener("resize", adjustCarouselHeight);

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


//----responsivo----

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