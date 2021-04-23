<template>
  <b-card bg-variant="light">
    <b-form
      v-on:submit.prevent="SubmitProblem"
      v-on:reset.prevent="ResetProblem"
    >
      <b-form-group
        label="Повідомити про проблему:"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      ></b-form-group>

      <b-form-group label="Тема:" label-for="input-topic">
        <b-form-input v-model="topic" required></b-form-input>
      </b-form-group>
        
      <b-form-group label="Повідомлення:" label-for="input-problem">
        <b-form-textarea v-model="text" required rows="6"></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">Повідомити</b-button>
      <b-button type="reset" variant="info">Очистити форму</b-button>
    </b-form>
  </b-card>
</template>

<script>
import Vuex from "vuex";

export default {
  name: "FormForProblem",
  computed: Vuex.mapState({
    user: (state) => {
      return state.auth.user;
    },
  }),
  data() {
    return {
      topic: "",
      text: "",
    };
  },
  methods: {
    SubmitProblem() {
      this.topic = "";
      this.text = " ";
      this.$bvToast.toast("Повідомлення було відправлено", {
        title: `Успіх`,
        variant: "success",
        solid: true,
      });
    },
    ResetProblem() {
      this.topic = "";
      this.text = " ";
    },
  },
};
</script>

<style scoped>
</style>