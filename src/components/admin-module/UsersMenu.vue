<template>
  <b-container>
    <b-card v-for="user in users" class="mt-1">
      <b-row>
        <b-col class="col-10">{{ user.email }}</b-col>
        <b-col v-if="user.enabled" class="col-10">
            <span style="background-color: #00CC00; color: white; padding: 5px; border-radius: 5px">
                enabled
            </span>
        </b-col>
        <b-col v-else class="col-10">
            <span style="background-color: red; color: white; padding: 5px; border-radius: 5px">
                blocked
            </span>
        </b-col>

        <b-col v-if="user.enabled" class="col-2">
          <b-button @click="blockUser(user.id)" variant="outline-info">
            Block</b-button
          >
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import Vuex from "vuex";

import FilterForm from "../main-module/FilterForm.vue";
import ReviewItems from "../main-module/ReviewItems.vue";
export default {
  computed: Vuex.mapState({
    token: (state) => {
      return state.auth.token;
    },
    users: (state) => {
      return state.users.students;
    },
  }),
  methods: {
    async blockUser(id) {
      this.$store.dispatch("users/blockUser", {
        student_id: id,
        token: this.token,
      });
    },
  },
  created() {
    this.$store.dispatch("users/getAllStudents", { token: this.token });
  },
  name: "UsersMenu",
  components: { ReviewItems, FilterForm },
};
</script>