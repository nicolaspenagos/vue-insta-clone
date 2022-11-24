import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthenticationStore } from "../stores/authentication";
import { useUsersStore } from "../stores/users";

import { getDatabase, ref, child, get, onValue } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyBVx9wVcM46xQUWUWZtzX_M51jz2tcHGow",
    authDomain: "instagram-clone-7776a.firebaseapp.com",
    projectId: "instagram-clone-7776a",
    storageBucket: "instagram-clone-7776a.appspot.com",
    messagingSenderId: "1041311366783",
    appId: "1:1041311366783:web:97ccb047845ba2a523894a",
    databaseURL: "https://instagram-clone-7776a-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
let loggedUser = null;

onAuthStateChanged(auth, (user) => {

    const authStore = useAuthenticationStore()
    const userStore = useUsersStore();


    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        loggedUser = user;

        const dbRef = ref(getDatabase());

        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {



                auth.loggedUser = snapshot.val();
                userStore.setUser(snapshot.val());
                userStore.setLoggedUser(snapshot.val());
                authStore.goToHome();

            } else {
                console.log("No data available");
                authStore.goToLogin();
            }
        }).catch((error) => {
            console.error(error);
        });



        const usersRef = ref(database, 'users/');
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.val()) {
                const dbUsers = Object.keys(data);

                let usersToSaveInStore = [];
                let currentToSave = null;
                for (let i = 0; i < dbUsers.length; i++) {
                    let key = dbUsers[i];
                    usersToSaveInStore.push(data[key]);
                    if (key == user.uid) {
                        userStore.setUser(data[key]);
                    }

                }

                userStore.setUsers(usersToSaveInStore);
            } else {
                userStore.setUsers([]);
            }




        });









    } else {
        authStore.user = null;
        auth.loggedUser = null;
        userStore.setUser(null);
        userStore.setLoggedUser(null);
    }
});



export { auth }