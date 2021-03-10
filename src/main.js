import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/index.js'


import App from './App.vue'
import scrollanimation from './directives/scrollanimation'

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
})

const app = createApp(App)

app.directive('scrollanimation', scrollanimation);

app.use(router)

app.mount('#app')

app.config.devtools = true;