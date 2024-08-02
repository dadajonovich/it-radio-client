<template>
  <div class="app__content profile">
    <template v-if="$route.name !== 'playlist-edit' && $route.name !== 'playlist-create'">
      <AppBreadcrumbs
        :breadcrumbs="[
          { name: 'Главная', route: { name: 'home' } },
          { name: 'Личный кабинет', route: { name: 'profile' } },
        ]"
      />
      <h1 class="h2 profile__title">{{ user.email }}</h1>
      <button class="button m--text-link" @click="showRecovery">Редактировать профиль</button>
      <div class="profile__tabs tabs m--btns">
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
    </template>
    <template v-if="$route.name === 'profile'">
      <template v-if="currentTabsItem === 'music'">
        <template v-if="showLoaderSong">
          <div class="loader">
            <div class="spinner" />
            Загрузка данных
          </div>
        </template>
        <SongList v-else :songList="userFavorite.songs" @removeSong="removeFavorites" />
      </template>
      <template v-if="currentTabsItem === 'playlists'">
        <template v-if="showLoaderPlaylist">
          <div class="loader">
            <div class="spinner" />
            Загрузка данных
          </div>
        </template>
        <PlaylistRoster v-else :list="userFavorite.playlist" @createPlaylist="createPlayList" />
      </template>
    </template>
    <routerView v-else />
  </div>
</template>

<script>
import AppBreadcrumbs from '@/components/app-breadcrumbs.vue';
import SongList from '@/components/song-list.vue';
import { app } from '@/services';
import PlaylistRoster from '@/components/playlist-roster.vue';

export default {
  name: 'profile',
  components: { PlaylistRoster, SongList, AppBreadcrumbs },
  data() {
    return {
      currentTabsItem: 'music',
      tabsItems: [
        {
          label: 'Музыка',
          name: 'music',
        },
        {
          label: 'Подкасты',
          name: 'podcasts',
        },
        {
          label: 'Плейлисты',
          name: 'playlists',
        },
      ],
      showLoaderSong: false,
      showLoaderPlaylist: false,
      showLoaderPodcast: true,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    userFavorite() {
      return this.$store.state.userFavorite;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        if (!from && to?.hash && to?.name === '"profile"') {
          console.log('1');
          this.currentTabsItem = to?.hash.replace('#', '') || 'music';
        }
        if ((to?.hash !== from?.hash && to?.name === from?.name) || (!from?.name && !from?.hash)) {
          console.log('2');
          if (to.hash) {
            this.currentTabsItem = to?.hash.replace('#', '') || 'music';
          } else {
            this.currentTabsItem = 'music';
          }
        } else {
          console.log('3');
          if (to?.name === 'playlist') {
            this.currentTabsItem = 'playlists';
          }
        }
      },
    },
  },
  created() {
    this.getSongList();
    this.getPlaylists();
  },
  methods: {
    getSongList() {
      this.showLoaderSong = true;
      app
        .getFavoriteList()
        .then((res) => {
          this.showLoaderSong = false;
          this.$store.dispatch('setUserFavorite', { songs: res });
        })
        .catch((err) => {
          this.showLoaderSong = false;
          console.error(err);
        });
    },
    changeTab(tab) {
      this.currentTabsItem = tab;
      if (this.$route.name === 'profile') {
        this.$router.push({ name: this.$route.name, hash: `#${tab}` });
      } else {
        this.$router.push({ name: 'profile', hash: `#${tab}` });
      }
    },
    removeFavorites(song) {
      this.showLoaderSong = true;
      app
        .removeFavorites(song)
        .then(() => {
          this.showLoaderSong = false;
          this.getSongList();
        })
        .catch((err) => {
          this.showLoaderSong = false;
          console.error(err);
        });
    },
    showRecovery() {
      this.$store.dispatch('setModal', { changingUser: true });
    },
    getPlaylists() {
      this.showLoaderPlaylist = true;
      app
        .getPlaylists()
        .then((res) => {
          this.showLoaderPlaylist = false;
          this.$store.dispatch('setUserFavorite', { playlist: res });
        })
        .catch((err) => {
          this.showLoaderPlaylist = false;
          console.error(err);
        });
    },
    createPlayList() {
      app
        .createPlaylists()
        .then((res) => {
          this.$router.push({
            name: 'playlist-create',
            params: { id: res.id },
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
