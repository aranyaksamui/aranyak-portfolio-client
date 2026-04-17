import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { SingleProject, SingleProjectResponse } from "../types/project";
import api from "../api/axios";
import MarkdownRenderer from "../components/MarkdownRenderer";
import SkillsInPage from "../components/SkillsInPage";

function ProjectPage() {
    const { documentId } = useParams<{ documentId: string }>();
    const [project, setProject] = useState<SingleProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const coverImage = project?.Media[0]?.url;

    useEffect(() => {
        const fetchSingleProject = async () => {
            try {
                setLoading(true);
                const params = {
                    "fields[0]": "documentId",
                    "fields[1]": "Title",
                    "fields[2]": "SubTitle",
                    "fields[3]": "createdAt",
                    "fields[4]": "Description",
                    "populate[Media][fields][0]": "url", // Get only url
                    "populate[skills][fields][0]": "Name", // Get only skill names
                };
                const response = await api.get<SingleProjectResponse>(`/api/projects/${documentId}`, { params });
                if (response.data.data) {
                    setProject(response.data.data);
                } else setError("Failed to fetch project");
            } catch (err) {
                setError("Failed to fetch projects");
                console.error("Failed to fetch project", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSingleProject();
    }, [documentId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-white">loading...</div>
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
        <section className="bg-[#0a0a0a] mx-auto">
            {project ? (
                <div className="container mx-auto px-4 py-48 sm:px-6 md:px-10 lg:px-4 sm:py-16 md:py-20 xl:py-40 max-w-4xl text-white">
                    <article>
                        {/* Project Header */}
                        <header className="mb-8">
                            <div className="flex items-center text-gray-600 text-sm">
                                <span>
                                    {project?.createdAt && new Date(project?.createdAt).toLocaleDateString("en-GB")}
                                </span>
                            </div>
                            <h1 className="lg:text-4xl md:text-4xl lg:py-2 text-white font-black mb-2">
                                {project?.Title}
                            </h1>
                            <p className="text-xl text-gray-400 mb-4">{project?.SubTitle}</p>
                        </header>
                        {/* Cover Image */}
                        {project?.Media[0].url && (
                            <div className="mb-8">
                                <img src={`${coverImage}`} className="w-full h-auto shadow-md" />
                            </div>
                        )}
                        {/* Project Content */}
                        <section className="prose prose-lg max-w-none mb-8">
                            <MarkdownRenderer content={project?.Description} context="project" />
                        </section>
                        {/* Gallery
                            {project?.Media.length > 1 && (
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {project?.Media.slice(1).map((media: Media) => (
                                            <div key={media.id} className="overflow-hidden rounded-lg">
                                                <img
                                                    src={`${apiUrl}${media.url}`}
                                                    alt={media.alternativeText || `Project image ${media.id}`}
                                                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )} */}
                        {/* Skills */}
                        {project?.skills.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">Skills Used</h2>
                                <div className="grid sm:mt-8 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:w-4/6 lg:mt-0 lg:grid-cols-2 2xl:h-16 text-white">
                                    {project?.skills.map((skill) => (
                                        <SkillsInPage {...skill} />
                                    ))}
                                </div>
                            </section>
                        )}
                        <Link to={"/projects"} className="w-full mt-5 flex items-center justify-center">
                            <div className="bg-[#101010] flex items-center justify-center text-[#545454] py-3 px-5">
                                <MdOutlineKeyboardBackspace className="inline" />
                                <span className="ml-2">See all projects</span>
                            </div>
                        </Link>
                    </article>
                </div>
            ) : (
                <div>Project could not be fetched</div>
            )}
        </section>
    );
}

export default ProjectPage;
