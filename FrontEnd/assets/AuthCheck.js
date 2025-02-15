// check si l'utilisateur est connecté suivant le token
const token = sessionStorage.getItem("token")
// Fonction pour se logout
function logout() {
    sessionStorage.removeItem("token");
    window.location.href = "index.html";
}

// Remplacer le bouton login par le bouton logout si connecté
document.addEventListener("DOMContentLoaded", function() {
    let loginHeader = document.getElementById("login");

    if (token) {
        loginHeader.innerHTML = "logout";
        loginHeader.removeAttribute("href");
        loginHeader.addEventListener("click", logout);

        // Ajouter un bouton avec l'id openModalGallery sous la div #addEditButton
        let addEditButtonDiv = document.getElementById("addEditButton");
        let openModalGalleryButton = document.createElement("button");
        openModalGalleryButton.id = "openModalGallery";
        openModalGalleryButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';
        addEditButtonDiv.appendChild(openModalGalleryButton);
    } else {
        loginHeader.innerHTML = "login";
    }
});
