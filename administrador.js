// =============================================
// GESTIÓN DE NOVEDADES
// =============================================

// Función para subir una novedad
function subirNovedad() {
    const titulo = document.getElementById('tituloNovedad').value;
    const descripcion = document.getElementById('descripcionNovedad').value;
    const fecha = document.getElementById('fechaNovedad').value;
    const imagenInput = document.getElementById('imagenNovedad');
    
    if (!titulo || !descripcion || !fecha) {
        alert('Por favor complete todos los campos obligatorios');
        return;
    }
    
    const novedad = {
        titulo,
        descripcion,
        fecha,
        imagen: imagenInput.files.length > 0 ? URL.createObjectURL(imagenInput.files[0]) : null
    };
    
    // Obtener novedades existentes o inicializar array
    const novedades = JSON.parse(localStorage.getItem('novedades')) || [];
    novedades.push(novedad);
    localStorage.setItem('novedades', JSON.stringify(novedades));
    
    // Limpiar formulario
    document.getElementById('formAgregarNovedad').reset();
    document.getElementById('previewImagen').innerHTML = '';
    
    // Actualizar lista
    cargarNovedades();
    
    // Mostrar notificación
    mostrarNotificacion('Novedad agregada correctamente', 'success');
}

// Función para cargar novedades en la tabla
function cargarNovedades() {
    const novedades = JSON.parse(localStorage.getItem('novedades')) || [];
    const tbody = document.getElementById('lista-novedades');
    tbody.innerHTML = '';
    
    novedades.forEach((novedad, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${novedad.titulo}</td>
            <td>${novedad.fecha}</td>
            <td>
                <button class="btn btn-sm btn-icon" title="Editar" onclick="editarNovedad(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-icon btn-danger" title="Eliminar" onclick="eliminarNovedad(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para editar novedad
function editarNovedad(index) {
    const novedades = JSON.parse(localStorage.getItem('novedades')) || [];
    if (index >= 0 && index < novedades.length) {
        localStorage.setItem('novedadEditando', JSON.stringify({index, novedad: novedades[index]}));
        // Aquí podrías redirigir a un formulario de edición o mostrar un modal
        mostrarModalEditarNovedad(novedades[index]);
    }
}

// Función para eliminar novedad
function eliminarNovedad(index) {
    if (confirm('¿Está seguro de eliminar esta novedad?')) {
        const novedades = JSON.parse(localStorage.getItem('novedades')) || [];
        novedades.splice(index, 1);
        localStorage.setItem('novedades', JSON.stringify(novedades));
        cargarNovedades();
        mostrarNotificacion('Novedad eliminada correctamente', 'success');
    }
}

// =============================================
// GESTIÓN DE USUARIOS
// =============================================

// Función para redirigir a la página de registro
function agregarUsuario() {
    localStorage.removeItem("usuarioAModificar");
    window.location.href = "formulario_usuario.html";
}

// Función para cargar usuarios desde localStorage
function cargarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    const tabla = document.getElementById("tablaUsuarios");
    tabla.innerHTML = ""; // Limpiar tabla

    usuarios.forEach((usuario, index) => {
        const num = index + 1;
        const nombre = usuario.tipo === "Estudiante" 
            ? usuario.datos.nombre 
            : `${usuario.datos.primerNombre} ${usuario.datos.segundoNombre || ''} ${usuario.datos.primerApellido}`;
        
        const fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${num}</td>
            <td>${nombre}</td>
            <td>${usuario.tipo}</td>
            <td>
                <button class="btn btn-sm btn-icon" onclick="modificarUsuario(${index})" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-icon" onclick="verUsuario(${index})" title="Ver">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-icon btn-danger" onclick="confirmarEliminacion(${index})" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
            <td>
                <span class="badge ${usuario.estado === 'Habilitado' ? 'badge-success' : 'badge-warning'}">
                    ${usuario.estado}
                </span>
            </td>
        `;
    });
}

// Función para modificar usuario
function modificarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (index >= 0 && index < usuarios.length) {
        localStorage.setItem("usuarioAModificar", JSON.stringify({index, usuario: usuarios[index]}));
        window.location.href = "formulario_usuario.html";
    }
}

// Función para ver detalles del usuario
function verUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (index >= 0 && index < usuarios.length) {
        const usuario = usuarios[index];
        let detalles = `
            <strong>Tipo:</strong> ${usuario.tipo}<br>
            <strong>Estado:</strong> ${usuario.estado}<br><br>
        `;
        
        if (usuario.tipo === "Estudiante") {
            detalles += `
                <strong>Nombre:</strong> ${usuario.datos.nombre}<br>
                <strong>Documento:</strong> ${usuario.datos.documento}<br>
                <strong>Grado:</strong> ${usuario.datos.grado}<br>
            `;
        } else {
            detalles += `
                <strong>Nombre:</strong> ${usuario.datos.primerNombre} ${usuario.datos.segundoNombre || ''} ${usuario.datos.primerApellido}<br>
                <strong>Documento:</strong> ${usuario.datos.documento}<br>
                <strong>Especialidad:</strong> ${usuario.datos.especialidad || 'No especificada'}<br>
            `;
        }
        
        // Mostrar modal con los detalles
        mostrarModal('Detalles del Usuario', detalles);
    }
}

// Función para confirmar eliminación
function confirmarEliminacion(index) {
    if (confirm("¿Está seguro de que desea eliminar este usuario?")) {
        eliminarUsuario(index);
    }
}

// Función para eliminar usuario
function eliminarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    if (index >= 0 && index < usuarios.length) {
        usuarios.splice(index, 1);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        cargarUsuarios();
        mostrarNotificacion('Usuario eliminado correctamente', 'success');
    }
}

// =============================================
// CONFIGURACIÓN DEL SISTEMA
// =============================================

// Función para cambiar el estado de pre-matrículas
function togglePrematriculas() {
    const habilitado = document.getElementById('togglePrematriculas').checked;
    localStorage.setItem('prematriculasHabilitadas', habilitado);
    actualizarTextoEstado(habilitado);
    
    // Simular envío al servidor
    setTimeout(() => {
        mostrarNotificacion('Configuración de pre-matrículas actualizada', 'success');
    }, 500);
}

// Función para actualizar el texto de estado
function actualizarTextoEstado(habilitado) {
    const estadoElement = document.getElementById('estadoPrematriculas');
    estadoElement.textContent = habilitado ? 'Habilitado' : 'Deshabilitado';
    estadoElement.className = habilitado ? 'estado-texto activo' : 'estado-texto';
}

// Cargar estado inicial de pre-matrículas
function cargarConfiguracionInicial() {
    const habilitado = localStorage.getItem('prematriculasHabilitadas') === 'true' || true;
    document.getElementById('togglePrematriculas').checked = habilitado;
    actualizarTextoEstado(habilitado);
}

// =============================================
// GESTIÓN DE ESTUDIANTES
// =============================================

// Función para cargar estudiantes
function cargarEstudiantes() {
    // En una implementación real, esto vendría de una API o localStorage
    // Aquí solo es un ejemplo estático
    const estudiantes = [
        { id: 'EST-001', nombre: 'Juan Pérez González', grado: '3° Primaria', edad: '8 años', estado: 'Activo' },
        { id: 'EST-002', nombre: 'María Rodríguez López', grado: '2° Primaria', edad: '7 años', estado: 'Activo' }
    ];
    
    const tabla = document.getElementById('tablaEstudiantes');
    tabla.innerHTML = '';
    
    estudiantes.forEach(estudiante => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${estudiante.id}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.grado}</td>
            <td>${estudiante.edad}</td>
            <td><span class="badge badge-success">${estudiante.estado}</span></td>
            <td>
                <button class="btn btn-sm btn-icon" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-icon" title="Ver">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-icon btn-danger" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tabla.appendChild(tr);
    });
}

// =============================================
// GESTIÓN DE PROFESORES
// =============================================

// Función para cargar profesores
function cargarProfesores() {
    // Ejemplo estático
    const profesores = [
        { id: 'PRO-001', nombre: 'Carlos Andrés Gómez', especialidad: 'Matemáticas', asignaturas: 3, estado: 'Activo' },
        { id: 'PRO-002', nombre: 'Ana María Rodríguez', especialidad: 'Ciencias Naturales', asignaturas: 2, estado: 'Activo' }
    ];
    
    const tabla = document.getElementById('tablaProfesores');
    tabla.innerHTML = '';
    
    profesores.forEach(profesor => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${profesor.id}</td>
            <td>${profesor.nombre}</td>
            <td>${profesor.especialidad}</td>
            <td>${profesor.asignaturas}</td>
            <td><span class="badge badge-success">${profesor.estado}</span></td>
            <td>
                <button class="btn btn-sm btn-icon" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-icon" title="Ver">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-icon btn-danger" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tabla.appendChild(tr);
    });
}

// =============================================
// GESTIÓN DE ASIGNATURAS
// =============================================

// Función para cargar asignaturas
function cargarAsignaturas() {
    // Ejemplo estático
    const asignaturas = [
        { id: 'ASG-001', nombre: 'Matemáticas Básicas', grados: '1°-3°', docente: 'Carlos Gómez', horas: 5 },
        { id: 'ASG-002', nombre: 'Ciencias Naturales', grados: '2°-5°', docente: 'Ana Rodríguez', horas: 4 }
    ];
    
    const tabla = document.getElementById('lista-cursos');
    tabla.innerHTML = '';
    
    asignaturas.forEach(asignatura => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${asignatura.id}</td>
            <td>${asignatura.nombre}</td>
            <td>${asignatura.grados}</td>
            <td>${asignatura.docente}</td>
            <td>${asignatura.horas}</td>
            <td>
                <button class="btn btn-sm btn-icon" title="Asignar docente" onclick="mostrarModalAsignarDocente('${asignatura.id}', '${asignatura.nombre}')">
                    <i class="fas fa-user-plus"></i>
                </button>
                <button class="btn btn-sm btn-icon" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-icon btn-danger" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tabla.appendChild(tr);
    });
}

// Función para mostrar modal de asignación de docente
function mostrarModalAsignarDocente(idAsignatura, nombreAsignatura) {
    document.getElementById('nombre-asignatura-modal').textContent = nombreAsignatura;
    document.getElementById('modal-docente').style.display = 'block';
    
    // Aquí deberías cargar la lista de docentes disponibles
}

// Función para cerrar modal de asignación de docente
function cerrarModalDocente() {
    document.getElementById('modal-docente').style.display = 'none';
}

// =============================================
// GESTIÓN DE POSTULADOS
// =============================================

// Función para cargar postulados
function cargarPostulados() {
    // Ejemplo estático
    const postulados = [
        { id: 1, nombre: 'María González', documento: '1023456789', grado: '3° Primaria', fecha: '20/05/2023', estado: 'Pendiente' },
        { id: 2, nombre: 'Carlos Rodríguez', documento: '987654321', grado: '2° Primaria', fecha: '18/05/2023', estado: 'Pendiente' }
    ];
    
    const tabla = document.getElementById('lista-aplicantes');
    tabla.innerHTML = '';
    
    postulados.forEach(postulado => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${postulado.id}</td>
            <td>${postulado.nombre}</td>
            <td>${postulado.documento}</td>
            <td>${postulado.grado}</td>
            <td>${postulado.fecha}</td>
            <td><span class="badge badge-warning">${postulado.estado}</span></td>
            <td>
                <button class="btn btn-sm btn-icon" onclick="mostrarDetallesAplicante(${postulado.id})" title="Ver">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tabla.appendChild(tr);
    });
}

// Función para mostrar detalles del aplicante
function mostrarDetallesAplicante(id) {
    // En una implementación real, buscarías los detalles del aplicante
    const aplicante = {
        id: id,
        nombre: id === 1 ? 'María González' : 'Carlos Rodríguez',
        documento: id === 1 ? '1023456789' : '987654321',
        fechaNacimiento: id === 1 ? '15/03/2010' : '10/05/2011',
        grado: id === 1 ? '3° Primaria' : '2° Primaria',
        acudiente: id === 1 ? 'Laura González' : 'Ana Rodríguez',
        parentesco: id === 1 ? 'Madre' : 'Tía',
        telefono: id === 1 ? '3001234567' : '3109876543',
        email: id === 1 ? 'acudiente@example.com' : 'ana.rodriguez@example.com',
        direccion: id === 1 ? 'Calle 123 #45-67, Barrio Los Alamos, Bogotá' : 'Carrera 89 #12-34, Barrio El Prado, Bogotá',
        fechaAplicacion: id === 1 ? '20/05/2023' : '18/05/2023',
        estado: 'Pendiente'
    };
    
    const detalles = `
        <div class="detalle-row">
            <div class="detalle-item">
                <strong>Nombre Completo:</strong>
                <span>${aplicante.nombre}</span>
            </div>
            <div class="detalle-item">
                <strong>Documento:</strong>
                <span>${aplicante.documento}</span>
            </div>
        </div>
        
        <div class="detalle-row">
            <div class="detalle-item">
                <strong>Fecha de Nacimiento:</strong>
                <span>${aplicante.fechaNacimiento}</span>
            </div>
            <div class="detalle-item">
                <strong>Grado al que aplica:</strong>
                <span>${aplicante.grado}</span>
            </div>
        </div>
        
        <div class="detalle-section">
            <h4><i class="fas fa-user-friends"></i> Información del Acudiente</h4>
            <div class="detalle-row">
                <div class="detalle-item">
                    <strong>Nombre:</strong>
                    <span>${aplicante.acudiente}</span>
                </div>
                <div class="detalle-item">
                    <strong>Parentesco:</strong>
                    <span>${aplicante.parentesco}</span>
                </div>
            </div>
            <div class="detalle-row">
                <div class="detalle-item">
                    <strong>Teléfono:</strong>
                    <span>${aplicante.telefono}</span>
                </div>
                <div class="detalle-item">
                    <strong>Correo Electrónico:</strong>
                    <span>${aplicante.email}</span>
                </div>
            </div>
        </div>
        
        <div class="detalle-section">
            <h4><i class="fas fa-map-marker-alt"></i> Información de Contacto</h4>
            <div class="detalle-item full-width">
                <strong>Dirección:</strong>
                <span>${aplicante.direccion}</span>
            </div>
        </div>
        
        <div class="detalle-section">
            <h4><i class="fas fa-calendar-alt"></i> Proceso de Admisión</h4>
            <div class="detalle-row">
                <div class="detalle-item">
                    <strong>Fecha de Aplicación:</strong>
                    <span>${aplicante.fechaAplicacion}</span>
                </div>
                <div class="detalle-item">
                    <strong>Estado:</strong>
                    <span class="badge badge-warning">${aplicante.estado}</span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('detalles-aplicante').innerHTML = detalles;
    document.getElementById('modal-aplicante').style.display = 'block';
}

// Función para cerrar modal de aplicante
function cerrarModalAplicante() {
    document.getElementById('modal-aplicante').style.display = 'none';
}

// Función para confirmar aceptación de aplicante
function confirmarAceptacion() {
    document.getElementById('mensaje-confirmacion').textContent = '¿Está seguro que desea aceptar este aplicante?';
    document.getElementById('modal-confirmacion').style.display = 'block';
}

// Función para rechazar aplicante
function rechazarAplicante() {
    document.getElementById('mensaje-confirmacion').textContent = '¿Está seguro que desea rechazar este aplicante?';
    document.getElementById('modal-confirmacion').style.display = 'block';
}

// Función para cerrar modal de confirmación
function cerrarConfirmacion() {
    document.getElementById('modal-confirmacion').style.display = 'none';
}

// Función para aceptar aplicante
function aceptarAplicante() {
    // Aquí iría la lógica para aceptar al aplicante
    mostrarNotificacion('Aplicante aceptado correctamente', 'success');
    cerrarConfirmacion();
    cerrarModalAplicante();
    cargarPostulados();
}

// =============================================
// GESTIÓN DE CURSOS
// =============================================

// Función para cargar cursos
function cargarCursos() {
    // Ejemplo estático
    const cursos = [
        { id: 1, nombre: '1° Primaria', director: 'Carlos Gómez', estudiantes: 25, horario: '7:00 AM - 12:00 PM' },
        { id: 2, nombre: '2° Primaria', director: 'Ana Rodríguez', estudiantes: 28, horario: '7:00 AM - 12:00 PM' }
    ];
    
    const tabla = document.getElementById('tablaCursos');
    tabla.innerHTML = '';
    
    cursos.forEach(curso => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${curso.nombre}</td>
            <td>${curso.director}</td>
            <td>${curso.estudiantes}</td>
            <td>${curso.horario}</td>
            <td>
                <button class="btn btn-sm btn-icon" title="Ver estudiantes" onclick="mostrarEstudiantesCurso(${curso.id})">
                    <i class="fas fa-users"></i>
                </button>
                <button class="btn btn-sm btn-icon" title="Asignar director" onclick="mostrarModalDirectorCurso(${curso.id}, '${curso.nombre}')">
                    <i class="fas fa-user-tie"></i>
                </button>
                <button class="btn btn-sm btn-icon" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        `;
        tabla.appendChild(tr);
    });
}

// Función para mostrar estudiantes de un curso
function mostrarEstudiantesCurso(idCurso) {
    // En una implementación real, buscarías los estudiantes del curso
    const estudiantes = [
        { id: 'EST-001', nombre: 'Juan Pérez González', documento: '123456789', edad: '8 años' },
        { id: 'EST-002', nombre: 'María Rodríguez López', documento: '987654321', edad: '7 años' }
    ];
    
    document.getElementById('nombre-curso-modal').textContent = idCurso === 1 ? '1° Primaria' : '2° Primaria';
    
    const tabla = document.getElementById('lista-estudiantes-curso');
    tabla.innerHTML = '';
    
    estudiantes.forEach(estudiante => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${estudiante.id}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.documento}</td>
            <td>${estudiante.edad}</td>
        `;
        tabla.appendChild(tr);
    });
    
    document.getElementById('modal-estudiantes-curso').style.display = 'block';
}

// Función para cerrar modal de estudiantes del curso
function cerrarModalEstudiantesCurso() {
    document.getElementById('modal-estudiantes-curso').style.display = 'none';
}

// Función para mostrar modal de asignación de director
function mostrarModalDirectorCurso(idCurso, nombreCurso) {
    document.getElementById('nombre-curso-director-modal').textContent = nombreCurso;
    document.getElementById('modal-director-curso').style.display = 'block';
    
    // Aquí deberías cargar la lista de profesores disponibles para ser directores
}

// Función para cerrar modal de director de curso
function cerrarModalDirectorCurso() {
    document.getElementById('modal-director-curso').style.display = 'none';
}

// =============================================
// FUNCIONES UTILITARIAS
// =============================================

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.getElementById('notificacion');
    notificacion.textContent = mensaje;
    notificacion.className = `notificacion ${tipo}`;
    notificacion.style.display = 'block';
    
    setTimeout(() => {
        notificacion.style.display = 'none';
    }, 3000);
}

// Función para mostrar modal genérico
function mostrarModal(titulo, contenido) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${titulo}</h3>
                <span class="close-modal" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</span>
            </div>
            <div class="modal-body">
                ${contenido}
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">Cerrar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm("¿Estás seguro de que quieres cerrar sesión?")) {
        localStorage.removeItem('usuarioLogueado');
        window.location.href = "home.html";
    }
}

// =============================================
// INICIALIZACIÓN
// =============================================

document.addEventListener("DOMContentLoaded", function() {
    // Menú responsive
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
    
    // Cargar datos iniciales
    cargarUsuarios();
    cargarNovedades();
    cargarConfiguracionInicial();
    cargarEstudiantes();
    cargarProfesores();
    cargarAsignaturas();
    cargarPostulados();
    cargarCursos();
});