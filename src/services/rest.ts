import ajax from '@/utils/ajax';
import router from '@/router';
import store from '@/store';
import cache from '@/utils/cache';

class RESTError extends Error {
  constructor(error, message, params = {}) {
    let detail =
      error.response &&
      error.response.data &&
      (error.response.data.detail || (error.response.data.error && error.response.data.error.detail));
    let header = (message || error.message) + (detail ? ': ' + detail : '');
    super(header);

    this.name = this.constructor.name;
    this.parent = error;
    this.detail = detail;
    this.response = error.response;
    for (let k in params) {
      this[k] = params[k];
    }

    //if (this.response && (this.response.status === 401 || this.response.status === 403)) {
    if (this.response && this.response.status === 401) {
      store.dispatch('deathUser');
      store.dispatch('setShowAuthModal', true);
    } else {
      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error(header).stack;
      }
    }
  }
}

class REST {
  static get settings() {
    throw new Error('settings must be overridden');
  }
  static _get(url, params = {}, extraParams, use_cache = false, isBlob = false) {
    return this._request('get', url, params, {}, {}, extraParams, use_cache, isBlob);
  }
  static _post(url, params, data) {
    return this._request('post', url, params, data);
  }
  static _put(url, params, data) {
    return this._request('put', url, params, data);
  }
  static _patch(url, params, data) {
    return this._request('patch', url, params, data);
  }
  static _delete(url, params, data) {
    return this._request('delete', url, params, data);
  }
  static _request(
    method,
    url,
    params = {},
    data = {},
    extraData = {},
    extraParams = {},
    use_cache = false,
    isBlob = false,
  ) {
    let cache_key = null;
    return ajax
      .request({
        method,
        url: `${this.settings}${url ? '/' : ''}${url}/`,
        params,
        data,
        extraData,
        extraParams,
        headers: this._getAuthHeaders(),
        responseType: this._getResponseType(isBlob),
      })
      .then((response) => {
        if (cache_key) {
          cache.set(cache_key, response.data);
        }
        return response.data;
      });
  }
  static _getResponseType(value) {
    if (value) {
      return 'arraybuffer';
    }
  }
  static _getAuthHeaders() {
    if (store.state.token) {
      return { Authorization: `Bearer ${store.state.token}` };
    }
  }
  static _cancelToken() {
    return ajax.cancelToken();
  }
}

export default REST;

export { RESTError, REST };
