// ===== Referencias a elementos =====
const encuestaForm = document.getElementById('encuestaForm');

const academicLevel = document.getElementById('academicLevel');
const academicLevelErr = document.getElementById('academicLevelErr');

const langPref = document.getElementById('langPref');
const langPrefErr = document.getElementById('langPrefErr');

const reasonSelect = document.getElementById('reasonSelect');
const reasonErr = document.getElementById('reasonErr');

const otherGroup = document.getElementById('otherGroup');
const otherReason = document.getElementById('otherReason');
const otherReasonErr = document.getElementById('otherReasonErr');

const surveySummary = document.getElementById('surveySummary');
const summaryList = document.getElementById('summaryList');
const restartBtn = document.getElementById('restartBtn');

// ===== Lógica condicional: mostrar/ocultar campo "Otro" =====
reasonSelect.addEventListener('change', function () {
  if (this.value === 'Otro') {
    otherGroup.style.display = 'block';
    otherReason.required = true;
  } else {
    otherGroup.style.display = 'none';
    otherReason.required = false;
    otherReason.value = '';
    otherReason.classList.remove('error');
    otherReasonErr.textContent = '';
  }
});

// ===== Validación y envío del formulario =====
encuestaForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let isValid = true;

  // Limpiar estados previos
  [academicLevel, langPref, reasonSelect, otherReason].forEach(el => el.classList.remove('error'));
  academicLevelErr.textContent = '';
  langPrefErr.textContent = '';
  reasonErr.textContent = '';
  otherReasonErr.textContent = '';

  if (academicLevel.value === '') {
    academicLevel.classList.add('error');
    academicLevelErr.textContent = 'Selecciona tu nivel académico.';
    isValid = false;
  }

  if (langPref.value === '') {
    langPref.classList.add('error');
    langPrefErr.textContent = 'Selecciona un lenguaje.';
    isValid = false;
  }

  if (reasonSelect.value === '') {
    reasonSelect.classList.add('error');
    reasonErr.textContent = 'Selecciona una opción.';
    isValid = false;
  }

  // Si eligió "Otro", el campo de texto es obligatorio
  if (reasonSelect.value === 'Otro' && otherReason.value.trim() === '') {
    otherReason.classList.add('error');
    otherReasonErr.textContent = 'Especifica tu motivo.';
    isValid = false;
  }

  if (!isValid) return;

  // ===== Generar resumen de respuestas =====
  const motivoTexto = reasonSelect.value === 'Otro'
    ? otherReason.value.trim()
    : reasonSelect.options[reasonSelect.selectedIndex].text;

  summaryList.innerHTML = `
    <li><strong>Nivel Académico:</strong> ${academicLevel.value}</li>
    <li><strong>Lenguaje Preferido:</strong> ${langPref.value}</li>
    <li><strong>Motivo Especificado:</strong> ${motivoTexto}</li>
  `;

  encuestaForm.style.display = 'none';
  surveySummary.style.display = 'block';
});

// ===== Reiniciar encuesta =====
restartBtn.addEventListener('click', () => {
  encuestaForm.reset();
  otherGroup.style.display = 'none';
  surveySummary.style.display = 'none';
  encuestaForm.style.display = 'block';
});
