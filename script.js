document.addEventListener("DOMContentLoaded", () => {
    // Fade-in animation for content boxes
    const boxes = document.querySelectorAll(".content-box");
    boxes.forEach((box, index) => {
        box.style.opacity = 0;
        setTimeout(() => {
            box.style.transition = "opacity 0.5s ease";
            box.style.opacity = 1;
        }, index * 200);
    });

    // Search functionality
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const searchResults = document.getElementById("searchResults");
    const contentBoxes = document.querySelectorAll(".content-box");

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        searchResults.innerHTML = "";
        searchResults.style.display = "none";

        if (query === "") return;

        let resultsFound = false;
        contentBoxes.forEach(box => {
            const searchData = box.getAttribute("data-search").toLowerCase();
            if (searchData.includes(query)) {
                const title = box.querySelector("h3").textContent;
                const description = box.querySelector("p").textContent;
                const resultItem = document.createElement("div");
                resultItem.innerHTML = `<h4>${title}</h4><p>${description}</p>`;
                searchResults.appendChild(resultItem);
                resultsFound = true;
            }
        });

        if (resultsFound) {
            searchResults.style.display = "block";
        } else {
            searchResults.innerHTML = "<p>No results found.</p>";
            searchResults.style.display = "block";
        }
    }

    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            performSearch();
        }
    });

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
});