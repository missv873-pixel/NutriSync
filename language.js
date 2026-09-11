/* ==========================================
   NUTRISYNC - SHARED LANGUAGE SUPPORT
   English / Hindi / Marathi
========================================== */

const translations = {
    en: {
        navDashboard: "Dashboard", navNutrition: "Nutrition", navMealPlan: "Meal Plan",
        navHealth: "Health", navLogout: "Logout", languageLabel: "Language",
        todayOverview: "Today's Overview 👋", nutritionReport: "Nutrition Report", todaySummary: "Today's Summary",

        welcomeTitle: "Greetings 👋",
        welcomeText: "Track your nutrition and build healthier eating habits.",
        nutritionTitle: "Today's Nutrition", caloriesLabel: "Calories",
        proteinLabel: "Protein", carbsLabel: "Carbs", fatLabel: "Fat",
        addFoodTitle: "Add Food", foodLabel: "Select Food",
        quantityLabel: "Quantity (grams)", mealLabel: "Select Meal",
        addFoodButton: "+ Add Food", customFoodPrompt: "Can't find your food?",
        addNewFood: "+ Add New Food", customFoodTitle: "Add Your Own Food",
        customFoodNameLabel: "Food Name", caloriesPer100: "Calories per 100 g",
        proteinPer100: "Protein per 100 g (g)", carbsPer100: "Carbohydrates per 100 g (g)",
        fatPer100: "Fat per 100 g (g)", saveFood: "Save Food",
        habitsTitle: "Today's Eating Habits", breakfastLabel: "Breakfast",
        lunchLabel: "Lunch", snackLabel: "Snack", dinnerLabel: "Dinner",
        notRecorded: "Not Recorded", mealsRecordedLabel: "Meals recorded today:",
        habitMessage: "Start recording your meals today.", todayMealsTitle: "Today's Meals",
        noBreakfast: "No breakfast recorded.", noLunch: "No lunch recorded.",
        noSnack: "No snack recorded.", noDinner: "No dinner recorded.",
        historyTitle: "Nutrition History", historyDescription: "View your previous nutrition records.",
        historyButton: "View History", recipeTitle: "🍲 Healthy Recipes",
        recipeDescription: "Discover healthy recipes and add your own favourites.",
        recipeButton: "Explore Recipes",
        selectFoodPlaceholder: "-- Select Food --", selectMealPlaceholder: "-- Select Meal --",
        rice: "Rice", dal: "Dal", roti: "Roti", apple: "Apple", banana: "Banana", poha: "Poha", paneer: "Paneer",
        quantityPlaceholder: "Enter quantity", customFoodPlaceholder: "Example: Chicken Biryani",
        caloriesPlaceholder: "Example: 195", proteinPlaceholder: "Example: 6.5", carbsPlaceholder: "Example: 25", fatPlaceholder: "Example: 7",

        healthTitle: "Health Assessment",
        healthSubtitle: "Understand your health using your height and weight.",
        enterDetails: "Enter Your Details", heightLabel: "Height (cm)",
        weightLabel: "Weight (kg)", calculateBMI: "Calculate BMI",
        healthResult: "Your Health Result", bmiLabel: "BMI", healthStatusLabel: "Health Status",
        recommendation: "Recommendation",
        bmiPrompt: "Enter your height and weight to get a recommendation.",
        waterTitle: "💧 Daily Water Intake", waterGoal: "Daily Goal: 8 glasses 💧",
        waterGlasses: "/ 8 glasses", waterStart: "Start tracking your water intake! 💧",
        waterKeep: "Keep going! You're doing great. 💧", waterReached: "Daily water goal reached! 🎉",
        waterExceeded: "Great! You've exceeded your daily goal. 💧",
        activityTitle: "🏃 Daily Activity", activitySubtitle: "Track your activity for today.",
        stepsLabel: "🚶 Steps", exerciseMinutesLabel: "🏃 Exercise Minutes",
        workoutTypeLabel: "🏋️ Workout Type", workoutPlaceholder: "-- Select Workout --",
        walking: "Walking", running: "Running", cycling: "Cycling", yoga: "Yoga", gym: "Gym", other: "Other",
        saveActivity: "Save Activity", activitySummary: "Today's Activity",
        stepsResultLabel: "Steps:", exerciseResultLabel: "Exercise:", workoutResultLabel: "Workout:",
        exerciseTimer: "⏱️ Exercise Timer", start: "▶ Start", pause: "⏸ Pause", reset: "🔄 Reset",

        mealPlannerTitle: "🍱 Indian Meal Planner",
        mealPlannerSubtitle: "Create a simple daily meal plan based on your food preference.",
        preferenceLabel: "Food Preference", vegOption: "Vegetarian", nonvegOption: "Non-Vegetarian",
        goalLabel: "Plan Goal", balancedOption: "Balanced", weightOption: "Weight Management", proteinOption: "Higher Protein",
        generatePlan: "Generate Meal Plan", savedPlan: "Your Meal Plan",
        breakfastMeal: "Breakfast", lunchMeal: "Lunch", snackMeal: "Evening Snack", dinnerMeal: "Dinner",
        all: "All", vegetarian: "Vegetarian", nonVegetarian: "Non-Vegetarian",
        recipesTitle: "🍳 Healthy Recipes", vegetableSalad: "🥗 Vegetable Salad",
        dalRecipe: "🥣 Healthy Dal", khichdiRecipe: "🍲 Vegetable Khichdi",
        viewRecipe: "View Recipe", tipsTitle: "💡 Healthy Eating Tips",
        tip1: "Drink enough water throughout the day.", tip2: "Include fruits and vegetables in your meals.",
        tip3: "Choose whole grains whenever possible.", tip4: "Eat meals at regular times.",
        tip5: "Limit highly processed and sugary foods.", profileTitle: "👤 User Profile",
        nameLabel: "Name:", ageLabel: "Age:", foodPreferenceLabel: "Food Preference:",
        editProfile: "✏️ Edit Profile"
    },

    hi: {
        navDashboard: "डैशबोर्ड", navNutrition: "पोषण", navMealPlan: "भोजन योजना",
        navHealth: "स्वास्थ्य", navLogout: "लॉगआउट", languageLabel: "भाषा",
        todayOverview: "आज का अवलोकन 👋", nutritionReport: "पोषण रिपोर्ट", todaySummary: "आज का सारांश",
        welcomeTitle: "नमस्ते 👋", welcomeText: "अपने पोषण को ट्रैक करें और स्वस्थ खाने की आदतें बनाएं।",
        nutritionTitle: "आज का पोषण", caloriesLabel: "कैलोरी", proteinLabel: "प्रोटीन",
        carbsLabel: "कार्बोहाइड्रेट", fatLabel: "वसा", addFoodTitle: "भोजन जोड़ें",
        foodLabel: "खाना चुनें", quantityLabel: "मात्रा (ग्राम)", mealLabel: "भोजन चुनें",
        addFoodButton: "+ भोजन जोड़ें", customFoodPrompt: "अपना खाना नहीं मिल रहा?",
        addNewFood: "+ नया खाना जोड़ें", customFoodTitle: "अपना खाना जोड़ें",
        customFoodNameLabel: "खाने का नाम", caloriesPer100: "प्रति 100 ग्राम कैलोरी",
        proteinPer100: "प्रति 100 ग्राम प्रोटीन (ग्राम)", carbsPer100: "प्रति 100 ग्राम कार्बोहाइड्रेट (ग्राम)",
        fatPer100: "प्रति 100 ग्राम वसा (ग्राम)", saveFood: "खाना सेव करें",
        habitsTitle: "आज की खाने की आदतें", breakfastLabel: "नाश्ता", lunchLabel: "दोपहर का भोजन",
        snackLabel: "स्नैक", dinnerLabel: "रात का भोजन", notRecorded: "दर्ज नहीं किया गया",
        mealsRecordedLabel: "आज दर्ज किए गए भोजन:", habitMessage: "आज अपने भोजन की रिकॉर्डिंग शुरू करें।",
        todayMealsTitle: "आज के भोजन", noBreakfast: "नाश्ता दर्ज नहीं किया गया।",
        noLunch: "दोपहर का भोजन दर्ज नहीं किया गया।", noSnack: "स्नैक दर्ज नहीं किया गया।",
        noDinner: "रात का भोजन दर्ज नहीं किया गया।", historyTitle: "पोषण इतिहास",
        historyDescription: "अपने पिछले पोषण रिकॉर्ड देखें।", historyButton: "इतिहास देखें",
        recipeTitle: "🍲 स्वस्थ रेसिपी", recipeDescription: "स्वस्थ रेसिपी देखें और अपनी पसंदीदा रेसिपी जोड़ें।",
        recipeButton: "रेसिपी देखें",
        selectFoodPlaceholder: "-- खाना चुनें --", selectMealPlaceholder: "-- भोजन चुनें --",
        rice: "चावल", dal: "दाल", roti: "रोटी", apple: "सेब", banana: "केला", poha: "पोहा", paneer: "पनीर",
        quantityPlaceholder: "मात्रा दर्ज करें", customFoodPlaceholder: "उदाहरण: चिकन बिरयानी",
        caloriesPlaceholder: "उदाहरण: 195", proteinPlaceholder: "उदाहरण: 6.5", carbsPlaceholder: "उदाहरण: 25", fatPlaceholder: "उदाहरण: 7",
        healthTitle: "स्वास्थ्य आकलन", healthSubtitle: "अपनी लंबाई और वजन का उपयोग करके अपने स्वास्थ्य को समझें।",
        enterDetails: "अपनी जानकारी दर्ज करें", heightLabel: "लंबाई (सेमी)", weightLabel: "वजन (किग्रा)",
        calculateBMI: "BMI की गणना करें", healthResult: "आपका स्वास्थ्य परिणाम", bmiLabel: "BMI",
        healthStatusLabel: "स्वास्थ्य स्थिति", recommendation: "सुझाव",
        bmiPrompt: "सुझाव पाने के लिए अपनी लंबाई और वजन दर्ज करें।",
        waterTitle: "💧 दैनिक पानी का सेवन", waterGoal: "दैनिक लक्ष्य: 8 गिलास 💧", waterGlasses: "/ 8 गिलास",
        waterStart: "पानी पीना ट्रैक करना शुरू करें! 💧", waterKeep: "जारी रखें! आप अच्छा कर रहे हैं। 💧",
        waterReached: "दैनिक पानी का लक्ष्य पूरा हुआ! 🎉", waterExceeded: "बहुत बढ़िया! आपने दैनिक लक्ष्य पार कर लिया है। 💧",
        activityTitle: "🏃 दैनिक गतिविधि", activitySubtitle: "आज की गतिविधि ट्रैक करें।", stepsLabel: "🚶 कदम",
        exerciseMinutesLabel: "🏃 व्यायाम के मिनट", workoutTypeLabel: "🏋️ वर्कआउट प्रकार",
        workoutPlaceholder: "-- वर्कआउट चुनें --", walking: "चलना", running: "दौड़ना", cycling: "साइकिल चलाना",
        yoga: "योग", gym: "जिम", other: "अन्य", saveActivity: "गतिविधि सेव करें",
        activitySummary: "आज की गतिविधि", stepsResultLabel: "कदम:", exerciseResultLabel: "व्यायाम:",
        workoutResultLabel: "वर्कआउट:", exerciseTimer: "⏱️ व्यायाम टाइमर", start: "▶ शुरू", pause: "⏸ रोकें", reset: "🔄 रीसेट",
        mealPlannerTitle: "🍱 भारतीय भोजन योजनाकार", mealPlannerSubtitle: "अपनी भोजन पसंद के आधार पर दैनिक भोजन योजना बनाएं।",
        preferenceLabel: "भोजन पसंद", vegOption: "शाकाहारी", nonvegOption: "मांसाहारी",
        goalLabel: "योजना का लक्ष्य", balancedOption: "संतुलित", weightOption: "वजन प्रबंधन", proteinOption: "अधिक प्रोटीन",
        generatePlan: "भोजन योजना बनाएं", savedPlan: "आपकी भोजन योजना", breakfastMeal: "नाश्ता",
        lunchMeal: "दोपहर का भोजन", snackMeal: "शाम का स्नैक", dinnerMeal: "रात का भोजन",
        all: "सभी", vegetarian: "शाकाहारी", nonVegetarian: "मांसाहारी",
        recipesTitle: "🍳 स्वस्थ रेसिपी", vegetableSalad: "🥗 सब्ज़ी सलाद", dalRecipe: "🥣 पौष्टिक दाल",
        khichdiRecipe: "🍲 सब्ज़ी खिचड़ी", viewRecipe: "रेसिपी देखें", tipsTitle: "💡 स्वस्थ खाने के सुझाव",
        tip1: "दिनभर पर्याप्त पानी पिएं।", tip2: "अपने भोजन में फल और सब्ज़ियां शामिल करें।",
        tip3: "जहां संभव हो साबुत अनाज चुनें।", tip4: "नियमित समय पर भोजन करें।",
        tip5: "बहुत अधिक प्रोसेस्ड और मीठे खाद्य पदार्थ सीमित करें।", profileTitle: "👤 उपयोगकर्ता प्रोफ़ाइल",
        nameLabel: "नाम:", ageLabel: "उम्र:", foodPreferenceLabel: "भोजन पसंद:", editProfile: "✏️ प्रोफ़ाइल संपादित करें"
    },

    mr: {
        navDashboard: "डॅशबोर्ड", navNutrition: "पोषण", navMealPlan: "आहार योजना",
        navHealth: "आरोग्य", navLogout: "लॉगआउट", languageLabel: "भाषा",
        todayOverview: "आजचा आढावा 👋", nutritionReport: "पोषण अहवाल", todaySummary: "आजचा सारांश",
        welcomeTitle: "नमस्कार 👋", welcomeText: "तुमचे पोषण ट्रॅक करा आणि निरोगी खाण्याच्या सवयी तयार करा.",
        nutritionTitle: "आजचे पोषण", caloriesLabel: "कॅलरी", proteinLabel: "प्रथिने",
        carbsLabel: "कार्बोहायड्रेट", fatLabel: "चरबी", addFoodTitle: "अन्न जोडा",
        foodLabel: "अन्न निवडा", quantityLabel: "प्रमाण (ग्रॅम)", mealLabel: "जेवण निवडा",
        addFoodButton: "+ अन्न जोडा", customFoodPrompt: "तुमचे अन्न सापडत नाही?",
        addNewFood: "+ नवीन अन्न जोडा", customFoodTitle: "तुमचे अन्न जोडा",
        customFoodNameLabel: "अन्नाचे नाव", caloriesPer100: "प्रति 100 ग्रॅम कॅलरी",
        proteinPer100: "प्रति 100 ग्रॅम प्रथिने (ग्रॅम)", carbsPer100: "प्रति 100 ग्रॅम कार्बोहायड्रेट (ग्रॅम)",
        fatPer100: "प्रति 100 ग्रॅम चरबी (ग्रॅम)", saveFood: "अन्न सेव्ह करा",
        habitsTitle: "आजच्या खाण्याच्या सवयी", breakfastLabel: "नाश्ता", lunchLabel: "दुपारचे जेवण",
        snackLabel: "स्नॅक", dinnerLabel: "रात्रीचे जेवण", notRecorded: "नोंद केलेली नाही",
        mealsRecordedLabel: "आज नोंदवलेली जेवणे:", habitMessage: "आज तुमच्या जेवणाची नोंद सुरू करा.",
        todayMealsTitle: "आजचे जेवण", noBreakfast: "नाश्त्याची नोंद नाही.",
        noLunch: "दुपारच्या जेवणाची नोंद नाही.", noSnack: "स्नॅकची नोंद नाही.",
        noDinner: "रात्रीच्या जेवणाची नोंद नाही.", historyTitle: "पोषण इतिहास",
        historyDescription: "तुमच्या मागील पोषण नोंदी पहा.", historyButton: "इतिहास पहा",
        recipeTitle: "🍲 निरोगी पाककृती", recipeDescription: "निरोगी पाककृती पहा आणि तुमच्या आवडत्या पाककृती जोडा.",
        recipeButton: "पाककृती पहा",
        selectFoodPlaceholder: "-- अन्न निवडा --", selectMealPlaceholder: "-- जेवण निवडा --",
        rice: "भात", dal: "डाळ", roti: "पोळी", apple: "सफरचंद", banana: "केळी", poha: "पोहा", paneer: "पनीर",
        quantityPlaceholder: "प्रमाण भरा", customFoodPlaceholder: "उदा.: चिकन बिर्याणी",
        caloriesPlaceholder: "उदा.: 195", proteinPlaceholder: "उदा.: 6.5", carbsPlaceholder: "उदा.: 25", fatPlaceholder: "उदा.: 7",
        healthTitle: "आरोग्य मूल्यांकन", healthSubtitle: "तुमची उंची आणि वजन वापरून तुमचे आरोग्य समजून घ्या.",
        enterDetails: "तुमची माहिती भरा", heightLabel: "उंची (सेमी)", weightLabel: "वजन (किलो)",
        calculateBMI: "BMI मोजा", healthResult: "तुमचा आरोग्य निकाल", bmiLabel: "BMI",
        healthStatusLabel: "आरोग्य स्थिती", recommendation: "शिफारस",
        bmiPrompt: "शिफारस मिळवण्यासाठी तुमची उंची आणि वजन भरा.",
        waterTitle: "💧 दररोजचे पाणी सेवन", waterGoal: "दैनिक लक्ष्य: 8 ग्लास 💧", waterGlasses: "/ 8 ग्लास",
        waterStart: "पाणी सेवन ट्रॅक करायला सुरुवात करा! 💧", waterKeep: "चालू ठेवा! तुम्ही छान करत आहात. 💧",
        waterReached: "दैनिक पाण्याचे लक्ष्य पूर्ण झाले! 🎉", waterExceeded: "छान! तुम्ही दैनिक लक्ष्य ओलांडले आहे. 💧",
        activityTitle: "🏃 दैनिक हालचाल", activitySubtitle: "आजची हालचाल ट्रॅक करा.", stepsLabel: "🚶 पावले",
        exerciseMinutesLabel: "🏃 व्यायामाची मिनिटे", workoutTypeLabel: "🏋️ व्यायाम प्रकार",
        workoutPlaceholder: "-- व्यायाम निवडा --", walking: "चालणे", running: "धावणे", cycling: "सायकलिंग",
        yoga: "योग", gym: "जिम", other: "इतर", saveActivity: "हालचाल सेव्ह करा",
        activitySummary: "आजची हालचाल", stepsResultLabel: "पावले:", exerciseResultLabel: "व्यायाम:",
        workoutResultLabel: "व्यायाम:", exerciseTimer: "⏱️ व्यायाम टाइमर", start: "▶ सुरू", pause: "⏸ थांबवा", reset: "🔄 रीसेट",
        mealPlannerTitle: "🍱 भारतीय आहार नियोजक", mealPlannerSubtitle: "तुमच्या आहाराच्या पसंतीनुसार दैनिक आहार योजना तयार करा.",
        preferenceLabel: "आहाराची पसंती", vegOption: "शाकाहारी", nonvegOption: "मांसाहारी",
        goalLabel: "योजनेचे उद्दिष्ट", balancedOption: "संतुलित", weightOption: "वजन व्यवस्थापन", proteinOption: "जास्त प्रथिने",
        generatePlan: "आहार योजना तयार करा", savedPlan: "तुमची आहार योजना", breakfastMeal: "नाश्ता",
        lunchMeal: "दुपारचे जेवण", snackMeal: "संध्याकाळचा स्नॅक", dinnerMeal: "रात्रीचे जेवण",
        all: "सर्व", vegetarian: "शाकाहारी", nonVegetarian: "मांसाहारी",
        recipesTitle: "🍳 निरोगी पाककृती", vegetableSalad: "🥗 भाजी कोशिंबीर", dalRecipe: "🥣 पौष्टिक डाळ",
        khichdiRecipe: "🍲 भाजी खिचडी", viewRecipe: "पाककृती पहा", tipsTitle: "💡 निरोगी खाण्याच्या टिप्स",
        tip1: "दिवसभर पुरेसे पाणी प्या.", tip2: "तुमच्या जेवणात फळे आणि भाज्या समाविष्ट करा.",
        tip3: "शक्य असल्यास संपूर्ण धान्य निवडा.", tip4: "नियमित वेळी जेवण करा.",
        tip5: "अति प्रक्रिया केलेले आणि साखरयुक्त पदार्थ मर्यादित करा.", profileTitle: "👤 वापरकर्ता प्रोफाइल",
        nameLabel: "नाव:", ageLabel: "वय:", foodPreferenceLabel: "आहाराची पसंती:", editProfile: "✏️ प्रोफाइल संपादित करा"
    }
};

function changeLanguage(language) {
    const selected = translations[language] || translations.en;

    document.querySelectorAll("[data-i18n]").forEach(function(element) {
        const key = element.getAttribute("data-i18n");
        if (selected[key] !== undefined) element.textContent = selected[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function(element) {
        const key = element.getAttribute("data-i18n-placeholder");
        if (selected[key] !== undefined) element.placeholder = selected[key];
    });

    localStorage.setItem("selectedLanguage", language);
    document.documentElement.lang = language;
}

function initializeLanguage() {
    const saved = localStorage.getItem("selectedLanguage") || "en";
    const select = document.getElementById("languageSelect");
    if (select) select.value = saved;
    changeLanguage(saved);
}

window.translations = translations;
window.changeLanguage = changeLanguage;
window.initializeLanguage = initializeLanguage;

document.addEventListener("DOMContentLoaded", initializeLanguage);
