import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue')
    }
];

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
});

export default router;
