import ProjectCard from "../components/ProjectCard";
import useProjects from "../contexts/ProjectContext";
import PageTitle from "../components/PageTitle";

function ProjectsPage() {
    const { projects, meta, loading, error } = useProjects();

    let myProjects: typeof projects;
    if (projects) myProjects = projects;
    else myProjects = [];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="">loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto mt-8">
                <p>Error loading projects: {error}</p>
            </div>
        );
    }

    return (
        <div className="h-screen md:mb-0 flex flex-col sm:py-6 sm:px-[2rem] md:px-[5rem] md:py-0 lg:px-[8rem] xl:px-[12rem] 2xl:px-[18rem]">
            <PageTitle title={"PROJECTS"} count={meta ? meta.pagination.total : 0} skillIconName={null} />
            <br />
            <br />
            <div className="">
                {myProjects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-xl">No projects found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                        {myProjects.map((project) => (
                            <ProjectCard key={project.documentId} {...project} />
                        ))}
                    </div>
                )}
            </div>
            <br />
            <br />
        </div>
    );
}

export default ProjectsPage;
