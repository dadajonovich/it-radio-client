<template>
  <div class="app__main m--error-500">
    <div :class="['page500']">
      <div :class="['container']">
        <div class="page500__block">
          <div class="page500__info">
            <div class="page500__info-title">Упс!</div>
            <div class="page500__info-subtitle">Что то пошло не так!</div>
            <div class="page500__info-content">Мы уже знаем об этом и делаем все возможное!</div>
            <div class="page500__info-bottom">
              Переходите на главную страницу, там вы сможете найти много полезной информации!
            </div>
            <div class="page500__info-button">
              <button class="button button-blue" @click="next()">На главную</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  components: {},
  data() {
    return {};
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {},
  methods: {
    next() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>
