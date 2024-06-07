document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(username, password);

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (response.ok) {
        sessionStorage.setItem('username', username);
        window.location.href = '/dashboard';
      } else {
        response.text().then(text => alert(text));
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
});