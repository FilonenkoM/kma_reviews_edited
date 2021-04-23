<template>
  <b-container id="app" style="max-width: 100%">
    <b-navbar toggleable="lg" type="dark" class="navbar-dark bg-primary">
      <!--     <b-navbar toggleable="lg" type="dark" variant="info">-->

      <b-navbar-brand target="nav-collapse" href="#">
        <router-link to="/">
          <h3 class="p-3 text-light">
            Чесні відгуки на викладачів НаУКМА
          </h3></router-link
          
        >
        <div v-if="user && user.enabled">Вітаємо, {{ user.email }}</div>
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto d-lg-flex d-md-none">
          <b-nav-item class="p-3"
            ><router-link class="text-light" to="/info"
              ><b-icon
                icon="info-circle"
                scale="2,5"
                variant="light" /></router-link
          ></b-nav-item>
          <b-nav-item to="/login" class="p-3">
            <b-icon icon="box-arrow-in-right" scale="2,5" variant="light" />
            <div>Вхід</div>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="d-lg-none d-md-block">
          <b-nav-item class="p-3"
            ><router-link class="text-light" to="/info"
              ><span class="mr-4"
                ><b-icon icon="info-circle" scale="2" variant="light" /></span
              >Інформація</router-link
            ></b-nav-item
          >
          <b-nav-item to="/login" class="p-3">
            <span class="mr-4"
              ><b-icon
                icon="box-arrow-in-right"
                scale="2,5"
                variant="light" /></span
            ><span>Вхід</span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </b-container>
</template>

<script>
import BodyDisplay from "./main-module/BodyDisplay.vue";
import Vuex from "vuex";

export default {
  name: "App",
  components: { BodyDisplay },
    computed: Vuex.mapState({

    user: (state) => {
      return state.auth.user;
    },

  }),
};
</script>

<style scoped>
</style>