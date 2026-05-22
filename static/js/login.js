const loginForm = document.getElementById('loginForm');
const loginFeedback = document.getElementById('loginFeedback');

function showLoginError(message) {
  if (!loginFeedback) return;
  loginFeedback.textContent = message;
  loginFeedback.classList.remove('hidden');
}

function hideLoginError() {
  if (!loginFeedback) return;
  loginFeedback.textContent = '';
  loginFeedback.classList.add('hidden');
}

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    hideLoginError();

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    const username = usernameInput?.value.trim();
    const password = passwordInput?.value || '';

    if (!username || !password) {
      showLoginError('Por favor ingresa usuario y contraseña.');
      return;
    }

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        showLoginError(data.detail || 'Credenciales incorrectas, inténtalo de nuevo.');
        return;
      }

      localStorage.setItem('gciJJUser', JSON.stringify(data));
      window.location.href = 'dashboard.html';
    } catch (error) {
      showLoginError('No se pudo conectar con el servidor. Intenta nuevamente.');
      console.error('Login error:', error);
    }
  });
}