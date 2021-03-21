import { MOVIES_BASE_URL } from '../configs/constants';

class Api {
    constructor(options) {
        this._headers = options.headers; // Передаем заголовок
        this._baseUrl = options.baseUrl; // Передаем базовый URL
    }

    _sendRequest(link, params) {
        return fetch(link, params)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status} - ${res.statusText}`);
          });
    }

    // запрос списка фильмов
    getMovies() {
        return this._sendRequest(`${this._baseUrl}/beatfilm-movies`, {
            headers: this._headers,
        });
    }
}

const moviesApi = new Api({
    baseUrl: MOVIES_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default moviesApi;