<template>
  <div class="player">
    <div class="player__cover">
      <q-skeleton v-if="loaderPlay" height="100%" />
      <template v-else>
        <img v-if="currentPlay.art" :src="currentPlay.art" alt="player" />
        <img v-else :src="'@/assets/img/mock/template-artist.png'" alt="player" />
      </template>
    </div>
    <div class="player__content">
      <div class="player__top">
        <q-skeleton v-if="loaderPlay" type="circle" class="player__btn m--skeleton" />
        <template v-else>
          <button v-if="currentPlay.isPlay" @click="handlerPause" class="button player__btn m--pause">
            <SvgIcon :src="pauseIcon" />
          </button>
          <button v-else @click="handlerPlay" class="button player__btn m--play">
            <SvgIcon :src="playIcon" />
          </button>
        </template>
        <div class="player__executor">
          <q-skeleton v-if="loaderPlay" class="player__executor m--skeleton" />
          <template v-else>
            {{ currentPlay.title || '—' }}
          </template>
          <span>
            <q-skeleton v-if="loaderPlay" />
            <template v-else>
              {{ currentPlay.artist || '—' }}
            </template>
          </span>
        </div>
        <div @click="handleAuthRequired">
          <q-skeleton v-if="loaderPlay" class="player__favorites m--skeleton" />
          <div v-else class="player__favorites" :class="[isFavorites && 'm--active']" @click="handlerFavorites"></div>
        </div>
        <div class="player__tools">
          <q-skeleton v-if="loaderPlay" class="player__tools m--skeleton" />
          <div v-else @click="handleAuthRequired">
            <FormKit
              v-model="isUserMusic"
              type="toggle"
              label="Включить мою музыку"
              :disabled="!user?.id || userSongList.length === 0"
            />
          </div>

          <q-skeleton v-if="loaderPlay" class="player__tools m--skeleton" />
          <div v-else class="player__volume">
            <span
              ref="volumeIcon"
              @click="toggleVolume"
              :class="songVolume == 0 ? 'player__volume-off' : 'player__volume-on'"
            />
            <input type="range" min="0" max="1" step="0.01" v-model="songVolume" @input="changeVolume" />
          </div>
        </div>
      </div>
      <div class="player__bottom">
        <div class="player__time" :class="!loaderPlay && !isUserMusic && 'm--ether'">
          <q-skeleton v-if="loaderPlay" />
          <template v-else-if="isUserMusic">
            {{ getTime(playerInfo.currentTime) }} /
            {{ getTime(playerInfo.duration) }}
          </template>
          <template v-else> Эфир </template>
        </div>
        <div class="player__progress">
          <q-skeleton v-if="loaderPlay" height="5px" />
          <input v-else :disabled="!isUserMusic" type="range" v-model="playerInfo.progress" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { app, audio as Player } from '@/services';
import { AzuraFirstResponce, AzuraSecondResponce, DataSong } from '@/services/audio';
import SvgIcon from '@/components/SvgIcon.vue';
import playIcon from '@/assets/img/icon/play.svg?raw';
import pauseIcon from '@/assets/img/icon/pause.svg?raw';

type PlayerData = {
  isFavorites: boolean;
  isPlayRadio: boolean;
  connection: Player | null;
  isUserMusic: any;
  bolTemp: boolean;
  songVolume: number;
  preToggleVol: number | null;
  playerInfo: any;
  playIcon: string;
  pauseIcon: string;
};

