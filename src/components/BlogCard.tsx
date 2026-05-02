import { Link } from "react-router-dom";

import { Blog } from "../types/blog";

function BlogCard(props: Blog) {

    return (
        <div className="relative group h-full">
            <Link to={`/blogs/${props.documentId}`} className="block w-full h-full relative z-10">

                {/* Shadow Block */}
                <div className="absolute inset-0 bg-[#fe8e0d] translate-x-0 translate-y-0 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-200 ease-out z-0 border border-[#fe8e0d]"></div>

                {/* Main Card */}
                <div className="relative h-full flex flex-col justify-center bg-[#1a1a1a] border border-[#404040] group-hover:border-white transition-colors duration-200 z-10 p-6 md:p-8">

                    {/* Date (Terminal Style) */}
                    <div className="font-mono text-xs text-[#808080] mb-3">
                        {">"} {new Date(props.createdAt).toLocaleDateString("en-GB")}
                    </div>

                    {/* Title */}
                    <h2 className="text-md font-bold text-white tracking-tight leading-snug group-hover:text-[#fe8e0d] transition-colors">
                        {props.Title}
                    </h2>

                </div>

            </Link>
        </div>
    );
}

export default BlogCard;
