import {createRouter, createWebHistory} from 'vue-router'
import ButtonUiView from "@/views/ButtonUiView.vue";
import LoadBallView from "@/views/LoadBallView.vue";
import ContextmenuView from "@/views/ContextmenuView.vue";
import MouseAnimationView from "@/views/MouseAnimationView.vue";
import linshiView from "@/views/linshiView.vue";
import MacNavigationView from "@/views/MacNavigationView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '',
            redirect: '/button',
        },
        {
            path: '/button',
            component: ButtonUiView,
        },
        {
            path: '/load',
            component: LoadBallView
        },
        {
            path: '/contextmenu',
            component: ContextmenuView
        },
        {
            path: '/mouse',
            component: MouseAnimationView
        },
        {
            path: '/lin',
            component: linshiView
        },
        {
            path: '/mac',
            component: MacNavigationView
        }
    ]
})

export default router
