import { defineStore } from 'pinia';

export const usePlayerStore = defineStore('playerInfo', {
  state: () => {
    return {
      token: null,
      refreshToken: null,
      user: null,
      modal: {
        auth: false,
        changingUser: false,
      },
      showAuthModal: false,
      station: {
        id: 1,
      },
      currentPlay: {
        isPlay: false,
        isLoader: false,
        live: true,
        // volume: 0.5,
        currentIndex: null,
      },
      player: {
        target: null,
      },
      userFavorite: {
        podcast: [],
        playlist: [],
        songs: [],
      },
    };
  },
});
