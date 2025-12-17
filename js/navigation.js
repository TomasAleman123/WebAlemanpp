/*
  ====================================
  NAVEGACIÓN ENTRE PANTALLAS
  ====================================
  Este archivo contiene la lógica para cambiar
  entre las diferentes pantallas de la aplicación:
  - Bienvenida
  - Selección (Login/Registro)
  - Login
  - Registro
  - Dashboard
*/

document.addEventListener('DOMContentLoaded', function() {
  
  // ===========================================
  // OBTENER ELEMENTOS DE NAVEGACIÓN
  // ===========================================
  
  const welcomeScreen = document.getElementById('welcomeScreen');
  const nextButton = document.getElementById('nextButton');
  const choiceScreen = document.getElementById('choiceScreen');
  const loginChoiceBtn = document.getElementById('loginChoiceBtn');
  const registerChoiceBtn = document.getElementById('registerChoiceBtn');
  const loginScreen = document.getElementById('loginScreen');
  const registerScreen = document.getElementById('registerScreen');
  const backToChoice = document.getElementById('backToChoice');
  const backToChoice2 = document.getElementById('backToChoice2');
  const dashboardScreen = document.getElementById('dashboardScreen');
  const appHeader = document.getElementById('appHeader');
  const mainContent = document.getElementById('mainContent');
  const logoutModal = document.getElementById('logoutModal');
  const confirmLogout = document.getElementById('confirmLogout');
  const cancelLogout = document.getElementById('cancelLogout');
  
  
  // ===========================================
  // 1. PANTALLA DE BIENVENIDA -> SELECCIÓN
  // ===========================================
  
  nextButton.addEventListener('click', function() {
    welcomeScreen.style.display = 'none';
    choiceScreen.style.display = 'flex';
  });
  
  
  // ===========================================
  // 2. SELECCIÓN -> LOGIN
  // ===========================================
  
  loginChoiceBtn.addEventListener('click', function() {
    choiceScreen.style.display = 'none';
    loginScreen.style.display = 'flex';
  });
  
  
  // ===========================================
  // 3. SELECCIÓN -> REGISTRO
  // ===========================================
  
  registerChoiceBtn.addEventListener('click', function() {
    choiceScreen.style.display = 'none';
    registerScreen.style.display = 'flex';
  });
  
  
  // ===========================================
  // 4. LOGIN -> SELECCIÓN (BOTÓN VOLVER)
  // ===========================================
  
  backToChoice.addEventListener('click', function(e) {
    e.preventDefault();
    loginScreen.style.display = 'none';
    choiceScreen.style.display = 'flex';
  });
  
  
  // ===========================================
  // 5. REGISTRO -> SELECCIÓN (BOTÓN VOLVER)
  // ===========================================
  
  backToChoice2.addEventListener('click', function(e) {
    e.preventDefault();
    registerScreen.style.display = 'none';
    choiceScreen.style.display = 'flex';
  });
  
  
  // ===========================================
  // 6. DASHBOARD -> MODAL DE CONFIRMACIÓN
  // ===========================================
  
  function assignLogoutHandler() {
    const btn = document.getElementById('logoutMain');
    if (btn) {
      btn.onclick = function() {
        if (logoutModal) logoutModal.style.display = 'flex';
      };
    }
  }
  // Asignar handler al cargar
  assignLogoutHandler();
  // Permitir que otros scripts lo llamen tras login/registro
  window.assignLogoutHandler = assignLogoutHandler;
  
  // ===========================================
  // 7. MODAL: CONFIRMAR LOGOUT
  // ===========================================
  
  confirmLogout.addEventListener('click', function() {
    // Limpiar usuario logueado
    localStorage.removeItem('usuarioLogueado');
    logoutModal.style.display = 'none';
    // Ocultar vistas de usuario
    if (dashboardScreen) dashboardScreen.style.display = 'none';
    if (appHeader) appHeader.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';
    // Volver a la bienvenida
    welcomeScreen.style.display = 'flex';
    // Reasignar handler por si el DOM se resetea
    assignLogoutHandler();
  });
  
  
  // ===========================================
  // 8. MODAL: CANCELAR LOGOUT
  // ===========================================
  
  cancelLogout.addEventListener('click', function() {
    logoutModal.style.display = 'none';
  });
  
  // También asignar handler cada vez que se muestre el main tras login/registro
  // (login.js y register.js deben llamar a esta función tras mostrar el main)
});
