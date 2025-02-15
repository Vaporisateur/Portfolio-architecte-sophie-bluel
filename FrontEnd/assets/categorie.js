const apiUrl = "http://localhost:5678/api/";
document.addEventListener("DOMContentLoaded", () => {
    const getCategories = () => {
        fetch(apiUrl + "categories")
            .then(response => response.json())
            .then(data => {
                const categoriesList = document.getElementById("categoriesList");
                categoriesList.innerHTML = "";

                const allButton = document.createElement("button");
                allButton.classList.add("button-font", "color-btn");
                allButton.innerHTML = "Tous";
                allButton.id = "all";
                categoriesList.appendChild(allButton);

                data.forEach(category => {
                    const categoryElement = document.createElement("button");
                    categoryElement.classList.add("button-font", "btn-category");
                    categoryElement.innerHTML = category.name;
                    categoryElement.id = category.id;
                    categoriesList.appendChild(categoryElement);
                });

                categoriesList.addEventListener("click", event => {
                    const target = event.target;
                    if (target.classList.contains("btn-category") || target.id === "all") {
                        setActiveButton(target);
                        fetchAndRenderProducts(target.id === "all" ? null : target.id);
                    }
                });
            });
    };

    const fetchAndRenderProducts = (category = null) => {
        fetch(apiUrl + "works")
            .then(response => response.json())
            .then(data => {
                if (category) data = data.filter(work => work.categoryId === parseInt(category));
                renderGallery(data);
            });
    };

    const renderGallery = works => {
        const galleryList = document.getElementById("gallery");
        galleryList.innerHTML = "";
        works.forEach(work => {
            const workElement = document.createElement("figure");
            workElement.classList.add("work");
            workElement.innerHTML = `<img src="${work.imageUrl}" alt="${work.title}"><figcaption>${work.title}</figcaption>`;
            galleryList.appendChild(workElement);
        });
    };

    const setActiveButton = button => {
        document.querySelectorAll("#categoriesList button").forEach(btn => btn.classList.remove("color-btn"));
        button.classList.add("color-btn");
    };

    getCategories();
    fetchAndRenderProducts();
});
