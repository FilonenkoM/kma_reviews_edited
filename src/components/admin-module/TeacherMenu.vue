<template>
  <b-container>
    <b-form v-on:submit.prevent="newTeacher" class="mb-3">
      <b-input-group>
        <b-input
          v-model="name"
          placeholder="Введіть ПІБ викладача"
          type="text"
          required
        />
        <b-form-select
          required
          v-model="selectedFaculty"
          :options="facultyOptions"
          id="faculty"
        />
        <b-input-group-append>
          <b-button type="submit" variant="info">Додати</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
    <b-card v-for="teacher in teachers" class="mt-1">
      <b-row>
        <b-col class="col-7">{{ teacher.name }}</b-col>
        <b-col class="col-3">{{ teacher.facultyName }}</b-col>
        <!--                <b-col class="col-1"><b-button @click="editTeacher(teacher.id, teacher.name)" variant="outline-info"><b-icon icon="pencil"/></b-button></b-col>-->
        <b-col class="col-2"
          ><b-button @click="deleteTeacher(teacher.id)" variant="outline-info"
            ><b-icon icon="x" /></b-button
        ></b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import Vuex from "vuex";

export default {
  name: "TeacherMenu",
  computed: Vuex.mapState({
    ...Vuex.mapActions[
      ("getTeacherList", "getFacultyList", "addTeacher", "resetPages")
    ],
    facultyOptions: (state) => {
      let ops = state.faculty.faculty;
      let res = ops.reduce(
        (acc, x) => [...acc, { text: x.name, value: x.id }],
        [{ text: "Оберіть факультет", value: null }]
      );
      return res.sort((a, b) => -(a.id - b.id));
    },
    teachers: (state) => state.teachers.teacher,
      token: (state) => {
        return state.auth.token;
      }
  }),
  methods: {
    async newTeacher() {
      if (this.name.trim().length === 0) return;
      let teacher = {
        name: this.name,
        faculty_id: this.selectedFaculty,
      };
      let r = await this.$store.dispatch("teachers/addTeacher", {
        teacher: teacher, token: this.token
      });
      this.name = "";
      this.selectedFaculty = null;
      if (!r)
        this.$bvToast.toast("Викладача не було додано", {
          title: `Помилка`,
          variant: "danger",
          solid: true,
        });
      else
        this.$bvToast.toast("Викладач успішно доданий", {
          title: `Успіх`,
          variant: "success",
          solid: true,
        });
    },
    async deleteTeacher(id) {
      let r = await this.$store.dispatch("teachers/deleteTeacherAction", {
        id: id, token: this.token
      });
      if (!r)
        this.$bvToast.toast("Викладача не було видалено", {
          title: `Помилка`,
          variant: "danger",
          solid: true,
        });
      else
        this.$bvToast.toast("Викладач успішно видалений", {
          title: `Успіх`,
          variant: "success",
          solid: true,
        });
    },
  },
  data() {
    return {
      name: "",
      selectedFaculty: null,
    };
  },
  created() {
    this.$store.dispatch("teachers/getTeacherList");
    this.$store.dispatch("faculty/getFacultyList");
  },
};
</script>

<style scoped>
</style>