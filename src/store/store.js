import Vue from 'vue';
import Vuex from 'vuex';

import reviews from "./modules/reviews";
import users from "./modules/users";
import faculty from "./modules/faculty";
import teacher from "./modules/teacher";
import auth from "./modules/auth"

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        reviews: reviews,
        teachers: teacher,
        faculty: faculty,
        auth: auth,
        users: users
    }
});
