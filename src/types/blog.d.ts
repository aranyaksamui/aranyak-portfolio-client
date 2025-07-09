import { StrapiMeta } from "./strapi";

// Interface for single blog post in card form
export interface Blog {
    id: number;
    documentId: string;
    Title: string;
    SubTitle: string | null;
    createdAt: string;
    CoverImage: Media;
    skills: Skill[];
    tags: Tag[];
}

// Types for ProjectContext reducer
export type BlogActionTypes =
    | { type: "FETCH_BLOG_START" }
    | { type: "FETCH_BLOG_SUCCESS"; payload: Blog[], meta: StrapiMeta }
    | { type: "FETCH_BLOG_ERROR"; payload: string };

// Interfaces for single blog in BlogPage.tsx
export interface SingleBlogMedia {
    id: number;
    documentId: string;
    url: string;
}

export interface SingleBlogSkills {
    id: number;
    documentId: string;
    Name: string;
}

export interface SingleBlog {
    id: number;
    documentId: string;
    Title: string;
    SubTitle: string;
    createdAt: string;
    Body: string;
    CoverImage: Media;
    skills: Skill[];
    tags: Tag[];
}

export interface SingleBlogResponse {
    data: SingleBlog
}

// Interface for BlogContext
interface BlogContextState {
    blogs: Blog[];
    meta: StrapiMeta | null;
    loading: Boolean;
    error: string | null;
}