import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { Project } from "../types/project";
import { StrapiMeta, StrapiResponse } from "../types/strapi";
import { Skill } from "../types/skill";
import ProjectCard from "../components/ProjectCard";
import { Blog } from "../types/blog";
import BlogCard from "../components/BlogCard";
import SectionTitle from "../components/SectionTitle";
import PageTitle from "../components/PageTitle";

function SkillPage() {
    const { documentId } = useParams<{ documentId: string }>();

    const [skillName, setSkillName] = useState<string | null>(null);
    const [projectsOfSkill, setProjectsOfSkill] = useState<Project[] | []>([]);
    const [projectsOfSkillMeta, setProjectsOfSkillMeta] = useState<StrapiMeta | null>(null);
    const [blogsOfSkill, setBlogsOfSkill] = useState<Blog[] | []>([]);
    const [blogsOfSkillMeta, setBlogsOfSkillMeta] = useState<StrapiMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch the skill name for headers
    useEffect(() => {
        const fetchSkillName = async () => {
            try {
                setLoading(false);
                const params = {
                    "filters[documentId][$eq]": documentId,
                    "fields[0]": "Name",
                };
                const response = await api.get<StrapiResponse<Skill[]>>(`/api/skills`, { params });
                if (response.data && response.data.data.length > 0) {
                    setSkillName(response.data.data[0]?.Name);
                } else setError("Failed to fetch project");
            } catch (err) {
                setError("Failed to fetch skill name");
                console.error("Failed to fetch skill name", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSkillName();
    }, [documentId]);

    // Fetch the projects related to the skill
    useEffect(() => {
        const fetchProjectsOfSkill = async () => {
            try {
                setLoading(true);
                const params = {
                    "fields[0]": "documentId",
                    "fields[1]": "Title",
                    "fields[2]": "SubTitle",
                    "fields[3]": "createdAt",
                    "populate[Media][fields][0]": "url", // Get only url
                    "populate[skills][fields][0]": "Name", // Get only skill names
                    "filters[skills][documentId][$eq]": documentId, // Get all the projects of specific skill
                };
                const response = await api.get<StrapiResponse<Project[]>>(`/api/projects/`, { params });
                if (response.data) {
                    setProjectsOfSkill(response.data?.data);
                    setProjectsOfSkillMeta(response.data?.meta ?? null);
                } else setError("Failed to fetch project");
            } catch (err) {
                setError("Failed to fetch projects");
                console.error("Failed to fetch project", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjectsOfSkill();
    }, [documentId]);

    // Fetch the blogs related to the skill
    useEffect(() => {
        const fetchBlogsOfSkill = async () => {
            try {
                setLoading(true);
                const params = {
                    "fields[0]": "documentId",
                    "fields[1]": "Title",
                    "fields[2]": "SubTitle",
                    "fields[3]": "createdAt",
                    "populate[CoverImage][fields][0]": "url", // Get only formats
                    "populate[skills][fields][0]": "Name", // Get only skill names
                    "populate[tags][fields][0]": "TagName", // Get only tag names
                    "filters[skills][documentId][$eq]": documentId,
                };
                const response = await api.get<StrapiResponse<Blog[]>>(`/api/blogs/`, { params });
                if (response.data) {
                    setBlogsOfSkill(response.data.data);
                    setBlogsOfSkillMeta(response.data.meta ?? null);
                } else setError("Failed to fetch project");
            } catch (err) {
                setError("Failed to fetch projects");
                console.error("Failed to fetch project", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogsOfSkill();
    }, [documentId]);

    // Get the total sum of the number projects and blogs under the skill
    const totalPostsOfSkill = ((): number | null => {
        if (projectsOfSkillMeta && blogsOfSkillMeta) {
            return projectsOfSkillMeta.pagination.total + blogsOfSkillMeta.pagination.total;
        }
        return null;
    })();

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
        // The main outer wrapper with global background and padding
        <div className="min-h-screen pb-32 pt-24 md:pt-32">

            {/* The structural container keeping everything narrow and centered */}
            <div className="max-w-4xl w-full mx-auto px-6 md:px-12">
                <PageTitle
                    title={skillName && skillName}
                    count={totalPostsOfSkill ? totalPostsOfSkill : null}
                    skillIconName={skillName}
                />

                <div className="mb-5 w-full flex flex-col">
                    <SectionTitle
                        title="PROJECTS"
                        count={projectsOfSkillMeta ? projectsOfSkillMeta?.pagination.total : 0}
                    />
                    <div className="">
                        {projectsOfSkill.length === 0 ? (
                            <div className="text-[#404040] text-center text-sm mt-10">
                                <p className="text-sm">No projects found</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                                {projectsOfSkill.map((projectsOfSkill) => (
                                    <ProjectCard key={projectsOfSkill.documentId} {...projectsOfSkill} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-12 mb-5 w-full flex flex-col">
                    <SectionTitle title="BLOGS" count={blogsOfSkillMeta ? blogsOfSkillMeta?.pagination.total : 0} />
                    <div className="">
                        {blogsOfSkill.length === 0 ? (
                            <div className="text-[#404040] text-center text-sm mt-10">
                                <p className="text-sm">No Blogs found</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                                {blogsOfSkill.map((blogsOfSkill) => (
                                    <BlogCard key={blogsOfSkill.documentId} {...blogsOfSkill} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkillPage;
