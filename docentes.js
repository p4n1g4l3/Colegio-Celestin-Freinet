document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("gradeTable").getElementsByTagName("tbody")[0];
  const addRowBtn = document.getElementById("addRowBtn");

  const estudiantes = [
    {
      codigo: "2023129",
      nombre: "Acevedo Grimaldos Dilan Andrey",
      notas: [1.0, 2.5, 3.0, 2.8, 3.5, 4.0, 4.2, 5.0, 4.5, 4.8, 4.2, 3.8, 4.0, 4.5, 4.3, 4.6, 5.0, 4.8, 4.7],
    },
  ];

  function updateDefinitiva(row) {
    const cells = row.querySelectorAll(".grade");
    let conceptual = 0, procedimental = 0, actitudinal = 0;

    cells.forEach((cell, i) => {
      let value = parseFloat(cell.textContent);
      if (isNaN(value)) value = 0;
      if (i < 8) conceptual += value;
      else if (i < 16) procedimental += value;
      else actitudinal += value;

      // aplicar clase si es < 3.0
      if (value < 3.0) {
        cell.classList.add("low");
      } else {
        cell.classList.remove("low");
      }
    });

    let conceptualAvg = conceptual / 8;
    let procedimentalAvg = procedimental / 8;
    let actitudinalAvg = actitudinal / 3;

    let definitiva = ((conceptualAvg * 0.35) + (procedimentalAvg * 0.35) + (actitudinalAvg * 0.30)).toFixed(2);
    row.querySelector(".definitiva").textContent = definitiva;
  }

  function addEventToGrades(row) {
    row.querySelectorAll(".grade").forEach(cell => {
      cell.addEventListener("input", () => updateDefinitiva(row));
    });
  }

  function deleteRow(event) {
    const row = event.target.closest("tr");
    row.remove();
  }

  function agregarEstudiantes() {
    estudiantes.forEach((est, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td contenteditable="true">${est.codigo}</td>
        <td contenteditable="true">${est.nombre}</td>
        ${est.notas.map(nota => `<td contenteditable="true" class="grade">${nota}</td>`).join("")}
        <td class="definitiva">0.0</td>
        <td><button class="delete-btn">❌ Eliminar</button></td>
      `;

      table.appendChild(row);
      addEventToGrades(row);
      row.querySelector(".delete-btn").addEventListener("click", deleteRow);
      updateDefinitiva(row);
    });
  }

  addRowBtn.addEventListener("click", function () {
    const newRow = table.insertRow();
    newRow.innerHTML = `
      <td>${table.rows.length + 1}</td>
      <td contenteditable="true">Nuevo Código</td>
      <td contenteditable="true">Nuevo Estudiante</td>
      ${"<td contenteditable='true' class='grade'>0.0</td>".repeat(19)}
      <td class="definitiva">0.0</td>
      <td><button class="delete-btn">❌ Eliminar</button></td>
    `;
    addEventToGrades(newRow);
    newRow.querySelector(".delete-btn").addEventListener("click", deleteRow);
    updateDefinitiva(newRow);
  });

  // Inicializar estudiantes
  agregarEstudiantes();

  // Mostrar/Ocultar secciones
  const calificacionesBtn = document.getElementById("showCalificaciones");
  const calificacionesSection = document.querySelector(".calificaciones-section");
  const cursosSection = document.querySelector(".users");

  calificacionesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cursosSection.style.display = "none";
    calificacionesSection.style.display = "block";
  });
});
