function getStoredUser() {
  const raw = localStorage.getItem('gciJJUser');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error parsing stored user:', error);
    return null;
  }
}

function populateDashboard(user) {
  const patientName = document.getElementById('patientName');
  const patientFirstName = document.getElementById('patientFirstName');
  const patientDocument = document.getElementById('patientDocument');
  const patientEmail = document.getElementById('patientEmail');
  const patientPhone = document.getElementById('patientPhone');
  const patientBirthday = document.getElementById('patientBirthday');

  if (patientName) {
    patientName.textContent = `${user.nombre} ${user.primer_apellido}`;
  }
  if (patientFirstName) {
    patientFirstName.textContent = user.nombre;
  }
  if (patientDocument) {
    patientDocument.textContent = `${user.tipo_documento} ${user.documento}`;
  }
  if (patientEmail) {
    patientEmail.textContent = user.correo;
  }
  if (patientPhone) {
    patientPhone.textContent = user.telefono || 'No disponible';
  }
  if (patientBirthday && user.fecha_nacimiento) {
    const date = new Date(user.fecha_nacimiento);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    patientBirthday.textContent = date.toLocaleDateString('es-ES', options);
  }
}

function redirectToLogin() {
  window.location.href = 'index.html';
}

function setupLogout() {
  const logoutButton = document.getElementById('logoutButton');
  if (!logoutButton) return;

  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('gciJJUser');
    redirectToLogin();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const user = getStoredUser();
  if (!user) {
    redirectToLogin();
    return;
  }
  populateDashboard(user);
  setupLogout();
});