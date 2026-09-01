

/* ==========================================
   AUTHENTICATION CHECK
========================================== */

function checkAuthentication() {

    const loggedIn =
        localStorage.getItem("nutrisyncLoggedIn");

    if (loggedIn !== "true") {

        window.location.href = "auth.html";

    }
}

checkAuthentication();


/* ==========================================
   LOGOUT
========================================== */

function logoutUser() {

    localStorage.removeItem("nutrisyncLoggedIn");

    localStorage.removeItem("nutrisyncCurrentUser");

    window.location.href = "auth.html";
}

const foods = {

    rice: {
        name: "Rice",
        calories: 130,
        protein: 2.7,
        carbs: 28,
        fat: 0.3
    },

    dal: {
        name: "Dal",
        calories: 116,
        protein: 9,
        carbs: 20,
        fat: 0.4
    },

    roti: {
        name: "Roti",
        calories: 297,
        protein: 9,
        carbs: 55,
        fat: 4
    },

    apple: {
        name: "Apple",
        calories: 52,
        protein: 0.3,
        carbs: 14,
        fat: 0.2
    },

    banana: {
        name: "Banana",
        calories: 89,
        protein: 1.1,
        carbs: 23,
        fat: 0.3
    },

    poha: {
        name: "Poha",
        calories: 180,
        protein: 4,
        carbs: 30,
        fat: 5
    },

    paneer: {
        name: "Paneer",
        calories: 265,
        protein: 18,
        carbs: 6,
        fat: 20
    }
};
// ==========================================
// CUSTOM FOOD DATABASE
// ==========================================


// ==========================================
// SHOW CUSTOM FOOD FORM
// ==========================================

function showCustomFoodForm() {

    const form =
        document.getElementById("customFoodForm");

    if (!form) return;

    form.style.display = "block";

}


// ==========================================
// SAVE CUSTOM FOOD
// ==========================================

function saveCustomFood() {

    const name =
        document.getElementById("customFoodName").value.trim();

    const calories =
        Number(document.getElementById("customCalories").value);

    const protein =
        Number(document.getElementById("customProtein").value);

    const carbs =
        Number(document.getElementById("customCarbs").value);

    const fat =
        Number(document.getElementById("customFat").value);


    // Validation

    if (name === "") {

        alert("Please enter the food name.");

        return;

    }


    if (
        Number.isNaN(calories) ||
        calories < 0
    ) {

        alert("Please enter valid calories.");

        return;

    }


    if (
        Number.isNaN(protein) ||
        protein < 0
    ) {

        alert("Please enter valid protein.");

        return;

    }


    if (
        Number.isNaN(carbs) ||
        carbs < 0
    ) {

        alert("Please enter valid carbohydrates.");

        return;

    }


    if (
        Number.isNaN(fat) ||
        fat < 0
    ) {

        alert("Please enter valid fat.");

        return;

    }


    // Create unique key

    const foodKey =
        "custom_" + Date.now();


    // Create food object

    const newFood = {

        key: foodKey,

        name: name,

        calories: calories,

        protein: protein,

        carbs: carbs,

        fat: fat

    };


    // Save to custom food array

    customFoods.push(newFood);


    localStorage.setItem(
        "customFoods_" + currentUser,
        JSON.stringify(customFoods)
    );


    // Add food to dropdown

    addCustomFoodToDropdown(newFood);


    // Select newly created food

    document.getElementById("foodSelect").value =
        foodKey;


    // Clear form

    document.getElementById("customFoodName").value = "";
    document.getElementById("customCalories").value = "";
    document.getElementById("customProtein").value = "";
    document.getElementById("customCarbs").value = "";
    document.getElementById("customFat").value = "";


    // Hide form

    document.getElementById("customFoodForm").style.display =
        "none";


    alert(
        name + " has been added successfully!"
    );

}


// ==========================================
// ADD CUSTOM FOOD TO DROPDOWN
// ==========================================

