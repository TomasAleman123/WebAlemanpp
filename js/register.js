/*
  ====================================
  FORMULARIO DE REGISTRO
  ====================================
  Este archivo contiene la lógica para
  validar y procesar el registro de nuevos usuarios.
  Los datos se guardan en localStorage.
*/

document.addEventListener('DOMContentLoaded', function() {
  
  // ===========================================
  // OBTENER ELEMENTOS DEL FORMULARIO DE REGISTRO
  // ===========================================
  
  const registerForm = document.getElementById('registerForm');
  const registerScreen = document.getElementById('registerScreen');
  // Crear div para mensajes de error
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-message';
  errorDiv.style.color = '#c62828';
  errorDiv.style.marginBottom = '16px';
  errorDiv.style.textAlign = 'center';
  registerForm.insertBefore(errorDiv, registerForm.firstChild);
  
  
  // ===========================================
  // EVENTO: ENVIAR FORMULARIO DE REGISTRO
  // ===========================================
  
  registerForm.addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    /*
      Obtenemos los valores del formulario de registro.
    */
    
    const email = document.getElementById('registerEmail').value;
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    errorDiv.textContent = '';
    if (email === '' || username === '' || password === '' || confirmPassword === '') {
      errorDiv.textContent = 'Por favor, rellena todos los campos';
      return;
    }
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!expresionRegular.test(email)) {
      errorDiv.textContent = 'Por favor, ingresa un correo electrónico válido';
      return;
    }
    if (password.length < 6) {
      errorDiv.textContent = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }
    if (password !== confirmPassword) {
      errorDiv.textContent = 'Las contraseñas no coinciden. Intenta de nuevo';
      return;
    }
    const usuarios = obtenerUsuarios();
    const usuarioExiste = usuarios.some(u => u.email === email || u.username === username);
    if (usuarioExiste) {
      errorDiv.textContent = 'Este email o nombre de usuario ya está registrado';
      return;
    }
    
    
    // ===========================================
    // PASO 6: GUARDAR EL NUEVO USUARIO
    // ===========================================
    
    // Creamos un objeto con los datos del nuevo usuario
    const nuevoUsuario = {
      email: email,
      username: username,
      password: password
    };
    
    // Agregamos el nuevo usuario a la lista
    usuarios.push(nuevoUsuario);
    
    // Guardamos los usuarios en localStorage
    guardarUsuarios(usuarios);
    
    // Mostramos un mensaje de éxito (y pasamos al header + main)
    const appHeader = document.getElementById('appHeader');
    const headerWelcome = document.getElementById('headerWelcome');
    const mainContent = document.getElementById('mainContent');

    if (headerWelcome) {
      headerWelcome.textContent = '¡Bienvenido ' + username + '!';
    }

    // Limpiamos el formulario
    registerForm.reset();

    // Ocultamos la pantalla de registro y mostramos header + main
    registerScreen.style.display = 'none';
    if (appHeader) appHeader.style.display = 'flex';
    if (mainContent) {
      mainContent.style.display = 'block';
      // Asignar handler de logout cada vez que se muestra el main
      if (window.assignLogoutHandler) window.assignLogoutHandler();
    }
    // Lanzar evento para asegurar handler de logout
    window.dispatchEvent(new Event('registerSuccess'));
  });
  
});

/*
  ====================================
  VALIDACIONES IMPLEMENTADAS:
  ====================================
  
  1. Campos no vacíos
  2. Email válido (debe tener @)
  3. Contraseña mínimo 6 caracteres
  4. Las contraseñas deben coincidir
  5. No permite registrar el mismo email o username dos veces
  6. Guarda los datos en localStorage (navegador)
*/
