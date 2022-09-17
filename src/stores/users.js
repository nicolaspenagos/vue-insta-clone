import { defineStore } from "pinia";
import { toHandlers } from "vue";
///// OPTIONS STORE
export const useUsersStore = defineStore("users", {
    state: () => ({
        users: [


        ],
        localStorageUsers: [],
        currentUser: null
    }),
    getters: {
        getUsers: (state) => [...state.users],
        getCurrentUser: (state) => state.currentUser
    },
    actions: {

        loadUsers() {
            this.users = JSON.parse(localStorage.getItem('users'));
        },
        getUserByEmail(email) {

            if (this.users == null) {
                this.users = [];
                return null;
            }

            const filteredUsers = this.users.filter((user) => email === user.email);
            return filteredUsers ? {...filteredUsers[0] } : null
        },
        login(email, password) {
            let user = this.getUserByEmail(email);

            if (user != null && user.password == password) {
                this.currentUser = user;
            }
        },
        signup(email, password, username) {

            let newUser = null;
            let user = this.getUserByEmail(username);

            if (user == null || typeof(user.email) == "undefined") {

                newUser = { "username": username, "email": email, "password": password };
                this.users.push(newUser);
                localStorage.setItem('users', JSON.stringify(this.users));
                this.currentUser = newUser;

            }



        },
        getUserByUsername(username) {

            if (this.users == null) {
                this.users = [];
                return null;
            }

            const filteredUsers = this.users.filter((user) => username === user.username);
            return filteredUsers ? {...filteredUsers[0] } : null
        }

    },
});