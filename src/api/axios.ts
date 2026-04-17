import axios from "axios";
import { API_TOKEN, API_URL } from "./strapi";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`,
    }
});

export default api;