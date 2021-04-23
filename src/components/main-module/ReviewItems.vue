<template>
  <b-container class="p-0 m-0 mt-2">
    <img
     v-if="user && user.enabled == false"
      style="width: 100%"
      src="https://lh3.googleusercontent.com/proxy/xB9U3eP_-XVbIKhbJ5nRC0LFgJPO1k2OnYkXhehjIJZioNFHIwv-2jXgcgKRVFycFRVfRixhz8ZV_SPyMdS_4AT1HR9Cr3NNJDf8UpWNbdu91wcQybJTEbCA0qsOR9w5ietvWEJvNufAHOBTXLGeJIAfH0I"
    />
    <b-row
      class="mb-2"
      v-for="review in reviews"
      :key="review.id"
      :review="review"
    >
      <b-card class="bg-light review-card" style="width: 100%">
        <b-card-body>
          <div v-if="adminZone" class="d-flex justify-content-end row mb-2">
            <b-button
              variant="outline-info"
              class="admin-button mr-1"
              @click="deleteReview(review.id)"
              >Видалити відгук</b-button
            >
            <!--                        <b-button variant="outline-primary" class="admin-button">Заблокувати автора</b-button>-->
          </div>
          <div v-else class="d-flex justify-content-end row mb-2" />
          <b-card-title>{{  review.teacher.name }}</b-card-title>
          <b-card-sub-title>{{ getDate(review.sendTime) }}</b-card-sub-title>
          <b-card-text>{{ review.text }}</b-card-text>
        </b-card-body>
      </b-card>
    </b-row>
    <review-loader></review-loader>
  </b-container>
</template>

<script>
import Vuex from "vuex";
import ReviewLoader from "./ReviewLoader.vue";
import Reviews from "../../store/modules/reviews";

export default {
  components: { ReviewLoader },
  computed: Vuex.mapState({
    reviews: (state) => state.reviews.all,
    teacherId: (state) => state.reviews.techId,
    facultyId: (state) => state.reviews.facId,

    user: (state) => {
      return state.auth.user;
    },
    token: (state) => {
      return state.auth.token;
    },
  }),
  methods: {
    ...Vuex.mapActions(["getReviews"]),
    getDate(str) {
      let d = new Date(str + "Z");
      return d.toLocaleString();
    },
    async deleteReview(id) {
      let r = await this.$store.dispatch("reviews/deleteReviewAction", {
        id: id,
        token: this.token
      });
      if (!r)
        this.$bvToast.toast("Відгук не було видалено", {
          title: `Помилка`,
          variant: "danger",
          solid: true,
        });
      else
        this.$bvToast.toast("Відгук успішно видалено", {
          title: `Успіх`,
          variant: "success",
          solid: true,
        });
    },
  },
  mounted() {
    this.$store.dispatch("reviews/getReviews", {
      teacherId: this.teacherId,
      facultyId: this.facultyId,
    });
    if (this.$route.fullPath === "/admin") {
      this.adminZone = true;
    }
  },
  data() {
    return {
      adminZone: false,
    };
  },
  name: "ReviewItems",
};
</script>

<style scoped>
</style>
