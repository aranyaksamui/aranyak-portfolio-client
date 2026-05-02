import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { StrapiMeta, StrapiResponse } from "../types/strapi";
import { Blog } from "../types/blog";
import BlogCard from "../components/BlogCard";
import { Tag } from "../types/tag";
import SectionTitle from "../components/SectionTitle";
import PageTitle from "../components/PageTitle";

function TagPage() {
    const { documentId } = useParams<{ documentId: string }>();

    const [tagName, setTagName] = useState<string | null>(null);
    const [blogsOfTag, setBlogsOfTag] = useState<Blog[] | []>([]);
    const [blogsOfTagMeta, setBlogsOfTagMeta] = useState<StrapiMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch the tag name for headers
    useEffect(() => {
        const fetchTagName = async () => {
            try {
                setLoading(false);
                const params = {
                    "filters[documentId][$eq]": documentId,
                    "fields[0]": "TagName",
                };
                const response = await api.get<StrapiResponse<Tag[]>>(`/api/tags`, { params });
                if (response.data && response.data.data.length > 0) {
                    setTagName(response.data.data[0]?.TagName);
                } else setError("Failed to fetch tag name");
            } catch (err) {
                setError("Failed to fetch tag name");
                console.error("Failed to fetch tag name", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTagName();
    }, [documentId]);

    // Fetch the blogs related to the tag
    useEffect(() => {
        const fetchBlogsOfTag = async () => {
            try {
                setLoading(true);
                const params = {
                    "fields[0]": "documentId",
                    "fields[1]": "Title",
                    "fields[2]": "SubTitle",
                    "fields[3]": "createdAt",
                    "populate[CoverImage][fields][0]": "url", // Get only url
                    "populate[skills][fields][0]": "Name", // Get only skill names
                    "populate[tags][fields][0]": "TagName", // Get only tag names
                    "filters[tags][documentId][$eq]": documentId,
                };
                const response = await api.get<StrapiResponse<Blog[]>>(`/api/blogs/`, { params });
                if (response.data) {
                    setBlogsOfTag(response.data.data);
                    setBlogsOfTagMeta(response.data.meta ?? null);
                } else setError("Failed to fetch blog");
            } catch (err) {
                setError("Failed to fetch blogs");
                console.error("Failed to fetch blog", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogsOfTag();
    }, [documentId]);

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
                <p>Error loading blogs: {error}</p>
            </div>
        );
    }

    return (
        // The main outer wrapper with global background and padding
        <div className="min-h-screen pb-32 pt-24 md:pt-32">

            {/* The structural container keeping everything narrow and centered */}
            <div className="max-w-4xl w-full mx-auto px-6 md:px-12">
                <PageTitle title={tagName} count={blogsOfTagMeta ? blogsOfTagMeta?.pagination.total : 0} skillIconName={null} />
                <div>
                    <SectionTitle title="BLOGS" count={blogsOfTagMeta ? blogsOfTagMeta?.pagination.total : 0} />
                    <div className="mt-5">
                        {blogsOfTag.length === 0 ? (
                            <div className="text-[#404040] text-center text-sm mt-10">
                                <p className="text-sm">No Blogs found</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                                {blogsOfTag.map((blogOfTag) => (
                                    <BlogCard key={blogOfTag.documentId} {...blogOfTag} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TagPage;
