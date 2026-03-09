export const URL = "https://www.omdbapi.com/?apikey=8478e312&"

export const main = document.querySelector("main")
export const resultContainer = document.querySelector(".result-container")
export const noResults = document.querySelector(".no-results")
export const watchlist = JSON.parse(localStorage.getItem("watchlist"))

export function toggleReadMoreButton(description) {

    description.style.overflow = "visible" 
    const isOverflowing = description.scrollHeight > description.clientHeight
    description.style.overflow = description.classList.contains("expanded") ? "visible" : "hidden"
    const readMoreBtn = description.querySelector(".read-more-btn")

    if (isOverflowing || description.classList.contains("expanded")) {
        readMoreBtn.style.display = "inline-block"
    } else {
        readMoreBtn.style.display = "none"
    }
}

export function handleReadMoreToggle(description) {
    const readMoreBtn = description.querySelector(".read-more-btn")

    readMoreBtn.addEventListener("click", () => {
        description.classList.toggle("expanded") 

        if (description.classList.contains("expanded")) {
            readMoreBtn.style.top = "100%"
            readMoreBtn.style.removeProperty("bottom")
            description.style.overflow = "visible"
            readMoreBtn.textContent = "Read Less"
        } else {
            readMoreBtn.style.bottom = "0"
            readMoreBtn.style.removeProperty("top")
            description.style.overflow = "hidden"
            readMoreBtn.textContent = "... Read More"
        }
    })
}
