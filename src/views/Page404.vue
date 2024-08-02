<template>
  <div class="app__main m--error-404">
    <div :class="['page404', this.user?.id ? 'auth' : null]">
      <div :class="['container']">
        <div class="page404__block">
          <div class="page404__info">
            <div class="page404__info-title">404</div>
            <div class="page404__info-subtitle">Мы не можем найти то, что вы ищете</div>
            <div class="page404__info-content">
              Возможно, запрашиваемая вами страница была перенесена или удалена. Также возможно, что вы допустили
              небольшую опечатку при вводе адреса — такое случается даже с нами, поэтому еще раз внимательно проверьте.
            </div>
            <div class="page404__info-bottom">
              Переходите на главную страницу, там вы сможете найти много полезной информации!
            </div>
            <div class="page404__info-button">
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
  mounted() {
    console.log(this.user);
  },
  methods: {
    next() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>
