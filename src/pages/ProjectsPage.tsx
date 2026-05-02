import ProjectCard from "../components/ProjectCard";
import useProjects from "../contexts/ProjectContext";
import PageTitle from "../components/PageTitle";

function ProjectsPage() {
    const { projects, meta, loading, error } = useProjects();

    let myProjects: typeof projects = projects || [];

    if (loading) {
        return (
            <div className="min-h-screen pt-32">
                <div className="max-w-4xl w-full mx-auto px-6 md:px-12 font-mono text-gray-400">
                    {">"} loading projects_database...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-32">
                <div className="max-w-4xl w-full mx-auto px-6 md:px-12">
                    <div className="border border-red-500 text-red-500 p-4 font-mono text-sm">
                        {">"} Error: {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        // The main outer wrapper with global background and padding
        <div className="min-h-screen pb-32 pt-24 md:pt-32">

            {/* The structural container keeping everything narrow and centered */}
            <div className="max-w-4xl w-full mx-auto px-6 md:px-12">

                <PageTitle title={"PROJECTS"} count={meta ? meta.pagination.total : 0} skillIconName={null} />

                {/* Main Content */}
                <div>
                    {myProjects.length === 0 ? (
                        // Minimal empty state
                        <div className="text-[#404040] text-center text-sm mt-10">
                            {">"} I have not made any projects yet.
                        </div>
                    ) : (
                        // Grid layout capped at 3 columns
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {myProjects.map((project) => (
                                <ProjectCard key={project.documentId} {...project} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProjectsPage;
