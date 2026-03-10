import { URL, toggleReadMoreButton, handleReadMoreToggle,
         getWatchlist, main, resultContainer, noResults } from './utils.js'

const searchBtn = document.querySelector("#search-btn")
const search = document.querySelector("#search")
const explore = document.querySelector(".explore")
let inWatchlist = false;
const watchlist = getWatchlist()

searchBtn.addEventListener("click", async () => {
    const res = await fetch(`${URL}t=${search.value}&plot=full`)
    const data = await res.json()
    explore.style.display = "none" 
    inWatchlist = setInWatchlist(data)
    
    /* Movie not found! */
    if (data.Response === "False") {
        noResults.style.display = "inline-block" 
        noResults.innerHTML = "<p>Unable to find what you’re looking for.<br>Please try another search.</p>"
        resultContainer.style.display = "none"
    } else {
        noResults.style.display = "none"
        resultContainer.style.display = "flex"
        resultContainer.innerHTML = getResults(data)
        main.querySelectorAll(".description").forEach(description => {
            toggleReadMoreButton(description)
            handleReadMoreToggle(description)
        })

        const addBtn = document.querySelector(".add-btn")
        const btnIcon = document.querySelector(".btn-icon")
        const btnText = document.querySelector(".btn-text")
        inWatchlist ? addBtn.style.cursor = "default" : addBtn.style.cursor = "pointer"

        addBtn.addEventListener("click", () => {

            if (!watchlist) {
                localStorage.setItem("watchlist", `["${data.Title}"]`)
                inWatchlist = setInWatchlist
            } else {
                if (!inWatchlist) {
                    watchlist.push(data.Title)
                    inWatchlist = setInWatchlist
                }
                localStorage.setItem("watchlist", JSON.stringify(watchlist))
            }
            addBtn.style.cursor = "default"
            btnIcon.src = "images/check-icon.jpg"
            btnText.textContent = "Added"
        })
    }

})

function setInWatchlist(data) {
    return watchlist && watchlist.includes(data.Title)
}

function getResults(data) {

    let btnIcon = ""
    let btnText = ""

    if (!inWatchlist) {
        btnIcon = "images/plus-icon.png"
        btnText = "Watchlist"
    } else {
        btnIcon = "images/check-icon.jpg"
        btnText = "Added"
    }

    return `<div class="result">
                <img src="${data.Poster}" class="poster">
                <div class="info">
                    <div class="title-rating">
                        <p class="title">${data.Title}</p>
                        <img src="images/star-icon.png" alt="star icon">
                        <p class="rating">${data.imdbRating}</p>
                    </div>
                    <div class="runtime-genre-add">
                        <p class="runtime">${data.Runtime}</p>
                        <p class="genre">${data.Genre}</p>
                        <div class="add-btn">
                            <img class="btn-icon" src="${btnIcon}" alt="plus icon">
                            <p class="btn-text">${btnText}</p>
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