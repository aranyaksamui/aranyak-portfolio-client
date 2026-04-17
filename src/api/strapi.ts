export const API_URL = (() => {
    if (import.meta.env.VITE_NODE_ENV === "development")
        return import.meta.env.VITE_REACT_APP_STRAPI_URL_DEV
    else if (import.meta.env.VITE_NODE_ENV === "production")
        return import.meta.env.VITE_REACT_APP_STRAPI_URL
})()
export const API_TOKEN = import.meta.env.VITE_STRAPI_API_KEY_TOKEN;

