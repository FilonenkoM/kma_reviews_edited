<template>
    <b-input-group>
        <b-form-select  v-model="selectedTeacher" :options="teacherOptions" id="teachers"/>
<!--        <b-form-select  v-model="selectedFaculty" :options="facultyOptions" id="faculty"/>-->
        <b-input-group-append class="pl-2">
            <b-button variant="outline-light bg-success" @click="getByFilter">Пошук</b-button>
        </b-input-group-append>
    </b-input-group>
</template>

<script>
    import Teachers from "../../store/modules/teacher";
    import Vuex, { mapActions, mapGetters} from 'vuex'
    export default {
        name: "FilterForm",
        computed: Vuex.mapState({
            ...mapGetters['allTeachersOption'],
            ...mapActions['getTeacherList', 'getFacultyList','resetPages'],
            teacherOptions: state=> {
                let ops = state.teachers.teacher;
                let res = ops.reduce((acc, x) => [...acc,{text: x.name, value: x.id}], [{text: 'Оберіть викладача', value:null}]);
                return res.sort((a, b) => -(a.id - b.id));
            },
            facultyOptions: state=>{
                let ops = state.faculty.faculty;
                let res = ops.reduce((acc, x) => [...acc,{text: x.name, value: x.id}] , [{text: 'Оберіть факультет', value:null}]);
                return res.sort((a, b) => -(a.id - b.id));
            }
        }),
        methods:{
            getByFilter(){
                console.log(this.selectedTeacher);
                console.log(this.selectedFaculty);
                this.$store.dispatch("reviews/resetPages");
                this.$store.dispatch("reviews/getReviews", {'teacherId': this.selectedTeacher,
                    'facultyId': this.selectedFaculty})
            }
        },
        data(){
            return {
                selectedTeacher: null,
                selectedFaculty: null,
            }
        },
        created() {
            this.$store.dispatch("teachers/getTeacherList");
            this.$store.dispatch("faculty/getFacultyList");
        }
    }
</script>

<style scoped>

</style>
