import useProjects from "../../contexts/ProjectContext";
import ProjectCard from "../../components/ProjectCard";
import SectionTitle from "../../components/SectionTitle";
import { Link } from "react-router-dom";

function Project() {
    const { projects, meta, loading, error } = useProjects();

    // Show upto 3 projects in homepage
    let homePageProjects: typeof projects;
    if (projects)
        homePageProjects = projects.slice(0, 3);
    else homePageProjects = [];

    if (loading) {
        return (
            <div className="max-w-4xl w-full mx-auto px-6 md:px-12 font-mono text-gray-400">
                {">"} loading projects...
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl w-full mx-auto px-6 md:px-12">
                <div className="border border-red-500 text-red-500 p-4 font-mono text-sm">
                    {">"} Failed to load projects. {error}
                </div>
            </div>
        );
    }

    return (
        <section id="projects" className="max-w-4xl w-full mx-auto px-6 md:px-12 flex flex-col">
            <SectionTitle title="PROJECTS" count={meta ? meta.pagination.total : 0} />

            {/* Grid capped at 3 columns to prevent cards from squishing inside the 4xl max width */}
            <div className="mt-4 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {homePageProjects && homePageProjects.length > 0 ? (
                    homePageProjects.map((project) => (
                        <ProjectCard key={project.documentId} {...project} />
                    ))
                ) : (
                    // Minimalist empty state
                    <div className="col-span-full font-mono text-gray-400 text-sm">
                        {">"} I've not made any projects yet.
                    </div>
                )}
            </div>

            {homePageProjects && <Link
                to={"/projects"}
                className="mt-6 group block w-full md:max-w-xs mono text-xs text-[#646464] hover:text-gray-200 hover:border-white transition-all duration-200"
            >
                ALL_PROJECTS {">"}
            </Link>}
        </section>
    );
}

export default Project;
