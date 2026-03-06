const URL = "https://www.omdbapi.com/?apikey=8478e312&"

const searchBtn = document.querySelector("#search-btn")
const search = document.querySelector("#search")
const main = document.querySelector("main")
const explore = document.querySelector(".explore")
const noResults = document.querySelector(".no-results")

searchBtn.addEventListener("click", async () => {
    const res = await fetch(`${URL}t=${search.value}&plot=full`)
    const data = await res.json()
    explore.style.display = "none" 
    
    /* Movie not found! */
    if (data.Response === "False") {
        noResults.style.display = "inline-block" 
        noResults.innerHTML = "<p>Unable to find what you’re looking for.<br>Please try another search.</p>"
    } else {
        noResults.style.display = "none"
        main.innerHTML = getResults(data)
        main.querySelectorAll(".description").forEach(description => {
            toggleReadMoreButton(description)
            handleReadMoreToggle(description)
        })

        document.querySelector("#add-btn").addEventListener("click", () => {
            const watchlist = localStorage.getItem("watchlist")

            if (!JSON.parse(watchlist)) {
                localStorage.setItem("watchlist", `["${data.Title}"]`)
            } else {
                const tempWatchlist = JSON.parse(localStorage.getItem("watchlist"))
                if (!tempWatchlist.includes(data.Title)) {
                    tempWatchlist.push(data.Title)
                }
                localStorage.setItem("watchlist", JSON.stringify(tempWatchlist))
            }
        })
    }

})

function toggleReadMoreButton(description) {

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

function handleReadMoreToggle(description) {
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

function getResults(data) {

    return ` <div class="result-container">
        <img src="${data.Poster}" class="poster"></img>
        <div class="info">
            <div class="title-rating">
                <p class="title">${data.Title}</p>
                <img src="images/star-icon.png" alt="star icon">
                <p class="rating">${data.imdbRating}</p>
            </div>
            <div class="runtime-genre-add">
                <p class="runtime">${data.Runtime}</p>
                <p class="genre">${data.Genre}</p>
                <div id="add-btn">
                    <img src="images/plus-icon.png" alt="plus icon">
                    <p class="add">Watchlist</p>
                </div>
            </div>
            <div class="description">
                <p>${data.Plot}</p>
                <button class="read-more-btn">... Read more</button>
            </div>
        </div>
    </div>
    `
}