import { BASE_URL, MOVIES_BASE_URL } from '../configs/constants';

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
                return Promise.reject(res);
          });
    }

    // редактирование профиля
    editProfileInfo(name, email, token) {
        return this._sendRequest(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {authorization: `Bearer ${token}`, ...this._headers},
            body: JSON.stringify({
                name,
                email,
            }),
        });
    }

    // запрос данных профиля
    getProfileInfo(token) {
        return this._sendRequest(`${this._baseUrl}/users/me`, {
            headers: {authorization: `Bearer ${token}`, ...this._headers},
        });
    }

    // добавление фильма
    addMovie(movie, token) {
        return this._sendRequest(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {authorization: `Bearer ${token}`,...this._headers},
            body: JSON.stringify({
                movieId: movie.id || 0,
                nameRU: movie.nameRU || 'no russian name',
                nameEN: movie.nameEN || 'no english name',
                director: movie.director || 'without director',
                description: movie.description || 'witout description',
                trailer: movie.trailerLink || 'https://youtu.be/yGgbNCkJqSM',
                country: movie.country || 'the whole world',
                duration: movie.duration || 0,
                year: +movie.year || 0,
                image: MOVIES_BASE_URL+movie.image.url || 'https://tir-izmailovo.ru/wp-content/uploads/2016/10/404_error.jpg',
                thumbnail: MOVIES_BASE_URL+movie.image.formats.thumbnail.url || 'https://tir-izmailovo.ru/wp-content/uploads/2016/10/404_error.jpg',
            }),
        });
    }

    // удаление фильма из базы
    deleteMovie(movieId, token) {
        return this._sendRequest(`${this._baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {authorization: `Bearer ${token}`, ...this._headers},
        });
    }

    // запрос сохраненных фильмов
    getMovies(token) {
        return this._sendRequest(`${this._baseUrl}/movies`, {
            headers: {authorization: `Bearer ${token}`, ...this._headers},
        });
    }
}

const mainApi = new Api({
    baseUrl: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default mainApi;