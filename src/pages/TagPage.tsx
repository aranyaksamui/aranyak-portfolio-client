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
                    console.log(response.data);
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

    console.log(blogsOfTag);

    return (
        <div className="h-[100vh] flex flex-col sm:py-6 sm:px-[2rem] md:px-[5rem] md:py-0 lg:px-[8rem] xl:px-[12rem] 2xl:px-[18rem]">
            <PageTitle title={tagName} count={blogsOfTagMeta ? blogsOfTagMeta?.pagination.total : 0} skillIconName={null}/>
            <br />
            <br />
            <div>
                <SectionTitle title="BLOGS" count={blogsOfTagMeta ? blogsOfTagMeta?.pagination.total : 0} />
                <div className="mt-5">
                    {blogsOfTag.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-xl">No Blogs found</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {blogsOfTag.map((blogOfTag) => (
                                <BlogCard key={blogOfTag.documentId} {...blogOfTag} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TagPage;
