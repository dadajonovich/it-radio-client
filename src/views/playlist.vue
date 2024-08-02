<template>
  <div class="playlist">
    <template v-if="showLoaderPlaylist">
      <div class="loader">
        <div class="spinner" />
        Загрузка данных
      </div>
    </template>
    <template v-else>
      <div class="playlist__header">
        <div class="playlist__back" @click="handlerBack"></div>
        <div class="h2 playlist__title">{{ playlist.name }}</div>
        <div class="playlist__edit" @click="next({ name: 'playlist-edit', params: { id: this.playlist.id } })"></div>
      </div>
      <SongList :songList="playlist.song" :songAlreadyAdd="true" />
    </template>
  </div>
</template>

<script>
import { app } from '@/services';
import SongList from '@/components/song-list.vue';

export default {
  name: 'playlist',
  components: { SongList },
  data() {
    return {
      showLoaderPlaylist: false,
      playlist: {},
    };
  },
  created() {
    this.getPlaylist();
  },
  methods: {
    getPlaylist() {
      this.showLoaderPlaylist = true;
      app
        .getPlaylist(this.$route.params.id)
        .then((res) => {
          this.showLoaderPlaylist = false;
          this.playlist = res;
        })
        .catch((err) => {
          this.showLoaderPlaylist = false;
          console.error(err);
        });
    },
    handlerBack() {
      this.$router.go(-1);
    },
    next(params) {
      this.$router.push(params);
    },
  },
};
</script>
