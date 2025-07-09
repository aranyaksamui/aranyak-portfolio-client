import { BlogActionTypes, BlogContextState } from "../types/blog";

// Create blog reducer function
const blogReducer = (state: BlogContextState, action: BlogActionTypes) => {
    switch (action.type) {
        case "FETCH_BLOG_START":
            return { ...state, loading: true, error: null };
        case "FETCH_BLOG_SUCCESS":
            return { ...state, blogs: action.payload, meta: action.meta, loading: false };
        case "FETCH_BLOG_ERROR":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default blogReducer;