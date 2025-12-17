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
  // Crear div para mensajes de error
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-message';
  errorDiv.style.color = '#c62828';
  errorDiv.style.marginBottom = '16px';
  errorDiv.style.textAlign = 'center';
  loginForm.insertBefore(errorDiv, loginForm.firstChild);
  
  
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
    errorDiv.textContent = '';
    if (emailOUsuario === '' || password === '') {
      errorDiv.textContent = 'Por favor, rellena todos los campos';
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
      setUsuarioLogueado(usuarioEncontrado);
      const appHeader = document.getElementById('appHeader');
      const headerWelcome = document.getElementById('headerWelcome');
      const mainContent = document.getElementById('mainContent');
      if (headerWelcome) {
        headerWelcome.textContent = '¡Bienvenido ' + usuarioEncontrado.username + '!';
      }
      loginForm.reset();
      loginScreen.style.display = 'none';
      if (appHeader) appHeader.style.display = 'flex';
      if (mainContent) mainContent.style.display = 'block';
      // Asignar handler de logout cada vez que se muestra el main
      if (window.assignLogoutHandler) window.assignLogoutHandler();
    } else {
      errorDiv.textContent = 'Email/Usuario o contraseña incorrectos. Intenta de nuevo.';
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

// Guardar usuario logueado en localStorage
function setUsuarioLogueado(usuario) {
  localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
}

// Obtener usuario logueado
function getUsuarioLogueado() {
  const data = localStorage.getItem('usuarioLogueado');
  return data ? JSON.parse(data) : null;
}

// Restaurar sesión si existe
(function restaurarSesion() {
  const usuario = getUsuarioLogueado();
  if (usuario) {
    const appHeader = document.getElementById('appHeader');
    const headerWelcome = document.getElementById('headerWelcome');
    const mainContent = document.getElementById('mainContent');
    if (headerWelcome) headerWelcome.textContent = '¡Bienvenido ' + usuario.username + '!';
    if (appHeader) appHeader.style.display = 'flex';
    if (mainContent) mainContent.style.display = 'block';
    if (window.assignLogoutHandler) window.assignLogoutHandler();
    // Oculta pantallas de login/registro/bienvenida
    const loginScreen = document.getElementById('loginScreen');
    const registerScreen = document.getElementById('registerScreen');
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (loginScreen) loginScreen.style.display = 'none';
    if (registerScreen) registerScreen.style.display = 'none';
    if (welcomeScreen) welcomeScreen.style.display = 'none';
  }
})();
