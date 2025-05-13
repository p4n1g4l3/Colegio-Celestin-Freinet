// Función para cambiar de sección sin recargar la página
function mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });

    // Mostrar la sección seleccionada
    document.getElementById(seccion).classList.add("active");
}

// Datos simulados del observador
const observaciones = [
    {
        fecha: "05/03/2024",
        academico: "Buen rendimiento en matemáticas.",
        comportamiento: "Participativo en clase.",
        estrategias: "Seguir practicando problemas avanzados.",
        firmaEstudiante: "✔",
        firmaProfesor: "✔"
    },
    {
        fecha: "20/02/2024",
        academico: "Necesita mejorar en comprensión lectora.",
        comportamiento: "Conversaciones fuera de lugar.",
        estrategias: "Realizar ejercicios de lectura en casa.",
        firmaEstudiante: "✔",
        firmaProfesor: "✔"
    }
];

// Función para mostrar las observaciones en la tabla
function mostrarObservador() {
    const observerBody = document.getElementById("observerBody");
    observerBody.innerHTML = ""; // Limpiar antes de agregar datos

    observaciones.forEach(obs => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="text" value="${obs.fecha}" readonly></td>
            <td><input type="text" value="${obs.academico}" readonly></td>
            <td><input type="text" value="${obs.comportamiento}" readonly></td>
            <td><input type="text" value="${obs.estrategias}" readonly></td>
            <td><input type="text" value="${obs.firmaEstudiante}" readonly></td>
            <td><input type="text" value="${obs.firmaProfesor}" readonly></td>
        `;
        observerBody.appendChild(row);
    });
}

// Llamar a la función cuando se muestra la sección de observador
document.addEventListener("DOMContentLoaded", () => {
    mostrarObservador();
});
// Datos simulados de asignaturas
const asignaturas = [
    { nombre: "Matemáticas", docente: "Prof. Ana López", horario: "Lunes y Miércoles 8:00 - 10:00 AM" },
    { nombre: "Ciencias", docente: "Prof. Juan Pérez", horario: "Martes y Jueves 10:00 - 12:00 PM" },
    { nombre: "Historia", docente: "Prof. María Rodríguez", horario: "Lunes y Miércoles 2:00 - 4:00 PM" },
    { nombre: "Inglés", docente: "Prof. Carlos Gómez", horario: "Viernes 8:00 - 10:00 AM" },
    { nombre: "Arte", docente: "Prof. Sofía Martínez", horario: "Viernes 2:00 - 4:00 PM" }
];

// Llamar a la función cuando se muestra la sección de asignaturas
document.addEventListener("DOMContentLoaded", () => {
    mostrarAsignaturas();
});


// Llamar a la función cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarPerfil();
});

// Simulación de cierre de sesión
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


  function mostrarCuadro() {
    const materia = document.getElementById("materiaSelect").value;
    const data = datosMaterias[materia];

    const header = document.getElementById("gradeHeader");
    const body = document.getElementById("gradesBody");

    // Limpiar tabla
    header.innerHTML = "";
    body.innerHTML = "";

    // Encabezados dinámicos
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `<th></th>` + data.actividades.map((_, i) => `<th>Actividad ${i + 1}</th>`).join("");
    header.appendChild(headerRow);

    // Filas: Actividad / Nota / Observación
    const filaAct = document.createElement("tr");
    filaAct.innerHTML = `<td>Actividad</td>` + data.actividades.map(a => `<td>${a}</td>`).join("");
    body.appendChild(filaAct);

    const filaNota = document.createElement("tr");
    filaNota.innerHTML = `<td>Nota</td>` + data.notas.map(n => `<td>${n}</td>`).join("");
    body.appendChild(filaNota);

    const filaObs = document.createElement("tr");
    filaObs.innerHTML = `<td>Observación</td>` + data.observaciones.map(o => `<td>${o}</td>`).join("");
    body.appendChild(filaObs);
  }
document.getElementById("search").addEventListener("keyup", function() {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll("#table-body tr");
    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
});