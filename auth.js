/* ==========================================
   NUTRISYNC AUTHENTICATION
========================================== */

const API_BASE_URL = "https://nutrisync-3m4h.onrender.com";


/* ==========================================
   SHOW LOGIN FORM
========================================== */

function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
    clearMessages();
}


/* ==========================================
   SHOW REGISTER FORM
========================================== */

function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    clearMessages();
}


/* ==========================================
   CLEAR MESSAGES
========================================== */

function clearMessages() {
    const loginMessage = document.getElementById("loginMessage");
    const registerMessage = document.getElementById("registerMessage");

    loginMessage.textContent = "";
    registerMessage.textContent = "";

    loginMessage.className = "message";
    registerMessage.className = "message";
}


/* ==========================================
   DISPLAY MESSAGE
========================================== */

function showMessage(element, text, type) {
    element.textContent = text;
    element.className = "message " + type;
}


/* ==========================================
   EMAIL VALIDATION
========================================== */

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


/* ==========================================
   REGISTRATION
========================================== */

async function registerUser() {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim().toLowerCase();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("registerMessage");

    if (!name || !email || !password || !confirmPassword) {
        showMessage(message, "Please fill in all fields.", "error");
        return;
    }

    if (name.length < 2) {
        showMessage(message, "Please enter a valid name.", "error");
        return;
    }

    if (!isValidEmail(email)) {
        showMessage(message, "Please enter a valid email address.", "error");
        return;
    }

    if (password.length < 6) {
        showMessage(message, "Password must contain at least 6 characters.", "error");
        return;
    }

    if (password !== confirmPassword) {
        showMessage(message, "Passwords do not match.", "error");
        return;
    }

    showMessage(message, "Creating your account...", "success");

    try {
        const response = await fetch(API_BASE_URL + "/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showMessage(
                message,
                data.message || "Registration failed. Please try again.",
                "error"
            );
            return;
        }

        showMessage(
            message,
            "Registration successful! Redirecting to login...",
            "success"
        );

        document.getElementById("registerFormElement").reset();

        setTimeout(function () {
            showLogin();
        }, 1200);

    } catch (error) {
        console.error("Registration error:", error);
        showMessage(
            message,
            "Unable to connect to NutriSync server. Please try again.",
            "error"
        );
    }
}


/* ==========================================
   LOGIN
========================================== */

async function loginUser() {
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const rememberMe = document.getElementById("rememberMe").checked;
    const message = document.getElementById("loginMessage");

    if (!email || !password) {
        showMessage(
            message,
            "Please enter your email and password.",
            "error"
        );
        return;
    }

    if (!isValidEmail(email)) {
        showMessage(
            message,
            "Please enter a valid email address.",
            "error"
        );
        return;
    }

    showMessage(message, "Checking your account...", "success");

    try {
        const response = await fetch(API_BASE_URL + "/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showMessage(
                message,
                data.message || "Incorrect email or password.",
                "error"
            );
            return;
        }

        localStorage.setItem("nutrisyncLoggedIn", "true");

        if (rememberMe) {
            localStorage.setItem("nutrisyncRememberMe", "true");
        } else {
            localStorage.removeItem("nutrisyncRememberMe");
        }

        localStorage.setItem(
            "nutrisyncCurrentUser",
            JSON.stringify({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email
            })
        );

        showMessage(
            message,
            "Login successful! Opening NutriSync...",
            "success"
        );

        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 700);

    } catch (error) {
        console.error("Login error:", error);
        showMessage(
            message,
            "Unable to connect to NutriSync server. Please try again.",
            "error"
        );
    }
}


/* ==========================================
   LOGOUT
========================================== */

function logoutUser() {
    localStorage.removeItem("nutrisyncLoggedIn");
    localStorage.removeItem("nutrisyncCurrentUser");
    localStorage.removeItem("nutrisyncRememberMe");

    window.location.href = "auth.html";
}


/* ==========================================
   CHECK LOGIN STATUS
========================================== */

function checkAuthentication() {
    const loggedIn = localStorage.getItem("nutrisyncLoggedIn");

    if (loggedIn === "true") {
        window.location.href = "dashboard.html";
    }
}


/* ==========================================
   FORM SUBMISSION
========================================== */

document.getElementById("loginFormElement").addEventListener(
    "submit",
    function (event) {
        event.preventDefault();
        loginUser();
    }
);

const registerFormElement = document.getElementById("registerFormElement");

if (registerFormElement) {
    registerFormElement.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            registerUser();
        }
    );
}


/* ==========================================
   RUN WHEN PAGE LOADS
========================================== */

checkAuthentication();
