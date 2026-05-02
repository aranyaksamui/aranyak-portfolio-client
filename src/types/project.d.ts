import { StrapiMeta } from "./strapi";

// Interface for single project post in card format
export interface Project {
    id: number;
    documentId: string;
    Title: string;
    SubTitle: string | null;
    createdAt: string;
    Media: Media[] | null;
    skills: Skill[];
}

// Types for ProjectContext reducer
export type ProjectActionTypes =
    | { type: "FETCH_PROJECT_START" }
    | { type: "FETCH_PROJECT_SUCCESS"; payload: Project[]; meta: StrapiMeta }
    | { type: "FETCH_PROJECT_ERROR"; payload: string };

// Interfaces for single project in ProjectPage.tsx
export interface SingleProjectMedia {
    id: number;
    documentId: string;
    url: string;
}

export interface SingleProjectSkills {
    id: number;
    documentId: string;
    Name: string;
}

export interface SingleProject {
    id: number;
    documentId: string;
    Title: string;
    SubTitle: string;
    createdAt: string;
    Description: string;
    Media: Media[] | null;
    skills: Skill[];
}

export interface SingleProjectResponse {
    data: SingleProject
}

// Interface for ProjectContext
interface ProjectContextState {
    projects: Project[];
    meta: StrapiMeta | null;
    loading: Boolean;
    error: string | null;
}

export default ProjectContextState;
