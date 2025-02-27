// Afficher le mode édition si connecté
if (token) {
    let editModeElement = document.getElementById("mode-edition");
    if (editModeElement) {
        editModeElement.style.display = "flex";
    }
}



// ACTIONS DE LA MODALE 


// Fait apparaitre la modal
function showModal() {
    let modal = document.getElementById("modalGallery");
    modal.style.display = "flex";
}

// Ferme la modal
function closeModal() {
    let modal = document.getElementById("modalGallery");
    modal.style.display = "none";
}

document.getElementById("modal-close").addEventListener("click", closeModal);

// Rajoute une icone en haut a droite de chaque image
function addDeleteIcon() {
    let works = document.querySelectorAll("#modalGallery .image-container");
    works.forEach(work => {
        let deleteDiv = document.createElement("span");
        deleteDiv.classList.add("icon-background");

        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon");

        deleteDiv.appendChild(deleteIcon);
        work.appendChild(deleteDiv);
    });
}

document.addEventListener("click", async function(event) {
    if (event.target.classList.contains("delete-icon")) {
        await deleteWork(event);
    }
});

// Fonction pour supprimer une image
async function deleteWork(event) {
    let work = event.target.closest(".image-container");
    let workId = work.id;

    try {
        let response = await fetch(apiUrl + "works/" + workId, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (response.status === 204) {
            work.remove();
            let galleryImage = document.querySelector(`#gallery #work-${workId}`);
            if (galleryImage) {
                galleryImage.remove();
            }
        } else {
            console.error("Failed to delete work:", response.status);
        }
    } catch (error) {
        console.error("Error deleting work:", error);
    }
}

// Fait apparaitre la modal modalAddWork lors du click sur le bouton
function showAddModal() {
    let addModal = document.getElementById("modalAddWork");
    addModal.style.display = "flex";
    let modal = document.getElementById("modalGallery");
    modal.style.display = "none";
}

document.getElementById("addPicture").addEventListener("click", showAddModal);

// Ferme la modal puis reset le formulaire
function closeAddModal() {
    let addModal = document.getElementById("modalAddWork");
    let modal = document.getElementById("modalGallery");
    addModal.style.display = "none";
    modal.style.display = "none";
    resetForm();
}

document.querySelector("#modalAddWork #modal-close").addEventListener("click", closeAddModal);

// Retourne en arrière depuis la modal d'ajout de photo
function goBack() {
    let addModal = document.getElementById("modalAddWork");
    addModal.style.display = "none";
    resetForm();
    showModal();
}

document.getElementById("modal-back").addEventListener("click", goBack);

// Ajoute une preview de l'image dans le formulaire
function previewImage(event) {
    let preview = document.getElementById("previewImage");
    let file = event.target.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    } else {
        preview.src = "";
        preview.style.display = "none";
    }
}

// désactive l'affichage de <i> <p> et <label> si une image est preview
function hideText() {
    let preview = document.getElementById("previewImage");
    let icon = document.querySelector(".fa-image");
    let text = document.querySelector(".AddPicture-container p");
    let div = document.querySelector(".AddPicture-container");
    let label = document.querySelector(".FileLabel");
    if (preview.src) {
        div.style.padding = "0";
        icon.style.display = "none";
        text.style.display = "none";
        label.style.display = "none";
    } else {
        icon.style.display = "block";
        text.style.display = "block";
        label.style.display = "block";
    }
}

// Fonction pour vérifier si tous les champs sont remplis
function checkFormFields() {
    let fileInput = document.getElementById("file");
    let titleInput = document.getElementById("title");
    let categorySelect = document.getElementById("categorySelect");
    let submitButton = document.getElementById("addWorkButton");

    if (fileInput.files.length > 0 && titleInput.value.trim() !== "" && categorySelect.value !== "") {
        submitButton.style.backgroundColor = "#1d6154";
    }
}

