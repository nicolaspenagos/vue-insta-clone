import { defineStore } from "pinia";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { getDatabase, ref as ref_db, set } from "firebase/database";
import { getStorage, ref as ref_st, uploadBytes, getDownloadURL } from "firebase/storage";

import router from "@/router";


const storage = getStorage();




export const useAuthenticationStore = defineStore("authentication", {
    state: () => ({
        user: null,
        userLogged: false,
        currentUser: null
    }),
    actions: {
        signIn(email, password) {


            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        },
        async newUser(emailInput, passwordInput, usernameInput) {



            return createUserWithEmailAndPassword(auth, emailInput, passwordInput, usernameInput)
                .then((userCredential) => {

                    this.user = { email: emailInput, username: usernameInput, uid: userCredential.user.uid, followers: 0, following: 0, posts: [] };
                    return "OK";


                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    return errorMessage;
                });
        },

        logOut() {


            signOut(auth).then(() => {

            }).catch((error) => {
                alert(error);
            });
        },
        async addUserImage(image) {




            const storage = getStorage();
            const fileRef = ref_st(storage, 'images/' + this.user.uid);


            if (image == "") {
                this.user = {...this.user, url: "NoImage" }
                return this.addUser();

            } else {
                return uploadBytes(fileRef, image).then((snapshot) => {

                    return getDownloadURL(ref_st(storage, 'images/' + this.user.uid)).then((url) => {

                        this.user = {...this.user, url: url }
                        return this.addUser();

                    });


                });

            }








        },
        addUser() {



            const db = getDatabase();




            return set(ref_db(db, 'users/' + this.user.uid), this.user).then(() => {
                this.currentUser = this.user;

                return this.currentUser;
            });

        },

        goToHome() {
            router.replace('/home');
        },

        goToLogin() {
            router.replace('/');
        },
        deleteAccount() {

            const userToRemove = auth.currentUser;

            deleteUser(userToRemove).then(() => {


            }).catch((error) => {

            });
        },
        recoverAccount(email) {

            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Password reset email sent!');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });

        }

    },
});