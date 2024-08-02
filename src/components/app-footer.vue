<template>
  <div class="app__content footer">
    <div class="footer__top">
      <h2 class="h2 m--white">Напишите нам</h2>
      <div class="footer__question">
        <div class="text">Остались вопросы? Мы с радостью вам ответим!</div>
        <button class="button m--white m--arrow footer__question-button">Написать</button>
      </div>
    </div>
    <div class="footer__bottom">
      <ul class="footer__menu">
        <li v-for="(item, key) in menu" :key="key" :class="['footer__menu-item', item.class]">
          <router-link :to="{ name: item.name, params: item.params }" class="footer__menu-link">
            {{ item.title }}
          </router-link>
        </li>
      </ul>
      <div class="footer__connection">
        <ul class="footer__social">
          <li v-for="(item, key) in socialMenu" :key="key" :class="['footer__menu-item', item.class]">
            <router-link :to="item.link" class="footer__menu-link">
              {{ item.title }}
            </router-link>
          </li>
        </ul>
        <ul class="footer__connection">
          <li class="footer__menu-item">
            <router-link to="#" class="m--underline"> it@radio.org </router-link>
          </li>
          <li class="footer__menu-item">
            <router-link to="#" class="m--underline"> +7 (900) 000-01-12 </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      menu: [
        {
          name: 'home',
          role: 'all',
          title: 'О нас',
        },
        {
          name: 'support',
          role: 'all',
          title: 'Поддержка',
        },
        {
          name: 'rubric',
          role: 'all',
          title: 'Программы',
        },
        {
          name: 'playlists',
          role: 'all',
          title: 'Контакты',
        },
        {
          name: 'contacts',
          role: 'all',
          title: 'Блог',
        },
        {
          name: 'contacts',
          role: 'all',
          title: 'Карьера',
        },
      ],
      socialMenu: [
        {
          link: '#',
          role: 'all',
          title: 'Telegram',
        },
        {
          link: '#',
          role: 'all',
          title: 'VKontakte',
        },
        {
          link: '#',
          role: 'all',
          title: 'Instagram',
        },
        {
          link: '#',
          role: 'all',
          title: 'YouTube',
        },
      ],
    };
  },
};
</script>
