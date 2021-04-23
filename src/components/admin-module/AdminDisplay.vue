<template>
  <b-container class="ml-0 pl-0 mt-1">
    <b-row>
      <b-col md="3" class="bg-light">
        <div class="min-vh-100 p-0 ml-0 bg-light">
          <div class="div-nav">
            <b-nav class="text-dark p-0 header-text left-nav">
              <b-nav-item to="/admin" exact exact-active-class="active"
                >Перегляд відгуків</b-nav-item
              >
              <b-nav-item to="/admin/users" exact exact-active-class="active"
                >Перегляд користувачів</b-nav-item
              >
              <b-nav-item to="/admin/faculty" exact exact-active-class="active"
                >Редагувати факультети</b-nav-item
              >
              <b-nav-item to="/admin/teacher" exact exact-active-class="active"
                >Редагувати викладачів</b-nav-item
              >
            </b-nav>
          </div>
        </div>
      </b-col>
      <b-col md="6">
        <router-view />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vuex from "vuex";

export default {
  name: "AdminDisplay",
  computed: Vuex.mapState({
    user: (state) => {
      return state.auth.user;
    },
  }),
  created() {
      if(this.user && this.user.role == "ADMIN") [] 
      else {
          this.$router.push("/")
      }
  },
};
</script>

<style scoped>
</style>