import { URL, toggleReadMoreButton, handleReadMoreToggle,
         main, resultContainer, noResults } from '/js/utils.js'

const searchBtn = document.querySelector("#search-btn")
const search = document.querySelector("#search")
const explore = document.querySelector(".explore")

searchBtn.addEventListener("click", async () => {
    const res = await fetch(`${URL}t=${search.value}&plot=full`)
    const data = await res.json()
    explore.style.display = "none" 
    
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

        document.querySelector(".add-btn").addEventListener("click", () => {
            const watchlist = JSON.parse(localStorage.getItem("watchlist"))

            if (!watchlist) {
                localStorage.setItem("watchlist", `["${data.Title}"]`)
            } else {
                const tempWatchlist = watchlist 
                if (!tempWatchlist.includes(data.Title)) {
                    tempWatchlist.push(data.Title)
                }
                localStorage.setItem("watchlist", JSON.stringify(tempWatchlist))
            }
        })
    }

})

function getResults(data) {

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