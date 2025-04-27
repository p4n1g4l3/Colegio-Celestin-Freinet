document.addEventListener("DOMContentLoaded", function() {
    const buttonLabels = {
        "Readable Font": "Fuente Legible",
        "Highlight Links": "Resaltar Enlaces",
        "Highlight Title": "Resaltar Título",
        "Monochrome": "Monocromo",
        "Low Saturation": "Baja Saturación",
        "High Saturation": "Alta Saturación",
        "High Contrast": "Alto Contraste",
        "Light Contrast": "Bajo Contraste",
        "Dark Contrast": "Contraste Oscuro",
        "Big Cursor": "Cursor Grande",
        "Stop Animations": "Detener Animaciones",
        "Reading Guide": "Guía de Lectura"
    };

    document.querySelectorAll('.asw-btn').forEach(button => {
        const key = button.querySelector('.material-icons').nextSibling.nodeValue.trim();
        if (buttonLabels[key]) {
            button.querySelector('.material-icons').nextSibling.nodeValue = buttonLabels[key];
        }
    });
    
    // Añadir clase al body cuando se active el modo oscuro
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'data-asw-filter') {
                const filter = document.documentElement.getAttribute('data-asw-filter');
                if (filter === 'dark-contrast') {
                    document.body.classList.add('dark-mode');
                    document.body.classList.remove('light-mode');
                } else if (filter === 'light-contrast') {
                    document.body.classList.add('light-mode');
                    document.body.classList.remove('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode', 'light-mode');
                }
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true
    });
});