/* ==========================================
   NUTRISYNC - DASHBOARD
   ========================================== */


/* ==========================================
   AUTHENTICATION
========================================== */

if (localStorage.getItem("nutrisyncLoggedIn") !== "true") {
    window.location.href = "auth.html";
}


/* ==========================================
   NUTRITION DATA
   script.js already creates:
   currentUser
   allFoods
   dailyFoods
========================================== */

function getDashboardFoods() {

    if (typeof allFoods === "undefined") {
        return [];
    }

    return allFoods;
}


function getTodayDashboardFoods() {

    if (typeof dailyFoods !== "undefined") {
        return dailyFoods;
    }

    const today =
        new Date().toISOString().split("T")[0];

    return getDashboardFoods().filter(function (food) {

        return food.date === today;

    });
}


/* ==========================================
   CALCULATE NUTRITION
========================================== */

function updateDashboardNutrition() {

    const foods =
        getTodayDashboardFoods();

    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;


    foods.forEach(function (food) {

        calories += Number(food.calories) || 0;
        protein += Number(food.protein) || 0;
        carbs += Number(food.carbs) || 0;
        fat += Number(food.fat) || 0;

    });


    const caloriesElement =
        document.getElementById("dashboardCalories");

    const proteinElement =
        document.getElementById("dashboardProtein");

    const carbsElement =
        document.getElementById("dashboardCarbs");

    const fatElement =
        document.getElementById("dashboardFat");


    if (caloriesElement) {

        caloriesElement.textContent =
            Math.round(calories) + " kcal";

    }


    if (proteinElement) {

        proteinElement.textContent =
            protein.toFixed(1) + " g";

    }


    if (carbsElement) {

        carbsElement.textContent =
            carbs.toFixed(1) + " g";

    }


    if (fatElement) {

        fatElement.textContent =
            fat.toFixed(1) + " g";

    }

}


/* ==========================================
   TODAY'S MEALS
========================================== */

function updateDashboardMeals() {

    const foods =
        getTodayDashboardFoods();


    const mealCounts = {

        breakfast: 0,

        lunch: 0,

        snack: 0,

        dinner: 0

    };


    foods.forEach(function (food) {

        const meal =
            String(food.meal || "")
                .toLowerCase()
                .trim();


        if (
            Object.prototype.hasOwnProperty
                .call(mealCounts, meal)
        ) {

            mealCounts[meal]++;

        }

    });


    const breakfast =
        document.getElementById("breakfastCount");

    const lunch =
        document.getElementById("lunchCount");

    const snack =
        document.getElementById("snackCount");

    const dinner =
        document.getElementById("dinnerCount");


    if (breakfast) {
        breakfast.textContent =
            mealCounts.breakfast;
    }

    if (lunch) {
        lunch.textContent =
            mealCounts.lunch;
    }

    if (snack) {
        snack.textContent =
            mealCounts.snack;
    }

    if (dinner) {
        dinner.textContent =
            mealCounts.dinner;
    }

}


/* ==========================================
   NUTRITION REPORT
========================================== */

function updateDashboardReport() {

    const report =
        document.getElementById("reportText");

    if (!report) return;


    const foods =
        getTodayDashboardFoods();


    if (foods.length === 0) {

        report.textContent =
            "No food has been recorded today.";

        return;

    }


    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;


    foods.forEach(function (food) {

        calories += Number(food.calories) || 0;
        protein += Number(food.protein) || 0;
        carbs += Number(food.carbs) || 0;
        fat += Number(food.fat) || 0;

    });


    report.textContent =
        "Today you have recorded " +
        foods.length +
        " food item(s), providing approximately " +
        Math.round(calories) +
        " kcal, " +
        protein.toFixed(1) +
        " g protein, " +
        carbs.toFixed(1) +
        " g carbs and " +
        fat.toFixed(1) +
        " g fat.";

}


/* ==========================================
   NUTRITION HISTORY
========================================== */

function updateDashboardHistory() {

    const historyList =
        document.getElementById("historyList");

    if (!historyList) return;


    const foods =
        getDashboardFoods();


    if (foods.length === 0) {

        historyList.innerHTML = `
            <p class="empty-message">
                No previous records available.
            </p>
        `;

        return;

    }


    const groupedFoods = {};


    foods.forEach(function (food) {

        if (!groupedFoods[food.date]) {

            groupedFoods[food.date] = [];

        }

        groupedFoods[food.date].push(food);

    });


    historyList.innerHTML = "";


    Object.keys(groupedFoods)
        .sort()
        .reverse()
        .forEach(function (date) {

            let calories = 0;
            let protein = 0;
            let carbs = 0;
            let fat = 0;


            groupedFoods[date].forEach(function (food) {

                calories += Number(food.calories) || 0;
                protein += Number(food.protein) || 0;
                carbs += Number(food.carbs) || 0;
                fat += Number(food.fat) || 0;

            });


            historyList.innerHTML += `

                <div class="history-card">

                    <h3>📅 ${date}</h3>

                    <p>
                        🔥 ${Math.round(calories)} kcal
                    </p>

                    <p>
                        💪 ${protein.toFixed(1)} g Protein
                    </p>

                    <p>
                        🍚 ${carbs.toFixed(1)} g Carbs
                    </p>

                    <p>
                        🥑 ${fat.toFixed(1)} g Fat
                    </p>

                </div>

            `;

        });

}


