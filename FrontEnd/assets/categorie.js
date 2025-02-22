const apiUrl = "http://localhost:5678/api/";
let productsArray = [];
let categoriesArray = [];

document.addEventListener("DOMContentLoaded", () => {
    const getCategories = () => {
        fetch(apiUrl + "categories")
            .then(response => response.json())
            .then(data => {
                categoriesArray = data;
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
                        const filteredProducts = target.id === "all" ? productsArray : productsArray.filter(work => work.categoryId === parseInt(target.id));
                        renderProducts(filteredProducts);
                    }
                });
            });
    };

    const fetchProducts = () => {
        return fetch(apiUrl + "works")
            .then(response => response.json())
            .then(data => {
                productsArray = data;
                return data;
            });
    };

    const renderProducts = works => {
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
    fetchProducts().then(products => {
        renderProducts(products);
        fetchAndRenderWorks();
        fetchAndRenderCategories();
    });
});