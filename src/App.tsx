import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import ProjectsPage from "./pages/ProjectsPage";
import BlogsPage from "./pages/BlogsPage";
import { ProjectProvider } from "./contexts/ProjectContext";
import ProjectPage from "./pages/ProjectPage";
import SkillPage from "./pages/SkillPage";
import BlogPage from "./pages/BlogPage";
import { BlogProvider } from "./contexts/BlogContext";
import TagPage from "./pages/TagPage";
import MainLayout from "./layouts/MainLayout";

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <App />,
                // errorElement: <PageNotFound />,
            },
            {
                path: "/skills/:documentId",
                element: <SkillPage />,
            },
            {
                path: "/projects",
                element: <ProjectsPage />,
            },
            {
                path: "/projects/:documentId",
                element: <ProjectPage />,
            },
            {
                path: "/blogs",
                element: <BlogsPage />,
            },
            {
                path: "/blogs/:documentId",
                element: <BlogPage />,
            },
            {
                path: "/tags/:documentId",
                element: <TagPage />,
            },
            {
                path: "*",
                element: <PageNotFound />,
            },
        ],
    },
]);

function App() {
    return (
        <div>
            <HomePage />
        </div>
    );
}

function Root() {
    return (
        <BlogProvider>
            <ProjectProvider>
                <RouterProvider router={router} />
            </ProjectProvider>
        </BlogProvider>
    );
}

export default Root;
