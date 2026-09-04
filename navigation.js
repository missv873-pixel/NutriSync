document.addEventListener("DOMContentLoaded", function () {

    const navigation = document.getElementById("navigation");

    if (navigation) {

        fetch("navigation.html")
            .then(response => {

                if (!response.ok) {
                    throw new Error("Navigation file not found");
                }

                return response.text();

            })
            .then(data => {

                navigation.innerHTML = data;

            })
            .catch(error => {

                console.error("Navigation loading error:", error);

            });

    }

});
function logoutUser() {
    localStorage.removeItem("nutrisyncLoggedIn");
    localStorage.removeItem("nutrisyncCurrentUser");

    window.location.href = "auth.html";
}