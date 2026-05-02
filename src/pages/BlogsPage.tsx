import useBlogs from "../contexts/BlogContext";
import BlogCard from "../components/BlogCard";
import PageTitle from "../components/PageTitle";


function BlogsPage() {
    const { blogs, meta, loading, error } = useBlogs();

    let myBlogs: typeof blogs;
    if (blogs) myBlogs = blogs;
    else myBlogs = [];

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
        // The main outer wrapper with global background and padding
        <div className="min-h-screen pb-32 pt-24 md:pt-32">

            {/* The structural container keeping everything narrow and centered */}
            <div className="max-w-4xl w-full mx-auto px-6 md:px-12">
                <PageTitle title={"BLOGS"} count={meta ? meta.pagination.total : 0} skillIconName={null} />
                <div>
                    {myBlogs.length === 0 ? (
                        <div className="text-[#404040] text-center text-sm mt-10">
                            No blogs found
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {myBlogs.map((blog) => (
                                <BlogCard key={blog.documentId} {...blog} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BlogsPage;
