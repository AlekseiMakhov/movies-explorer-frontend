import BASE_URL from '../constants/constants';

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

    // редактирование профиля
    editProfileInfo(user, token) {
        return this._sendRequest(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {authorization: `Bearer ${token}`, ...this._headers},
            body: JSON.stringify({
                name: user.name,
                email: user.email
            }),
        });
    }

    // запрос данных профиля
    getProfileInfo(token) {
        return this._sendRequest(`${this._baseUrl}/users/me`, {
            headers: {authorization: `Bearer ${token}`, ...this._headers},
        });
    }

    // отправка данных о новой карточке
    createNewCard(movie, token) {
        return this._sendRequest(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {authorization: `Bearer ${token}`,...this._headers},
            body: JSON.stringify({
                movie: movie
            }),
        });
    }

    // удаление карточки
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