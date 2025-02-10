// check si l'utilisateur est connecté suivant le token
let token = sessionStorage.getItem("token");
//console.log(token);

// Fonction pour se logout
function logout() {
    sessionStorage.removeItem("token");
    window.location.href = "index.html";
}

// Fonction pour remplacer le bouton login par le bouton logout si connecté
document.addEventListener("DOMContentLoaded", function() {
    let loginHeader = document.getElementById("login");

    if (token) {
        loginHeader.innerHTML = "logout";
        loginHeader.removeAttribute("href");
        loginHeader.addEventListener("click", logout);
    } else {
        loginHeader.innerHTML = "login";
    }
});