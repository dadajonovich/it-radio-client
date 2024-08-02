<template>
  <div class="app__content playlists">
    <AppBreadcrumbs
      :breadcrumbs="[
        { name: 'Главная', route: { name: 'home' } },
        { name: 'Плейлист', route: { name: 'playlists' } },
      ]"
    />
    <div class="playlists__content">
      <h1 class="h2">Плейлист</h1>
      <div class="playlists__tabs tabs m--btns">
        <button
          v-for="item in tabsItems"
          :key="`tab-${item.name}`"
          class="button"
          :class="currentTabsItem === item.name && 'is-active'"
          @click.prevent="changeTab(item.name)"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="playlists__list">
        <div class="playlists__item">
          <div class="title m--white playlists__time">09:00</div>
          <div class="text playlists__param">Исполнитель</div>
          <div class="text playlists__param m--long">Название трека</div>
        </div>
        <div class="playlists__item">
          <div class="title m--white playlists__time">09:00</div>
          <div class="text playlists__param">Исполнитель</div>
          <div class="text playlists__param m--long">Название трека</div>
        </div>
        <div class="playlists__item">
          <div class="title m--white playlists__time">09:00</div>
          <div class="text playlists__param">Исполнитель</div>
          <div class="text playlists__param m--long">Название трека</div>
        </div>
        <div class="playlists__item">
          <div class="title m--white playlists__time">09:00</div>
          <div class="text playlists__param">Исполнитель</div>
          <div class="text playlists__param m--long">Название трека</div>
        </div>
        <div class="playlists__item">
          <div class="title m--white playlists__time">09:00</div>
          <div class="text playlists__param">Исполнитель</div>
          <div class="text playlists__param m--long">Название трека</div>
        </div>
      </div>
      <Pagination :total="37" :limit="5" :currentPage="currentPage || 1" />
    </div>
  </div>
</template>

<script>
import AppBreadcrumbs from '@/components/app-breadcrumbs.vue';
import Pagination from '@/components/pagination.vue';
// import { audio } from "@/services";
export default {
  name: 'playlists',
  components: { Pagination, AppBreadcrumbs },
  data() {
    return {
      currentTabsItem: 'today',
      currentPage: 1,
      tabsItems: [
        {
          label: 'Вчера',
          name: 'yesterday',
        },
        {
          label: 'Сегодня',
          name: 'today',
        },
        {
          label: 'Завтра',
          name: 'tomorrow',
        },
      ],
      station: this.$store.state.station,
    };
  },
  watch: {
    '$route.query.page': {
      handler(from) {
        this.currentPage = Number(from);
      },
    },
  },
  created() {
    // this.getPlayList();
  },
  methods: {
    // getPlayList(){
    //     audio.getPlayList(this.station.id).then(res => {
    //         let groups = res
    //         // this.$store.dispatch('setMeta', {});
    //         // this.$store.dispatch('fetchDataByKey', { data: groups, key: 'groups' });
    //         // this.showLoaderSending.groups = false;
    //     }).catch(err => {
    //         // this.showLoaderSending.groups = false;
    //         console.error(err)
    //     })
    // },
    changeTab(tab) {
      this.currentTabsItem = tab;
    },
  },
};
</script>
