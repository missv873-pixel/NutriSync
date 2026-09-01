/* ==========================================
   NUTRISYNC AUTHENTICATION
========================================== */


/* ==========================================
   SHOW LOGIN FORM
========================================== */

function showLogin() {

    document.getElementById("loginForm").style.display =
        "block";

    document.getElementById("registerForm").style.display =
        "none";


    clearMessages();
}


/* ==========================================
   SHOW REGISTER FORM
========================================== */

function showRegister() {

    document.getElementById("loginForm").style.display =
        "none";

    document.getElementById("registerForm").style.display =
        "block";


    clearMessages();
}


/* ==========================================
   CLEAR MESSAGES
========================================== */

function clearMessages() {

    const loginMessage =
        document.getElementById("loginMessage");

    const registerMessage =
        document.getElementById("registerMessage");


    loginMessage.textContent = "";

    registerMessage.textContent = "";


    loginMessage.className =
        "message";

    registerMessage.className =
        "message";
}


/* ==========================================
   DISPLAY MESSAGE
========================================== */

function showMessage(
    element,
    text,
    type
) {

    element.textContent = text;

    element.className =
        "message " + type;
}


/* ==========================================
   EMAIL VALIDATION
========================================== */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


/* ==========================================
   REGISTRATION
========================================== */

function registerUser() {

    const name =
        document
            .getElementById("registerName")
            .value
            .trim();


    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("registerPassword")
            .value;


    const confirmPassword =
        document
            .getElementById("confirmPassword")
            .value;


    const message =
        document.getElementById(
            "registerMessage"
        );


    /* ------------------------------
       EMPTY FIELD VALIDATION
    ------------------------------ */

    if (
        !name ||
        !email ||
        !password ||
        !confirmPassword
    ) {

        showMessage(
            message,
            "Please fill in all fields.",
            "error"
        );

        return;
    }


    /* ------------------------------
       NAME VALIDATION
    ------------------------------ */

    if (name.length < 2) {

        showMessage(
            message,
            "Please enter a valid name.",
            "error"
        );

        return;
    }


    /* ------------------------------
       EMAIL VALIDATION
    ------------------------------ */

    if (!isValidEmail(email)) {

        showMessage(
            message,
            "Please enter a valid email address.",
            "error"
        );

        return;
    }


    /* ------------------------------
       PASSWORD VALIDATION
    ------------------------------ */

    if (password.length < 6) {

        showMessage(
            message,
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    /* ------------------------------
       CONFIRM PASSWORD
    ------------------------------ */

    if (password !== confirmPassword) {

        showMessage(
            message,
            "Passwords do not match.",
            "error"
        );

        return;
    }


    /* ------------------------------
       CHECK EXISTING USER
    ------------------------------ */

    const existingUser =
        JSON.parse(
            localStorage.getItem(
                "nutrisyncUser"
            )
        );


    if (
        existingUser &&
        existingUser.email === email
    ) {

        showMessage(
            message,
            "An account with this email already exists.",
            "error"
        );

        return;
    }


    /* ------------------------------
       CREATE USER
    ------------------------------ */

    const user = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "nutrisyncUser",
        JSON.stringify(user)
    );


    /* ------------------------------
       SUCCESS MESSAGE
    ------------------------------ */

    showMessage(
        message,
        "Registration successful! Redirecting to login...",
        "success"
    );


    /* ------------------------------
       CLEAR REGISTRATION FORM
    ------------------------------ */

    document.getElementById(
        "registerFormElement"
    ).reset();


    /* ------------------------------
       GO TO LOGIN
    ------------------------------ */

    setTimeout(
        function () {

            showLogin();

        },
        1200
    );
}


/* ==========================================
   LOGIN
========================================== */

function loginUser() {

    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim()
            .toLowerCase();


    const password =
        document
            .getElementById("loginPassword")
            .value;

            const rememberMe=
            document
            .getElementById("rememberMe")
            .checked;


    const message =
        document.getElementById(
            "loginMessage"
        );


    /* ------------------------------
       EMPTY FIELD VALIDATION
    ------------------------------ */

    if (!email || !password) {

        showMessage(
            message,
            "Please enter your email and password.",
            "error"
        );

        return;
    }


    /* ------------------------------
       EMAIL VALIDATION
    ------------------------------ */

    if (!isValidEmail(email)) {

        showMessage(
            message,
            "Please enter a valid email address.",
            "error"
        );

        return;
    }


    /* ------------------------------
       GET REGISTERED USER
    ------------------------------ */

    const user =
        JSON.parse(
            localStorage.getItem(
                "nutrisyncUser"
            )
        );


    /* ------------------------------
       NO USER
    ------------------------------ */

    if (!user) {

        showMessage(
            message,
            "No account found. Please register first.",
            "error"
        );

        return;
    }


    /* ------------------------------
       CHECK LOGIN DETAILS
    ------------------------------ */

    if (
        email === user.email &&
        password === user.password
    ) {


        /* --------------------------
           SAVE LOGIN STATUS
        -------------------------- */

        localStorage.setItem(
            "nutrisyncLoggedIn",
            "true"
        );
        if(rememberMe){
            localStorage.setItem(
            "nutrisyncRememberMe",
            "true"
            );
        }else{
            localStorage.removeItem(
            "nutrisyncRememberMe",
            );
        }


        localStorage.setItem(
            "nutrisyncCurrentUser",
            JSON.stringify({
                name: user.name,
                email: user.email
            })
        );


        /* --------------------------
           SUCCESS
        -------------------------- */

        showMessage(
            message,
            "Login successful! Opening NutriSync...",
            "success"
        );


        /* --------------------------
           OPEN MAIN APP
        -------------------------- */

        setTimeout(
            function () {

                window.location.href =
                    "index.html";

            },
            700
        );


    } else {

        showMessage(
            message,
            "Incorrect email or password.",
            "error"
        );

    }
}


/* ==========================================
   LOGOUT
========================================== */

function logoutUser() {

    localStorage.removeItem(
        "nutrisyncLoggedIn"
    );

    localStorage.removeItem(
        "nutrisyncCurrentUser"
    );


    window.location.href =
        "auth.html";
}


/* ==========================================
   CHECK LOGIN STATUS
========================================== */

function checkAuthentication() {

    const loggedIn =
        localStorage.getItem(
            "nutrisyncLoggedIn"
        );


    /*

       If the user is already logged in,
       don't force them to login again.

    */

    if (loggedIn === "true") {

        window.location.href =
            "index.html";
    }
}


/* ==========================================
   FORM SUBMISSION
========================================== */

document
    .getElementById("loginFormElement")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            loginUser();

        }
    );


document
    .getElementById("registerFormElement")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            registerUser();

        }
    );


/* ==========================================
   RUN WHEN PAGE LOADS
========================================== */

checkAuthentication();
