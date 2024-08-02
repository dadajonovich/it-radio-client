<template>
  <div class="playlist-edit">
    <AppBreadcrumbs
      :breadcrumbs="[
        { name: 'Главная', route: { name: 'home' } },
        { name: 'Личный кабинет', route: { name: 'profile' } },
        $route.name === 'playlist-create'
          ? { name: 'Добавление плейлиста', route: { name: 'playlist-create' } }
          : {
              name: 'Редактирование плейлиста',
              route: { name: 'playlist-edit' },
            },
      ]"
    />
    <h1 class="h2 playlist__title m--margin">
      {{ $route.name === 'playlist-create' ? 'Новый плейлист' : playlist.name }}
    </h1>
    <button class="playlist-edit__upload" @click="handlerUploadCover">Добавить обложку</button>
    <div class="field__input m--hidden">
      <input id="cover" ref="coverInput" accept=".jpg,.png,.svg" class="input" type="file" name="logo" />
    </div>
    <FormKit
      v-model="playlist.name"
      type="text"
      outer-class="playlist-edit__search"
      inner-class="m--search"
      placeholder="Название плейлиста"
    ></FormKit>
    <div class="playlist-edit__list">
      <div class="playlist-edit__item">
        <div class="playlist-edit__title">Поиск по каталогу</div>
        <template v-if="showLoaderSongs">
          <div class="loader">
            <div class="spinner" />
            Загрузка данных
          </div>
        </template>
        <SongList
          v-else-if="songsFiltered.length > 0"
          :songList="songsFiltered"
          class="m--column"
          @addPlaylist="addPlaylist"
        />
        <div v-else>Каталог музыки пуст!</div>
      </div>
      <div class="playlist-edit__item">
        <div class="playlist-edit__title">Добавленные треки</div>
        <template v-if="showLoaderPlaylist">
          <div class="loader">
            <div class="spinner" />
            Загрузка данных
          </div>
        </template>
        <SongList
          v-else-if="playlist.song?.length > 0"
          :songList="playlist.song"
          class="m--column"
          :songAlreadyAdd="true"
          @removePlaylist="removePlaylist"
        />
        <div v-else>Добавьте музыку в плейлист!</div>
      </div>
    </div>
  </div>
</template>

<script>
import { app } from '@/services';
import AppBreadcrumbs from '@/components/app-breadcrumbs.vue';
import SongList from '@/components/song-list.vue';

export default {
  name: 'playlist-edit',
  components: { SongList, AppBreadcrumbs },
  data() {
    return {
      playlist: {},
      songs: [],
      showLoaderSongs: false,
      showLoaderPlaylist: false,
    };
  },
  created() {
    this.getAllSong();
    this.getPlaylist();
  },
  computed: {
    songsFiltered() {
      return this.songs.filter((song) => {
        const alreadyAdd = this.playlist.song.find((item) => item.azura_id === song.azura_id);
        return !alreadyAdd;
      });
    },
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
    getAllSong() {
      this.showLoaderSongs = true;
      app
        .getAllSong()
        .then((res) => {
          this.showLoaderSongs = false;
          this.songs = res;
        })
        .catch((err) => {
          this.showLoaderSongs = false;
          console.error(err);
        });
    },
    addPlaylist(song) {
      console.log(song);
      const params = {
        playlist_id: this.$route.params.id,
        ...song,
      };
      this.showLoaderSongs = true;
      this.showLoaderPlaylist = true;
      app
        .addSongToPlaylist(params)
        .then(() => {
          this.showLoaderPlaylist = false;
          this.showLoaderSongs = false;
          this.getPlaylist();
        })
        .catch((err) => {
          this.showLoaderPlaylist = false;
          this.showLoaderSongs = false;
          console.error(err);
        });
    },
    removePlaylist(song) {
      const params = {
        playlist_id: this.$route.params.id,
        azura_id: song.azura_id,
      };
      this.showLoaderSongs = true;
      this.showLoaderPlaylist = true;
      app
        .removeSongToPlaylist(params)
        .then(() => {
          this.showLoaderPlaylist = false;
          this.showLoaderSongs = false;
          this.getPlaylist();
        })
        .catch((err) => {
          this.showLoaderPlaylist = false;
          this.showLoaderSongs = false;
          console.error(err);
        });
    },
    handlerUploadCover() {
      let logoInput = this.$refs.coverInput;
      let click = new MouseEvent('click');

      logoInput.onchange = this.uploadCover;
      logoInput.dispatchEvent(click);
    },
    uploadCover(event) {
      let file = event.target.files ? event.target.files[0] : null;
      if (file) {
        const data = new FormData();
        data.append('playlist_art', file);
        data.append('playlist_id', this.$route.params.id);
        app
          .updatePlaylist(data)
          .then((res) => {
            this.showLoaderPlaylist = false;
            this.showLoaderSongs = false;
            this.playlist = res;
          })
          .catch((err) => {
            this.showLoaderPlaylist = false;
            this.showLoaderSongs = false;
            console.error(err);
          });
      }
    },
  },
};
</script>
