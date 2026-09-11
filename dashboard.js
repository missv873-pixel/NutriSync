/* ==========================================
   NUTRISYNC - DASHBOARD
   Reads the latest data from all sections
========================================== */


/* ==========================================
   AUTHENTICATION CHECK
========================================== */

if (localStorage.getItem("nutrisyncLoggedIn") !== "true") {
    window.location.href = "auth.html";
}


/* ==========================================
   GET CURRENT USER
========================================== */

const currentUserData = JSON.parse(
    localStorage.getItem("nutrisyncCurrentUser") || "null"
);

const currentUser = currentUserData
    ? currentUserData.email
    : null;


/* ==========================================
   GET FOOD DATA
========================================== */

function getAllFoods() {

    if (!currentUser) {
        return [];
    }

    return JSON.parse(
        localStorage.getItem("allFoods_" + currentUser) || "[]"
    );
}


/* ==========================================
   GET TODAY'S FOOD
========================================== */

function getTodayFoods() {

    const today = new Date()
        .toISOString()
        .split("T")[0];

    return getAllFoods().filter(function(food) {

        return food.date === today;

    });

}


/* ==========================================
   CALCULATE NUTRITION TOTALS
========================================== */

function calculateTotals(dailyFoods) {

    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;


    dailyFoods.forEach(function(food) {

        calories += Number(food.calories) || 0;

        protein += Number(food.protein) || 0;

        carbs += Number(food.carbs) || 0;

        fat += Number(food.fat) || 0;

    });


    return {
        calories,
        protein,
        carbs,
        fat
    };

}


/* ==========================================
   DISPLAY NUTRITION
========================================== */

function displayNutrition() {

    const dailyFoods = getTodayFoods();

    const totals = calculateTotals(dailyFoods);


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
            Math.round(totals.calories) + " kcal";

    }


    if (proteinElement) {

        proteinElement.textContent =
            totals.protein.toFixed(1) + " g";

    }


    if (carbsElement) {

        carbsElement.textContent =
            totals.carbs.toFixed(1) + " g";

    }


    if (fatElement) {

        fatElement.textContent =
            totals.fat.toFixed(1) + " g";

    }

}


/* ==========================================
   DISPLAY MEAL COUNTS
========================================== */

