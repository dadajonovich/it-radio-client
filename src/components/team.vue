<template>
  <div class="team">
    <div class="team__header">
      <h2 class="h2 team__title">Наша команда</h2>
      <div class="team__description">
        На IT волне команда профессионалов неутомимо трудится, чтобы дарить слушателям самые свежие и актуальные новости
        из мира технологий, отвечать на их вопросы и обсуждать горячие темы на IT радио.
      </div>
    </div>
    <template v-if="showLoader">
      <div class="loader">
        <div class="spinner" />
        Загрузка данных
      </div>
    </template>
    <Swiper
      v-else
      :slides-per-view="4"
      :space-between="20"
      :modules="modules"
      :pagination="{
        el: '.team__progress',
        clickable: true,
        type: 'progressbar',
      }"
      :breakpoints="{
        0: {
          slidesPerView: 1,
        },
        450: {
          slidesPerView: 1.5,
        },
        768: {
          slidesPerView: 2.5,
        },
        1020: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      }"
      class="team__slider"
    >
      <SwiperSlide class="team__item" v-for="employee in team" :key="employee.id">
        <div class="team__cover">
          <img :src="`${selfUrl + employee.img_person}`" alt="user" />
        </div>
        <div class="team__name">
          {{ employee.name }} {{ employee.last_name }}
          <span>{{ employee.position }}</span>
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="team__tools">
      <div class="team__progress" ref="progressBar">
        <span></span>
      </div>
      <router-link :to="{ name: 'about' }" class="m--link"> Больше о нас </router-link>
    </div>
  </div>
</template>

<script>
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Scrollbar } from 'swiper/modules';
import { app } from '@/services';
import { selfUrl } from '@/settings';

export default {
  name: 'team',
  components: { Swiper, SwiperSlide },
  data() {
    return {
      selfUrl,
      team: [],
      showLoader: false,
      modules: [Scrollbar, Pagination],
    };
  },
  created() {
    this.getTeams();
  },
  methods: {
    getTeams() {
      this.showLoader = true;
      app
        .getTeams()
        .then((data) => {
          this.showLoader = false;
          this.team = data;
        })
        .catch((err) => {
          this.showLoader = false;
          console.log(err);
        });
    },
  },
};
</script>
