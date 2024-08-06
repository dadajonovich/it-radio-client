import { urlPath as settings } from '@/settings';
import { REST, RESTError } from './rest';

// console.log(settings);

export type TeamResponce = {
  id: number;
  name: string;
  last_name: string;
  position: string;
  img_person: string;
};

type NowPlayingResponce = {};

export default class extends REST {
  static get settings() {
    return settings;
  }
  static user(params): UserResponce {
    return this._get('user', {}, params)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Не удалось создать пользователя');
      });
  }
  static loginUser(params) {
    return this._post('token', {}, params)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Не удалось создать пользователя');
      });
  }
  static createUser(params) {
    return this._post('user/create_user', {}, params)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Не удалось создать пользователя');
      });
  }

  static updateUser(params) {
    return this._post('user/update_user', {}, params)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Не удалось создать пользователя');
      });
  }

  static getTeams(): Promise<TeamResponce[]> {
    return this._get('radio/teams')
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении команды');
      });
  }

  static getCheckFavoriteSong(id) {
    // return this._get(`radio/song/check_is_favorite/${id}`, {}, {})
    return this._get(`radio/song/${id}/check_is_favorite`, {}, {})

      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при проверке песни');
      });
  }
  static getAllSong() {
    return this._get('radio/song/get_all_song', {}, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получениии всех песен');
      });
  }
  static getAudio(id) {
    // return this._get(`radio/song/get_audio/${id}`, {}, {}, false, true)
    return this._get(`radio/song/${id}/get_audio/`, {}, {}, false, true)

      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получениии песни');
      });
  }
  static createFavoriteForUser(id) {
    // return this._post(`radio/song/add_favorite`, {}, params)
    return this._post(`radio/song/${id}/add_favorite`, {}, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении плейлистов');
      });
  }

  static removeFavoriteForUser(params) {
    return this._post('radio/song/delete_song', {}, params)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении плейлистов');
      });
  }

  static getFavoriteList(params) {
    return this._get('radio/song', {}, params)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении плейлистов');
      });
  }
  static getRubriks() {
    return this._get('radio/rubriks', {}, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении рубрик');
      });
  }
  static getRubrik(id) {
    return this._get(`radio/rubriks/${id}`, {}, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении рубрик');
      });
  }

  static removeFavorites(params) {
    return this._post('radio/song/delete_song', {}, params)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении рубрик');
      });
  }

  static getPlaylists() {
    return this._get('radio/playlists', {}, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении плейлистов');
      });
  }
  static getPlaylist(id) {
    return this._get(`radio/playlists/${id}`, {}, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении плейлистов');
      });
  }

  static addSongToPlaylist(id) {
    // return this._post(`radio/playlists/add_to_playlist`, {}, params)
    return this._post(`radio/playlists/${id}/add_to_playlist`, {}, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении плейлистов');
      });
  }
  static removeSongToPlaylist(id) {
    // return this._post(`radio/playlists/delete_song_with_playlist`, {}, params)
    return this._post(`radio/playlists/${id}/delete_song_with_playlist`, {}, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при удаления треков из плейлиста');
      });
  }
  static updatePlaylist(id) {
    // return this._post(`radio/playlists/update_playlist`, {}, params)
    return this._post(`radio/playlists/${id}/update_playlist`, {}, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при удаления треков из плейлиста');
      });
  }

  static createPlaylists() {
    return this._post('radio/playlists/create_playlist', {}, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении плейлистов');
      });
  }

  static getNews(station, params) {
    return this._get('radio.mp3', params, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении плейлистов');
      });
  }
  static getProfiles(station, params) {
    return this._get('radio.mp3', params, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении плейлистов');
      });
  }

  static getNowplaying(station, params) {
    return this._get('radio/song/get_nowplaying', params, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении информации о текущем треке');
      });
  }

  static getSupportInfo() {
    return this._get('radio/support_info', {}, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении контактов');
      });
  }
}

// window.django = Django;
