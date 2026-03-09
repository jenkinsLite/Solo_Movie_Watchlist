import { URL, toggleReadMoreButton, handleReadMoreToggle,
         main, resultContainer, noResults, watchlist } from '/js/utils.js'

if (watchlist) {

    noResults.style.display = "none"
    watchlist.forEach(async (search) => {

        const res = await fetch(`${URL}t=${search}&plot=full`)
        const data = await res.json()
        
        resultContainer.innerHTML += getResults(data)
        resultContainer.style.flexDirection = "column"

        main.querySelectorAll(".description").forEach(description => {
            toggleReadMoreButton(description)
            handleReadMoreToggle(description)
        })

        document.querySelectorAll(".remove-btn").forEach(remove => {

            remove.addEventListener("click", (e) => {

                const removeId = document.querySelector(`#${remove.id}`)
                const title = removeId.querySelector(".title").textContent
                watchlist.splice(watchlist.indexOf(title), 1)

                if (watchlist.length === 0) {
                    localStorage.removeItem("watchlist")
                    noResults.style.display = "inline-block" 
                } else {
                    localStorage.setItem("watchlist", JSON.stringify(watchlist))
                } 

                document.querySelector(`#${remove.id}`).style.display = "none"

            })
        })
    })
}

function getResults(data) {

    return `<div class="result" id="${data.imdbID}">
                <img src="${data.Poster}" class="poster">
                <div class="info">
                    <div class="title-rating">
                        <p class="title">${data.Title}</p>
                        <img src="images/star-icon.png" alt="star icon">
                        <p class="rating">${data.imdbRating}</p>
                    </div>
                    <div class="runtime-genre-remove">
                        <p class="runtime">${data.Runtime}</p>
                        <p class="genre">${data.Genre}</p>
                        <div class="remove-btn" id="${data.imdbID}">
                            <img src="images/minus-icon.png" alt="plus icon">
                            <p class="remove">Remove</p>
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