<template>
  <div class="song-list">
    <SongItem
      v-for="song in songList"
      :key="song"
      :song="song"
      :playSong="song.azura_id === currentPlay.azura_id ? currentPlay.isPlay : false"
      :selectSong="song.azura_id === currentPlay.azura_id"
      :songAlreadyAddPlaylist="songAlreadyAdd"
      @selectSong="handlerSelectSong"
      @playSong="handlerPlaySong"
      @pauseSong="handlerPauseSong"
      @removeSong="removeSong"
      @addPlaylist="addPlaylist"
      @removePlaylist="removePlaylist"
    />
  </div>
</template>

<script>
import SongItem from '@/components/song-item.vue';

export default {
  name: 'song-list',
  components: { SongItem },
  props: {
    songList: {
      type: Array,
      default: () => [],
    },
    songAlreadyAdd: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {};
  },
  computed: {
    currentPlay() {
      return this.$store.state.currentPlay;
    },
  },
  methods: {
    handlerSelectSong(params) {
      const data = { ...this.currentPlay, ...params, isLoader: true };
      data.currentIndex = this.songList.findIndex((el) => el.azura_id === params.azura_id);
      this.$store.dispatch('setCurrentPlay', data);
      console.log('handlerSelectSong');
    },
    handlerPlaySong(params) {
      this.$store.dispatch('setCurrentPlay', params);
      console.log('handlerPlaySong');
      // this.$store.dispatch('handlerPlayer', {pause: true});
    },
    handlerPauseSong(params) {
      this.$store.dispatch('setCurrentPlay', params);
      console.log('handlerPauseSong');
      // this.$store.dispatch('handlerPlayer', {play: true});
    },
    removeSong(song) {
      this.$emit('removeSong', song);
    },
    addPlaylist(song) {
      this.$emit('addPlaylist', song);
    },
    removePlaylist(song) {
      this.$emit('removePlaylist', song);
    },
  },
};
</script>
