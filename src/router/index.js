import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView/LoginView.vue'
import HomeView from '../views/HomeView/HomeView.vue'
import NotFoundView from '../views/NotFoundView/NotFoundView.vue'


const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'login',
            component: LoginView,

        }, {
            path: '/home',
            name: 'home',
            component: HomeView,
        },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
    ]
})

export default router