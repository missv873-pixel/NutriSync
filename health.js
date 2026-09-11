/* ==========================================
   NUTRISYNC - HEALTH ASSESSMENT
========================================== */


/* ==========================================
   HEALTH STATUS TRANSLATION
========================================== */

function getHealthTranslation(status) {

    const lang =
        localStorage.getItem("selectedLanguage") || "en";


    const map = {

        en: {
            "Underweight": "Underweight",
            "Normal Weight": "Normal Weight",
            "Overweight": "Overweight",
            "Obesity": "Obesity"
        },

        hi: {
            "Underweight": "कम वजन",
            "Normal Weight": "सामान्य वजन",
            "Overweight": "अधिक वजन",
            "Obesity": "मोटापा"
        },

        mr: {
            "Underweight": "कमी वजन",
            "Normal Weight": "सामान्य वजन",
            "Overweight": "जास्त वजन",
            "Obesity": "लठ्ठपणा"
        }

    };


    return (
        map[lang] &&
        map[lang][status]
    ) || status;

}


/* ==========================================
   SAVE HEALTH DATA
========================================== */

function saveHealthData(
    height,
    weight,
    bmi,
    status,
    recommendation
) {

    const healthData = {

        height: height,

        weight: weight,

        bmi: bmi,

        status: status,

        recommendation: recommendation,

        updatedAt: new Date().toISOString()

    };


    localStorage.setItem(
        "nutrisyncHealth",
        JSON.stringify(healthData)
    );

}


/* ==========================================
   CALCULATE BMI
========================================== */

function calculateBMI() {

    const height =
        Number(
            document
                .getElementById("height")
                .value
        );


    const weight =
        Number(
            document
                .getElementById("weight")
                .value
        );


    const bmiResult =
        document.getElementById("bmiResult");


    const healthStatus =
        document.getElementById("healthStatus");


    const recommendation =
        document.getElementById("recommendationText");


    /* ======================================
       VALIDATION
    ====================================== */

    if (
        height <= 0 ||
        weight <= 0 ||
        Number.isNaN(height) ||
        Number.isNaN(weight)
    ) {

        alert(
            "Please enter a valid height and weight."
        );

        return;

    }


    /* ======================================
       BMI CALCULATION
    ====================================== */

    const heightInMeters =
        height / 100;


    const bmi =
        weight /
        (heightInMeters * heightInMeters);


    const roundedBMI =
        bmi.toFixed(1);


    /* ======================================
       DETERMINE HEALTH STATUS
    ====================================== */

    let status = "";

    let recommendationText = "";


    if (bmi < 18.5) {

        status =
            getHealthTranslation("Underweight");


        recommendationText =
            "Consider a balanced diet with adequate calories and protein. If you have concerns about your weight, consider speaking with a healthcare professional.";

    }

    else if (bmi < 25) {

        status =
            getHealthTranslation("Normal Weight");


        recommendationText =
            "Maintain your healthy lifestyle with a balanced diet, regular physical activity and adequate hydration.";

    }

    else if (bmi < 30) {

        status =
            getHealthTranslation("Overweight");


        recommendationText =
            "Focus on balanced meals, portion control and regular physical activity. Consider speaking with a healthcare professional for personalized advice.";

    }

    else {

        status =
            getHealthTranslation("Obesity");


        recommendationText =
            "Focus on healthy eating habits and regular physical activity. Consider consulting a healthcare professional for personalized guidance.";

    }


    /* ======================================
       DISPLAY RESULT
    ====================================== */

    bmiResult.textContent =
        roundedBMI;


    healthStatus.textContent =
        status;


    recommendation.textContent =
        recommendationText;


    /* ======================================
       SAVE FOR DASHBOARD
    ====================================== */

    saveHealthData(
        height,
        weight,
        roundedBMI,
        status,
        recommendationText
    );

}


/* ==========================================
   WATER TRACKER
========================================== */

let waterCount =
    parseInt(
        localStorage.getItem("waterCount")
    ) || 0;


