import baseApi from "./apiUrl";
import faculty from "../store/modules/faculty";
import teacher from "../store/modules/teacher";

import Vue from "vue";
import VueResource from 'vue-resource';
Vue.use(VueResource);

export default {
  async getPagedReviews(page){
    try {
      let res = await Vue.http.get(baseApi.baseUrl+'/review/all');
      let response = res.body;
      let resT = await Vue.http.get(baseApi.baseUrl+'/teacher/all');
      let teacher = resT.body;
      for (let r of response) {
        r.teacher = teacher.find(x=>x.id===r.teacherId);
      }
      return response;
    } catch(error){
      console.log(error);
    }
  },

  async getPagedReviewsByTeacher(page, teacherId){
    try {
      let res =  await Vue.http.get(baseApi.baseUrl+'/review/all?teacher_id='+teacherId);
      let response = res.body;
      let resT = await Vue.http.get(baseApi.baseUrl+'/teacher/all');
      let teacher = resT.body;
      for (let r of response) {
        r.teacher = teacher.find(x=>x.id===r.teacherId);
      }
      return response;
    } catch (e) {
      console.log(e);
    }
  },
    getPagedReviewsByFaculty: (page, facultyId)=>
        Vue.http.get(baseApi.getReviews, {params: {page:page, faculty_id:facultyId}}),

    async getListOfAllTeacher(){
        console.log("IN TEACHER")
        let faculty = (await this.getListOfAllFaculty()).body;
        console.log(faculty);
        console.log('Array');
        let res=[];
        for(let l = 0; l<faculty.length; l++){
            try {
                let response = await Vue.http.get(baseApi.getAllTeacher + '?faculty_id=' + faculty[l].id);
                let body = response.body;
                body.forEach(t => t.facultyName = faculty[l].name);
                res = res.concat(body);
            }catch(error){
                console.log(error);
            }

        }
        return res;
    },

    async getListOfAllFaculty(){
        let res = await Vue.http.get(baseApi.getAllFaculty);
        return res;
    },

    async postNewReview(message, token) {
      //  let options = { emulateJSON: true };
        message.sendTime = new Date();
        let res = await Vue.http.post(baseApi.postReview,  message /*options*/, {
            headers: {
                "Authorization": token
            }
        });
        let teacher = await Vue.http.get(baseApi.baseUrl+'/teacher?teacher_id='+message.teacherId);
        let result = res.body;
        result.teacher = teacher.body;
        return result;
    },

    async postSignIn(credentials) {
        let res = await Vue.http.post(baseApi.signIn, null, {
            params: credentials
        })
        if(res.body.token) {
            return res.body
        } else {
            alert("Email or password is incorrect")
        }
    },

    async postSignUp(credentials) {
        let res = await Vue.http.post(baseApi.signUp, null, {
            params: credentials
        })
        alert("Registration completed successfully")
    }
}
