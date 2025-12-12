import axios from "axios";
import { baseUrl } from "./constants.jsx";

const api = axios.create({
    baseURL: baseUrl,
});

// 요청에 토큰 추가
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("accessToken");
    console.log(token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;

        if (status === 500) {
            alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }

        return Promise.reject(error);
    }
);

export default api;
