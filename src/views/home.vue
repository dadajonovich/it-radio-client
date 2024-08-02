<template>
  <div class="home">
    <div class="home__meaning" ref="targetWrapper">
      <div class="app__content">
        <p class="text home__subtitle">
          Мы цифровое <span>онлайн радио.</span><br />
          Помогаем разобраться в том, что такое <span>IT.</span><br />
          Находимся в <span>Челябинске</span>, но вещаем на весь <span>Мир</span><br />
        </p>
        <h1 class="home__title" ref="targetTitle">
          IT-Радио —
          <span id="targetTitleSpan">радиостанция про сферу</span> технологий
          <br />
          и развитие
          <span id="targetTitleSpan">в IT</span>
          <!--                    IT Радио —-->
          <!--                    <span id="targetTitleSpan">радиостанция</span>-->
          <!--                    <br/>-->
          <!--                    <span id="targetTitleSpan">про  сферу</span> технологий<br/>-->
          <!--                    и развитие <span id="targetTitleSpan">в IT</span><br/>-->
        </h1>
      </div>
      <div class="home__banner" ref="target"></div>
    </div>
    <template v-if="true">
      <div class="app__content">
        <div class="home__description">
          <div class="home__info">
            <div class="text home__info--item">
              Работаем с 2024 года
              <span>
                Сегодня IT-сфера развивается настолько быстро, что следить за всеми новинками и изменениями в ней
                становится все сложнее.<br /><br />
                Но есть способ всегда быть в курсе последних новостей и событий — это IT-Радио.
              </span>
            </div>
            <h2 class="h2 m--border">Открывая новые горизонты в мире технологий</h2>
            <div class="text home__info--item m--circle">
              <span>
                IT-Радио — это уникальный проект, который объединяет в себе самых ярких представителей IT-индустрии, а
                также экспертов из различных областей, чтобы поделиться своими знаниями и опытом с широкой
                аудиторией.<br /><br />
                Каждое шоу на IT-Радио включает в себя актуальные темы, новости, обзоры, интервью с экспертами и многое
                другое.
              </span>
            </div>
          </div>
          <div class="home__content">
            <div class="home__content--item m--one-circle">
              <span class="title">Музыка</span>
              Нам важен комфорт, поэтому мы делаем на нашем радио подборку из самой любимой музыки всех жанров. Хорошее
              настроение и заряд бодрости будет обеспечен!
            </div>
            <div class="home__content--item m--two-circle">
              <span class="title">Подкасты</span>
              Возможность задать вопросы профессионалам из разных областей IT
            </div>
            <div class="home__content--item m--three-circle">
              <span class="title">Новости</span>
              Обзоры последних новинок и изменений в IT-индустрии
            </div>
          </div>
        </div>
      </div>
      <Team />
      <div class="app__content">
        <RubricBlock />
      </div>
      <div class="home__social">
        <div class="home__social--tools">
          <div class="home__social--description">
            <h2 class="h2 m--white">Соц сети</h2>
            <div class="text">
              Следите за обновлениями и новыми постами на IT Radio, чтобы быть в курсе последних новостей и событий в
              мире IT, а также следить за анонсами и обновлениями!
            </div>
          </div>
          <div class="home__social--btns">
            <button class="button m--blur">Telegram</button>
            <button class="button m--blur">VKontakte</button>
            <button class="button m--blur">Instagram</button>
            <button class="button m--blur">YouTube</button>
          </div>
        </div>
      </div>
      <div class="app__content">
        <blog />
      </div>
    </template>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Team from '@/components/team.vue';
import RubricBlock from 'components/rubric-block.vue';
import Blog from 'components/blog.vue';

export default {
  name: 'home',
  components: { Blog, RubricBlock, Team },
  created() {},
  mounted() {
    this.initScene();
  },
  methods: {
    initScene() {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(this.$refs.target, {
        scale: 1,
        scrollTrigger: {
          trigger: this.$refs.targetWrapper,
          scrub: true,
          start: 0,
          end: 600,
          pin: true,
        },
      });
      gsap.to(this.$refs.targetTitle, {
        color: 'transparent',
        backgroundImage: 'linear-gradient(91.17deg, #C6F1F7 -4.01%, #F983E9 36.14%, #B877FF 77.44%, #C2E9CD 106.11%)',
        scrollTrigger: {
          trigger: this.$refs.targetWrapper,
          scrub: true,
          start: 0,
          end: 600,
        },
      });
    },
  },
};
</script>
