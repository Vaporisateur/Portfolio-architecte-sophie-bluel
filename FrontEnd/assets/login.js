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
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                alert("Connected");
                sessionStorage.setItem("token", data.token);
                window.location.href = "index.html";
            } else if (data.status === 401) {
                alert("Not Authorized");
            } else if (data.status === 404) {
                alert("User not found");
            } else {
                alert("An error occurred");
            }
        })
}

// Bouton submit
document.addEventListener("DOMContentLoaded", function() {
    let submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        login();
    });
});