<template>
  <div class="rubric-block">
    <div class="rubric-block__header">
      <h2 class="h2 rubric-block__header-title">Рубрики</h2>
      <button class="button m--arrow rubric-block__link" v-if="$route.name !== 'rubric'" @click="next('rubric')">
        Смотреть все
      </button>
      <div class="p rubric-block__description">
        IT-Радио - это уникальная платформа для обмена опытом, знаниями и обсуждения актуальных вопросов, связанных с
        разработкой программного обеспечения, искусственного интеллекта, интернета вещей и других направлений
        IT-индустрии
      </div>
    </div>
    <template v-if="showLoader">
      <div class="loader">
        <div class="spinner" />
        Загрузка данных
      </div>
    </template>
    <div v-else class="rubric-block__list">
      <div class="rubric-block__item" v-for="rubrik in rubriks" :key="`rubrik_${rubrik.id}`">
        <div class="title rubric-block__title">{{ rubrik.name }}</div>
        <div class="p rubric-block__description m--50">{{ rubrik.title }}</div>
        <button class="button m--arrow rubric-block__btn" @click="showModalRubric(rubrik.id)">Узнать больше</button>
      </div>
    </div>
  </div>
  <RubricModal :showModal="isShowModalRubric" @hideModal="hiddenModalRubric" :selectRubric="ModalTemplate" />
</template>

<script>
import RubricModal from '@/components/modal/rubric-modal.vue';
import { app } from '@/services';

export default {
  name: 'rubric-block',
  components: { RubricModal },
  data() {
    return {
      isShowModalRubric: false,
      ModalTemplate: null,
      rubriks: [],
      showLoader: false,
    };
  },
  created() {
    this.getRubriks();
  },
  methods: {
    getRubriks() {
      this.showLoader = true;
      app
        .getRubriks()
        .then((data) => {
          this.showLoader = false;
          this.rubriks = data;
        })
        .catch((err) => {
          this.showLoader = false;
          console.log(err);
        });
    },
    showModalRubric(key) {
      this.ModalTemplate = key;
      this.isShowModalRubric = true;
    },
    hiddenModalRubric() {
      this.isShowModalRubric = false;
    },
    next(name) {
      this.$router.push({ name });
    },
  },
};
</script>
