const apiUrl = "http://localhost:5678/api/"; // URL de l'API

// Fonction pour récupérer les catégories
function getCategories() {
    fetch(apiUrl + "categories")
        .then(response => response.json())
        .then(data => {
            let categoriesList = document.getElementById("categoriesList");
            categoriesList.innerHTML = "";

            let allButton = document.createElement("button");
            allButton.classList.add("button-font", "color-btn");
            allButton.innerHTML = "Tous";
            allButton.id = "all";
            categoriesList.appendChild(allButton);

            data.forEach(category => {
                let categoryElement = document.createElement("button");
                categoryElement.classList.add("button-font");
                categoryElement.innerHTML = category.name;
                categoryElement.id = category.id;
                categoriesList.appendChild(categoryElement);
            });

            categoriesList.addEventListener("click", function(event) {
                if (event.target.tagName === "BUTTON") {
                    setActiveButton(event.target);
                    if (event.target.id === "all") {
                        getAllProducts();
                    } else {
                        getProductsByCategory(event.target.id);
                    }
                }
            });
        });
}

// Fonction pour récupérer toutes les images
function getAllProducts() {
    fetch(apiUrl + "works")
        .then(response => response.json())
        .then(data => {
            renderGallery(data);
        });
}

// Fonction pour récupérer les images par catégorie
function getProductsByCategory(category) {
    fetch(apiUrl + "works")
        .then(response => response.json())
        .then(data => {
            let filteredWorks = data.filter(work => work.categoryId === parseInt(category));
            renderGallery(filteredWorks);
        });
}

// Fonction pour afficher la galerie
function renderGallery(works) {
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
}

// Fonction pour définir le bouton actif
function setActiveButton(button) {
    document.querySelectorAll("#categoriesList button").forEach(btn => btn.classList.remove("color-btn"));
    button.classList.add("color-btn");
}

getCategories(); // Appel de la fonction pour récup les catégories
getAllProducts(); // Appel de la fonction pour récupérer tous les produits