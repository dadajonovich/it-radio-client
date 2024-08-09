import { defineStore } from 'pinia';

type State = {
  token: string | null;
  refreshToken: string | null;
  user: any;
  modal: {
    auth: boolean;
    changingUser: boolean;
  };
  showAuthModal: boolean;
  station: {
    id: number;
  };
  currenPlay: {
    isPlay: boolean;
    isLoader: boolean;
    live: boolean;
    currentIndex: any;
  };
  player: {
    target: any;
  };
  userFavorite: {
    podcast: any;
    playlist: any;
    songs: any;
  };
};

export const usePlayerStore = defineStore('store', {
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