function updateWaterTracker() {

    const countElement =
        document.getElementById("waterCount");


    const progressElement =
        document.getElementById("waterProgress");


    const messageElement =
        document.getElementById("waterMessage");


    if (!countElement) return;


    countElement.textContent =
        waterCount;


    const percentage =
        Math.min(
            (waterCount / 8) * 100,
            100
        );


    if (progressElement) {

        progressElement.style.width =
            percentage + "%";

    }


    if (messageElement) {

        if (waterCount === 0) {

            messageElement.textContent =
                "Start tracking your water intake! 💧";

        }

        else if (waterCount < 8) {

            messageElement.textContent =
                "Keep going! You're doing great. 💧";

        }

        else if (waterCount === 8) {

            messageElement.textContent =
                "Daily water goal reached! 🎉";

        }

        else {

            messageElement.textContent =
                "Great! You've exceeded your daily goal. 💧";

        }

    }


    localStorage.setItem(
        "waterCount",
        waterCount
    );

}


function addWater() {

    waterCount++;

    updateWaterTracker();

}


function removeWater() {

    if (waterCount > 0) {

        waterCount--;

        updateWaterTracker();

    }

}


updateWaterTracker();


/* ==========================================
   DAILY ACTIVITY TRACKER
========================================== */

function saveActivity() {

    const steps =
        Number(
            document.getElementById("steps").value
        ) || 0;


    const exerciseMinutes =
        Number(
            document.getElementById("exerciseMinutes").value
        ) || 0;


    const workoutType =
        document.getElementById("workoutType").value;


    const activity = {

        steps: steps,

        exerciseMinutes: exerciseMinutes,

        workoutType:
            workoutType || "Not recorded"

    };


    localStorage.setItem(
        "nutrisyncActivity",
        JSON.stringify(activity)
    );


    displayActivity();


    alert(
        "Activity saved successfully! 🏃"
    );

}


function displayActivity() {

    const savedActivity =
        localStorage.getItem(
            "nutrisyncActivity"
        );


    if (!savedActivity) {
        return;
    }


    const activity =
        JSON.parse(savedActivity);


    const stepsResult =
        document.getElementById(
            "stepsResult"
        );


    const exerciseResult =
        document.getElementById(
            "exerciseResult"
        );


    const workoutResult =
        document.getElementById(
            "workoutResult"
        );


    if (stepsResult) {

        stepsResult.textContent =
            activity.steps || 0;

    }


    if (exerciseResult) {

        exerciseResult.textContent =
            activity.exerciseMinutes || 0;

    }


    if (workoutResult) {

        workoutResult.textContent =
            activity.workoutType ||
            "Not recorded";

    }

}


displayActivity();


/* ==========================================
   EXERCISE TIMER
========================================== */

let timerSeconds = 0;

let timerInterval = null;


function startTimer() {

    if (timerInterval !== null) {
        return;
    }


    timerInterval =
        setInterval(
            function() {

                timerSeconds++;

                updateTimerDisplay();

            },
            1000
        );

}


function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    updateExerciseMinutes();

}


function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timerSeconds = 0;


    updateTimerDisplay();


    const exerciseInput =
        document.getElementById(
            "exerciseMinutes"
        );


    if (exerciseInput) {

        exerciseInput.value = 0;

    }

}


function updateTimerDisplay() {

    const minutes =
        Math.floor(
            timerSeconds / 60
        );


    const seconds =
        timerSeconds % 60;


    const timerDisplay =
        document.getElementById(
            "timerDisplay"
        );


    if (timerDisplay) {

        timerDisplay.textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

    }


    updateExerciseMinutes();

}


function updateExerciseMinutes() {

    const minutes =
        Math.floor(
            timerSeconds / 60
        );


    const exerciseInput =
        document.getElementById(
            "exerciseMinutes"
        );


    if (exerciseInput) {

        exerciseInput.value =
            minutes;

    }

}
