// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://18.159.235.178:8000/',
    withCredentials: true
});

// api.interceptors.request.use(config => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// },
//     error => {
//         return Promise.reject(error);
//     }
// );

export default api;
