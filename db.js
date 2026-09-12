/* ==========================================
   NUTRISYNC - OFFLINE DATABASE
   IndexedDB
========================================== */

const DB_NAME = "NutriSyncDB";
const DB_VERSION = 1;


/* ==========================================
   OPEN DATABASE
========================================== */

function openNutriSyncDB() {

    return new Promise(function (resolve, reject) {

        const request =
            indexedDB.open(DB_NAME, DB_VERSION);


        request.onupgradeneeded = function (event) {

            const db = event.target.result;


            /* ------------------------------
               USERS
            ------------------------------ */

            if (!db.objectStoreNames.contains("users")) {

                db.createObjectStore(
                    "users",
                    {
                        keyPath: "email"
                    }
                );

            }


            /* ------------------------------
               NUTRITION
            ------------------------------ */

            if (!db.objectStoreNames.contains("nutrition")) {

                const store =
                    db.createObjectStore(
                        "nutrition",
                        {
                            keyPath: "id",
                            autoIncrement: true
                        }
                    );

                store.createIndex(
                    "userEmail",
                    "userEmail",
                    {
                        unique: false
                    }
                );

                store.createIndex(
                    "date",
                    "date",
                    {
                        unique: false
                    }
                );

            }


            /* ------------------------------
               HEALTH
            ------------------------------ */

            if (!db.objectStoreNames.contains("health")) {

                db.createObjectStore(
                    "health",
                    {
                        keyPath: "userEmail"
                    }
                );

            }


            /* ------------------------------
               WATER
            ------------------------------ */

            if (!db.objectStoreNames.contains("water")) {

                db.createObjectStore(
                    "water",
                    {
                        keyPath: "userEmail"
                    }
                );

            }


            /* ------------------------------
               ACTIVITY
            ------------------------------ */

            if (!db.objectStoreNames.contains("activity")) {

                db.createObjectStore(
                    "activity",
                    {
                        keyPath: "userEmail"
                    }
                );

            }


            /* ------------------------------
               MEAL PLANS
            ------------------------------ */

            if (!db.objectStoreNames.contains("mealPlans")) {

                db.createObjectStore(
                    "mealPlans",
                    {
                        keyPath: "userEmail"
                    }
                );

            }


            /* ------------------------------
               PROFILES
            ------------------------------ */

            if (!db.objectStoreNames.contains("profiles")) {

                db.createObjectStore(
                    "profiles",
                    {
                        keyPath: "userEmail"
                    }
                );

            }

        };


        request.onsuccess = function () {

            resolve(request.result);

        };


        request.onerror = function () {

            reject(request.error);

        };

    });

}


/* ==========================================
   GET CURRENT USER
========================================== */

function getNutriSyncCurrentUser() {

    try {

        const data =
            JSON.parse(
                localStorage.getItem(
                    "nutrisyncCurrentUser"
                ) || "null"
            );

        return data ? data.email : null;

    } catch (error) {

        return null;

    }

}


/* ==========================================
   ADD / UPDATE DATA
========================================== */

function dbPut(storeName, data) {

    return openNutriSyncDB().then(function (db) {

        return new Promise(function (resolve, reject) {

            const transaction =
                db.transaction(
                    storeName,
                    "readwrite"
                );

            const store =
                transaction.objectStore(storeName);

            const request =
                store.put(data);


            request.onsuccess = function () {

                resolve(request.result);

            };


            request.onerror = function () {

                reject(request.error);

            };

        });

    });

}


/* ==========================================
   GET DATA BY USER
========================================== */

function dbGet(storeName, userEmail) {

    return openNutriSyncDB().then(function (db) {

        return new Promise(function (resolve, reject) {

            const transaction =
                db.transaction(
                    storeName,
                    "readonly"
                );

            const store =
                transaction.objectStore(storeName);

            const request =
                store.get(userEmail);


            request.onsuccess = function () {

                resolve(request.result || null);

            };


            request.onerror = function () {

                reject(request.error);

            };

        });

    });

}


/* ==========================================
   GET ALL NUTRITION RECORDS
========================================== */

function dbGetNutrition(userEmail) {

    return openNutriSyncDB().then(function (db) {

        return new Promise(function (resolve, reject) {

            const transaction =
                db.transaction(
                    "nutrition",
                    "readonly"
                );

            const store =
                transaction.objectStore("nutrition");

            const index =
                store.index("userEmail");

            const request =
                index.getAll(userEmail);


            request.onsuccess = function () {

                resolve(request.result || []);

            };


            request.onerror = function () {

                reject(request.error);

            };

        });

    });

}


/* ==========================================
   DELETE NUTRITION RECORD
========================================== */

function dbDeleteNutrition(id) {

    return openNutriSyncDB().then(function (db) {

        return new Promise(function (resolve, reject) {

            const transaction =
                db.transaction(
                    "nutrition",
                    "readwrite"
                );

            const store =
                transaction.objectStore("nutrition");

            const request =
                store.delete(id);


            request.onsuccess = function () {

                resolve();

            };


            request.onerror = function () {

                reject(request.error);

            };

        });

    });

}


/* ==========================================
   SAVE USER
========================================== */

function dbSaveUser(user) {

    return dbPut(
        "users",
        user
    );

}


/* ==========================================
   SAVE HEALTH
========================================== */

function dbSaveHealth(data) {

    return dbPut(
        "health",
        data
    );

}


/* ==========================================
   SAVE WATER
========================================== */

function dbSaveWater(data) {

    return dbPut(
        "water",
        data
    );

}


/* ==========================================
   SAVE ACTIVITY
========================================== */

function dbSaveActivity(data) {

    return dbPut(
        "activity",
        data
    );

}


/* ==========================================
   SAVE MEAL PLAN
========================================== */

function dbSaveMealPlan(data) {

    return dbPut(
        "mealPlans",
        data
    );

}


/* ==========================================
   SAVE PROFILE
========================================== */

function dbSaveProfile(data) {

    return dbPut(
        "profiles",
        data
    );

}
