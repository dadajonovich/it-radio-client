<template>
  <div class="about">
    <div class="app__content">
      <AppBreadcrumbs
        :breadcrumbs="[
          { name: 'Главная', route: { name: 'home' } },
          { name: 'О нас', route: { name: 'about' } },
        ]"
      />

      <div class="about__header">
        <div class="about__header-top">
          <div class="about__header-left">
            <h1 class="h2">О нас</h1>
            <div class="text about__header-description">
              IT-Радио — это не просто обычная радиостанция, мы ваши партнеры в творчестве и современных технологиях.
            </div>
          </div>
          <div class="about__header-right"></div>
        </div>
        <div class="text about__header-bottom">
          Наша миссия — воплотить ваши мечты в реальность, шаг за шагом. Благодаря разнообразной команде ведущих,
          журналистов, разработчиков и новаторов, мы постоянно расширяем границы возможного в цифровом мире.
        </div>
      </div>
      <div class="about__description">
        <h2 class="h2">Мы здесь, чтобы открыть глаза на мир IT</h2>
        <div class="about__description-info">
          <div class="text about__description-item m--left">
            IT-Радио — это уникальный проект, который объединяет в себе самых ярких представителей IT-индустрии, а также
            экспертов из различных областей, чтобы поделиться своими знаниями и опытом с широкой аудиторией.
          </div>
          <div class="text about__description-item">
            Мы — команда, которая верит в силу теплой улыбки и дружеской беседы.
          </div>
        </div>
      </div>
      <video class="about__video" playsinline="" autoplay="" loop="" muted="">
        <source src="@/assets/videos/about.mp4" type="video/mp4" />
      </video>
      <div class="about__description">
        <div class="about__description-info">
          <div class="text about__description-item m--left">
            Основанное с целью переосмыслить радио через призму современного и инновационного подхода, мы стали больше,
            чем просто радиостанцией, мы сообщество родственных душ, которые разделяют страсть к артистизму, развитию и
            инновациям.
          </div>
          <div class="text about__description-item">
            Каждое шоу на IT-Радио включает в себя актуальные темы, новости, обзоры, интервью с экспертами и многое
            другое.
          </div>
        </div>
      </div>
    </div>
    <div class="about__gallery">
      <div class="about__gallery-item m--gallery-item-one"></div>
      <div class="about__gallery-item m--gallery-item-two"></div>
      <div class="about__gallery-item m--gallery-item-three"></div>
    </div>
    <Team />
    <div class="app__content">
      <div class="about__history">
        <div class="about__history-header">
          <h2 class="h2 about__history-title">История радиостанции</h2>
          <div class="title about__history-date">Дата</div>
        </div>
        <div class="about__history-list">
          <div class="about__history-item">
            <div class="title m--white about__history-title">Событие кратко 1</div>
            <div class="about__history-date">Ноябрь 2023</div>
          </div>
          <div class="about__history-item">
            <div class="title m--white about__history-title">Событие кратко 2</div>
            <div class="about__history-date">Ноябрь 2023</div>
          </div>
          <div class="about__history-item">
            <div class="title m--white about__history-title">Событие кратко 3</div>
            <div class="about__history-date">Ноябрь 2023</div>
          </div>
          <div class="about__history-item">
            <div class="title m--white about__history-title">Событие кратко 4</div>
            <div class="about__history-date">Ноябрь 2023</div>
          </div>
        </div>
      </div>
      <SupportBlock />
    </div>
  </div>
</template>

<script>
import AppBreadcrumbs from '@/components/app-breadcrumbs.vue';
import Team from '@/components/Team.vue';
import SupportBlock from '@/components/support-block.vue';

export default {
  name: 'about',
  components: { SupportBlock, Team, AppBreadcrumbs },
};
</script>
