/* ==========================================
   NUTRISYNC - DASHBOARD
========================================== */
if (localStorage.getItem("nutrisyncLoggedIn") !== "true") {
    window.location.href = "auth.html";
}

/* ==========================================
   GET SAVED FOOD DATA
========================================== */

let allFoods =
    JSON.parse(
        localStorage.getItem("allFoods")
    ) || [];


const today =
    new Date()
        .toISOString()
        .split("T")[0];


const dailyFoods =
    allFoods.filter(function(food) {

        return food.date === today;

    });


/* ==========================================
   CALCULATE TOTAL NUTRITION
========================================== */

function calculateTotals() {

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

    const totals =
        calculateTotals();


    document.getElementById(
        "dashboardCalories"
    ).textContent =
        Math.round(totals.calories) + " kcal";


    document.getElementById(
        "dashboardProtein"
    ).textContent =
        totals.protein.toFixed(1) + " g";


    document.getElementById(
        "dashboardCarbs"
    ).textContent =
        totals.carbs.toFixed(1) + " g";


    document.getElementById(
        "dashboardFat"
    ).textContent =
        totals.fat.toFixed(1) + " g";

}


/* ==========================================
   DISPLAY MEAL COUNTS
========================================== */

function displayMealCounts() {

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


    document.getElementById(
        "breakfastCount"
    ).textContent =
        meals.breakfast;


    document.getElementById(
        "lunchCount"
    ).textContent =
        meals.lunch;


    document.getElementById(
        "snackCount"
    ).textContent =
        meals.snack;


    document.getElementById(
        "dinnerCount"
    ).textContent =
        meals.dinner;

}


/* ==========================================
   GENERATE REPORT
========================================== */

function generateReport() {

    const report =
        document.getElementById(
            "reportText"
        );


    if (dailyFoods.length === 0) {

        report.textContent =
            "No food has been recorded today. Start recording your meals to see your nutrition report.";

        return;

    }


    const totals =
        calculateTotals();


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
   DISPLAY HISTORY
========================================== */

function displayHistory() {

    const historyList =
        document.getElementById(
            "historyList"
        );


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


            groupedFoods[date]
                .forEach(function(food) {

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
   BACK BUTTON
========================================== */

function goBack() {

    window.location.href =
        "index.html";

}


/* ==========================================
   INITIALIZE DASHBOARD
========================================== */

displayNutrition();

displayMealCounts();

generateReport();

displayHistory();