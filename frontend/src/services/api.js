import axios from 'axios';

// 1. Create axios instance
const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// 2. THIS PART AUTO-ADDS TOKEN TO EVERY REQUEST
API.interceptors.request.use((req) => {
    console.log("TOKEN ATTACHED REQUEST:", req.url);

    const user = localStorage.getItem('user');

    if (user) {
        const token = JSON.parse(user).token;
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;