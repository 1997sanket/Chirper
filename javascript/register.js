"use strict";

// On route access, check if the token exists
if (localStorage.getItem('userId')) {
  // Redirect the user to the login page or another page
  window.location.href = "chirp.html";
}

function checkPassword(event) {
    let password = document.getElementById("password").value
    let confirmPassword = document.getElementById("confirm-password").value

    let passwordError = document.getElementById("password-error")
    let submitButton = document.getElementById('submit-button')


    if(password != confirmPassword) {
        passwordError.style.color = '#f74f39'
        passwordError.innerHTML = "Passwords do not match"
        submitButton.disabled = true;
    }
    else {
        passwordError.innerHTML = ''
        submitButton.disabled = false
    }
}

function register(event) {
    
    let firstName = document.getElementById("firstName").value
    let lastName = document.getElementById("lastName").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    let confirmPassword = document.getElementById("confirm-password").value

    if(!firstName || !lastName || !email || !password || !confirmPassword) return;

    event.preventDefault()

    let user = {
        firstName : firstName,
        lastName: lastName,
        email: email,
        password: password
    }

    // send to backend and create new user
    // URL where you want to send the POST request
const url = 'http://localhost:8080/user/register';

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
      if (response.status === 409) {
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

    let h2 = document.getElementById("response")
    h2.innerHTML = 'Successfully created new user'
    h2.style.color = '#32a869'

    document.getElementById("registerForm").reset()
  })
  .catch(error => {
  
    let h2 = document.getElementById("response")
    h2.innerHTML = error
    h2.style.color = '#f74f39'
  });

}