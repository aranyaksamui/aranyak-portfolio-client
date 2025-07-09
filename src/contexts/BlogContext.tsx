import React, { createContext, useContext, useEffect, useReducer } from "react";
import { StrapiResponse } from "../types/strapi";
import api from "../api/axios";
import { Blog, BlogContextState } from "../types/blog";
import blogReducer from "../reducers/BlogReducer";

// Initial state
const initialState: BlogContextState = {
    blogs: [],
    meta: null,
    loading: true,
    error: null,
};

// Create blog context
const BlogContext = createContext<BlogContextState>(initialState);

// Create blog provider
export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, initialState);

    useEffect(() => {
        const fetchBlogs = async () => {
            dispatch({ type: "FETCH_BLOG_START" });
            try {
                const params = {
                    "fields[0]": "documentId",
                    "fields[1]": "Title",
                    "fields[2]": "SubTitle",
                    "fields[3]": "createdAt",
                    "populate[CoverImage][fields][0]": "url", // Get only url
                    "populate[skills][fields][0]": "Name",   // Get only skill names
                    "populate[tags][fields][0]": "TagName"   // Get only tag names
                };
                const response = await api.get<StrapiResponse<Blog[]>>(`/api/blogs`, { params });
                dispatch({ type: "FETCH_BLOG_SUCCESS", payload: response.data.data, meta: response.data.meta });
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Failed to fetch blog posts";
                dispatch({ type: "FETCH_BLOG_ERROR", payload: errorMessage });
            }
        };
        fetchBlogs();
    }, []);

    return <BlogContext.Provider value={state}>{children}</BlogContext.Provider>;
};

const useBlogs = () => useContext(BlogContext);

export default useBlogs;