// Fonction pour reset le formulaire
function resetForm() {
    let form = document.getElementById("addWorkForm");
    form.reset();
    let preview = document.getElementById("previewImage");
    preview.src = "";
    preview.style.display = "none";
    let icon = document.querySelector(".fa-image");
    let text = document.querySelector(".AddPicture-container p");
    let label = document.querySelector(".FileLabel");
    let div = document.querySelector(".AddPicture-container");
    let submitButton = document.getElementById("addWorkButton");
    div.style.padding = "19px";
    icon.style.display = "block";
    text.style.display = "block";
    label.style.display = "block";
    submitButton.style.backgroundColor = "";
}












// GESTION DE LA MODALE ----- APPEL API

// Appel l'API et rajoute les images dans la modal
function fetchAndRenderWorks() {
    let worksList = document.getElementById("modal-content");
    worksList.innerHTML = "";

    productsArray.forEach(work => {
        let workElement = document.createElement("figure");
        workElement.classList.add("image-container");
        workElement.id = work.id;
        workElement.innerHTML = `
            <img src="${work.imageUrl}" alt="${work.title}">
        `;
        worksList.appendChild(workElement);
    });

    // Rajoute l'icone de suppression
    addDeleteIcon();
}

// Appel l'API et rajoute les catégories dans le formulaire
function fetchAndRenderCategories() {
    let categoriesSelect = document.getElementById("categorySelect");
    categoriesSelect.innerHTML = "";

    // Ajouter une option vide par défaut qui n'est pas visible dans le menu déroulant
    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerHTML = "";
    defaultOption.hidden = true;
    defaultOption.selected = true;
    categoriesSelect.appendChild(defaultOption);

    categoriesArray.forEach(category => {
        let categoryOption = document.createElement("option");
        categoryOption.value = category.id;
        categoryOption.innerHTML = category.name;
        categoriesSelect.appendChild(categoryOption);
    });
}

// Appel l'API avec POST pour ajouter une image
function addWork(event) {
    event.preventDefault();

    let formData = new FormData();
    let fileInput = document.getElementById("file");
    let titleInput = document.getElementById("title");
    let categorySelect = document.getElementById("categorySelect");

    formData.append("image", fileInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categorySelect.value);

    fetch(apiUrl + "works", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.id) {
                let worksList = document.getElementById("modal-content");
                let workElement = document.createElement("figure");
                workElement.classList.add("image-container");
                workElement.id = data.id;
                workElement.innerHTML = `
                    <img src="${data.imageUrl}" alt="${data.title}">
                `;
                worksList.appendChild(workElement);
                
                // Ajoute les images dans la gallery
                let gallery = document.getElementById("gallery");
                let galleryWorkElement = document.createElement("figure");
                galleryWorkElement.classList.add("work");
                galleryWorkElement.id = `work-${data.id}`;
                galleryWorkElement.innerHTML = `
                    <img src="${data.imageUrl}" alt="${data.title}">
                    <figcaption>${data.title}</figcaption>
                `;
                gallery.appendChild(galleryWorkElement);

                addDeleteIcon();
                closeAddModal();
            }
        });
}














// Gestion du DOM

document.addEventListener("DOMContentLoaded", function() {
    let openModalGalleryButton = document.getElementById("openModalGallery");
    if (openModalGalleryButton) {
        openModalGalleryButton.addEventListener("click", showModal);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    fetchAndRenderWorks();
});

// Preview image
document.addEventListener("DOMContentLoaded", function() {
    let imageInput = document.getElementById("file");
    if (imageInput) {
        imageInput.addEventListener("change", previewImage);
        imageInput.addEventListener("change", hideText);
    }
});

// bouton submit AddWork
document.addEventListener("DOMContentLoaded", function() {
    let addWorkForm = document.getElementById("addWorkForm");
    if (addWorkForm) {
        addWorkForm.addEventListener("submit", addWork);
    }
});

// Check formulaire addWorks
document.addEventListener("DOMContentLoaded", function() {
    let fileInput = document.getElementById("file");
    let titleInput = document.getElementById("title");
    let categorySelect = document.getElementById("categorySelect");

    if (fileInput && titleInput && categorySelect) {
        fileInput.addEventListener("change", checkFormFields);
        titleInput.addEventListener("input", checkFormFields);
        categorySelect.addEventListener("change", checkFormFields);
    }
});