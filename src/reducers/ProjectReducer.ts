import ProjectContextState, { ProjectActionTypes } from "../types/project";

// Create project reducer function
const projectReducer = (state: ProjectContextState, action: ProjectActionTypes) => {
    switch (action.type) {
        case "FETCH_PROJECT_START":
            return { ...state, loading: true, error: null };
        case "FETCH_PROJECT_SUCCESS":
            return { ...state, projects: action.payload, meta:action.meta, loading: false };
        case "FETCH_PROJECT_ERROR":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default projectReducer;