import Vue from 'vue';
import App from "./components/App.vue";
import store from "./store/store.js";
import Vuex from "vuex";
//import {BootstrapVue} from "bootstrap-vue";
import VueRouter from "vue-router";
import ReviewItems from "./components/main-module/ReviewItems.vue";
import BodyDisplay from "./components/main-module/BodyDisplay.vue";
import InformationDisplay from "./components/information-module/InformationDisplay.vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Login from "./components/login-sinup-module/Login.vue";
import LoginDisplay from "./components/login-sinup-module/LoginDisplay.vue";
import SingUp from "./components/login-sinup-module/SingUp.vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import AdminDisplay from "./components/admin-module/AdminDisplay.vue";
import FacultyMenu from "./components/admin-module/FacultyMenu.vue";
import TeacherMenu from "./components/admin-module/TeacherMenu.vue";
import UsersMenu from "./components/admin-module/UsersMenu.vue";

import ReviewMenu from "./components/admin-module/ReviewMenu.vue";

Vue.use(BootstrapVue);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(IconsPlugin);

export const router = new VueRouter( {
    routes: [
        { path: '/', component: BodyDisplay },
        { path: '/teacher/:teacher_id', component: BodyDisplay },
        { path: '/faculty/:faculty_id', component: BodyDisplay },
        { path: '/info', component: InformationDisplay},
        { path: '/login', component: LoginDisplay,
            children:[
                {path: '/', component: Login},
                {path: '/singup', component: SingUp}
            ]},
        {path: '/admin', component: AdminDisplay,
            children:[
                {path: '/admin', component: ReviewMenu},
                {path: '/admin/faculty', component: FacultyMenu},
                {path: '/admin/teacher', component: TeacherMenu},
                {path: '/admin/users', component: UsersMenu},
            ]},
        {path: '/admin/users', component: AdminDisplay},

    ]
});



new Vue({
    store,
    render: h => h(App),
    router: router ,
    beforeCreate() {
      let token = localStorage.getItem("token")
      let user = JSON.parse(localStorage.getItem("user"))
      if(token) {
        this.$store.dispatch("auth/restoreToken", token)
      }
      if(user) {
        this.$store.dispatch("auth/restoreUser", user)
      }
    }
}).$mount('#app');

