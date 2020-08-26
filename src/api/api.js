import React from 'react';
import * as axios from 'axios';
import qs from 'qs'


const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    paramsSerializer: function (params) {
        return qs.stringify(params, { indices: false })
    }
})


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    } else {
        return config
    }
    return config
}, error => {
    return Promise.reject(error)
})


export const getUsers = () => { return api.get(`/users`) }

export const signupAPI = (data) => api.post(`/user`, { data })

export const getUser = (email) => api.get(`/user/${email}`)

export const getContest = (id) => api.get(`/usercontest/${id}`)

export const loginUser = (data) => api.post(`/login`, { data })

export const createContest = (data) => api.post(`/contest`, { data })

export const currentUser = () => api.get('/current-user')

export const currentContest = (id) => { return api.get(`/curentcontest/${id}`) }

export const allContest = () => { return api.get('/contest') }

export const payPcg = (data) => { return api.post('/pay', { data }) }

export const activeContest = (id) => {return api.get(`/activecontest/${id}`) }

const apis = {
    getUsers,
    signupAPI,
    getUser,
    loginUser,
    createContest,
    getContest,
    currentUser,
    currentContest,
    allContest,
    payPcg,
    activeContest
}

export default apis