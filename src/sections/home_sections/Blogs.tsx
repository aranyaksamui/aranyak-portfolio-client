import BlogCard from "../../components/BlogCard";
import SectionTitle from "../../components/SectionTitle";
import useBlogs from "../../contexts/BlogContext";

function Blogs() {
    const { blogs, meta, loading, error } = useBlogs();

    // Show upto 3 blogs in homepage
    let homePageBlogs: typeof blogs;
    if (blogs)
        homePageBlogs = blogs.slice(0, 3);
    else homePageBlogs = [];

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
                <p>Error loading blogs: {error}</p>
            </div>
        );
    }

    return (
        <section className="text-white h-screen sm:h-max sm:my-24 flex flex-row sm:flex-col lg:h-screen">
            <SectionTitle title="BLOGS" count={meta ? meta.pagination.total : 0} />
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                {homePageBlogs ? (
                    homePageBlogs.map((project) => {
                        return <BlogCard key={project.documentId} {...project} />;
                    })
                ) : (
                    <div className="sm:mt-8 grid lg:grid-cols-3 md:grid-cols-2 md:gap-6 sm:grid-cols-1 sm:gap-5">
                        I've not written any blogs yet!
                    </div>
                )}
            </div>
        </section>
    );
}

export default Blogs;
