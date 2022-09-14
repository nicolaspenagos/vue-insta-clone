import { defineStore } from "pinia";
import { toHandlers } from "vue";
///// OPTIONS STORE
export const useUsersStore = defineStore("users", {
    state: () => ({
        users: [
            { username: "ph_oftheworld", email: "nicolas.penagosm98@gmail.com", password: "1234" },

        ],
        localStorageUsers: [],
        currentUser: null
    }),
    getters: {
        getProducts: (state) => [...state.users],
        getCurrentUser: (state) => state.currentUser
    },
    actions: {
        newProduct(product) {
            this.localStorageProducts.push(product)
            this.products.push(product);
            console.log(localStorage)
            console.log(window.localStorage)
            localStorage.setItem('products', JSON.stringify(this.localStorageProducts))
        },
        loadProducts() {
            this.localStorageProducts = JSON.parse(localStorage.getItem('products'))
            console.log(this.localStorageProducts)
            this.products = this.products.concat([...this.localStorageProducts])
            console.log(this.products)
        },
        getUserByEmail(email) {
            const filteredUsers = this.users.filter((user) => email === user.email);
            return filteredUsers ? {...filteredUsers[0] } : null
        },
        login(email, password) {
            let user = this.getUserByEmail(email);
            if (user != null && user.password == password) {
                this.currentUser = user;
            }
        }
    },
});