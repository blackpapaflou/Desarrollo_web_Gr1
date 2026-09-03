document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Detener el envío nativo
  let isValid = true;

  const email = document.getElementById('loginEmail');
  const pass = document.getElementById('loginPass');
  const emailErr = document.getElementById('emailError');
  const passErr = document.getElementById('passError');

  // Limpiar estados visuales previos
  [email, pass].forEach(el => el.classList.remove('error'));
  emailErr.textContent = ''; passErr.textContent = '';

  // Validación de Correo mediante Expresión Regular
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    email.classList.add('error');
    emailErr.textContent = 'Ingrese un correo electrónico válido.';
    isValid = false;
  }

  // Validación de Contraseña
  if (pass.value.length < 6) {
    pass.classList.add('error');
    passErr.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    isValid = false;
  }

  // Si la validación es exitosa, transformar la vista
  if (isValid) {
    this.style.display = 'none'; // Ocultar el formulario
    const welcomeCard = document.getElementById('loginWelcome');
    document.getElementById('userEmailDisplay').textContent = email.value;
    welcomeCard.style.display = 'block'; // Mostrar bienvenida
  }
});

// --- Desafío Individual 1: mostrar/ocultar contraseña ---
const togglePassBtn = document.getElementById('togglePass');
const passInput = document.getElementById('loginPass');

togglePassBtn.addEventListener('click', () => {
  const isHidden = passInput.type === 'password';
  passInput.type = isHidden ? 'text' : 'password';
  togglePassBtn.textContent = isHidden ? '🙈' : '👁️';
  togglePassBtn.setAttribute('aria-label', isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña');
});