function displayMealCounts() {

    const dailyFoods = getTodayFoods();


    const meals = {

        breakfast: 0,

        lunch: 0,

        snack: 0,

        dinner: 0

    };


    dailyFoods.forEach(function(food) {

        const meal =
            String(food.meal || "")
                .toLowerCase()
                .trim();


        if (meals[meal] !== undefined) {

            meals[meal]++;

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
        breakfast.textContent = meals.breakfast;
    }

    if (lunch) {
        lunch.textContent = meals.lunch;
    }

    if (snack) {
        snack.textContent = meals.snack;
    }

    if (dinner) {
        dinner.textContent = meals.dinner;
    }

}


/* ==========================================
   GENERATE NUTRITION REPORT
========================================== */

function generateReport() {

    const report =
        document.getElementById("reportText");

    if (!report) return;


    const dailyFoods = getTodayFoods();


    if (dailyFoods.length === 0) {

        report.textContent =
            "No food has been recorded today. Start recording your meals to see your nutrition report.";

        return;

    }


    const totals =
        calculateTotals(dailyFoods);


    report.textContent =
        "Today you have recorded " +
        dailyFoods.length +
        " food item(s), providing approximately " +
        Math.round(totals.calories) +
        " kcal, " +
        totals.protein.toFixed(1) +
        " g protein, " +
        totals.carbs.toFixed(1) +
        " g carbs and " +
        totals.fat.toFixed(1) +
        " g fat.";

}


/* ==========================================
   DISPLAY NUTRITION HISTORY
========================================== */

function displayHistory() {

    const historyList =
        document.getElementById("historyList");

    if (!historyList) return;


    const allFoods =
        getAllFoods();


    if (allFoods.length === 0) {

        historyList.innerHTML = `
            <p class="empty-message">
                No previous records available.
            </p>
        `;

        return;

    }


    const groupedFoods = {};


    allFoods.forEach(function(food) {

        if (!groupedFoods[food.date]) {

            groupedFoods[food.date] = [];

        }


        groupedFoods[food.date].push(food);

    });


    historyList.innerHTML = "";


    Object.keys(groupedFoods)
        .sort()
        .reverse()
        .forEach(function(date) {

            let calories = 0;
            let protein = 0;
            let carbs = 0;
            let fat = 0;


            groupedFoods[date].forEach(function(food) {

                calories +=
                    Number(food.calories) || 0;

                protein +=
                    Number(food.protein) || 0;

                carbs +=
                    Number(food.carbs) || 0;

                fat +=
                    Number(food.fat) || 0;

            });


            historyList.innerHTML += `

                <div class="history-card">

                    <h3>${date}</h3>

                    <p>
                        ${Math.round(calories)} kcal
                    </p>

                    <p>
                        ${protein.toFixed(1)} g Protein
                    </p>

                    <p>
                        ${carbs.toFixed(1)} g Carbs
                    </p>

                    <p>
                        ${fat.toFixed(1)} g Fat
                    </p>

                </div>

            `;

        });

}


/* ==========================================
   DISPLAY HEALTH DATA
========================================== */

function displayHealthData() {

    const savedHealth =
        localStorage.getItem("nutrisyncHealth");


    const bmiElement =
        document.getElementById("dashboardBMI");

    const statusElement =
        document.getElementById("dashboardHealthStatus");


    if (!savedHealth) {

        if (bmiElement) {
            bmiElement.textContent = "--";
        }

        if (statusElement) {
            statusElement.textContent = "Not assessed";
        }

        return;

    }


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

}


/* ==========================================
   DISPLAY WATER
========================================== */

function displayWaterData() {

    const waterElement =
        document.getElementById("dashboardWater");

    if (!waterElement) return;


    const water =
        Number(localStorage.getItem("waterCount")) || 0;


    waterElement.textContent =
        water + " / 8 glasses";

}


/* ==========================================
   DISPLAY ACTIVITY
========================================== */

function displayActivityData() {

    const stepsElement =
        document.getElementById("dashboardSteps");

    const exerciseElement =
        document.getElementById("dashboardExercise");


    const savedActivity =
        localStorage.getItem("nutrisyncActivity");


    if (!savedActivity) {

        if (stepsElement) {
            stepsElement.textContent = "0";
        }

        if (exerciseElement) {
            exerciseElement.textContent = "0 min";
        }

        return;

    }


    const activity =
        JSON.parse(savedActivity);


    if (stepsElement) {

        stepsElement.textContent =
            activity.steps || 0;

    }


    if (exerciseElement) {

        exerciseElement.textContent =
            (activity.exerciseMinutes || 0) + " min";

    }

}


/* ==========================================
   DISPLAY MEAL PLAN
========================================== */

function displayMealPlanData() {

    const mealPlanElement =
        document.getElementById("dashboardMealPlan");


    if (!mealPlanElement) return;


    const savedPlan =
        localStorage.getItem("nutrisyncMealPlan");


    if (!savedPlan) {

        mealPlanElement.textContent =
            "No meal plan created yet.";

        return;

    }


    const data =
        JSON.parse(savedPlan);


    if (!data.plan) {

        mealPlanElement.textContent =
            "No meal plan created yet.";

        return;

    }


    const plan =
        data.plan;


    mealPlanElement.innerHTML = `

        <div class="dashboard-meal-item">
            <strong>Breakfast:</strong>
            <span>${plan.breakfast}</span>
        </div>

        <div class="dashboard-meal-item">
            <strong>Lunch:</strong>
            <span>${plan.lunch}</span>
        </div>

        <div class="dashboard-meal-item">
            <strong>Snack:</strong>
            <span>${plan.snack}</span>
        </div>

        <div class="dashboard-meal-item">
            <strong>Dinner:</strong>
            <span>${plan.dinner}</span>
        </div>

    `;

}


/* ==========================================
   REFRESH DASHBOARD
========================================== */

function refreshDashboard() {

    displayNutrition();

    displayMealCounts();

    generateReport();

    displayHistory();

    displayHealthData();

    displayWaterData();

    displayActivityData();

    displayMealPlanData();

}


/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    refreshDashboard
);


/* ==========================================
   REFRESH WHEN RETURNING TO DASHBOARD
========================================== */

window.addEventListener(
    "pageshow",
    refreshDashboard
);


/* ==========================================
   REFRESH WHEN LOCAL STORAGE CHANGES
========================================== */

window.addEventListener(
    "storage",
    refreshDashboard
);
