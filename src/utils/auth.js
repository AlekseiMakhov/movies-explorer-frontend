import { 
    conflictError, loginError, serverError, tokenNotCorrect, tokenNotRecieved 
} from '../configs/errors';

import { BASE_URL } from '../configs/constants';

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
        if (res.status === 400) {
            throw new Error(loginError)
        } else if (res.status === 401) {
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
        if (response.status === 400) throw new Error(loginError)
        if (response.status === 409) throw new Error(conflictError)
        if (response.status === 500) throw new Error(serverError) 
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
        if (res.status === 400) {
            throw new Error(tokenNotRecieved)
        } else if (res.status === 401) {
            throw new Error(tokenNotCorrect)
        } else
        return res.json()
    })
    .then(res => res)
}