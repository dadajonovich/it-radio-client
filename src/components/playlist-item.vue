<template>
  <div class="playlist-item" @click="selectPlaylist">
    <div class="playlist-item__cover"></div>
    <div>{{ playlist.name }}</div>
    <div @click="editPlaylist">...</div>
  </div>
</template>

<script>
export default {
  name: 'playlist-item',
  props: {
    playlist: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    editPlaylist() {
      this.$emit('editPlaylist', this.playlist);
    },
    selectPlaylist() {
      this.$emit('selectPlaylist', this.playlist);
    },
  },
};
</script>
