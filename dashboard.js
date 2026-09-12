/* ==========================================
   NUTRISYNC - DASHBOARD
========================================== */


/* ==========================================
   AUTHENTICATION CHECK
========================================== */

if (localStorage.getItem("nutrisyncLoggedIn") !== "true") {

    window.location.href = "auth.html";

}


/* ==========================================
   GET TODAY'S FOOD
========================================== */

function getDashboardFoods() {

    if (typeof dailyFoods !== "undefined") {

        return dailyFoods;

    }

    return [];

}


/* ==========================================
   UPDATE NUTRITION SUMMARY
========================================== */

function updateDashboardNutrition() {

    const foods = getDashboardFoods();

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    foods.forEach(function (food) {

        totalCalories += Number(food.calories) || 0;
        totalProtein += Number(food.protein) || 0;
        totalCarbs += Number(food.carbs) || 0;
        totalFat += Number(food.fat) || 0;

    });


    const calories =
        document.getElementById("dashboardCalories");

    const protein =
        document.getElementById("dashboardProtein");

    const carbs =
        document.getElementById("dashboardCarbs");

    const fat =
        document.getElementById("dashboardFat");


    if (calories) {

        calories.textContent =
            Math.round(totalCalories) + " kcal";

    }

    if (protein) {

        protein.textContent =
            totalProtein.toFixed(1) + " g";

    }

    if (carbs) {

        carbs.textContent =
            totalCarbs.toFixed(1) + " g";

    }

    if (fat) {

        fat.textContent =
            totalFat.toFixed(1) + " g";

    }

}


/* ==========================================
   UPDATE TODAY'S MEAL COUNTS
========================================== */

function updateDashboardMeals() {

    const foods = getDashboardFoods();

    let breakfast = 0;
    let lunch = 0;
    let snack = 0;
    let dinner = 0;


    foods.forEach(function (food) {

        const meal =
            String(food.meal || "")
                .toLowerCase()
                .trim();


        if (meal === "breakfast") {

            breakfast++;

        }

        else if (meal === "lunch") {

            lunch++;

        }

        else if (meal === "snack") {

            snack++;

        }

        else if (meal === "dinner") {

            dinner++;

        }

    });


    const breakfastElement =
        document.getElementById("breakfastCount");

    const lunchElement =
        document.getElementById("lunchCount");

    const snackElement =
        document.getElementById("snackCount");

    const dinnerElement =
        document.getElementById("dinnerCount");


    if (breakfastElement) {

        breakfastElement.textContent =
            breakfast;

    }

    if (lunchElement) {

        lunchElement.textContent =
            lunch;

    }

    if (snackElement) {

        snackElement.textContent =
            snack;

    }

    if (dinnerElement) {

        dinnerElement.textContent =
            dinner;

    }

}


/* ==========================================
   UPDATE NUTRITION REPORT
========================================== */

function updateDashboardReport() {

    const report =
        document.getElementById("reportText");


    if (!report) return;


    const foods = getDashboardFoods();


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
   UPDATE NUTRITION HISTORY
========================================== */

function updateDashboardHistory() {

    const historyList =
        document.getElementById("historyList");


    if (!historyList) return;


    if (
        typeof allFoods === "undefined" ||
        !Array.isArray(allFoods) ||
        allFoods.length === 0
    ) {

        historyList.innerHTML = `
            <p class="empty-message">
                No previous records available.
            </p>
        `;

        return;

    }


    const groupedFoods = {};


    allFoods.forEach(function (food) {

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
   UPDATE HEALTH SUMMARY
========================================== */

function updateDashboardHealth() {

    /* --------------------------------------
       HEALTH / BMI
    -------------------------------------- */

    const savedHealth =
        localStorage.getItem("nutrisyncHealth");


    if (savedHealth) {

        try {

            const health =
                JSON.parse(savedHealth);


            const bmiElement =
                document.getElementById("dashboardBMI");


            const statusElement =
                document.getElementById(
                    "dashboardHealthStatus"
                );


            if (bmiElement) {

                bmiElement.textContent =
                    health.bmi || "--";

            }


            if (statusElement) {

                statusElement.textContent =
                    health.status || "Not assessed";

            }

        }

        catch (error) {

            console.error(
                "Error loading health data:",
                error
            );

        }

    }


    /* --------------------------------------
       WATER
    -------------------------------------- */

    const savedWater =
        localStorage.getItem("waterCount");


    const waterElement =
        document.getElementById("dashboardWater");


    if (waterElement) {

        const water =
            parseInt(savedWater, 10) || 0;


        waterElement.textContent =
            water + " / 8 glasses";

    }


    /* --------------------------------------
       ACTIVITY / STEPS
    -------------------------------------- */

    const savedActivity =
        localStorage.getItem("nutrisyncActivity");


    if (savedActivity) {

        try {

            const activity =
                JSON.parse(savedActivity);


            const stepsElement =
                document.getElementById(
                    "dashboardSteps"
                );


            if (stepsElement) {

                stepsElement.textContent =
                    Number(activity.steps) || 0;

            }

        }

        catch (error) {

            console.error(
                "Error loading activity data:",
                error
            );

        }

    }

}


/* ==========================================
   REFRESH DASHBOARD
========================================== */

function refreshDashboard() {

    updateDashboardNutrition();

    updateDashboardMeals();

    updateDashboardReport();

    updateDashboardHistory();

    updateDashboardHealth();

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
   REFRESH WHEN RETURNING TO DASHBOARD
========================================== */

window.addEventListener(
    "pageshow",
    function () {

        refreshDashboard();

    }
);


/* ==========================================
   REFRESH WHEN STORAGE CHANGES
========================================== */

window.addEventListener(
    "storage",
    function () {

        refreshDashboard();

    }
);


/* ==========================================
   REFRESH WHEN PAGE BECOMES VISIBLE
========================================== */

document.addEventListener(
    "visibilitychange",
    function () {

        if (!document.hidden) {

            refreshDashboard();

        }

    }
);
