import { useEffect, useState } from "react";
import { SingleBlog, SingleBlogResponse } from "../types/blog";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import MarkdownRenderer from "../components/MarkdownRenderer";
import SkillsInPage from "../components/SkillsInPage";

function BlogPage() {
    const { documentId } = useParams<{ documentId: string }>();

    const[blog, setBlog] = useState<SingleBlog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // SAFELY handle the image. If CoverImage is null, coverImage becomes undefined instead of crashing.
    const coverImage = blog?.CoverImage?.url;

    useEffect(() => {
        const fetchSingleBlog = async () => {
            try {
                setLoading(true);
                const params = {
                    "fields[0]": "documentId",
                    "fields[1]": "Title",
                    "fields[2]": "SubTitle",
                    "fields[3]": "createdAt",
                    "fields[4]": "Body",
                    "populate[CoverImage][fields][0]": "url",
                    "populate[skills][fields][0]": "Name",
                    "populate[tags][fields][0]": "TagName",
                };
                const response = await api.get<SingleBlogResponse>(`/api/blogs/${documentId}`, { params });
                
                if (response.data.data) {
                    setBlog(response.data.data);
                } else {
                    setError("Failed to fetch project");
                }
            } catch (err) {
                setError("Failed to fetch projects");
                console.error("Failed to fetch project", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSingleBlog();
    },[documentId]);

    // Brutalist Loading State
    if (loading) {
        return (
            <div className="min-h-screen] pt-32">
                <div className="max-w-4xl w-full mx-auto px-6 md:px-12 mono text-[#646464]">
                    {">"} loading blog_data...
                </div>
            </div>
        );
    }

    // Brutalist Error State
    if (error) {
        return (
            <div className="min-h-screen pt-32">
                <div className="max-w-4xl w-full mx-auto px-6 md:px-12">
                    <div className="border border-red-500 text-red-500 p-4 mono text-sm">
                        {">"} Error: {error}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="blog-text min-h-screen text-gray-200 pb-32 pt-24 md:pt-32">
            {blog ? (
                // Replaced massive dynamic paddings with our standard max-w-4xl wrapper
                <div className="max-w-4xl w-full mx-auto px-6 md:px-12">
                    <article>
                        
                        {/* Blog Header */}
                        {/* border-b adds a sharp dividing line between the title and the content */}
                        <header className="mb-12 md:mb-16 border-b border-[#404040] pb-8">
                            <div className="mono text-xs text-[#fe8e0d] mb-4 tracking-widest">
                                {">"} {blog.createdAt && new Date(blog.createdAt).toLocaleDateString("en-GB")}
                            </div>
                            
                            <h1 className="blog text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-6">
                                {blog.Title}
                            </h1>
                            
                            {blog.SubTitle && (
                                <p className="blog text-lg md:text-xl text-[#646464] font-light leading-relaxed">
                                    {blog.SubTitle}
                                </p>
                            )}
                        </header>

                        {/* Cover Image (Safely Rendered) */}
                        {coverImage && (
                            // Wrapping it in a dark gray border frame matching the project cards
                            <div className="mb-12 border border-[#484848] p-2 bg-[#1a1a1a]">
                                <img 
                                    src={`${coverImage}`} 
                                    alt={blog.Title} 
                                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                                />
                            </div>
                        )}

                        {/* Blog Content */}
                        {/* Note: 'prose-invert' flips Tailwind's typography plugin to dark-mode colors! */}
                        <section className="prose prose-invert prose-lg max-w-none mb-16 prose-a:text-[#fe8e0d] hover:prose-a:text-orange-400">
                            <MarkdownRenderer content={blog.Body} context="blog" />
                        </section>

                        {/* Skills Section */}
                        {blog.skills && blog.skills.length > 0 && (
                            <section className="mono font-normal mb-12">
                                <h3 className="text-md text-[#646464] mb-3 flex items-center">
                                    {">"} related_skills:
                                </h3>
                                {/* Reusing the dense grid from Skills.tsx */}
                                <div className="flex justify-self-start gap-5">
                                    {blog.skills.map((skill) => (
                                        // Added key to prevent React console warnings
                                        <SkillsInPage iconSize={20} key={skill.documentId} {...skill} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Tags Section */}
                        {blog.tags && blog.tags.length > 0 && (
                            <section className="mono font-normal mb-16">
                                <h3 className="text-md text-[#646464] mb-3 flex items-center">
                                    {">"} tags:
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {blog.tags.map((tag) => (
                                        <Link key={tag.documentId} to={`/tags/${tag.documentId}`} className="group">
                                            {/* Terminal Array Formatting */}
                                            <span className="mono text-sm text-[#808080] group-hover:text-[#fe8e0d] transition-colors">
                                                [{tag.TagName.toUpperCase()}]
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Return Buttons */}
                        <Link 
                            to={"/blogs"} 
                            className="group block w-full md:max-w-xs mono text-sm text-[#646464] hover:text-gray-200 hover:border-white transition-all duration-200"
                        >
                            {"<"} ALL_BLOGS
                        </Link>

                        <Link 
                            to={"/"} 
                            className="mt-4 group block w-full md:max-w-xs mono text-sm text-[#646464] hover:text-gray-200 hover:border-white transition-all duration-200"
                        >
                            {"<"} HOME_PAGE
                        </Link>
                        
                    </article>
                </div>
            ) : null}
        </section>
    );
}

export default BlogPage;
