const mobileSearchQuery = "(max-width: 640px)";
const mobileSearchMedia = window.matchMedia(mobileSearchQuery);

function setGameSearchState(
    gameSearch,
    gameSearchInput,
    gameSearchButton,
    isOpen
) {
    gameSearch.classList.toggle("is-open", isOpen);

    gameSearchButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    gameSearchButton.setAttribute(
        "aria-label",
        "Suche öffnen"
    );

    if (isOpen) {
        gameSearchInput.focus({ preventScroll: true });
    } else {
        gameSearchInput.blur();
    }
}

function initializeGameSearch() {
    const gameSearch = document.querySelector(".game-search");
    const gameSearchInput = document.querySelector("#game-search");
    const gameSearchButton = document.querySelector(".game-search__submit");

    if (!gameSearch || !gameSearchInput || !gameSearchButton) {
        return;
    }

    gameSearchButton.addEventListener("click", event => {
        event.preventDefault();

        if (!mobileSearchMedia.matches) {
            return;
        }

        const isOpen = gameSearch.classList.contains("is-open");

        if (isOpen) {
            gameSearchInput.focus({ preventScroll: true });
            return;
        }

        setGameSearchState(
            gameSearch,
            gameSearchInput,
            gameSearchButton,
            true
        );
    });

    document.addEventListener("click", event => {
        if (!mobileSearchMedia.matches) {
            return;
        }

        if (!gameSearch.contains(event.target)) {
            setGameSearchState(
                gameSearch,
                gameSearchInput,
                gameSearchButton,
                false
            );
        }
    });

    gameSearch.addEventListener("submit", event => {
        if (
            mobileSearchMedia.matches &&
            gameSearch.classList.contains("is-open")
        ) {
            event.preventDefault();
        }
    });

    mobileSearchMedia.addEventListener("change", event => {
        if (!event.matches) {
            setGameSearchState(
                gameSearch,
                gameSearchInput,
                gameSearchButton,
                false
            );
        }
    });
}

initializeGameSearch();