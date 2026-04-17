import useProjects from "../../contexts/ProjectContext";
import ProjectCard from "../../components/ProjectCard";
import SectionTitle from "../../components/SectionTitle";

function Project() {
    const { projects, meta, loading, error } = useProjects();

    // Show upto 3 projects in homepage
    let homePageProjects: typeof projects;
    if (projects)
        homePageProjects = projects.slice(0, 3);
    else homePageProjects = [];

    if (loading) {
        return (
            <div className="h-64 flex justify-center items-center text-white">
                <div className="">loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto mt-8">
                <p>Failed to load projects. {error}</p>
            </div>
        );
    }

    return (
        <section className="text-white h-screen sm:h-max sm:my-24 flex flex-row sm:flex-col lg:h-screen">
            <SectionTitle title="PROJECTS" count={meta ? meta.pagination.total : 0} />
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                {homePageProjects ? (
                    homePageProjects.map((project) => {
                        return <ProjectCard key={project.documentId} {...project} />;
                    })
                ) : (
                    <div className="sm:mt-8 grid lg:grid-cols-3 md:grid-cols-2 md:gap-6 sm:grid-cols-1 sm:gap-5 sm:items-center">
                        I've not made any projects yet!
                    </div>
                )}
            </div>
        </section>
    );
}

export default Project;
