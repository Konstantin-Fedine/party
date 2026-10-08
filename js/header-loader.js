async function loadHeader() {
    const placeholder = document.querySelector("#header-placeholder");

    if (!placeholder) {
        return;
    }

    try {
        const response = await fetch("components/header.html?v=2");

        if (!response.ok) {
            throw new Error(
                `Header konnte nicht geladen werden: ${response.status}`
            );
        }

        const headerHtml = await response.text();

        placeholder.outerHTML = headerHtml;

        const headerScript = document.createElement("script");
        headerScript.src = "js/header.js?v=5";

        document.body.appendChild(headerScript);
    } catch (error) {
        console.error("Fehler beim Laden des Headers:", error);
    }
}

loadHeader();