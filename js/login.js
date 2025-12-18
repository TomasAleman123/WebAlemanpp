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

    const emailOUsuario = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    errorDiv.textContent = '';

    if (emailOUsuario === '' || password === '') {
      errorDiv.textContent = 'Por favor, rellena todos los campos';
      return;
    }

    // ===========================================
    // BUSCAR USUARIO
    // ===========================================

    const usuarios = obtenerUsuarios();

    const usuarioEncontrado = usuarios.find(u =>
      (u.email === emailOUsuario || u.username === emailOUsuario) &&
      u.password === password
    );

    // ===========================================
    // SI EXISTE → LOGIN OK
    // ===========================================

    if (usuarioEncontrado) {

      // Guardamos SOLO el email (clave única)
      setUsuarioLogueado(usuarioEncontrado.email);

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

      if (window.assignLogoutHandler) {
        window.assignLogoutHandler();
      }

    } else {
      errorDiv.textContent = 'Email/Usuario o contraseña incorrectos.';
    }
  });
});

/*
  ====================================
  SESIÓN DE USUARIO
  ====================================
*/

// Guardar usuario logueado (SOLO EMAIL)
function setUsuarioLogueado(email) {
  localStorage.setItem('usuarioLogueado', email);
}

// Obtener usuario logueado
function getUsuarioLogueado() {
  return localStorage.getItem('usuarioLogueado');
}

// Restaurar sesión si existe
(function restaurarSesion() {
  const email = getUsuarioLogueado();
  if (!email) return;

  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) return;

  const appHeader = document.getElementById('appHeader');
  const headerWelcome = document.getElementById('headerWelcome');
  const mainContent = document.getElementById('mainContent');

  if (headerWelcome) {
    headerWelcome.textContent = '¡Bienvenido ' + usuario.username + '!';
  }

  if (appHeader) appHeader.style.display = 'flex';
  if (mainContent) mainContent.style.display = 'block';

  const loginScreen = document.getElementById('loginScreen');
  const registerScreen = document.getElementById('registerScreen');
  const welcomeScreen = document.getElementById('welcomeScreen');
  const choiceScreen = document.getElementById('choiceScreen');

  if (loginScreen) loginScreen.style.display = 'none';
  if (registerScreen) registerScreen.style.display = 'none';
  if (welcomeScreen) welcomeScreen.style.display = 'none';
  if (choiceScreen) choiceScreen.style.display = 'none';

  if (window.assignLogoutHandler) {
    window.assignLogoutHandler();
  }
})();