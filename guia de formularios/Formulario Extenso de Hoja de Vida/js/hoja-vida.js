// ===== Referencias a elementos =====
const cvForm = document.getElementById('cvForm');
const cvNameInput = document.getElementById('cvName');
const cvTitleInput = document.getElementById('cvTitle');
const container = document.getElementById('experienceContainer');
const addBtn = document.getElementById('addExpBtn');
const expErr = document.getElementById('expErr');

const cvPreview = document.getElementById('cvPreview');
const cvPreviewContent = document.getElementById('cvPreviewContent');
const editCvBtn = document.getElementById('editCvBtn');

let expCounter = 0;

// ===== Función para agregar bloques de experiencia dinámica =====
addBtn.addEventListener('click', () => {
  expCounter++;
  const div = document.createElement('div');
  div.className = 'exp-block';
  div.dataset.expId = expCounter;
  div.innerHTML = `
    <input type="text" placeholder="Empresa" class="exp-company" required>
    <input type="text" placeholder="Cargo" class="exp-role" required>
    <button type="button" class="remove-exp-btn" title="Eliminar experiencia">✕</button>
  `;
  container.appendChild(div);
  expErr.textContent = '';

  // Botón para eliminar este bloque de experiencia
  div.querySelector('.remove-exp-btn').addEventListener('click', () => {
    div.remove();
  });
});

// ===== Validación y envío del formulario =====
cvForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let isValid = true;

  // Limpiar estados previos
  [cvNameInput, cvTitleInput].forEach(el => el.classList.remove('error'));
  expErr.textContent = '';

  // Validar nombre
  if (cvNameInput.value.trim() === '') {
    cvNameInput.classList.add('error');
    isValid = false;
  }

  // Validar título profesional
  if (cvTitleInput.value.trim() === '') {
    cvTitleInput.classList.add('error');
    isValid = false;
  }

  // Validar que cada bloque de experiencia esté completo
  const expBlocks = document.querySelectorAll('.exp-block');
  expBlocks.forEach(block => {
    const company = block.querySelector('.exp-company');
    const role = block.querySelector('.exp-role');
    if (company.value.trim() === '' || role.value.trim() === '') {
      company.classList.add('error');
      role.classList.add('error');
      expErr.textContent = 'Completa todos los campos de experiencia o elimínalos.';
      isValid = false;
    } else {
      company.classList.remove('error');
      role.classList.remove('error');
    }
  });

  if (!isValid) return;

  // ===== Generar vista previa del CV =====
  let experienceHtml = '';
  if (expBlocks.length === 0) {
    experienceHtml = '<p><em>Sin experiencia laboral registrada.</em></p>';
  } else {
    expBlocks.forEach(block => {
      const company = block.querySelector('.exp-company').value.trim();
      const role = block.querySelector('.exp-role').value.trim();
      experienceHtml += `<div class="cv-exp-entry"><strong>${role}</strong> — ${company}</div>`;
    });
  }

  cvPreviewContent.innerHTML = `
    <div class="cv-preview-item">
      <strong>Nombre:</strong> ${cvNameInput.value.trim()}
    </div>
    <div class="cv-preview-item">
      <strong>Título Profesional:</strong> ${cvTitleInput.value.trim()}
    </div>
    <div class="cv-preview-item">
      <strong>Experiencia Laboral:</strong>
      ${experienceHtml}
    </div>
  `;

  cvForm.style.display = 'none';
  cvPreview.style.display = 'block';
});

// ===== Botón para volver a editar el formulario =====
editCvBtn.addEventListener('click', () => {
  cvPreview.style.display = 'none';
  cvForm.style.display = 'block';
});
