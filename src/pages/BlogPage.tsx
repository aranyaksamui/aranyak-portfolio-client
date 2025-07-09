import { useEffect, useState } from "react";
import { SingleBlog, SingleBlogResponse } from "../types/blog";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import MarkdownRenderer from "../components/MarkdownRenderer";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import SkillsInPage from "../components/SkillsInPage";

function BlogPage() {
    const { documentId } = useParams<{ documentId: string }>();

    const [blog, setBlog] = useState<SingleBlog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                    "populate[CoverImage][fields][0]": "url", // Get only url
                    "populate[skills][fields][0]": "Name", // Get only skill names
                    "populate[tags][fields][0]": "TagName", // Get only tag names
                };
                const response = await api.get<SingleBlogResponse>(`/api/blogs/${documentId}`, { params });
                if (response.data.data) {
                    setBlog(response.data.data);
                } else setError("Failed to fetch project");
            } catch (err) {
                setError("Failed to fetch projects");
                console.error("Failed to fetch project", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSingleBlog();
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

    // console.log(blog);

    return (
        <section className="bg-[#0a0a0a] sm:px-3">
            {blog ? (
                <div className="blog container mx-auto px-4 py-48 sm:px-6 md:px-10 lg:px-4 sm:py-16 md:py-20 xl:py-40 max-w-4xl text-white">
                    <article>
                        {/* Project Header */}
                        <header className="mb-8">
                            <div className="flex items-center text-gray-600 text-sm">
                                <span>{blog?.createdAt && new Date(blog?.createdAt).toLocaleDateString("en-GB")}</span>
                            </div>
                            <h1 className="sm:text-3xl md:text-4xl lg:text-5xl lg:py-2 text-white font-black mb-2">
                                {blog?.Title}
                            </h1>
                            <p className="blog-text text-lg text-gray-400 mb-4">{blog?.SubTitle}</p>
                        </header>
                        {/* Cover Image */}
                        {blog?.CoverImage.url && (
                            <div className="mb-8">
                                <img src={`${coverImage}`} className="w-full h-auto shadow-md" />
                            </div>
                        )}
                        {/* Project Content */}
                        <section className="prose prose-lg max-w-none mb-8">
                            <MarkdownRenderer content={blog?.Body} context="blog" />
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
                        {blog?.skills.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">Skills:</h2>
                                <div className="grid sm:mt-8 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:w-4/6 lg:mt-0 lg:grid-cols-2 2xl:h-16 text-white">
                                    {blog?.skills.map((skill) => (
                                        <SkillsInPage {...skill} />
                                    ))}
                                </div>
                            </section>
                        )}
                        {blog?.tags.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">Tags:</h2>
                                <div className="flex flex-wrap gap-2">
                                    {blog?.tags.map((tag) => (
                                        <Link key={tag.documentId} to={`/tags/${tag.documentId}`}>
                                            <span className="bg-white text-orange-600 px-3 py-1 text-sm">
                                                {tag.TagName}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                        <Link to={"/blogs"} className="w-full flex items-center justify-center">
                            <div className="bg-[#101010] flex items-center justify-center text-[#545454] py-3 px-5">
                                <MdOutlineKeyboardBackspace className="inline" />
                                <span className="ml-2">See all blogs</span>
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

export default BlogPage;
