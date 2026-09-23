// ===== Referencias a elementos =====
const nameInput = document.getElementById('fullname');
const nameErr = document.getElementById('nameErr');

const emailInput = document.getElementById('regEmail');
const emailErr = document.getElementById('regEmailErr');

const passInput = document.getElementById('regPass');
const passErr = document.getElementById('regPassErr');

const passConfirmInput = document.getElementById('regPassConfirm');
const passConfirmErr = document.getElementById('regPassConfirmErr');

const termsInput = document.getElementById('terms');
const termsErr = document.getElementById('termsErr');

const regForm = document.getElementById('regForm');
const regSummary = document.getElementById('regSummary');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ===== Validación en tiempo real del nombre (evento "input") =====
nameInput.addEventListener('input', function () {
  if (this.value.trim().length >= 3) {
    this.classList.remove('invalid');
    this.classList.add('valid'); // Aplica borde verde
    nameErr.textContent = '';
  } else {
    this.classList.remove('valid');
    this.classList.add('invalid'); // Aplica borde rojo
    nameErr.textContent = 'Mínimo 3 caracteres.';
  }
});

// ===== Validación en tiempo real del correo =====
emailInput.addEventListener('input', function () {
  if (emailRegex.test(this.value.trim())) {
    this.classList.remove('invalid');
    this.classList.add('valid');
    emailErr.textContent = '';
  } else {
    this.classList.remove('valid');
    this.classList.add('invalid');
    emailErr.textContent = 'Correo no válido.';
  }
});

// ===== Validación en tiempo real de confirmación de contraseña =====
function checkPasswordsMatch() {
  if (passConfirmInput.value === '') {
    passConfirmInput.classList.remove('valid', 'invalid');
    passConfirmErr.textContent = '';
    return;
  }
  if (passInput.value === passConfirmInput.value && passInput.value.length >= 6) {
    passConfirmInput.classList.remove('invalid');
    passConfirmInput.classList.add('valid');
    passConfirmErr.textContent = '';
  } else {
    passConfirmInput.classList.remove('valid');
    passConfirmInput.classList.add('invalid');
    passConfirmErr.textContent = 'Las contraseñas no coinciden.';
  }
}
passInput.addEventListener('input', checkPasswordsMatch);
passConfirmInput.addEventListener('input', checkPasswordsMatch);

// ===== Validación final al enviar el formulario =====
regForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let isValid = true;

  // Nombre
  if (nameInput.value.trim().length < 3) {
    nameInput.classList.add('invalid');
    nameErr.textContent = 'Mínimo 3 caracteres.';
    isValid = false;
  }

  // Correo
  if (!emailRegex.test(emailInput.value.trim())) {
    emailInput.classList.add('invalid');
    emailErr.textContent = 'Ingrese un correo electrónico válido.';
    isValid = false;
  }

  // Contraseña
  if (passInput.value.length < 6) {
    passInput.classList.add('error');
    passErr.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    isValid = false;
  } else {
    passErr.textContent = '';
    passInput.classList.remove('error');
  }

  // Confirmación de contraseña (contraseñas cruzadas)
  if (passInput.value !== passConfirmInput.value || passConfirmInput.value === '') {
    passConfirmInput.classList.add('invalid');
    passConfirmErr.textContent = 'Las contraseñas no coinciden.';
    isValid = false;
  }

  // Términos y condiciones
  if (!termsInput.checked) {
    termsErr.textContent = 'Debes aceptar los términos y condiciones.';
    isValid = false;
  } else {
    termsErr.textContent = '';
  }

  // Si todo es válido, mostrar resumen
  if (isValid) {
    const genderSelect = document.getElementById('gender');
    const genderText = genderSelect.value === 'M' ? 'Masculino'
      : genderSelect.value === 'F' ? 'Femenino'
      : 'No especificado';

    regForm.style.display = 'none';
    document.getElementById('summaryText').innerHTML =
      `<strong>Nombre:</strong> ${nameInput.value}<br>` +
      `<strong>Correo:</strong> ${emailInput.value}<br>` +
      `<strong>Género:</strong> ${genderText}`;
    regSummary.style.display = 'block';
  }
});
