import axios from "axios";
import { API_SEC, API_URL } from "./strapi";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${API_SEC}`,
    }
});

export default api;