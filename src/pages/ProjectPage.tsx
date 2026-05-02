import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SingleProject, SingleProjectResponse } from "../types/project";
import api from "../api/axios";
import MarkdownRenderer from "../components/MarkdownRenderer";
import SkillsInPage from "../components/SkillsInPage";

function ProjectPage() {
    const { documentId } = useParams<{ documentId: string }>();
    const [project, setProject] = useState<SingleProject | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const coverImage = project?.Media?.[0]?.url || null;

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

    // Brutalist Loading State (Without font-mono)
    if (loading) {
        return (
            <div className="min-h-screen  pt-32">
                <div className="max-w-4xl w-full mx-auto px-6 md:px-12 text-gray-400 uppercase tracking-widest text-sm">
                    {">"} loading project_data...
                </div>
            </div>
        );
    }

    // Brutalist Error State (Without font-mono)
    if (error) {
        return (
            <div className="min-h-screen  pt-32">
                <div className="max-w-4xl w-full mx-auto px-6 md:px-12">
                    <div className="border border-red-500 text-red-500 p-4 text-sm uppercase tracking-widest">
                        {">"} Error: {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen text-gray-200 pb-32 pt-24 md:pt-32 flex flex-col">
            {project ? (
                <article className="w-full">

                    {/* 1. THE HEADER (Restricted to max-w-4xl for readability) */}
                    <div className="max-w-4xl w-full mx-auto px-6 md:px-12">
                        <header className="mb-10">
                            <div className="text-xs text-[#fe8e0d] mb-4 tracking-widest uppercase font-light">
                                {">"} {project.createdAt && new Date(project.createdAt).toLocaleDateString("en-GB")}
                            </div>

                            <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase mb-6 leading-none">
                                {project.Title}
                            </h1>

                            {project.SubTitle && (
                                <p className="text-lg md:text-lg text-[#808080] font-light leading-relaxed">
                                    {project.SubTitle}
                                </p>
                            )}
                        </header>
                    </div>

                    {/* 2. THE WIDE IMAGE (Breaks out to max-w-7xl for a cinematic look) */}
                    <div className="max-w-7xl w-full mx-auto px-6 md:px-12 mb-16 md:mb-24">
                        {/* We give this container a fixed responsive height to create a "widescreen" banner */}
                        <div className="relative group w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">

                            {/* Orange Offset Shadow */}
                            <div className="absolute inset-0 border border-[#fe8e0d] translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 z-0"></div>

                            <div className="relative z-10 w-full h-full bg-[#fff] p-2 md:p-3">
                                {coverImage ? (
                                    <img
                                        src={`${coverImage}`}
                                        alt={project.Title}
                                        // object-cover: Fills the entire wide container without stretching/squishing.
                                        // object-center: Keeps the middle of the image in focus if it gets cropped.
                                        className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[#111] flex items-center justify-center text-gray-600 uppercase tracking-widest text-sm md:text-base">[ IMAGE_NOT_FOUND ]
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 3. THE CONTENT (Restricted back to max-w-4xl so the text doesn't span across your whole monitor) */}
                    <div className="max-w-4xl w-full mx-auto px-6 md:px-12">

                        <section className="prose prose-invert prose-lg max-w-none mb-16 prose-a:text-orange-500 hover:prose-a:text-orange-400">
                            <MarkdownRenderer content={project.Description} context="project" />
                        </section>

                        {/* Skills Used Section */}
                        {project.skills && project.skills.length > 0 && (
                            <section className="mono font-normal mb-12">
                                <h3 className="text-md text-[#646464] mb-3 flex items-center">
                                    {">"} skillset:
                                </h3>
                                {/* Reusing the dense grid from Skills.tsx */}
                                <div className="flex justify-self-start gap-5">
                                    {project.skills.map((skill) => (
                                        // Added key to prevent React console warnings
                                        <SkillsInPage iconSize={20} key={skill.documentId} {...skill} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Return Button */}
                        <Link 
                            to={"/projects"} 
                            className="group block w-full md:max-w-xs mono text-sm text-[#646464] hover:text-gray-200 hover:border-white transition-all duration-200"
                        >
                            {"<"} ALL_PROJECTS
                        </Link>

                        <Link 
                            to={"/"} 
                            className="mt-4 group block w-full md:max-w-xs mono text-sm text-[#646464] hover:text-gray-200 hover:border-white transition-all duration-200"
                        >
                            {"<"} HOME_PAGE
                        </Link>

                    </div>
                </article>
            ) : null}
        </section>
    );
}

export default ProjectPage;
