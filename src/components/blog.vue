<template>
  <div class="blog">
    <div class="blog__header">
      <h2 class="h2 blog__header-title">Наш блог</h2>
      <button class="button m--arrow blog__header-btn">Смотреть все</button>
    </div>
    <div class="blog__content">
      <div class="blog__cover"></div>
      <div class="blog__list">
        <div class="blog__item" v-for="article in articles" :key="article.id">
          <div class="blog__item-header">
            <div class="blog__item-title">{{ article.title }}</div>
            <button class="button m--circle blog__item-btn"></button>
          </div>
          <div class="blog__info">
            <div class="blog__info-item">Читать {{ article.time }} минуты</div>
            <div class="blog__info-item">{{ article.data }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blog',
  data() {
    return {
      articles: [
        {
          id: 1,
          title: 'Топ-10 самых популярных языков программирования в 2023 году',
          time: '2',
          data: '21 октября',
        },
        {
          id: 2,
          title: 'Искусственный интеллект меняет мир технологий: возможности и вызовы',
          time: '2',
          data: '21 октября',
        },
        {
          id: 3,
          title: 'Как кибербезопасность становится ключевым фактором успеха в IT',
          time: '2',
          data: '21 октября',
        },
        {
          id: 4,
          title: '5 советов по выбору правильной технологии для вашего проекта',
          time: '2',
          data: '21 октября',
        },
      ],
    };
  },
};
</script>