function addCustomFoodToDropdown(food) {

    const foodSelect =
        document.getElementById("foodSelect");

    if (!foodSelect) return;


    const option =
        document.createElement("option");

    option.value = food.key;

    option.textContent =
        food.name + " (My Food)";

    foodSelect.appendChild(option);

}


// ==========================================
// LOAD CUSTOM FOODS
// ==========================================

function loadCustomFoods() {

    const foodSelect =
        document.getElementById("foodSelect");

    if (!foodSelect) return;


    customFoods.forEach(function(food) {

        const option =
            document.createElement("option");

        option.value = food.key;

        option.textContent =
            food.name + " (My Food)";

        foodSelect.appendChild(option);

    });

}

// ==========================================
// DATE
// ==========================================

const today = new Date().toISOString().split("T")[0];


// ==========================================
// LOAD SAVED DATA
// ==========================================
const currentUser = localStorage.getItem("currentUser");

let allFoods = currentUser
    ? JSON.parse(localStorage.getItem("allFoods_" + currentUser)) || []
    : [];

let customFoods = currentUser
    ? JSON.parse(localStorage.getItem("customFoods_" + currentUser)) || []
    : [];

let dailyFoods = allFoods.filter(function(food) {
    return food.date === today;
});


// ==========================================
// ADD FOOD
// ==========================================

function addFood() {

    const foodSelect = document.getElementById("foodSelect");
    const quantityInput = document.getElementById("quantity");
    const mealTypeInput = document.getElementById("mealType");

    const foodKey = foodSelect.value;
    const quantity = Number(quantityInput.value);
    const mealType = mealTypeInput.value.toLowerCase();


    // Check meal

    
    if (mealType === "") {
        alert("Please select a meal.");
        return;
    }


    // Check food

    if (foodKey === "") {
        alert("Please select a food.");
        return;
    }


    // Check quantity

    if (quantity <= 0 || Number.isNaN(quantity)) {
        alert("Please enter a valid quantity.");
        return;
    }


    // ==========================================
    // FIND FOOD
    // ==========================================

    let food = foods[foodKey];


    // If not found in default foods,
    // check custom foods

    if (!food && typeof customFoods !== "undefined") {

        const customFood = customFoods.find(function(item) {
            return item.key === foodKey;
        });

        if (customFood) {
            food = customFood;
        }
    }


    // Food not found

    if (!food) {
        alert("Selected food not found.");
        return;
    }


    // ==========================================
    // CALCULATE NUTRITION
    // ==========================================

    const multiplier = quantity / 100;


    const foodEntry = {

        name: food.name,

        quantity: quantity,

        calories: food.calories * multiplier,

        protein: food.protein * multiplier,

        carbs: food.carbs * multiplier,

        fat: food.fat * multiplier,

        meal: mealType,

        date: today

    };


    // ==========================================
    // SAVE FOOD
    // ==========================================

    allFoods.push(foodEntry);

    dailyFoods.push(foodEntry);


    localStorage.setItem(
        "allFoods_" + currentUser,
        JSON.stringify(allFoods)
    );

    localStorage.setItem(
        "dailyFoods_" + currentUser,
        JSON.stringify(dailyFoods)
    );


    // ==========================================
    // UPDATE SCREEN
    // ==========================================

    displayDailyFoods();

    displayMealsByType();

    updateNutrition();

    updateEatingHabits();


    // ==========================================
    // CLEAR FORM
    // ==========================================

    foodSelect.value = "";

    quantityInput.value = "";

    mealTypeInput.value = "";

}


// ==========================================
// DISPLAY TODAY'S FOOD
// ==========================================

function displayDailyFoods() {

    const foodList =
        document.getElementById("foodList");


    if (!foodList) return;


    if (dailyFoods.length === 0) {

        foodList.innerHTML = `
            <p class="empty-message">
                No food added yet.
            </p>
        `;

        return;
    }


    foodList.innerHTML = "";


    dailyFoods.forEach(function(food) {

        foodList.innerHTML += `

            <div class="food-entry">

                <div>

                    <div class="food-name">
                        ${food.name}
                    </div>

                    <div class="food-quantity">
                        ${food.quantity} g
                        </div>
                        <div class="food-nutrition">

                        Protein:
                        ${food.protein.toFixed(1)} g
                        <br>

                        Carbs:
                        ${food.carbs.toFixed(1)} g

                        <br>

                        Fat:
                        ${food.fat.toFixed(1)} g

                    </div>
                    <div class="food-meal">
                    Meal: ${food.meal}
                     </div>

                <div class="calories">

                    ${food.calories.toFixed(0)} kcal

                </div>

            </div>

        `;
    
    });
}


