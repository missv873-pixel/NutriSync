// Get Started button

function showMessage() {
    alert("Welcome to NutriCare! Let's plan your healthy meals.");
}


// Filter meal plans

function showMeals(type) {

    let meals = document.querySelectorAll(".meal");

    meals.forEach(function(meal) {

        if (type === "all") {
            meal.style.display = "block";
        }
        else if (meal.classList.contains(type)) {
            meal.style.display = "block";
        }
        else {
            meal.style.display = "none";
        }

    });
}


// Recipe button

function showRecipe(recipe) {

    if (recipe === "Vegetable Salad") {
        alert(
            "Vegetable Salad\n\n" +
            "Ingredients: Carrot, cucumber, tomato, lemon.\n" +
            "Mix all ingredients and serve fresh."
        );
    }

    else if (recipe === "Healthy Dal") {
        alert(
            "Healthy Dal\n\n" +
            "Ingredients: Dal, tomato, onion and spices.\n" +
            "Cook dal properly and add vegetables and spices."
        );
    }

    else {
        alert(
            "Vegetable Khichdi\n\n" +
            "Ingredients: Rice, dal and mixed vegetables.\n" +
            "Cook everything together until soft."
        );
    }
}


// Edit Profile

function editProfile() {

    let name = prompt("Enter your name:");
    let age = prompt("Enter your age:");
    let food = prompt("Enter food preference (Vegetarian/Non-Vegetarian):");

    if (name !== null && name !== "") {
        document.getElementById("profileName").textContent = name;
    }

    if (age !== null && age !== "") {
        document.getElementById("profileAge").textContent = age;
    }

    if (food !== null && food !== "") {
        document.getElementById("profileFood").textContent = food;
    }
}