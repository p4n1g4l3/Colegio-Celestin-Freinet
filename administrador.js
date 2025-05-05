document.addEventListener("DOMContentLoaded", function() {
    // Función para mostrar/ocultar el menú en móviles
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Navegación entre secciones
    document.querySelectorAll(".sidebar a").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute("href").substring(1);
            
            // Ocultar todas las secciones
            document.querySelectorAll("section").forEach(section => {
                section.classList.remove("active");
            });
            
            // Mostrar la sección seleccionada
            document.getElementById(targetSection).classList.add("active");
            
            // Cerrar menú en móviles
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Mostrar la primera sección por defecto
    document.querySelector("section").classList.add("active");

    // Inicializar eventos para estudiantes
    document.getElementById('btnNuevoEstudiante')?.addEventListener('click', function() {
        document.getElementById('modal-nuevo-estudiante').style.display = 'block';
    });

    // Inicializar eventos para profesores
    document.getElementById('btnNuevoProfesor')?.addEventListener('click', function() {
        document.getElementById('modal-nuevo-profesor').style.display = 'block';
    });

    // Eventos para búsqueda y filtros de estudiantes
    document.getElementById('buscarEstudiante')?.addEventListener('input', function() {
        filtrarEstudiantes();
    });

    document.getElementById('filtroGrado')?.addEventListener('change', function() {
        filtrarEstudiantes();
    });

    document.getElementById('filtroEstado')?.addEventListener('change', function() {
        filtrarEstudiantes();
    });

    // Eventos para búsqueda y filtros de profesores
    document.getElementById('buscarProfesor')?.addEventListener('input', function() {
        filtrarProfesores();
    });

    document.getElementById('filtroEspecialidad')?.addEventListener('change', function() {
        filtrarProfesores();
    });

    // Inicializar gestión de cursos
    if (document.getElementById('lista-cursos')) {
        inicializarGestionCursos();
    }
});

// Función mejorada para cerrar sesión
function cerrarSesion() {
    const confirmar = confirm("¿Estás seguro de que quieres cerrar sesión?");
    
    if (confirmar) {
        // Aquí podrías añadir lógica para limpiar la sesión
        console.log("Cerrando sesión...");
        window.location.href = "home.html";
    } else {
        console.log("Cierre de sesión cancelado");
    }
    
    return confirmar;
}

// --------------------------------------------------
// Gestión de Estudiantes
// --------------------------------------------------

function cerrarModalEstudiante() {
    document.getElementById('modal-nuevo-estudiante').style.display = 'none';
    document.getElementById('formNuevoEstudiante').reset();
}

function guardarEstudiante() {
    const form = document.getElementById('formNuevoEstudiante');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const estudiante = {
        nombre: document.getElementById('nombreEstudiante').value,
        documento: document.getElementById('documentoEstudiante').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        grado: document.getElementById('gradoEstudiante').value,
        direccion: document.getElementById('direccionEstudiante').value,
        telefono: document.getElementById('telefonoEstudiante').value,
        acudiente: document.getElementById('acudienteEstudiante').value,
        parentesco: document.getElementById('parentescoAcudiente').value,
        estado: 'activo'
    };

    // Aquí normalmente harías una llamada AJAX para guardar en el servidor
    console.log('Estudiante a guardar:', estudiante);
    
    // Simulamos la respuesta del servidor
    setTimeout(() => {
        // Generar ID único
        const nuevoId = 'EST-' + (document.getElementById('tablaEstudiantes').rows.length + 1).toString().padStart(3, '0');
        
        // Calcular edad aproximada
        const fechaNac = new Date(estudiante.fechaNacimiento);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNac.getFullYear();
        
        // Agregar a la tabla
        const tbody = document.getElementById('tablaEstudiantes');
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${nuevoId}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.grado}° Primaria</td>
            <td>${edad} años</td>
            <td><span class="badge badge-success">Activo</span></td>
            <td>
                <button class="btn btn-sm btn-icon" title="Editar"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-icon" title="Ver"><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-icon btn-danger" title="Eliminar"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(fila);
        
        // Cerrar modal y mostrar notificación
        cerrarModalEstudiante();
        mostrarNotificacion('Estudiante agregado correctamente', 'success');
        
        // Actualizar contador
        actualizarContadorEstudiantes();
    }, 1000);
}

