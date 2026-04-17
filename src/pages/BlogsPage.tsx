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
        <div className="h-[100vh] flex flex-col sm:py-6 sm:px-[2rem] md:px-[5rem] md:py-0 lg:px-[8rem] xl:px-[12rem] 2xl:px-[18rem]">
            <PageTitle title={"BLOGS"} count={meta ? meta.pagination.total : 0} skillIconName={null} />
            <br />
            <br />
            <div>
                {myBlogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-xl">No blogs found</p>
                    </div>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {myBlogs.map((blog) => (
                            <BlogCard key={blog.documentId} {...blog} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogsPage;
