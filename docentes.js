const estudiantesPorCurso = {
    "Jardín": [
      { nombre: "Juanita Pérez", edad: 5, id : "1001" },
      { nombre: "Mateo Gómez", edad: 5,  id : "1002"}
    ],
    "Transición": [
      { nombre: "Sofía Rodríguez", edad: 6, id : "1003" },
      { nombre: "Lucas Moreno", edad: 6, id : "1004" }
    ],
    "Primero": [
      { nombre: "Emilia Torres", edad: 7,  id : "1005" },
      { nombre: "Tomás García", edad: 7,  id : "1006" }
    ],
    "Segundo": [
      { nombre: "Camila Ruiz", edad: 8,  id : "1007" },
      { nombre: "Juan Esteban", edad: 8, id : "1008" }
    ],
    "Tercero": [
      { nombre: "Daniela Cruz", edad: 9,  id : "1009" },
      { nombre: "Gabriel Vega", edad: 9,  id : "10001" }
    ],
    "Cuarto": [
      { nombre: "Sara López", edad: 10,  id : "10011" },
      { nombre: "Felipe Castro", edad: 10,  id : "10012" }
    ],
    "Quinto": [
      { nombre: "Valentina Navarro", edad: 11, id : "10013" },
      { nombre: "Simón Ríos", edad: 11,  id : "10014"}
    ]
  };
  

  document.getElementById("showCalificaciones").addEventListener("click", function () {
    const calificaciones = document.querySelector(".calificaciones-section");
    const boletin = document.querySelector(".boletin-section");
    const planilla = document.querySelector(".planilla-estudiantes");
    const cursos = document.querySelector(".users"); // 👈 sección de cursos
  
    if (calificaciones) calificaciones.style.display = "flex";
    if (boletin) boletin.style.display = "none";
    if (planilla) planilla.style.display = "none";
    if (cursos) cursos.style.display = "none"; // 👈 oculta los cursos
  });
  
  
  
  document.getElementById("showBoletin").addEventListener("click", function () {
    document.querySelector(".boletin-section").style.display = "flex";
    document.querySelector(".calificaciones-section").style.display = "none";
  });

function eliminarCurso(btn) {
    const row = btn.closest("tr");
    row.remove();
  }

  function agregarCurso() {
    const tabla = document.getElementById("cursosTable").querySelector("tbody");
    const nuevaFila = document.createElement("tr");

    nuevaFila.innerHTML = `
      <td contenteditable="true">Nuevo Curso</td>
      <td contenteditable="true">Nombre Docente</td>
      <td>
        <button class="view">Ver</button>
        <button class="delete-btn" onclick="eliminarCurso(this)">Eliminar</button>
      </td>
    `;
    tabla.appendChild(nuevaFila);
  }
  
  document.querySelectorAll(".view").forEach((btn) => {
    btn.addEventListener("click", function () {
      const curso = this.getAttribute("data-curso") || "Curso no identificado";
      const estudiantes = estudiantesPorCurso[curso] || [];
  
      // Actualiza título
      document.getElementById("nombreCurso").textContent = curso;
  
      // Llena la tabla
      const tablaBody = document.getElementById("tablaEstudiantes");
      tablaBody.innerHTML = "";
  
      estudiantes.forEach(est => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${est.nombre}</td>
          <td>${est.edad}</td>
          <td>${est.id}</td>
        `;
        tablaBody.appendChild(fila);
      });
  
      // Muestra la planilla
      document.querySelector(".planilla-estudiantes").style.display = "block";
    });

    document.getElementById("cerrarPlanilla").addEventListener("click", function () {
        document.querySelector(".planilla-estudiantes").style.display = "none";
      });

  });

  function calcularDefinitivas() {
    const filas = document.querySelectorAll(".tabla-notas tbody tr");
    
    filas.forEach((fila) => {
      const c = parseFloat(fila.children[1].textContent) || 0;
      const p = parseFloat(fila.children[2].textContent) || 0;
      const a = parseFloat(fila.children[3].textContent) || 0;
      const definitiva = ((c + p + a) / 3).toFixed(2);
  
      const celdaDef = fila.querySelector(".definitiva");
      celdaDef.textContent = definitiva;
      celdaDef.classList.toggle("roja", definitiva < 3);
    });
}

    const verBtns = document.querySelectorAll('.ver-btn');
    const contenidoDinamico = document.getElementById('contenidoDinamico');

    verBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.submenu').forEach(menu => {
          if (menu !== btn.nextElementSibling) {
            menu.style.display = 'none';
          }
        });

        const submenu = btn.nextElementSibling;
        submenu.style.display = submenu.style.display === 'flex' ? 'none' : 'flex';
      });
    });

    document.querySelectorAll('.submenu-opcion').forEach(opcion => {
      opcion.addEventListener('click', () => {
        const curso = opcion.dataset.curso;
        const seccion = opcion.dataset.seccion;

        let contenido = '';
        switch (seccion) {
          case 'Planilla':
            contenido = `<h3>Planilla - ${curso}</h3><p>Contenido de la planilla del curso ${curso}.</p>`;
            break;
          case 'Calificaciones':
            contenido = `<h3>Calificaciones - ${curso}</h3><p>Listado de calificaciones del curso ${curso}.</p>`;
            break;
          case 'Observador':
            contenido = `<h3>Observador - ${curso}</h3><p>Registro de observaciones del curso ${curso}.</p>`;
            break;
        }

        contenidoDinamico.innerHTML = contenido;
      });
    });
 
    
    document.addEventListener('click', (e) => {
      if (!e.target.closest('td')) {
        document.querySelectorAll('.submenu').forEach(menu => {
          menu.style.display = 'none';
        });
      }
    });


  document.querySelectorAll('.submenu-opcion').forEach(boton => {
    boton.addEventListener('click', () => {
      const curso = boton.dataset.curso;
      const seccion = boton.dataset.seccion.toLowerCase(); // ejemplo: "calificaciones"

      // Ocultar todas las secciones
      document.querySelectorAll('.tabla-seccion').forEach(div => div.style.display = 'none');

      // Mostrar sección de contenido principal
      const contenedor = document.getElementById('seccion-contenido');
      contenedor.style.display = 'block';

      // Título dinámico
      document.getElementById('titulo-seccion').textContent = `${seccion.charAt(0).toUpperCase() + seccion.slice(1)} - ${curso}`;

      // Mostrar la tabla correspondiente
      const tabla = document.getElementById(`tabla-${seccion}`);
      if (tabla) {
        document.getElementById('contenido-seccion').innerHTML = tabla.innerHTML;
      }
    });
  });

  const btnVolver = document.getElementById('btnVolver');
  const titulo = document.getElementById('titulo-seccion');
  const tablaCursos = document.getElementById('tabla-cursos');

  btnVolver.addEventListener('click', () => {
    // Oculta todas las secciones
    document.querySelectorAll('.tabla-seccion').forEach(div => div.style.display = 'none');

    // Muestra la tabla de cursos
    if (tablaCursos) {
      tablaCursos.style.display = 'block';
    }

    // Cambia el título
    if (titulo) {
      titulo.textContent = "Cursos";
    }

    // Oculta el botón volver
    btnVolver.style.display = 'none';
  });





  

  
  
  
  
  