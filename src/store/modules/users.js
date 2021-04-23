import adminApi from "../../api/adminApi";

const state = {students: []};
const getters = {};

const actions = {
    async getAllStudents({commit, state}, {token}) {
        let response = await adminApi.getAllStudents(token);
        if(response===null) return false;
        commit('allStudents', response);
        return true;
    },
    async blockUser({commit, state}, {student_id, token}) {
        let response = await adminApi.blockUser(student_id, token);
        if(response===null) return false;
        commit('blockStudent', student_id);
        return true;
    }

};

const mutations = {
    allStudents(state, students){
        state.students = students
    },
    blockStudent(state, students){
        let index = state.students.findIndex(s => s.id == students)
        state.students[index].enabled = false
    }
 };

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};