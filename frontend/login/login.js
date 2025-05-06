document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (res.ok) {
        const data = await res.json();
        // Guardar token o sesión (si el backend lo devuelve)
        alert('Login exitoso');
        window.location.href = `../dashboard/dashboard.html?user=${encodeURIComponent(data.username)}`;
      } else {
        const errorData = await res.json();
        document.getElementById('error-message').innerText = errorData.message || 'Credenciales incorrectas';
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      document.getElementById('error-message').innerText = 'Error de conexión';
    }
  });
  