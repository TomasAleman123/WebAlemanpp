/*
  ====================================
  FORMULARIO DE LOGIN
  ====================================
  Este archivo contiene la lógica para
  validar y procesar el inicio de sesión.
*/

document.addEventListener('DOMContentLoaded', function() {
  
  // ===========================================
  // OBTENER ELEMENTOS DEL FORMULARIO DE LOGIN
  // ===========================================
  
  const loginForm = document.getElementById('loginForm');
  const loginScreen = document.getElementById('loginScreen');
  const dashboardScreen = document.getElementById('dashboardScreen');
  const welcomeMessage = document.getElementById('welcomeMessage');
  
  
  // ===========================================
  // EVENTO: ENVIAR FORMULARIO DE LOGIN
  // ===========================================
  
  loginForm.addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    /*
      Obtenemos los valores del formulario de login.
    */
    
    const emailOUsuario = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    
    // ===========================================
    // PASO 1: VALIDAR QUE LOS CAMPOS NO ESTÉN VACÍOS
    // ===========================================
    
    if (emailOUsuario === '' || password === '') {
      alert('Por favor, rellena todos los campos');
      return;
    }
    
    
    // ===========================================
    // PASO 2: BUSCAR EL USUARIO EN LA BASE DE DATOS
    // ===========================================
    
    const usuarios = obtenerUsuarios();
    
    // Buscamos un usuario que coincida con el email o username y la contraseña
    const usuarioEncontrado = usuarios.find(u => 
      (u.email === emailOUsuario || u.username === emailOUsuario) && 
      u.password === password
    );
    
    
    // ===========================================
    // PASO 3: VERIFICAR SI EL USUARIO EXISTE
    // ===========================================
    
    if (usuarioEncontrado) {
      // Login exitoso: colocar mensaje en el header y mostrar main en blanco
      const appHeader = document.getElementById('appHeader');
      const headerWelcome = document.getElementById('headerWelcome');
      const mainContent = document.getElementById('mainContent');

      if (headerWelcome) {
        headerWelcome.textContent = '¡Bienvenido ' + usuarioEncontrado.username + '!';
      }

      // Limpiamos el formulario
      loginForm.reset();

      // Ocultamos pantalla de login y mostramos header + main
      loginScreen.style.display = 'none';
      if (appHeader) appHeader.style.display = 'flex';
      if (mainContent) mainContent.style.display = 'block';

    } else {
      // Usuario o contraseña incorrectos
      alert('Email/Usuario o contraseña incorrectos. Intenta de nuevo.');
    }
  });
  
});

/*
  ====================================
  CREDENCIALES DE PRUEBA:
  ====================================
  Email: usuario@example.com
  Contraseña: 123456
  
  (O registra un nuevo usuario para pruebas)
*/
