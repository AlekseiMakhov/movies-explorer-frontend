import { 
    conflictError, loginError, serverError, tokenNotCorrect, tokenNotRecieved 
} from '../configs/errors';

import { 
    BAD_REQUEST, BASE_URL, CONFLICT_REQUEST, SERVER_ERROR, UNAUTORIZED 
} from '../configs/constants';

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => {
        if (res.status === BAD_REQUEST) {
            throw new Error(loginError)
        } else if (res.status === UNAUTORIZED) {
            throw new Error(loginError)
        } else
        return res.json()
    })
}

export const register = (email, password, name) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password, name})
    })
    .then(response => {
        if (response.status === BAD_REQUEST) throw new Error(loginError)
        if (response.status === CONFLICT_REQUEST) throw new Error(conflictError)
        if (response.status === SERVER_ERROR) throw new Error(serverError) 
        return response.json()
    })
    .then(res => res)
}

export const tokenCheck = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(res => {
        if (res.status === BAD_REQUEST) {
            throw new Error(tokenNotRecieved)
        } else if (res.status === UNAUTORIZED) {
            throw new Error(tokenNotCorrect)
        } else
        return res.json()
    })
    .then(res => res)
}