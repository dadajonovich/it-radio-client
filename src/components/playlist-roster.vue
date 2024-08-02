<template>
  <div class="playlist-roster">
    <PlaylistItem
      v-for="item in list"
      :key="`playlist_${item.id}`"
      :playlist="item"
      @selectPlaylist="selectPlaylist"
      @editPlaylist="editPlaylist"
    />
    <div class="playlist-item m--create" @click="createPlaylist">
      <div class="playlist-item__cover"></div>
      <div>Создать плейлист</div>
    </div>
  </div>
</template>

<script>
import PlaylistItem from '@/components/playlist-item.vue';

export default {
  name: 'playlist-roster',
  components: { PlaylistItem },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    createPlaylist() {
      this.$emit('createPlaylist');
    },
    selectPlaylist(params) {
      this.$router.push({ name: 'playlist', params: { id: params.id } });
    },
    editPlaylist(params) {
      this.$router.push({ name: 'playlist-edit', params: { id: params.id } });
    },
  },
};
</script>
