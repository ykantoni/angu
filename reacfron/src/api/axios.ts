import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "../context/AuthProvider";

const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true // important so refresh cookie is sent
});

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

function processQueue(token: string | null) {
    refreshQueue.forEach(cb => cb(token));
    refreshQueue = [];
}

api.interceptors.request.use(config => {
    const token = getAccessToken();
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    res => res,
    async err => {
        const original = err.config;
        if (err.response?.status === 401 && !original._retry) {
            original._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    refreshQueue.push((token) => {
                        if (token) {
                            original.headers.Authorization = `Bearer ${token}`;
                            resolve(axios(original));
                        } else {
                            reject(err);
                        }
                    });
                });
            }

            isRefreshing = true;
            try {
                const refreshRes = await axios.post(
                    "/refresh",
                    {},
                    { withCredentials: true }
                );
                const newToken: string = refreshRes.data.accessToken;
                setAccessToken(newToken);
                processQueue(newToken);
                original.headers.Authorization = `Bearer ${newToken}`;
                return axios(original);
            } catch (refreshErr) {
                processQueue(null);
                clearAccessToken();
                return Promise.reject(refreshErr);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(err);
    }
);

export default api;