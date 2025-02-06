const apiUrl = "http://localhost:5678/api/"; // URL de l'API

// Fonction pour récupérer les catégories
function getCategories() {
    fetch(apiUrl + "categories")
        .then(response => response.json())
        .then(data => {
            let categories = data;
            let categoriesList = document.getElementById("categoriesList");

            categories.forEach(category => {
                let categoryElement = document.createElement("button");
                categoryElement.classList.add("button-font");
                categoryElement.innerHTML = category.name;
                categoriesList.appendChild(categoryElement);
            });
        });
}

getCategories(); // Appel de la fonction pour récup les catégories