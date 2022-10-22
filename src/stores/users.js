import { defineStore } from "pinia";
import { getDatabase, set, ref, get } from "firebase/database";
///// OPTIONS STORE
export const useUsersStore = defineStore("users", {
    state: () => ({
        users: [


        ],
        localStorageUsers: [],
        currentUser: null,
        selectedPost: null,
        loggedUser: null
    }),
    getters: {
        getUsers: (state) => [...state.users],
        getCurrentUser: (state) => state.currentUser,
        getSelectedPost: (state) => state.selectedPost,
        getLoggedUser: (state) => state.loggedUser,
    },
    actions: {

        save() {
            const db = getDatabase();

            set(ref(db, 'users/' + this.currentUser.uid), {
                ...this.currentUser
            });

        },
        logout() {
            this.currentUser = null;
        },
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
        signup(email, password, username, userPicture) {

            let newUser = null;
            let user = this.getUserByEmail(username);

            if (user == null || typeof(user.email) == "undefined") {

                newUser = { "username": username, "email": email, "password": password, "followers": 0, "following": 0, "posts": 0, "userPicture": userPicture, "posts": [] };
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
        },
        setPost(post) {
            this.selectedPost = post;


        },
        setUser(user) {

            this.currentUser = user;

        },
        setUsers(u) {
            this.users = u;
        },
        search(username) {
            console.log('searching');
            let founded = false;
            this.users.forEach(u => {
                if (u.username == username) {
                    this.currentUser = u;
                    founded = true;
                }


            });
            if (!founded)
                alert('User not found');


        },
        setLoggedUser(user) {
            this.loggedUser = user;

        }



    },
});