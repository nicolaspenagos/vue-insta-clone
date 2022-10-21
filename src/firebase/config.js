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
    console.log('NUEVOO - A');

    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        loggedUser = user;
        console.log(user.uid);
        const dbRef = ref(getDatabase());
        console.log('NUEVOO - B');
        get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {

                console.log('NUEVOO - C');

                auth.loggedUser = snapshot.val();
                userStore.setUser(snapshot.val());
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

            console.log()
                /*
                data.forEach((u) => {
                    console.log(u.val());
                });*/
                //userStore.setUsers(data);
        });









    } else {
        authStore.user = null;
        auth.loggedUser = null;
        userStore.setUser(null);
    }
});



export { auth }