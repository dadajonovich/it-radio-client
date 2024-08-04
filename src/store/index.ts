import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';

const vuexPersist = new VuexPersist({
  key: 'it-radio',
});

export default createStore({
  state() {
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
  // plugins: [vuexPersist.plugin],
  mutations: {
    user(state, user) {
      state.user = user;
    },
    updateToken(state, tokens) {
      state.token = tokens.access;
      state.refreshToken = tokens.refresh;
    },
    removeToken(state) {
      state.token = null;
      state.refreshToken = null;
    },
    setCurrentPlay(state, song) {
      state.currentPlay = song;
    },
    setModal(state, show) {
      state.modal = { ...state.modal, ...show };
    },
    setPlayer(state, params) {
      state.player = { ...state.player, ...params };
    },
    initPlayer(state, { volume }) {
      // console.log(params);
      state.player.target = document.createElement('audio');
      // console.log(state.player.target);
      state.player.target.src = '';
      state.player.target.preload = 'auto';
      state.player.target.controls = true;
      // По умолчанию создается с volume 1
      state.player.target.volume = volume;
    },
    changePlayer(state, params) {
      const awaitPlay = () => {
        if (state.player.target.readyState >= 4) {
          if (state.currentPlay.isPlay) {
            state.player.target.play();
          }
          state.currentPlay.isLoader = false;
          state.player.target.removeEventListener('canplaythrough', awaitPlay);
        } else {
          awaitPlay();
        }
      };

      state.player.target.src = params;
      state.player.src = params;
      // state.currentPlay.isLoader = true;
      state.player.target.addEventListener('canplaythrough', awaitPlay);
    },
    handlerPlayer(state, params) {
      // console.log('hanlerPlayer', params);
      if (params.pause) {
        state.currentPlay.isPlay = false;
        state.player.target.pause();
      }
      if (params.play) {
        // console.log(state);
        if (state.player.target.readyState >= 3) {
          state.currentPlay.isPlay = true;
          state.player.target.play();
        }
      }
      if ('volume' in params) {
        // console.log('handlerPlayer', params.volume);
        state.player.target.volume = params.volume;
        // console.log('audio.volume', state.player.target.volume);
      }
    },
    setUserFavorite(state, params) {
      state.userFavorite = { ...state.userFavorite, ...params };
    },
  },
  actions: {
    setToken(context, tokens) {
      context.commit('updateToken', tokens);
    },
    setUser(context, user) {
      context.commit('user', user);
    },
    deathUser(context) {
      context.commit('user', {});
      context.commit('removeToken');
    },
    setCurrentPlay(context, song) {
      context.commit('setCurrentPlay', song);
    },
    setModal(context, show) {
      context.commit('setModal', show);
    },
    setPlayer(context, params) {
      context.commit('setPlayer', params);
    },
    initPlayer(context, params) {
      context.commit('initPlayer', params);
    },
    handlerPlayer(context, params) {
      context.commit('handlerPlayer', params);
    },
    changePlayer(context, params) {
      context.commit('changePlayer', params);
    },
    setUserFavorite(context, params) {
      context.commit('setUserFavorite', params);
    },
  },
});