export default defineComponent({
  name: 'player',
  components: { SvgIcon },
  data(): PlayerData {
    return {
      isFavorites: false,
      isPlayRadio: false,
      connection: null,
      isUserMusic: !this.$store.state.currentPlay.live,
      bolTemp: true, // Заглушка для теста
      songVolume: 0.5,
      preToggleVol: null, // Локальное значение для хранения громкости перед toggleVolume
      playerInfo: {
        progress: 0,
        currentTime: 0,
        duration: 0,
      },
      playIcon,
      pauseIcon,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    currentPlay() {
      return this.$store.state.currentPlay;
    },
    player() {
      return this.$store.state.player;
    },
    userSongList() {
      return this.$store.state.userFavorite?.songs || [];
    },
    loaderPlay() {
      return this.$store.state.currentPlay.isLoader;
    },
  },
  watch: {
    currentPlay: {
      immediate: false,
      handler(to, from) {
        if (this.isUserMusic === this.currentPlay.live) {
          this.isUserMusic = !this.currentPlay.live;
        }
        if (this.user?.id && to.id !== from.id) {
          this.checkSongIsFavorite();
        }
        if (!this.currentPlay.live && to.id !== from.id) {
          this.getAudio(this.currentPlay.azura_id);
        }
      },
    },
    userSongList: {
      immediate: false,
      handler(to, from) {
        if (this.user?.id && to.length !== from.length) {
          this.checkSongIsFavorite();
        }
      },
    },
    isUserMusic: {
      immediate: false,
      handler() {
        if (this.isUserMusic === this.currentPlay.live) {
          this.changeLive();
        }
      },
    },
  },
  created() {
    this.connectionPlayer();
  },
  mounted() {
    // Создание <audio>
    this.$store.dispatch('initPlayer', { volume: this.songVolume });

    if (this.user?.id) {
      this.checkSongIsFavorite();
      this.getSongList();
    }
    this.playerInfo.progress = this.currentPlay.live ? 100 : 0;
    if (!this.currentPlay.live && this.userSongList?.length > 0) {
      this.$store.dispatch('setCurrentPlay', {
        ...this.userSongList[this.currentPlay.currentIndex || 0],
        live: false,
      });
      this.getAudio(this.userSongList[this.currentPlay.currentIndex || 0]?.azura_id);
      if (this.player.target) {
        this.player.target.addEventListener('timeupdate', this.updateProgress);
      }
    }
    if (!this.user?.id) {
      this.$store.dispatch('setCurrentPlay', {
        ...this.currentPlay,
        live: true,
        isLoader: true,
        currentIndex: null,
      });
    }
  },
  methods: {
    connectionPlayer() {
      if (this.connection) {
        this.connection.removePlay();
      }
      this.connection = new Player();
      this.connection.init();

      this.connection.onHandler(this.handleConnection);
    },
    checkSongIsFavorite() {
      app
        .getCheckFavoriteSong(this.currentPlay.azura_id || this.currentPlay.id)
        .then((res) => {
          this.isFavorites = res.is_favorite;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    removeFavorites(song) {
      app
        .removeFavorites(song)
        .then(() => {
          this.getSongList();
        })
        .catch((err) => {
          this.showLoader = false;
          console.error(err);
        });
    },
    handleConnection(e: MessageEvent) {
      const jsonData = JSON.parse(e.data) as AzuraFirstResponce | AzuraSecondResponce;
      console.log(jsonData);
      let data;

      if ('pub' in jsonData) {
        // Это AzuraSecondResponce
        data = jsonData.pub.data;
      } else if ('connect' in jsonData) {
        // Это AzuraFirstResponce
        data = jsonData.connect.subs['station:it-radio'].publications[0].data;
      }

      if (!data) return;
      if (this.currentPlay.live) {
        // Ссылка на трансляцию
        const dataUrl = data.np.station.listen_url;
        // Объект с данными музыки
        const dataSong = data.np.now_playing.song;
        const playerUrl = this.player.target.src;
        if (dataUrl !== playerUrl) {
          this.$store.dispatch('changePlayer', dataUrl);
          this.actionCurrentPlay(dataSong);
        }
        if (dataSong.id !== this.currentPlay.id) {
          this.actionCurrentPlay(dataSong);
        }
      }
    },
    actionCurrentPlay(song: DataSong) {
      console.log('actionCurrentPlay', song);
      const currentPlay = {
        ...this.currentPlay, // Инфа про текущий трек
        ...song,
        // azura_id: song.id,
        isLoader: false,
        live: true,
        currentIndex: null,
      };
      // delete params.unique_id;
      this.$store.dispatch('setCurrentPlay', currentPlay);
    },
    updateProgress(e) {
      this.playerInfo = {
        ...this.playerInfo,
        progress: (this.player.target.currentTime / this.player.target.duration) * 100,
        currentTime: this.player.target.currentTime,
      };
      if (this.player.target.currentTime === this.player.target.duration) {
        let currentIndex = this.currentPlay.currentIndex + 1;
        if (!this.userSongList[currentIndex]?.azura_id || currentIndex === null) {
          currentIndex = 0;
        }
        this.$store.dispatch('setCurrentPlay', {
          ...this.currentPlay,
          ...this.userSongList[currentIndex],
          currentIndex,
        });
      }
    },
    handlerPlay() {
      // console.log(this.currentPlay);
      // console.log(this.player);
      this.$store.dispatch('handlerPlayer', { play: true });
    },
    handlerPause() {
      this.$store.dispatch('handlerPlayer', { pause: true });
    },
    getSongList() {
      app
        .getFavoriteList()
        .then((res) => {
          this.$store.dispatch('setUserFavorite', { songs: res });
          console.log('res.length', res.length);
          if (res.length === 0) {
            this.$store.dispatch('setCurrentPlay', {
              ...this.currentPlay,
              live: true,
              isLoader: true,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handlerFavorites() {
      if (this.user?.id) {
        const params = {
          ...this.currentPlay,
          azura_id: Number(this.currentPlay.id) ? this.currentPlay.azura_id : this.currentPlay.id,
        };
        if (!this.isFavorites) {
          delete params.id;
          app
            .createFavoriteForUser(params)
            .then(() => {
              this.isFavorites = !this.isFavorites;
              this.getSongList();
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          console.log(params);
          app
            .removeFavorites(params)
            .then(() => {
              this.getSongList();
            })
            .catch((err) => {
              console.error(err);
            });
        }
      } else {
        this.$emit('shopAuthentication', true);
      }
    },
    changeVolume() {
      // console.log(this.songVolume);
      this.$store.dispatch('handlerPlayer', { volume: this.songVolume });
    },
    toggleVolume() {
      if (this.songVolume === 0) {
        this.songVolume = this.preToggleVol;
        // console.log(this.songVolume);
        this.$store.dispatch('handlerPlayer', { volume: this.preToggleVol });
      } else {
        this.preToggleVol = this.songVolume;
        this.songVolume = 0.0;
        // console.log(this.songVolume);
        this.$store.dispatch('handlerPlayer', { volume: this.songVolume });
      }
    },
    handleAuthRequired(e) {
      if (this.user?.id) return;
      this.$store.dispatch('setModal', { auth: true });
    },
  },
  getAudio(id) {
    app
      .getAudio(id)
      .then((res) => {
        console.log('res в методе getAudio', res);
        const blob = new Blob([res], { type: 'application/audio' });
        const audioUrl = URL.createObjectURL(blob);
        this.$store.dispatch('changePlayer', audioUrl);
        this.player.target.addEventListener('timeupdate', this.updateProgress);

        blob.arrayBuffer().then((buffer) => {
          var audioContext = new (window.AudioContext || window.webkitAudioContext)();
          audioContext.decodeAudioData(buffer, (decodedData) => {
            this.playerInfo.duration = decodedData.duration;
          });
        });
        this.$store.dispatch('setCurrentPlay', {
          ...this.currentPlay,
          isLoader: false,
        });
      })
      .catch((err) => {
        this.$store.dispatch('setCurrentPlay', {
          ...this.currentPlay,
          isLoader: false,
        });
        console.debug(err);
      });
  },
  changeLive() {
    if (this.currentPlay.live) {
      console.log('избранное');
      this.playerInfo.progress = 0;
      const params = {
        ...this.userSongList[this.currentPlay.currentIndex || 0],
        live: false,
        isLoader: true,
      };
      if (!this.currentPlay.currentIndex) params.currentIndex = 0;
      this.$store.dispatch('setCurrentPlay', params);
    } else {
      this.playerInfo.progress = 100;
      this.$store.dispatch('setCurrentPlay', {
        ...this.currentPlay,
        live: true,
        isLoader: true,
      });
      console.log('поток');
    }
  },
  getTime(value) {
    let minutes = Math.floor(value / 60);
    let seconds = Math.round(value % 60);

    let paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let paddedSeconds = seconds < 10 ? '0' + seconds : seconds;
    if (!paddedMinutes) paddedMinutes = '00';
    if (!paddedSeconds) paddedSeconds = '00';
    return `${paddedMinutes}:${paddedSeconds}`;
  },
});
</script>
