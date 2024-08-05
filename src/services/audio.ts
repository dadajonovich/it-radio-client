import { urlPathAudio as settings } from '@/settings';
import { REST, RESTError } from './rest';

// запросы на AzuraCast

type AzuraData = {
  data: {
    np: {
      now_playing: {
        song: DataSong;
      };
      station: {
        listen_url: string;
      };
    };
  };
};

export type DataSong = {
  id: string;
  text: string;
  artist: string;
  title: string;
  album: string;
  genre: string;
  isrc: string;
  lyrics: string;
  art: string;
};

export type AzuraFirstResponce = {
  connect: {
    subs: {
      'station:it-radio': {
        publications: [AzuraData];
      };
    };
  };
};

export type AzuraSecondResponce = {
  pub: AzuraData;
};

export default class extends REST {
  static get settings() {
    return settings;
  }

  connection: EventSource | undefined;

  init() {
    const sseBaseUri = `${settings}/api/live/nowplaying/sse`;
    // console.log('sseBaseUri', sseBaseUri);
    const sseUriParams = new URLSearchParams({
      cf_connect: JSON.stringify({
        subs: {
          'station:it-radio': { recover: true },
        },
      }),
    });
    // console.log('sseUriParams', sseUriParams.toString());
    this.connection = new EventSource(sseBaseUri + '?' + sseUriParams.toString());
    // window.connection = this.connection;
    // this.connection.onopen = (e) => console.log('connected', e);
  }

  removePlay() {
    if (this.connection) {
      this.connection.close();
    } else throw new Error('Соединение с AzuraCast не установлено!');
  }
  songs() {
    this.connection.onmessage = (e) => {
      const jsonData = JSON.parse(e.data);
      // if ("connect" in jsonData) {
      //     const connectData = jsonData.connect;
      //
      //     if ("data" in connectData) {
      //         // Legacy SSE data
      //         connectData.data.forEach((initialRow) => handleSseData(initialRow));
      //     } else {
      //         // New Centrifugo time format
      //         if ("time" in connectData) {
      //         }
      //
      //         // New Centrifugo cached NowPlaying initial push.
      //         for (const subName in connectData.subs) {
      //             const sub = connectData.subs[subName];
      //             if ("publications" in sub && sub.publications.length > 0) {
      //                 sub.publications.forEach((initialRow) => handleSseData(initialRow, false));
      //             }
      //         }
      //     }
      // } else if ("pub" in jsonData) {
      //     handleSseData(jsonData.pub);
      // }
    };
  }

  onHandler(callback: (e: MessageEvent) => void) {
    if (this.connection) {
      this.connection.onmessage = callback;
    } else throw new Error('Соединение с AzuraCast не установлено!');
  }
  static getPlayList(station, params) {
    // return this._get(`station/${station}/playlists`, params, {}).then((data) => {
    return this._get('radio.mp3', params, {})
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw new RESTError(error, 'Ошибка при получении плейлистов');
      });
  }
}
