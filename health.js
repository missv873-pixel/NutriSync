/* ==========================================
   NUTRISYNC - HEALTH ASSESSMENT
========================================== */


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
        document.getElementById(
            "bmiResult"
        );


    const healthStatus =
        document.getElementById(
            "healthStatus"
        );


    const recommendation =
        document.getElementById(
            "recommendationText"
        );


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

       Height is converted from cm to m.

       BMI =
       weight / (height × height)
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
            "Underweight";

        recommendationText =
            "Consider a balanced diet with adequate calories and protein. If you have concerns about your weight, consider speaking with a healthcare professional.";

    }

    else if (bmi < 25) {

        status =
            "Normal Weight";

        recommendationText =
            "Maintain your healthy lifestyle with a balanced diet, regular physical activity and adequate hydration.";

    }

    else if (bmi < 30) {

        status =
            "Overweight";

        recommendationText =
            "Focus on balanced meals, portion control and regular physical activity. Consider speaking with a healthcare professional for personalized advice.";

    }

    else {

        status =
            "Obesity";

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

}



/* ==========================================
   WATER TRACKER
========================================== */

let waterCount =
    parseInt(localStorage.getItem("waterCount")) || 0;

function updateWaterTracker() {

    const countElement =
        document.getElementById("waterCount");

    const progressElement =
        document.getElementById("waterProgress");

    const messageElement =
        document.getElementById("waterMessage");

    if (!countElement) return;

    countElement.textContent = waterCount;

    // 8 glasses = 100%
    const percentage =
        Math.min((waterCount / 8) * 100, 100);

    progressElement.style.width =
        percentage + "%";


    if (waterCount === 0) {

        messageElement.textContent =
            "Start tracking your water intake! 💧";

    } else if (waterCount < 8) {

        messageElement.textContent =
            "Keep going! You're doing great. 💧";

    } else if (waterCount === 8) {

        messageElement.textContent =
            "Daily water goal reached! 🎉";

    } else {

        messageElement.textContent =
            "Great! You've exceeded your daily goal. 💧";
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

/* Load saved water intake */

updateWaterTracker();
// ==========================================
// DAILY ACTIVITY TRACKER
// ==========================================

function saveActivity() {

    const steps =
        Number(document.getElementById("steps").value) || 0;

    const exerciseMinutes =
        Number(
            document.getElementById("exerciseMinutes").value
        ) || 0;

    const workoutType =
        document.getElementById("workoutType").value;

    const activity = {

        steps: steps,

        exerciseMinutes: exerciseMinutes,

        workoutType: workoutType || "Not recorded"

    };

    localStorage.setItem(
        "nutrisyncActivity",
        JSON.stringify(activity)
    );

    displayActivity();

    alert("Activity saved successfully! 🏃");
}


function displayActivity() {

    const savedActivity =
        localStorage.getItem("nutrisyncActivity");

    if (!savedActivity) {
        return;
    }

    const activity =
        JSON.parse(savedActivity);

    document.getElementById("stepsResult").textContent =
        activity.steps;

    document.getElementById("exerciseResult").textContent =
        activity.exerciseMinutes;

    document.getElementById("workoutResult").textContent =
        activity.workoutType;

}


// Load saved activity
displayActivity();

// ==========================================
// EXERCISE TIMER
// ==========================================

let timerSeconds = 0;
let timerInterval = null;


function startTimer() {

    if (timerInterval !== null) {
        return;
    }

    timerInterval = setInterval(() => {

        timerSeconds++;

        updateTimerDisplay();

    }, 1000);
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

    document.getElementById("exerciseMinutes").value = 0;
}


function updateTimerDisplay() {

    const minutes =
        Math.floor(timerSeconds / 60);

    const seconds =
        timerSeconds % 60;

    document.getElementById("timerDisplay").textContent =
        String(minutes).padStart(2, "0")
        + ":" +
        String(seconds).padStart(2, "0");

    updateExerciseMinutes();
}


function updateExerciseMinutes() {

    const minutes =
        Math.floor(timerSeconds / 60);

    document.getElementById("exerciseMinutes").value =
        minutes;
}