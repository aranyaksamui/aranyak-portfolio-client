import React, { createContext, useContext, useEffect, useReducer } from "react";
import ProjectContextState, { Project } from "../types/project";
import projectReducer from "../reducers/ProjectReducer";
import { StrapiResponse } from "../types/strapi";
import api from "../api/axios";

// Initial state
const initialState: ProjectContextState = {
    projects: [],
    meta: null,
    loading: true,
    error: null,
};

// Create project context
const ProjectContext = createContext<ProjectContextState>(initialState);

// Create project provider
export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(projectReducer, initialState);

    useEffect(() => {
        const fetchProjects = async () => {
            dispatch({ type: "FETCH_PROJECT_START" });
            try {
                const params = {
                    "fields[0]": "documentId",
                    "fields[1]": "Title",
                    "fields[2]": "SubTitle",
                    "fields[3]": "createdAt",
                    "populate[Media][fields][0]": "url", // Get only formats
                    "populate[skills][fields][0]": "Name", // Get only skill names
                };
                const response = await api.get<StrapiResponse<Project[]>>(`/api/projects`, { params });
                dispatch({ type: "FETCH_PROJECT_SUCCESS", payload: response.data.data, meta: response.data.meta });
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Failed to fetch projects";
                dispatch({ type: "FETCH_PROJECT_ERROR", payload: errorMessage });
            }
        };
        fetchProjects();
    }, []);

    return <ProjectContext.Provider value={state}>{children}</ProjectContext.Provider>;
};

const useProjects = () => useContext(ProjectContext);

export default useProjects;
