/* =====================================================
   TRACKVERSE GAME DATA
=====================================================

   IMPORTANT:

   Change the poster paths to match your GitHub
   repository.

===================================================== */


let games = [

{
    id: 5,
    title: "Hellblade: Senua's Sacrifice",
    poster: "https://yuvaraj019.github.io/Showly/Assets/Games/hellblade-senuas-sacrifice.jpg",
    rating: 4.5,
    hours: 8,
    minutes: 30,
    completion: 100,
    platform: "PC",
    status: "completed",
    genre: "Action Adventure",
    notes: ""
},

{
    id: 6,
    title: "Senua's Saga: Hellblade II",
    poster: "https://yuvaraj019.github.io/Showly/Assets/Games/senuas-saga-hellblade-2.jpg",
    rating: 4.5,
    hours: 7,
    minutes: 45,
    completion: 100,
    platform: "PC",
    status: "completed",
    genre: "Action Adventure",
    notes: ""
},


    {
        id: 3,

        title: "God of War Ragnarok",

        poster: "Assets/Games/god-of-war-ragnarok.jpg",

        rating: 4.9,

        hours: 92,

        minutes: 25,

        completion: 100,

        platform: "PS5",

        status: "completed",

        genre: "Action Adventure",

        notes: "Fantastic continuation of Kratos' story."
    },


    {
        id: 4,

        title: "Black Myth: Wukong",

        poster: "Assets/Games/black-myth-wukong.jpg",

        rating: 4.6,

        hours: 65,

        minutes: 10,

        completion: 85,

        platform: "PS5",

        status: "playing",

        genre: "Action RPG",

        notes: "Still playing."
    }

];


/* =====================================================
   ELEMENTS
===================================================== */

const gameGrid =
    document.getElementById("gameGrid");

const emptyState =
    document.getElementById("emptyState");

const searchButton =
    document.getElementById("searchButton");

const searchArea =
    document.getElementById("searchArea");

const searchInput =
    document.getElementById("searchInput");

const addGameButton =
    document.getElementById("addGameButton");

const addModal =
    document.getElementById("addModal");

const closeAdd =
    document.getElementById("closeAdd");

const gameForm =
    document.getElementById("gameForm");

const detailsModal =
    document.getElementById("detailsModal");

const closeDetails =
    document.getElementById("closeDetails");


/* =====================================================
   CURRENT FILTER
===================================================== */

let currentFilter = "all";


/* =====================================================
   LOAD GAMES
===================================================== */

function renderGames() {

    gameGrid.innerHTML = "";

    const searchText =
        searchInput.value.toLowerCase().trim();


    const filteredGames = games.filter(game => {

        const matchesFilter =
            currentFilter === "all" ||
            game.status === currentFilter;


        const matchesSearch =
            game.title
                .toLowerCase()
                .includes(searchText);


        return matchesFilter && matchesSearch;

    });


    if (filteredGames.length === 0) {

        emptyState.classList.add("show");

        return;

    }


    emptyState.classList.remove("show");


    filteredGames.forEach(game => {

        const card =
            createGameCard(game);

        gameGrid.appendChild(card);

    });

}


/* =====================================================
   CREATE GAME CARD
===================================================== */

function createGameCard(game) {

    const card =
        document.createElement("article");


    card.className = "game-card";


    card.innerHTML = `

        <div class="status-badge">

            ${game.status}

        </div>


        <div class="poster-container">

            <img
                src="${game.poster}"
                alt="${game.title}"
                loading="lazy"
                onerror="this.src='https://placehold.co/600x900/111111/ffffff?text=Poster+Not+Found'"
            >

        </div>


        <div class="game-info">

            <div class="game-title">

                ${game.title}

            </div>


            <div class="game-meta">

                <span class="rating">

                    ★ ${game.rating}

                </span>


                <span class="playtime">

                    ⏱ ${game.hours}h ${game.minutes}m

                </span>

            </div>

        </div>

    `;


    card.addEventListener("click", () => {

        openDetails(game);

    });


    return card;

}