/* ==========================================
   HEALTH DATA
========================================== */

function updateDashboardHealth() {

    const bmiElement =
        document.getElementById("dashboardBMI");

    const statusElement =
        document.getElementById(
            "dashboardHealthStatus"
        );


    const savedHealth =
        localStorage.getItem("nutrisyncHealth");


    if (!savedHealth) {

        if (bmiElement) {
            bmiElement.textContent = "--";
        }

        if (statusElement) {
            statusElement.textContent =
                "Not assessed";
        }

        return;

    }


    try {

        const health =
            JSON.parse(savedHealth);


        if (bmiElement) {

            bmiElement.textContent =
                health.bmi || "--";

        }


        if (statusElement) {

            statusElement.textContent =
                health.status || "Not assessed";

        }

    } catch (error) {

        console.error(
            "Health data error:",
            error
        );

    }

}


/* ==========================================
   WATER
========================================== */

function updateDashboardWater() {

    const waterElement =
        document.getElementById(
            "dashboardWater"
        );

    if (!waterElement) return;


    const water =
        Number(
            localStorage.getItem("waterCount")
        ) || 0;


    waterElement.textContent =
        water + " / 8 glasses";

}


/* ==========================================
   ACTIVITY
========================================== */

function updateDashboardActivity() {

    const stepsElement =
        document.getElementById(
            "dashboardSteps"
        );

    const exerciseElement =
        document.getElementById(
            "dashboardExercise"
        );


    const savedActivity =
        localStorage.getItem(
            "nutrisyncActivity"
        );


    if (!savedActivity) {

        if (stepsElement) {
            stepsElement.textContent = "0";
        }

        if (exerciseElement) {
            exerciseElement.textContent =
                "0 min";
        }

        return;

    }


    try {

        const activity =
            JSON.parse(savedActivity);


        if (stepsElement) {

            stepsElement.textContent =
                activity.steps || 0;

        }


        if (exerciseElement) {

            exerciseElement.textContent =
                (activity.exerciseMinutes || 0) +
                " min";

        }

    } catch (error) {

        console.error(
            "Activity data error:",
            error
        );

    }

}


/* ==========================================
   MEAL PLAN
========================================== */

function updateDashboardMealPlan() {

    const container =
        document.getElementById(
            "dashboardMealPlan"
        );

    if (!container) return;


    const savedPlan =
        localStorage.getItem(
            "nutrisyncMealPlan"
        );


    if (!savedPlan) {

        container.innerHTML =
            "<p>No meal plan created yet.</p>";

        return;

    }


    try {

        const data =
            JSON.parse(savedPlan);


        if (!data.plan) {

            container.innerHTML =
                "<p>No meal plan created yet.</p>";

            return;

        }


        const plan =
            data.plan;


        container.innerHTML = `

            <div class="dashboard-meal-item">

                <strong>Breakfast</strong>

                <span>
                    ${plan.breakfast}
                </span>

            </div>


            <div class="dashboard-meal-item">

                <strong>Lunch</strong>

                <span>
                    ${plan.lunch}
                </span>

            </div>


            <div class="dashboard-meal-item">

                <strong>Snack</strong>

                <span>
                    ${plan.snack}
                </span>

            </div>


            <div class="dashboard-meal-item">

                <strong>Dinner</strong>

                <span>
                    ${plan.dinner}
                </span>

            </div>

        `;

    } catch (error) {

        console.error(
            "Meal plan data error:",
            error
        );

        container.innerHTML =
            "<p>No meal plan available.</p>";

    }

}


/* ==========================================
   REFRESH EVERYTHING
========================================== */

function refreshDashboard() {

    updateDashboardNutrition();

    updateDashboardMeals();

    updateDashboardReport();

    updateDashboardHistory();

    updateDashboardHealth();

    updateDashboardWater();

    updateDashboardActivity();

    updateDashboardMealPlan();

}


/* ==========================================
   PAGE LOAD
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        refreshDashboard();

    }
);


/* ==========================================
   WHEN RETURNING TO DASHBOARD
========================================== */

window.addEventListener(
    "pageshow",
    function () {

        refreshDashboard();

    }
);
