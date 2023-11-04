"use strict";

// On route access, check if the token exists
if (!localStorage.getItem('userId')) {
    // Redirect the user to the login page or another page
    window.location.href = "login.html";
}

// const posts = []

function getPosts() {
    const userId = localStorage.getItem('userId')
    const url = `http://localhost:8080/${userId}/post`

    

    fetch(url) 
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Process the data received from the server
        //data.forEach(post => posts.push(post.content))

        const dynamicList = document.getElementById('dynamic-list');

        data.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.appendChild(document.createTextNode(item.content));
            // posts.push(item)
            dynamicList.appendChild(li);
        });
    })
    .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
    });
}

getPosts()

function logout() {
  localStorage.clear()
}


function chirp(event) {
    let content = document.getElementById('content').value;
    
    if(!content) return;

    event.preventDefault()

    let userId = localStorage.getItem('userId');

    let post = {
        content: content
    }


    // send to backend and create new user
    // URL where you want to send the POST request
const url = `http://localhost:8080/${userId}/post`;

console.log(userId)
console.log(url)

// Make a POST request using fetch
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(post) // Convert the user object to a JSON string
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
    console.log(data)
    window.location.href = 'chirp.html'
  })
  .catch(error => {
    console.log(error)
  });
    
}
