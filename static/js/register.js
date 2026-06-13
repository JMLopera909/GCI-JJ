document.addEventListener('DOMContentLoaded', function () {
  // Elementos del formulario de registro
  const form = document.getElementById('registrationForm');
  const submitButton = document.getElementById('submit_button');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm_password');
  const feedback = document.getElementById('formFeedback');
  const url = window.location.origin + '/registro';

  console.log('Registro: register.js cargado', {
    frontendOrigin: window.location.origin,
    apiUrl: url,
    formInitialized: Boolean(form)
  });

  if (!form || !submitButton || !passwordInput || !confirmPasswordInput || !feedback) {
    console.error('Registro: no se pudieron inicializar los elementos del formulario.', {
      form,
      submitButton,
      passwordInput,
      confirmPasswordInput,
      feedback
    });
    return;
  }

  const originalButtonHtml = submitButton.innerHTML;

  // Actualiza el texto de estado y la clase CSS del mensaje
  function setFeedback(message, type = 'info') {
    const color = type === 'error' ? 'text-error' : 'text-on-surface-variant';
    feedback.textContent = message;
    feedback.className = `pt-2 text-sm font-body-md ${color}`;
  }

  function validatePasswords() {
    if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden');
      setFeedback('Las contraseñas no coinciden.', 'error');
    } else {
      confirmPasswordInput.setCustomValidity('');
    }
  }

  function updateSubmitState() {
    validatePasswords();
    const isValid = form.checkValidity();
    submitButton.disabled = !isValid;
    submitButton.setAttribute('aria-disabled', String(!isValid));
    submitButton.classList.toggle('bg-primary', isValid);
    submitButton.classList.toggle('text-on-primary', isValid);
    submitButton.classList.toggle('cursor-pointer', isValid);
    submitButton.classList.toggle('bg-surface-variant', !isValid);
    submitButton.classList.toggle('text-on-surface-variant', !isValid);
    submitButton.classList.toggle('cursor-not-allowed', !isValid);
    if (isValid) {
      feedback.textContent = '';
    }
  }

  const togglePasswordButton = document.getElementById('toggle_password');
  const toggleConfirmPasswordButton = document.getElementById('toggle_confirm_password');

  if (togglePasswordButton) {
    const togglePasswordIcon = togglePasswordButton.querySelector('span');
    togglePasswordButton.addEventListener('click', () => {
      const isVisible = passwordInput.type === 'text';
      passwordInput.type = isVisible ? 'password' : 'text';
      if (togglePasswordIcon) {
        togglePasswordIcon.textContent = isVisible ? 'visibility_off' : 'visibility';
      }
      togglePasswordButton.setAttribute('aria-label', isVisible ? 'Mostrar contraseña' : 'Ocultar contraseña');
    });
  }

  if (toggleConfirmPasswordButton) {
    const toggleConfirmPasswordIcon = toggleConfirmPasswordButton.querySelector('span');
    toggleConfirmPasswordButton.addEventListener('click', () => {
      const isVisible = confirmPasswordInput.type === 'text';
      confirmPasswordInput.type = isVisible ? 'password' : 'text';
      if (toggleConfirmPasswordIcon) {
        toggleConfirmPasswordIcon.textContent = isVisible ? 'visibility_off' : 'visibility';
      }
      toggleConfirmPasswordButton.setAttribute('aria-label', isVisible ? 'Mostrar contraseña' : 'Ocultar contraseña');
    });
  }

  function setLoading(isLoading) {
    submitButton.disabled = isLoading || !form.checkValidity();
    submitButton.setAttribute('aria-busy', String(isLoading));
    submitButton.classList.toggle('opacity-70', isLoading);
    submitButton.classList.toggle('cursor-not-allowed', isLoading);
    submitButton.innerHTML = isLoading ? 'Enviando...' : originalButtonHtml;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    validatePasswords();

    if (!form.checkValidity()) {
      setFeedback('Completa todos los campos requeridos antes de enviar.', 'error');
      return;
    }

    setLoading(true);
    setFeedback('Enviando datos al servidor...', 'info');

    // Build payload according to the backend schema.
    // fecha_nacimiento se toma de los selects de día/mes/año.
    const payload = {
      nombre: form.nombre.value.trim(),
      primer_apellido: form.primer_apellido.value.trim(),
      segundo_apellido: form.segundo_apellido.value.trim() || undefined,
      tipo_documento: form.tipo_documento.value,
      documento: form.documento.value.trim(),
      correo: form.correo.value.trim(),
      username: form.username.value.trim(),
      password: passwordInput.value
    };

    const telefonoValue = form.telefono.value.trim();
    if (telefonoValue) {
      payload.telefono = telefonoValue;
    }

    const birthDay = document.getElementById('birth_day')?.value;
    const birthMonth = document.getElementById('birth_month')?.value;
    const birthYear = document.getElementById('birth_year')?.value;
    if (birthDay && birthMonth && birthYear) {
      payload.fecha_nacimiento = `${birthYear}-${birthMonth}-${birthDay}`;
    }

    console.log('Registro payload:', payload);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const body = await response.json().catch(() => ({}));

      if (response.ok) {
        // En caso de registro exitoso, redirigimos a la página de éxito.
        window.location.href = './RExitoso.html';
        return;
      }

      if (body.detail) {
        if (Array.isArray(body.detail)) {
          const fieldErrors = body.detail.map((item) => item.msg || item.text).join(' ');
          setFeedback(fieldErrors || 'Error de validación en el backend.', 'error');
        } else if (typeof body.detail === 'string') {
          setFeedback(body.detail, 'error');
        } else {
          setFeedback('Error inesperado del servidor.', 'error');
        }
      } else {
        setFeedback('No se pudo completar el registro. Intenta de nuevo.', 'error');
      }
    } catch (error) {
      setFeedback('Error de red. Verifica que el backend esté corriendo en el mismo host y puerto que el frontend.', 'error');
      console.error('Registro: error de red al enviar datos', error);
    } finally {
      setLoading(false);
      updateSubmitState();
    }
  }

  form.addEventListener('input', updateSubmitState);
  form.addEventListener('change', updateSubmitState);
  form.addEventListener('submit', handleSubmit);
  updateSubmitState();
});
