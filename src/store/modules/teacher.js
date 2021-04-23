import userApi from "../../api/userApi";
import adminApi from "../../api/adminApi";

const state = {teacher: []};
const getters = {
    allTeachersOption(state){
        let res = state.teacher.reduce((acc, x) => [...acc,{text: x.name, value: x.id}] , [{text: 'Оберіть викладача', value:null}])
        console.log("Getter:");
        console.log(res);
        return res;
    },


};
const actions = {
    async getTeacherList({commit, state}){
        let response = await userApi.getListOfAllTeacher();
        //const data = await response.json();
        commit('getTeacherListMutation', response);
    },
    async deleteTeacherAction({commit,state}, {id, token}){
        let response = await adminApi.deleteTeacher(id, token);
        if(response===false) return false;
        commit('deleteTeacherMutation', id);
        return true;
    },
    async addTeacher({commit, state},{teacher, token}){
        let response = await adminApi.addTeacher(teacher, token);
        if(response===null) return false;
        commit('addTeacherMutation', response);
        return true;
    },
};
const mutations = {
    getTeacherListMutation(state, teachers){
        console.log("In mutation running");
        const  targetTeacher = state.teacher.concat(teachers);
        state.teacher = [];
        let a = {};
        for(let t of targetTeacher) {
            if (!(t.id in a)) {
                state.teacher.push(t);
                a[t.id] = 1
            }
        }
    },
    addTeacherMutation(state, teacher){

        state.teacher.push(teacher);
    },
    deleteTeacherMutation(state, teacher){
        let id = parseInt(teacher);
        let i = state.teacher.findIndex(f => f.id===id);
        state.teacher.splice(i, 1);
    },
};

export default {
    namespaced: 'teachers',
    state,
    getters,
    actions:actions,
    mutations: mutations,
};