function filtrarEstudiantes() {
    const busqueda = document.getElementById('buscarEstudiante').value.toLowerCase();
    const grado = document.getElementById('filtroGrado').value;
    const estado = document.getElementById('filtroEstado').value;
    
    const filas = document.getElementById('tablaEstudiantes').querySelectorAll('tr');
    let contador = 0;
    
    filas.forEach(fila => {
        const nombre = fila.cells[1].textContent.toLowerCase();
        const gradoFila = fila.cells[2].textContent.charAt(0); // Extrae el número de grado
        const estadoFila = fila.cells[4].querySelector('.badge').textContent.toLowerCase();
        
        const coincideBusqueda = nombre.includes(busqueda);
        const coincideGrado = grado === '' || gradoFila === grado;
        const coincideEstado = estado === '' || estadoFila === estado;
        
        if (coincideBusqueda && coincideGrado && coincideEstado) {
            fila.style.display = '';
            contador++;
        } else {
            fila.style.display = 'none';
        }
    });
    
    // Actualizar contador
    document.querySelector('.table-info').textContent = `Mostrando 1-${contador} de ${contador} estudiantes`;
}

function actualizarContadorEstudiantes() {
    const total = document.getElementById('tablaEstudiantes').rows.length;
    document.querySelector('#estudiantes .table-info').textContent = `Mostrando 1-${total} de ${total} estudiantes`;
}

// --------------------------------------------------
// Gestión de Profesores
// --------------------------------------------------

function cerrarModalProfesor() {
    document.getElementById('modal-nuevo-profesor').style.display = 'none';
    document.getElementById('formNuevoProfesor').reset();
}

function guardarProfesor() {
    const form = document.getElementById('formNuevoProfesor');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const profesor = {
        nombre: document.getElementById('nombreProfesor').value,
        documento: document.getElementById('documentoProfesor').value,
        especialidad: document.getElementById('especialidadProfesor').value,
        titulo: document.getElementById('tituloProfesor').value,
        email: document.getElementById('emailProfesor').value,
        telefono: document.getElementById('telefonoProfesor').value,
        direccion: document.getElementById('direccionProfesor').value,
        estado: 'activo',
        asignaturas: 0 // Inicialmente no tiene asignaturas asignadas
    };

    // Aquí normalmente harías una llamada AJAX para guardar en el servidor
    console.log('Profesor a guardar:', profesor);
    
    // Simulamos la respuesta del servidor
    setTimeout(() => {
        // Generar ID único
        const nuevoId = 'PRO-' + (document.getElementById('tablaProfesores').rows.length + 1).toString().padStart(3, '0');
        
        // Agregar a la tabla
        const tbody = document.getElementById('tablaProfesores');
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${nuevoId}</td>
            <td>${profesor.nombre}</td>
            <td>${profesor.especialidad}</td>
            <td>${profesor.asignaturas}</td>
            <td><span class="badge badge-success">Activo</span></td>
            <td>
                <button class="btn btn-sm btn-icon" title="Editar"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-icon" title="Ver"><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-icon btn-danger" title="Eliminar"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(fila);
        
        // Cerrar modal y mostrar notificación
        cerrarModalProfesor();
        mostrarNotificacion('Profesor agregado correctamente', 'success');
        
        // Actualizar contador
        actualizarContadorProfesores();
    }, 1000);
}

