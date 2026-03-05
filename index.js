const URL = "https://www.omdbapi.com/?apikey=8478e312&"

const searchBtn = document.querySelector("#search-btn")
const search = document.querySelector("#search")
const resultContainer = document.querySelector(".result-container")
const description = document.querySelector(".description")
const readMoreBtn = document.querySelector(".read-more-btn")
const explore = document.querySelector(".explore")
const noResults = document.querySelector(".no-results")

searchBtn.addEventListener("click", async () => {
    const res = await fetch(`${URL}t=${search.value}&plot=short`)
    const data = await res.json()

    explore.style.display = "none" 
    

    /* Movie not found! */
    if (data.Response === "False") {
        noResults.style.display = "inline-block" 
        noResults.innerHTML = "<p>Unable to find what you’re looking for. Please try another search.</p>"
    } else {
        noResults.style.display = "none"
    }

})

function toggleReadMoreButton(description, readMoreBtn) {

    description.style.overflow = "visible"; 
    const isOverflowing = description.scrollHeight > description.clientHeight;
    description.style.overflow = "hidden";

    console.log("scrollHeight: ", description.style.overflow)


    if (isOverflowing || description.classList.contains("expanded")) {
        readMoreBtn.style.display = "inline-block";
    } else {
        readMoreBtn.style.display = "none";
    }
}

function handleReadMoreToggle(description, readMoreBtn) {

    readMoreBtn.addEventListener("click", () => {
        description.classList.toggle("expanded"); 

        if (description.classList.contains("expanded")) {
            readMoreBtn.textContent = "... Read Less";
        } else {
            readMoreBtn.textContent = "... Read More";
        }
    });
}

window.addEventListener("load", () => {
    toggleReadMoreButton(description, readMoreBtn);
    handleReadMoreToggle(description, readMoreBtn);
});

const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        toggleReadMoreButton(description, readMoreBtn); 
    }
});

resizeObserver.observe(description);