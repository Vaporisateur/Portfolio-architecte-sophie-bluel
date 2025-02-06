const apiUrl = "http://localhost:5678/api/"; // URL de l'API

getAllProducts(); // Appel de la fonction pour récupérer tous les produits

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
                categoryElement.id = category.id;
                categoriesList.appendChild(categoryElement);
            });

            let allButton = document.createElement("button");
            allButton.classList.add("button-font");
            allButton.innerHTML = "Tous";
            allButton.id = "all";
            categoriesList.insertBefore(allButton, categoriesList.firstChild);

            // event listener pour le bouton "Tous"
            allButton.addEventListener("click", function() {
                getAllProducts();
            });
        });
}

getCategories(); // Appel de la fonction pour récup les catégories

// Fonction pour récupérer toutes les images
function getAllProducts() {
    fetch(apiUrl + "works")
        .then(response => response.json())
        .then(data => {
            let works = data;
            let galleryList = document.getElementById("gallery");
            galleryList.innerHTML = "";

            works.forEach(work => {
                let workElement = document.createElement("figure");
                workElement.classList.add("work");
                workElement.innerHTML = `
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                `;
                galleryList.appendChild(workElement);
            });
        });
}

// Fonction pour récupérer les images par catégorie
function getProductsByCategory(category) {
    fetch(apiUrl + "works")
        .then(response => response.json())
        .then(data => {
            let works = data;
            let galleryList = document.getElementById("gallery");
            galleryList.innerHTML = "";

            works.forEach(work => {
                if (work.categoryId === parseInt(category)) {
                    let workElement = document.createElement("figure");
                    workElement.classList.add("work");
                    workElement.innerHTML = `
                        <img src="${work.imageUrl}" alt="${work.title}">
                        <figcaption>${work.title}</figcaption>
                    `;
                    galleryList.appendChild(workElement);
                }
            });
        });
}

// Ajouter un event listener pour les boutons de la function getCategories
document.getElementById("categoriesList").addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        if (event.target.id === "all") {
            getAllProducts();
        } 
        else {
            getProductsByCategory(event.target.id);
        }
    }
});
