document.addEventListener('DOMContentLoaded', () => {

  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Si no estamos en el main, salimos
  if (!taskInput || !addTaskBtn || !taskList) return;

  // Obtener usuario logueado
  const usuarioEmail = localStorage.getItem('usuarioLogueado');
  if (!usuarioEmail) return;

  const storageKey = `tareas_${usuarioEmail}`;

  // ============================
  // CARGAR TAREAS
  // ============================
  function cargarTareas() {
    const tareas = JSON.parse(localStorage.getItem(storageKey)) || [];
    taskList.innerHTML = '';

    tareas.forEach((tarea, index) => {
      crearElementoTarea(tarea.texto, tarea.completada, index);
    });
  }

  // ============================
  // GUARDAR TAREAS
  // ============================
  function guardarTareas(tareas) {
    localStorage.setItem(storageKey, JSON.stringify(tareas));
  }

  // ============================
  // CREAR TAREA VISUAL
  // ============================
  function crearElementoTarea(texto, completada, index) {
    const li = document.createElement('li');
    li.className = 'task-item';
    if (completada) li.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completada;

    const span = document.createElement('span');
    span.textContent = texto;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.className = 'delete-btn';

    checkbox.addEventListener('change', () => {
      const tareas = JSON.parse(localStorage.getItem(storageKey)) || [];
      tareas[index].completada = checkbox.checked;
      guardarTareas(tareas);
      cargarTareas();
    });

    deleteBtn.addEventListener('click', () => {
      const tareas = JSON.parse(localStorage.getItem(storageKey)) || [];
      tareas.splice(index, 1);
      guardarTareas(tareas);
      cargarTareas();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  // ============================
  // AGREGAR TAREA
  // ============================
  addTaskBtn.addEventListener('click', () => {
    const texto = taskInput.value.trim();
    if (texto === '') return;

    const tareas = JSON.parse(localStorage.getItem(storageKey)) || [];
    tareas.push({ texto, completada: false });
    guardarTareas(tareas);

    taskInput.value = '';
    cargarTareas();
  });

  // Cargar al entrar
  cargarTareas();
});