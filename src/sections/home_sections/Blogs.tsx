import { Link } from "react-router-dom";
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
            <div className="max-w-4xl w-full mx-auto px-6 md:px-12 font-mono text-gray-400">
                {">"} loading blogs...
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl w-full mx-auto px-6 md:px-12">
                <div className="border border-red-500 text-red-500 p-4 font-mono text-sm">
                    {">"} Failed to load blogs. {error}
                </div>
            </div>
        );
    }

    return (
        <section id="blogs" className="max-w-4xl w-full mx-auto px-6 md:px-12 flex flex-col">
            <SectionTitle title="BLOGS" count={meta ? meta.pagination.total : 0} />

            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
                {homePageBlogs && homePageBlogs.length > 0 ? (
                    homePageBlogs.map((blog) => {
                        return <BlogCard key={blog.documentId} {...blog} />;
                    })
                ) : (
                    <div className="col-span-full font-mono text-gray-400 text-sm">
                        {">"} I've not written any blogs yet.
                    </div>
                )}
            </div>

            {homePageBlogs && <Link
                to={"/blogs"}
                className="mt-6 group block w-full md:max-w-xs mono text-xs text-[#646464] hover:text-gray-200 hover:border-white transition-all duration-200"
            >
                ALL_BLOGS {">"}
            </Link>}
        </section>
    );
}

export default Blogs;
