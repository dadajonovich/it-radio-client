<template>
  <div class="app">
    <AppHeader />
    <div class="app__block">
      <Page404 v-if="showErrorPage404" />
      <Page500 v-if="showErrorPage500" />
      <routerView v-else />
    </div>
    <Player />
    <AppFooter />
  </div>
  <Authentication />
  <ChangingUser />
</template>

<script>
import Page404 from '@/views/Page404.vue';
import Page500 from '@/views/Page500.vue';
import AppHeader from '@/components/app-header.vue';
import AppFooter from '@/components/app-footer.vue';
import Authentication from '@/components/modal/authentication.vue';
import Player from '@/components/player.vue';
import ChangingUser from '@/components/modal/сhanging-user.vue';

export default {
  // async preFetch({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {},
  components: {
    ChangingUser,
    Player,
    Authentication,
    AppFooter,
    AppHeader,
    Page404,
    Page500,
  },
  data() {
    return {
      showSidebarBlock: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    showErrorPage404() {
      return false;
      // return this.$store.state.showErrorPage?.response?.status === 404;
    },
    showErrorPage500() {
      return false;
      // return this.$store.state.showErrorPage?.response?.status === 500;
    },
    currentPlay() {
      return this.$store.state.currentPlay;
    },
  },
  watch: {},
  created() {
    // Нахуя это здесь?
    // this.$store.dispatch('setCurrentPlay', {
    //   ...this.currentPlay,
    //   isPlay: false,
    // });
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
@import 'swiper/css';
@import '@/assets/css/index.scss';
</style>
