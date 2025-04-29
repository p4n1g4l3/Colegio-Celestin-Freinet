// Función para cambiar de sección sin recargar la página
function mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });

    // Mostrar la sección seleccionada
    document.getElementById(seccion).classList.add("active");
}
// Datos simulados de calificaciones
const calificaciones = [
    { asignatura: "Matemáticas", nota: 4.5, observacion: "Muy bien" },
    { asignatura: "Ciencias", nota: 3.2, observacion: "Puede mejorar" },
    { asignatura: "Historia", nota: 2.8, observacion: "Debe reforzar" },
    { asignatura: "Inglés", nota: 4.8, observacion: "Excelente" },
    { asignatura: "Arte", nota: 3.9, observacion: "Buen desempeño" }
];

// Función para mostrar las calificaciones en la tabla
function mostrarCalificaciones() {
    const gradesBody = document.getElementById("gradesBody");
    gradesBody.innerHTML = ""; // Limpiar tabla antes de agregar datos

    calificaciones.forEach(calif => {
        const row = document.createElement("tr");

        // Aplicar colores según la calificación
        let gradeClass = "good";
        if (calif.nota < 3.0) {
            gradeClass = "bad";
        } else if (calif.nota < 4.0) {
            gradeClass = "regular";
        }

        row.innerHTML = `
            <td>${calif.asignatura}</td>
            <td class="grade ${gradeClass}">${calif.nota.toFixed(1)}</td>
            <td>${calif.observacion}</td>
        `;
        gradesBody.appendChild(row);
    });
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

const datosMaterias = {
    lengua_castellana: {
      actividades: ["Investigación", "Quiz", "Exposición"],
      notas: ["4.5", "3.8", "5.0"],
      observaciones: ["Muy bien", "Puede mejorar", "Excelente"]
    },
    matematicas: {
      actividades: ["Ejercicio 1", "Evaluación", "Taller"],
      notas: ["3.5", "4.0", "4.2"],
      observaciones: ["Regular", "Buena", "Bien hecho"]
    },
    ingles: {
      actividades: ["Listening", "Speaking", "Grammar"],
      notas: ["4.8", "4.5", "4.6"],
      observaciones: ["Excelente", "Muy buena", "Correcta"]
    },
    Ciencias_Naturales: {
      actividades: ["Experimento", "Informe", "Examen"],
      notas: ["3.0", "4.0", "3.5"],
      observaciones: ["Necesita mejorar", "Bien", "Regular"]
    },
    Ciencias_Sociales: {
      actividades: ["Lectura", "Debate", "Proyecto"],
      notas: ["4.2", "3.8", "4.0"],
      observaciones: ["Buena", "Puede mejorar", "Bien"]
    },
    Educación_Artística: {
      actividades: ["Dibujo", "Pintura", "Escultura"],
      notas: ["3.8", "4.0", "4.2"],
      observaciones: ["Regular", "Bien", "Excelente"]
    },
    Religión_o_Ética_y_Valores_Humanos: {
      actividades: ["valores", "religion", "ética"],
      notas: ["4.5", "4.0", "3.8"],
      observaciones: ["Muy bien", "Bien", "Regular"]
    },
    Educación_Física: {
      actividades: ["Fútbol", "Baloncesto", "Tenis"],
      notas: ["4.0", "3.8", "4.2"],
      observaciones: ["Regular", "Bien", "Excelente"]
    },
    Tecnología_e_Informática: {
      actividades: ["Programación", "Redes", "Base de Datos"],
      notas: ["4.0", "3.8", "4.2"], 
      observaciones: ["Regular", "Bien", "Excelente"]
    }
  };

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