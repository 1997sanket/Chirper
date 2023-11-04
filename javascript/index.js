
// On route access, check if the token exists
if (localStorage.getItem('userId')) {
    
    document.getElementById('register-link').style.display = 'none'
    document.getElementById('login-link').style.display = 'none'
    document.getElementById('chirp-link').style.display = 'block'
    document.getElementById('logout-link').style.display = 'block'
  }

  else {
    document.getElementById('chirp-link').style.display = 'none'
    document.getElementById('logout-link').style.display = 'none'
  }

  function logout() {
    localStorage.clear()
  }