function filtrarProfesores() {
    const busqueda = document.getElementById('buscarProfesor').value.toLowerCase();
    const especialidad = document.getElementById('filtroEspecialidad').value;
    
    const filas = document.getElementById('tablaProfesores').querySelectorAll('tr');
    let contador = 0;
    
    filas.forEach(fila => {
        const nombre = fila.cells[1].textContent.toLowerCase();
        const especialidadFila = fila.cells[2].textContent.toLowerCase().replace(/\s+/g, '_');
        
        const coincideBusqueda = nombre.includes(busqueda);
        const coincideEspecialidad = especialidad === '' || especialidadFila === especialidad;
        
        if (coincideBusqueda && coincideEspecialidad) {
            fila.style.display = '';
            contador++;
        } else {
            fila.style.display = 'none';
        }
    });
    
    // Actualizar contador
    document.querySelector('#profesores .table-info').textContent = `Mostrando 1-${contador} de ${contador} profesores`;
}

function actualizarContadorProfesores() {
    const total = document.getElementById('tablaProfesores').rows.length;
    document.querySelector('#profesores .table-info').textContent = `Mostrando 1-${total} de ${total} profesores`;
}

// --------------------------------------------------
// Gestión de Cursos (existente)
// --------------------------------------------------

function inicializarGestionCursos() {
    // Datos de ejemplo (en un caso real, estos vendrían de una API)
    const cursos = [
        { id: 1, nombre: "Matemáticas Básicas", docente: "Juan Pérez", estudiantes: [101, 102, 103] },
        { id: 2, nombre: "Ciencias Naturales", docente: "María Gómez", estudiantes: [101, 104] },
        { id: 3, nombre: "Literatura", docente: "No asignado", estudiantes: [102, 103, 105] }
    ];

    const docentes = [
        { id: 201, nombre: "Juan Pérez", especialidad: "Matemáticas" },
        { id: 202, nombre: "María Gómez", especialidad: "Ciencias" },
        { id: 203, nombre: "Carlos Ruiz", especialidad: "Literatura" },
        { id: 204, nombre: "Laura Díaz", especialidad: "Matemáticas" }
    ];

    // Variables para seguimiento
    let cursoSeleccionado = null;
    let docenteSeleccionado = null;

    // Elementos del DOM
    const listaCursos = document.getElementById('lista-cursos');
    const estudiantesCursoDiv = document.getElementById('estudiantes-curso');
    const nombreCursoSeleccionado = document.getElementById('nombre-curso-seleccionado');
    const listaEstudiantes = document.getElementById('lista-estudiantes');
    const asignarDocenteBtn = document.getElementById('asignar-docente-btn');
    const modalDocente = document.getElementById('modal-docente');
    const nombreCursoModal = document.getElementById('nombre-curso-modal');
    const listaDocentes = document.getElementById('lista-docentes');
    const confirmarDocenteBtn = document.getElementById('confirmar-docente');
    const buscarDocenteInput = document.getElementById('buscar-docente');
    const cerrarModal = document.querySelector('.cerrar-modal');

    // Cargar lista de cursos
    function cargarCursos() {
        listaCursos.innerHTML = '';
        cursos.forEach(curso => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${curso.id}</td>
                <td>${curso.nombre}</td>
                <td>${curso.docente}</td>
                <td><button class="btn-ver-estudiantes" data-id="${curso.id}">Ver Estudiantes</button></td>
            `;
            listaCursos.appendChild(fila);
        });

        // Agregar event listeners a los botones
        document.querySelectorAll('.btn-ver-estudiantes').forEach(btn => {
            btn.addEventListener('click', function() {
                const cursoId = parseInt(this.getAttribute('data-id'));
                mostrarEstudiantes(cursoId);
            });
        });
    }

    // Mostrar estudiantes de un curso
    function mostrarEstudiantes(cursoId) {
        cursoSeleccionado = cursos.find(c => c.id === cursoId);
        if (!cursoSeleccionado) return;

        nombreCursoSeleccionado.textContent = cursoSeleccionado.nombre;
        listaEstudiantes.innerHTML = '';

        cursoSeleccionado.estudiantes.forEach(estId => {
            const estudiante = estudiantes.find(e => e.id === estId);
            if (estudiante) {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${estudiante.id}</td>
                    <td>${estudiante.nombre}</td>
                    <td>${estudiante.documento}</td>
                `;
                listaEstudiantes.appendChild(fila);
            }
        });

        estudiantesCursoDiv.style.display = 'block';
    }

    // Mostrar modal para asignar docente
    asignarDocenteBtn.addEventListener('click', function() {
        if (!cursoSeleccionado) return;
        
        nombreCursoModal.textContent = cursoSeleccionado.nombre;
        cargarDocentes();
        modalDocente.style.display = 'block';
    });

    // Cargar lista de docentes en el modal
    function cargarDocentes(busqueda = '') {
        listaDocentes.innerHTML = '';
        const busquedaLower = busqueda.toLowerCase();
        
        docentes.filter(docente => 
            docente.nombre.toLowerCase().includes(busquedaLower) || 
            docente.especialidad.toLowerCase().includes(busquedaLower)
        ).forEach(docente => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td><input type="radio" name="docente" value="${docente.id}" ${docenteSeleccionado?.id === docente.id ? 'checked' : ''}></td>
                <td>${docente.nombre}</td>
                <td>${docente.especialidad}</td>
            `;
            listaDocentes.appendChild(fila);
        });

        // Agregar event listeners a los radios
        document.querySelectorAll('input[name="docente"]').forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.checked) {
                    const docenteId = parseInt(this.value);
                    docenteSeleccionado = docentes.find(d => d.id === docenteId);
                }
            });
        });
    }

    // Buscar docentes
    buscarDocenteInput.addEventListener('input', function() {
        cargarDocentes(this.value);
    });

    // Confirmar asignación de docente
    confirmarDocenteBtn.addEventListener('click', function() {
        if (!cursoSeleccionado || !docenteSeleccionado) {
            alert('Por favor seleccione un docente');
            return;
        }

        // Actualizar el curso con el nuevo docente
        const cursoIndex = cursos.findIndex(c => c.id === cursoSeleccionado.id);
        if (cursoIndex !== -1) {
            cursos[cursoIndex].docente = docenteSeleccionado.nombre;
            cargarCursos();
            
            // Actualizar la visualización actual si es el curso seleccionado
            if (cursoSeleccionado) {
                mostrarEstudiantes(cursoSeleccionado.id);
            }
        }

        modalDocente.style.display = 'none';
        docenteSeleccionado = null;
    });

    // Cerrar modal
    cerrarModal.addEventListener('click', function() {
        modalDocente.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === modalDocente) {
            modalDocente.style.display = 'none';
        }
    });

    // Inicializar
    cargarCursos();
}

// --------------------------------------------------
// Función para cambiar el estado de prematrículas
// --------------------------------------------------

function togglePrematriculas() {
    const habilitado = document.getElementById('togglePrematriculas').checked;
    localStorage.setItem('prematriculasHabilitadas', habilitado);
    actualizarTextoEstado(habilitado);
    
    // Enviar al servidor (ejemplo con fetch)
    fetch('/api/toggle-prematriculas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ habilitado })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Estado actualizado:', data);
        // Disparar evento para actualizar otras pestañas
        const event = new Event('prematriculaChanged');
        window.dispatchEvent(event);
        // Actualizar en esta pestaña
        actualizarMenuPrematriculas();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function actualizarTextoEstado(habilitado) {
    document.getElementById('estadoPrematriculas').textContent = 
        habilitado ? 'Habilitado' : 'Deshabilitado';
}

function actualizarMenuPrematriculas() {
    // Lógica para actualizar el menú según el estado
    console.log('Menú de prematrículas actualizado');
}

// --------------------------------------------------
// Función para mostrar notificaciones
// --------------------------------------------------

function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacion = document.getElementById('notificacion');
    notificacion.textContent = mensaje;
    notificacion.className = 'notificacion ' + tipo;
    notificacion.style.display = 'block';
    
    setTimeout(() => {
        notificacion.style.display = 'none';
    }, 3000);
}