// ==========================================
// UPDATE NUTRITION
// ==========================================

function updateNutrition() {

    let totalCalories = 0;

    let totalProtein = 0;

    let totalCarbs = 0;

    let totalFat = 0;


    dailyFoods.forEach(function(food) {

        totalCalories += food.calories;

        totalProtein += food.protein;

        totalCarbs += food.carbs;

        totalFat += food.fat;

    });


    const calories =
        document.getElementById("totalCalories");

    const protein =
        document.getElementById("totalProtein");

    const carbs =
        document.getElementById("totalCarbs");

    const fat =
        document.getElementById("totalFat");


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


// ==========================================
// EATING HABITS
// ==========================================

function updateEatingHabits() {
    console.log("Daily Foods:", dailyFoods);
    console.log("Meals Values:", dailyFoods.map(food => food.meal));
    const meals = {
        breakfast: false,
        lunch: false,
        snack: false,
        dinner: false
    };

    // Check today's recorded foods
    dailyFoods.forEach(function(food) {

        if (food.meal) {

            const meal = String(food.meal)
                .toLowerCase()
                .trim();

            if (meals[meal] !== undefined) {
                meals[meal] = true;
            }
        }

    });


    // Safely update the meal status
    const breakfastStatus =
        document.getElementById("breakfastStatus");

    const lunchStatus =
        document.getElementById("lunchStatus");

    const snackStatus =
        document.getElementById("snackStatus");

    const dinnerStatus =
        document.getElementById("dinnerStatus");


    if (breakfastStatus) {
        breakfastStatus.textContent =
            meals.breakfast ? "✓ Recorded" : "Not Recorded";
    }

    if (lunchStatus) {
        lunchStatus.textContent =
            meals.lunch ? "✓ Recorded" : "Not Recorded";
    }

    if (snackStatus) {
        snackStatus.textContent =
            meals.snack ? "✓ Recorded" : "Not Recorded";
    }

    if (dinnerStatus) {
        dinnerStatus.textContent =
            meals.dinner ? "✓ Recorded" : "Not Recorded";
    }


    // Count recorded meals
    let mealCount = 0;

    Object.values(meals).forEach(function(recorded) {

        if (recorded) {
            mealCount++;
        }

    });


    const mealCountElement =
        document.getElementById("mealCount");

    if (mealCountElement) {
        mealCountElement.textContent = mealCount;
    }


    // Update message
    const message =
        document.getElementById("habitMessage");

    if (message) {

        if (mealCount === 0) {

            message.textContent =
                "Start recording your meals today.";

        } else if (mealCount < 3) {

            message.textContent =
                "Keep going! Try to record your main meals.";

        } else {

            message.textContent =
                "Great! You've recorded all your main meals and a snack.";

        }

    }

}
// ==========================================
// RECIPE BUTTON
// ==========================================

function openRecipes() {

    alert("Healthy Recipes module coming soon!");

}


// ==========================================
// NUTRITION HISTORY
// ==========================================

function showHistory() {

    const historyList =
        document.getElementById("historyList");


    if (!historyList) return;


    historyList.innerHTML = "";


    if (allFoods.length === 0) {

        historyList.innerHTML = `
            <p class="empty-message">
                No nutrition history available.
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


    Object.keys(groupedFoods)
        .sort()
        .reverse()
        .forEach(function(date) {

            let calories = 0;

            let protein = 0;

            let carbs = 0;

            let fat = 0;


            groupedFoods[date].forEach(function(food) {

                calories += food.calories;

                protein += food.protein;

                carbs += food.carbs;

                fat += food.fat;

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

function displayMealsByType() {

    const mealContainer = {
        breakfast: document.getElementById("breakfastFoods"),
        lunch: document.getElementById("lunchFoods"),
        snack: document.getElementById("snackFoods"),
        dinner: document.getElementById("dinnerFoods")
    };

    const emptyMessages = {
        breakfast: "No breakfast recorded.",
        lunch: "No lunch recorded.",
        snack: "No snack recorded.",
        dinner: "No dinner recorded."
    };

    Object.keys(mealContainer).forEach(function(mealType) {

        const container = mealContainer[mealType];

        if (!container) return;

        container.innerHTML = "";

        const foodsForMeal = dailyFoods.filter(function(food) {

            return food.meal.toLowerCase() === mealType;

        });

        if (foodsForMeal.length === 0) {

            container.innerHTML = `
                <p class="no-meal">
                    ${emptyMessages[mealType]}
                </p>
            `;

            return;
        }

        foodsForMeal.forEach(function(food) {

            const foodIndex = dailyFoods.indexOf(food);

            container.innerHTML += `

                <div class="food-food">

                    <div class="food-info">

                        <strong>
                            ${food.name}
                        </strong>

                        <p class="food-quantity">
                            ${food.quantity} g
                        </p>

                        <p class="nutrition-small">
                            Protein: ${food.protein.toFixed(1)} g
                            &nbsp; | &nbsp;
                            Carbs: ${food.carbs.toFixed(1)} g
                            &nbsp; | &nbsp;
                            Fat: ${food.fat.toFixed(1)} g
                        </p>

                    </div>

                    <strong class="meal-calories">
                        ${food.calories.toFixed(0)} kcal
                    </strong>

                    <button
                        class="delete-food-btn"
                        onclick="deleteFood(${foodIndex})">

                        🗑️ Delete

                    </button>

                </div>

            `;

        });

    });

}
function deleteFood(foodIndex) {

    const foodToDelete = dailyFoods[foodIndex];

    if (!foodToDelete) {
        return;
    }

    const confirmDelete = confirm(
        `Delete ${foodToDelete.name} (${foodToDelete.quantity} g)?`
    );

    if (!confirmDelete) {
        return;
    }

    dailyFoods.splice(foodIndex, 1);

    const allFoodsIndex = allFoods.findIndex(function(food) {

        return (
            food.name === foodToDelete.name &&
            food.quantity === foodToDelete.quantity &&
            food.date === foodToDelete.date &&
            food.meal === foodToDelete.meal
        );

    });

    if (allFoodsIndex !== -1) {
        allFoods.splice(allFoodsIndex, 1);
    }

    localStorage.setItem(
        "dailyFoods_" + currentUser,
        JSON.stringify(dailyFoods)
    );

    localStorage.setItem(
        "allFoods_" + currentUser,
        JSON.stringify(allFoods)
    );

    displayDailyFoods();
    displayMealsByType();
    updateNutrition();
    updateEatingHabits();
}
// ==========================================
// START APP
// ==========================================

loadCustomFoods();

displayDailyFoods();

updateNutrition();

updateEatingHabits();

displayMealsByType();
// ==========================================
// NUTRISYNC - LANGUAGE SUPPORT
// ==========================================

const translations = {

    en: {
        welcomeTitle: "Greetings 👋",
        welcomeText: "Track your nutrition and build healthier eating habits.",

        nutritionTitle: "Today's Nutrition",
        caloriesLabel: "Calories",
        proteinLabel: "Protein",
        carbsLabel: "Carbs",
        fatLabel: "Fat",

        addFoodTitle: "Add Food",
        foodLabel: "Select Food",
        quantityLabel: "Quantity (grams)",
        mealLabel: "Select Meal",
        addFoodButton: "+ Add Food",

        habitsTitle: "Today's Eating Habits",
        breakfastLabel: "Breakfast",
        lunchLabel: "Lunch",
        snackLabel: "Snack",
        dinnerLabel: "Dinner",
        mealsRecordedLabel: "Meals recorded today:",

        todayMealsTitle: "Today's Meals",

        historyTitle: "Nutrition History",
        historyDescription: "View your previous nutrition records.",
        historyButton: "View History",

        recipeTitle: "🍲 Healthy Recipes",
        recipeDescription:
            "Discover healthy recipes and add your own favourites.",
        recipeButton: "Explore Recipes"
    },


    hi: {
        welcomeTitle: "नमस्ते 👋",
        welcomeText: "अपने पोषण को ट्रैक करें और स्वस्थ खाने की आदतें बनाएं।",

        nutritionTitle: "आज का पोषण",
        caloriesLabel: "कैलोरी",
        proteinLabel: "प्रोटीन",
        carbsLabel: "कार्बोहाइड्रेट",
        fatLabel: "वसा",

        addFoodTitle: "भोजन जोड़ें",
        foodLabel: "खाना चुनें",
        quantityLabel: "मात्रा (ग्राम)",
        mealLabel: "भोजन चुनें",
        addFoodButton: "+ भोजन जोड़ें",

        habitsTitle: "आज की खाने की आदतें",
        breakfastLabel: "नाश्ता",
        lunchLabel: "दोपहर का भोजन",
        snackLabel: "स्नैक",
        dinnerLabel: "रात का भोजन",
        mealsRecordedLabel: "आज दर्ज किए गए भोजन:",

        todayMealsTitle: "आज के भोजन",

        historyTitle: "पोषण इतिहास",
        historyDescription: "अपने पिछले पोषण रिकॉर्ड देखें।",
        historyButton: "इतिहास देखें",

        recipeTitle: "🍲 स्वस्थ रेसिपी",
        recipeDescription:
            "स्वस्थ रेसिपी देखें और अपनी पसंदीदा रेसिपी जोड़ें।",
        recipeButton: "रेसिपी देखें"
    },


    mr: {
        welcomeTitle: "नमस्कार 👋",
        welcomeText:
            "तुमचे पोषण ट्रॅक करा आणि निरोगी खाण्याच्या सवयी तयार करा.",

        nutritionTitle: "आजचे पोषण",
        caloriesLabel: "कॅलरी",
        proteinLabel: "प्रथिने",
        carbsLabel: "कार्बोहायड्रेट",
        fatLabel: "चरबी",

        addFoodTitle: "अन्न जोडा",
        foodLabel: "अन्न निवडा",
        quantityLabel: "प्रमाण (ग्रॅम)",
        mealLabel: "जेवण निवडा",
        addFoodButton: "+ अन्न जोडा",

        habitsTitle: "आजच्या खाण्याच्या सवयी",
        breakfastLabel: "नाश्ता",
        lunchLabel: "दुपारचे जेवण",
        snackLabel: "स्नॅक",
        dinnerLabel: "रात्रीचे जेवण",
        mealsRecordedLabel: "आज नोंदवलेली जेवणे:",

        todayMealsTitle: "आजचे जेवण",

        historyTitle: "पोषण इतिहास",
        historyDescription: "तुमच्या मागील पोषण नोंदी पहा.",
        historyButton: "इतिहास पहा",

        recipeTitle: "🍲 निरोगी पाककृती",
        recipeDescription:
            "निरोगी पाककृती पहा आणि तुमच्या आवडत्या पाककृती जोडा.",
        recipeButton: "पाककृती पहा"
    }

};


function changeLanguage(language) {

    const selectedLanguage = translations[language];

    if (!selectedLanguage) {
        return;
    }

    Object.keys(selectedLanguage).forEach(function(key) {

        const element = document.getElementById(key);

        if (element) {
            element.textContent = selectedLanguage[key];
        }

    });

    // Save selected language
    localStorage.setItem("selectedLanguage", language);
}


// Load saved language when app starts

const savedLanguage =
    localStorage.getItem("selectedLanguage") || "en";

const languageSelect =
    document.getElementById("languageSelect");

if (languageSelect) {

    languageSelect.value = savedLanguage;

    changeLanguage(savedLanguage);
}
