import userApi from "../../api/userApi";
import {router} from "../../main.js"


const state = {user: {}, token: ""};
const getters = {};

let token = localStorage.getItem("token")
if(token) {
    state.token = token
}

const actions = {
    async signIn({commit, state},{email, password}){
        let response = await userApi.postSignIn({email, password});
        if(response===null) return false;
        commit('addTokenMutation', response);
        if (response.token) {
            router.push("/")
        }
        return true;
    },

    async signUp({commit, state},{email, password}){
        let response = await userApi.postSignUp({email, password});
        if(response===null) return false;
        router.push("/login")
        return true;
    },

    async restoreToken({commit, state},token){

        commit("restoreToken", token);
    },

    async restoreUser({commit, state},user){

        commit("restoreUser", user);
    },
};

const mutations = {
    addTokenMutation(state, credentials){
        state.user = credentials.user
        state.token = credentials.token

        localStorage.setItem("token", state.token)
        localStorage.setItem("user", JSON.stringify(state.user))

    },
    restoreToken(state, token){
        state.token = token
    },

    restoreUser(state, user){
        state.user = user
    },
 };

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};