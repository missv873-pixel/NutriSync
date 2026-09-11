document.addEventListener("DOMContentLoaded", function () {

    const navigation = document.getElementById("navigation");

    if (!navigation) return;

    fetch("navigation.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Navigation file not found");
            }
            return response.text();
        })
        .then(data => {
            navigation.innerHTML = data;
            if (typeof initializeLanguage === "function") {
                initializeLanguage();
            }
        })
        .catch(error => console.error("Navigation loading error:", error));

});

function logoutUser() {
    localStorage.removeItem("nutrisyncLoggedIn");
    localStorage.removeItem("nutrisyncCurrentUser");
    window.location.href = "auth.html";
}

function toggleNavMenu() {
    const menu = document.getElementById("navMenu");
    const button = document.getElementById("menuButton");

    if (!menu || !button) return;

    const isOpen = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

// Close the menu after choosing a section.
document.addEventListener("click", function (event) {
    const menu = document.getElementById("navMenu");
    const button = document.getElementById("menuButton");

    if (!menu || !button || !menu.classList.contains("open")) return;

    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
    }
});