/* =====================================================
   FILTERS
===================================================== */

const filterButtons =
    document.querySelectorAll(".filter");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentFilter =
            button.dataset.filter;


        renderGames();

    });

});


/* =====================================================
   SEARCH
===================================================== */

searchButton.addEventListener("click", () => {

    searchArea.classList.toggle("show");


    if (searchArea.classList.contains("show")) {

        searchInput.focus();

    }

});


searchInput.addEventListener("input", () => {

    renderGames();

});


/* =====================================================
   ADD GAME MODAL
===================================================== */

addGameButton.addEventListener("click", () => {

    addModal.classList.add("show");

});


closeAdd.addEventListener("click", () => {

    addModal.classList.remove("show");

});


/* =====================================================
   SAVE NEW GAME
===================================================== */

gameForm.addEventListener("submit", event => {

    event.preventDefault();


    const newGame = {

        id: Date.now(),

        title:
            document.getElementById("gameTitle").value.trim(),

        poster:
            document.getElementById("gamePoster").value.trim(),

        rating:
            Number(
                document.getElementById("gameRating").value
            ),

        hours:
            Number(
                document.getElementById("gameHours").value
            ),

        minutes:
            Number(
                document.getElementById("gameMinutes").value
            ),

        completion:
            Number(
                document.getElementById("gameCompletion").value
            ),

        platform:
            document.getElementById("gamePlatform").value,

        status:
            document.getElementById("gameStatus").value,

        genre:
            document.getElementById("gameGenre").value,

        notes:
            document.getElementById("gameNotes").value

    };


    games.push(newGame);


    /*
       Save locally in browser.

       NOTE:
       This means your new game will remain on this
       browser, but it will NOT automatically sync
       to another device yet.
    */

    localStorage.setItem(
        "trackverse_games",
        JSON.stringify(games)
    );


    gameForm.reset();


    addModal.classList.remove("show");


    renderGames();

});


/* =====================================================
   LOAD SAVED GAMES
===================================================== */

const savedGames =
    localStorage.getItem("trackverse_games");


if (savedGames) {

    try {

        games =
            JSON.parse(savedGames);

    } catch (error) {

        console.log(
            "Could not load saved games."
        );

    }

}


/* =====================================================
   GAME DETAILS
===================================================== */

function openDetails(game) {

    document.getElementById(
        "detailsPoster"
    ).src = game.poster;


    document.getElementById(
        "detailsPoster"
    ).alt = game.title;


    document.getElementById(
        "detailsTitle"
    ).textContent = game.title;


    document.getElementById(
        "detailsRating"
    ).textContent =
        `★ ${game.rating} / 5`;


    document.getElementById(
        "detailsPlaytime"
    ).textContent =
        `${game.hours}h ${game.minutes}m`;


    document.getElementById(
        "detailsCompletion"
    ).textContent =
        `${game.completion}%`;


    document.getElementById(
        "detailsPlatform"
    ).textContent =
        game.platform;


    document.getElementById(
        "detailsStatus"
    ).textContent =
        game.status;


    document.getElementById(
        "detailsGenre"
    ).textContent =
        game.genre || "-";


    document.getElementById(
        "detailsNotes"
    ).textContent =
        game.notes || "-";


    detailsModal.classList.add("show");

}


/* =====================================================
   CLOSE DETAILS
===================================================== */

closeDetails.addEventListener("click", () => {

    detailsModal.classList.remove("show");

});


/* =====================================================
   CLOSE MODALS BY CLICKING OUTSIDE
===================================================== */

addModal.addEventListener("click", event => {

    if (event.target === addModal) {

        addModal.classList.remove("show");

    }

});


detailsModal.addEventListener("click", event => {

    if (event.target === detailsModal) {

        detailsModal.classList.remove("show");

    }

});


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        addModal.classList.remove("show");

        detailsModal.classList.remove("show");

    }

});


/* =====================================================
   START APPLICATION
===================================================== */

renderGames();