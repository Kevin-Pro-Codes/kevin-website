document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".sbutton, .sbutton2");
    const searchBar = document.getElementById("search-bar");

    // Write button title to the search bar on click
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonTitle = button.textContent.trim(); // Get the button's title
            searchBar.value = buttonTitle; // Set the title as the search box value
        });
    });
});