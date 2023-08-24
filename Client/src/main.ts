import { createApp } from 'vue'
import App from './components/App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SignUp from "./components/SignUp.vue"
import LogIn from "./components/LogIn.vue"
import Controller from "./Controller.vue"

const router = createRouter({
    history: createWebHistory(),
    routes:[
        { path: '/login', component: LogIn},
        { path: '/signup', component: SignUp},
        { path: '/dashboard', component: App},
        { path: "/", component: App}
    ]
});
const app= createApp(Controller)
app.use(router)
app.mount('#app')


