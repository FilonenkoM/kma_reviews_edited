import baseApi from "./apiUrl";
import Vue from "vue";
import VueResource from 'vue-resource';
import Vuex from "vuex";
import router from "../main"

Vue.use(VueResource);

export default {
    
    computed: Vuex.mapState({
        token: state => {
            return state.auth.token
        },
    }),
    async addFaculty(faculty){
        try {
            let res = await Vue.http.post(baseApi.baseUrl + '/faculty?faculty=' + faculty);
            return res.body;
        }catch(e){
            console.log(e);
            return null;
        }
    },

    async getAllStudents(token) {
        let res = await Vue.http.get(baseApi.baseUrl + '/user/student/all', {
            headers: {
                "Authorization": token
            }
        })

        return res.body
    },

    async deleteFaculty(facultyId){
        try {
            let res = await Vue.http.delete(baseApi.baseUrl + '/faculty?faculty_id='+facultyId);
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    },

    async addTeacher(data, token){
        try {

            let res = await Vue.http.post(baseApi.baseUrl + '/teacher', data, {
                headers: {
                    "Authorization": token
                }
            });

            let faculty = await Vue.http.get(baseApi.baseUrl+"/faculty/all");
            let name = '';
            faculty.body.forEach(a=> {
                if(a.id == res.body.facultyId)
                    name = a.name;
            });

            res.body.facultyName = name;

            return res.body;
        }catch(e){
            
            console.log(e);
            return null;
        }
    },
    async deleteTeacher(teacher_id, token){
        try {
            let res = await Vue.http.delete(baseApi.baseUrl + '/teacher?teacher_id='+teacher_id, null, {
                headers: {
                    "Authorization": token
                }
            });
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    },
    async updateTeacher(data){
        try {
            let res = await Vue.http.put(baseApi.baseUrl + '/teacher', data);
            return res.body;
        }catch(e){
            console.log(e);
            return null;
        }
    },

    async deleteReview(reviewId, token){
        try {
            let res = await Vue.http.delete(baseApi.baseUrl + '/review?review_id='+reviewId, null, {
                headers: {
                    "Authorization": token
                }
            });
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    },
    async deleteAllReview(){
        try {
            let res = await Vue.http.delete(baseApi.baseUrl + '/review/all');
            return true;
        }catch(e){
            console.log(e);
            return false;
        }
    },

    async blockUser(student_id, token) {
        console.log(token)
        let res = await Vue.http.post(baseApi.baseUrl + '/user/student/block', null, {
            params: {
                "student_id": student_id
            },
            headers: {
                "Authorization": token
            }
        })

        return res.body
    },
}