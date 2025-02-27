const apiUrl = "http://localhost:5678/api/";

// Fonction pour se login
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    fetch(apiUrl + "users/login", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        const errorMessageElement = document.getElementById("error-message");
        if (!response.ok) {
            if (response.status === 401) {
                errorMessageElement.textContent = "Erreur dans l’identifiant ou le mot de passe";
            } else if (response.status === 404) {
                errorMessageElement.textContent = "Erreur dans l’identifiant ou le mot de passe";
            } else {
                errorMessageElement.textContent = "Erreur dans l’identifiant ou le mot de passe";
            }
            throw new Error('HTTP error ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            sessionStorage.setItem("token", data.token);
            window.location.href = "index.html";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Bouton submit
document.addEventListener("DOMContentLoaded", function() {
    let submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        login();
    });
});