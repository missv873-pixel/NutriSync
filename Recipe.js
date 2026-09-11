/* ==========================================
   NUTRISYNC - MEAL PLANNER
========================================== */


/* ==========================================
   MEAL PLANS
========================================== */

const mealPlans = {

    veg: {

        balanced: {

            breakfast:
                "Poha + Milk + Banana",

            lunch:
                "Dal + Rice + Roti + Salad",

            snack:
                "Fruit + Nuts + Buttermilk",

            dinner:
                "Roti + Paneer/Vegetable Curry + Salad"

        },

        weight: {

            breakfast:
                "Vegetable Poha + Unsweetened Tea",

            lunch:
                "2 Roti + Dal + Large Salad + Curd",

            snack:
                "Fruit + Buttermilk",

            dinner:
                "2 Roti + Mixed Vegetable Curry + Soup"

        },

        protein: {

            breakfast:
                "Paneer Poha + Milk",

            lunch:
                "Dal + Rice + Roti + Paneer + Salad",

            snack:
                "Milk + Nuts",

            dinner:
                "Roti + Paneer Curry + Dal + Salad"

        }

    },


    nonveg: {

        balanced: {

            breakfast:
                "Poha + Milk + Banana",

            lunch:
                "Dal + Rice + Chicken Curry + Salad",

            snack:
                "Fruit + Nuts + Buttermilk",

            dinner:
                "Roti + Egg/Chicken Curry + Salad"

        },

        weight: {

            breakfast:
                "Vegetable Poha + Eggs",

            lunch:
                "2 Roti + Grilled Chicken + Large Salad",

            snack:
                "Fruit + Buttermilk",

            dinner:
                "2 Roti + Chicken Curry + Mixed Vegetables"

        },

        protein: {

            breakfast:
                "Egg Bhurji + Roti + Milk",

            lunch:
                "Chicken + Dal + Rice + Salad",

            snack:
                "Boiled Eggs + Fruit",

            dinner:
                "Roti + Chicken Curry + Dal + Salad"

        }

    }

};


/* ==========================================
   TRANSLATION KEYS
========================================== */

const mealLabels = {

    breakfast: "breakfastMeal",

    lunch: "lunchMeal",

    snack: "snackMeal",

    dinner: "dinnerMeal"

};


/* ==========================================
   GENERATE MEAL PLAN
========================================== */

function generateMealPlan() {

    const preference =
        document.getElementById(
            "foodPreference"
        ).value;


    const goal =
        document.getElementById(
            "planGoal"
        ).value;


    const plan =
        mealPlans[preference][goal];


    const mealPlanData = {

        preference: preference,

        goal: goal,

        plan: plan,

        updatedAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        "nutrisyncMealPlan",
        JSON.stringify(mealPlanData)
    );


    displayMealPlan();

}


/* ==========================================
   DISPLAY MEAL PLAN
========================================== */

function displayMealPlan() {

    const container =
        document.getElementById(
            "mealPlanContainer"
        );


    if (!container) return;


    const saved =
        localStorage.getItem(
            "nutrisyncMealPlan"
        );


    if (!saved) {

        container.innerHTML =
            '<p id="mealPlanEmpty" class="empty-plan">' +
            'Choose your preferences and generate a meal plan.' +
            '</p>';

        return;

    }


    const data =
        JSON.parse(saved);


    const language =
        localStorage.getItem(
            "selectedLanguage"
        ) || "en";


    const selected =
        window.translations &&
        window.translations[language]
            ? window.translations[language]
            : {};


    const preferenceSelect =
        document.getElementById(
            "foodPreference"
        );


    const goalSelect =
        document.getElementById(
            "planGoal"
        );


    if (preferenceSelect) {

        preferenceSelect.value =
            data.preference;

    }


    if (goalSelect) {

        goalSelect.value =
            data.goal;

    }


    container.innerHTML =
        Object.keys(data.plan)
            .map(function(meal) {

                const title =
                    selected[
                        mealLabels[meal]
                    ] || meal;


                return `

                    <div class="meal-card">

                        <h3>
                            ${title}
                        </h3>

                        <p>
                            ${data.plan[meal]}
                        </p>

                    </div>

                `;

            })
            .join("");

}


/* ==========================================
   SHOW RECIPE
========================================== */

function showRecipe(recipe) {

    const recipes = {

        "Vegetable Salad":
            "Ingredients: Carrot, cucumber, tomato and lemon.\nMix all ingredients and serve fresh.",

        "Healthy Dal":
            "Ingredients: Dal, tomato, onion and spices.\nCook dal properly and add vegetables and spices.",

        "Vegetable Khichdi":
            "Ingredients: Rice, dal and mixed vegetables.\nCook everything together until soft."

    };


    alert(
        recipe +
        "\n\n" +
        recipes[recipe]
    );

}


/* ==========================================
   EDIT PROFILE
========================================== */

function editProfile() {

    const name =
        prompt("Enter your name:");


    const age =
        prompt("Enter your age:");


    const food =
        prompt(
            "Enter food preference (Vegetarian/Non-Vegetarian):"
        );


    if (name) {

        document.getElementById(
            "profileName"
        ).textContent = name;

    }


    if (age) {

        document.getElementById(
            "profileAge"
        ).textContent = age;

    }


    if (food) {

        document.getElementById(
            "profileFood"
        ).textContent = food;

    }


    localStorage.setItem(
        "nutrisyncProfile",
        JSON.stringify({

            name:
                name ||
                document.getElementById(
                    "profileName"
                ).textContent,

            age:
                age ||
                document.getElementById(
                    "profileAge"
                ).textContent,

            food:
                food ||
                document.getElementById(
                    "profileFood"
                ).textContent

        })
    );

}


/* ==========================================
   LOAD PROFILE
========================================== */

function loadProfile() {

    const saved =
        localStorage.getItem(
            "nutrisyncProfile"
        );


    if (!saved) return;


    const profile =
        JSON.parse(saved);


    const nameElement =
        document.getElementById(
            "profileName"
        );


    const ageElement =
        document.getElementById(
            "profileAge"
        );


    const foodElement =
        document.getElementById(
            "profileFood"
        );


    if (nameElement) {

        nameElement.textContent =
            profile.name || "--";

    }


    if (ageElement) {

        ageElement.textContent =
            profile.age || "--";

    }


    if (foodElement) {

        foodElement.textContent =
            profile.food || "--";

    }

}


/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayMealPlan();

        loadProfile();

    }
);
