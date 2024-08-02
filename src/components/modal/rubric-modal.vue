<template>
  <vue-final-modal
    v-model="show"
    class="modal__container m--right"
    content-class="modal__block m--half rubric-modal"
    content-transition="vfm-fade"
    overlay-transition="vfm-fade"
    :clickToClose="false"
    @click-outside="$emit('hideModal')"
  >
    <template v-if="showLoader">
      <div class="loader">
        <div class="spinner" />
        Загрузка данных
      </div>
    </template>
    <template v-else>
      <div class="rubric-modal__header">
        <div class="title m--white rubric-modal__title">
          {{ rubrik.name }}
        </div>
        <button class="button modal__close rubric-modal__close" @click="$emit('hideModal')"></button>
      </div>
      <div class="rubric-modal__cover">
        <img :src="`${selfUrl}${rubrik.img}`" alt="" />
      </div>
      <div class="rubric-modal__description">
        {{ rubrik.description }}
      </div>
      <button class="button m--fit-content m--white m--arrow" v-if="user?.id">Написать</button>
    </template>
  </vue-final-modal>
</template>

<script>
import { app } from '@/services';
import { selfUrl } from '@/settings';

export default {
  name: 'RubricModal',
  props: {
    showModal: {
      type: Boolean,
      default() {
        return false;
      },
    },
    selectRubric: {
      type: String,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      selfUrl,
      rubrik: {},
      showLoader: false,
    };
  },
  computed: {
    show() {
      return this.showModal;
    },
    user() {
      return this.$store.state.user;
    },
  },
  watch: {
    selectRubric: {
      handler() {
        if (this.selectRubric) {
          this.getRubrik();
        }
      },
    },
  },
  methods: {
    getRubrik() {
      this.showLoader = true;
      app
        .getRubrik(this.selectRubric)
        .then((data) => {
          this.showLoader = false;
          this.rubrik = data[0];
        })
        .catch((err) => {
          this.showLoader = false;
          console.log(err);
        });
    },
  },
};
</script>
