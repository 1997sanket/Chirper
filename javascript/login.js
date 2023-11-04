"use strict";

// On route access, check if the token exists
if (localStorage.getItem('userId')) {
    // Redirect the user to the login page or another page
    window.location.href = "chirp.html";
}

function login(event) {
    
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    if(!email || !password) return;


    event.preventDefault()

    let user = {
        email: email,
        password: password
    }

    // send to backend and create new user
    // URL where you want to send the POST request
const url = 'https://chirper-prod.eba-w257m5a5.us-east-1.elasticbeanstalk.com/user/login';

// Make a POST request using fetch
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user) // Convert the user object to a JSON string
})
.then(response => {
    if (!response.ok) {
      // Handle error response
      if (response.status === 400) {
        return response.text().then(errorMessage => {
            throw new Error(errorMessage)
        });
    } else {
        throw new Error('Network response was not ok');
    }
    }
    return response.text();
  })
  .then(data => {
    localStorage.setItem('userId', data)
    window.location.href = 'chirp.html'
  })
  .catch(error => {
    
    let errorMessage = document.getElementById('error-message')
    errorMessage.innerHTML = error
    errorMessage.style.color = '#f74f39'

  });
    
}