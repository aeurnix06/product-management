import axios from "axios";

const API = axios.create({
    baseURL: "https://level3-task1-backend.onrender.com/api",
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;