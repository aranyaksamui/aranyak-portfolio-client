import { Link } from "react-router-dom";

import { Blog } from "../types/blog";

function BlogCard(props: Blog) {
    const coverImage = props.CoverImage?.url;

    return (
        <div className="blog relative group overflow-visible h-full">
            {" "}
            {/* Added h-full */}
            <Link to={`/blogs/${props.documentId}`} className="relative z-10 h-full flex flex-col">
                {" "}
                {/* Added flex-col */}
                {/* Orange glow effect container */}
                <div className="absolute -inset-1 rounded-xl group-hover:rounded-none bg-orange-500 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100"></div>
                {/* Card content - added flex-grow */}
                <div className="relative bg-transparent overflow-hidden group-hover:rounded-none transform group-hover:-translate-y-2.5 group-hover:translate-x-2.5 group-hover:scale-[1.02] z-20 h-full flex flex-col flex-grow">
                    {/* Cover image - flex-shrink-0 prevents shrinking */}
                    <div className="relative overflow-hidden group-hover:rounded-none flex-shrink-0">
                        <div className="relative pt-[66.66%]">
                            {coverImage ? (
                                <img
                                    src={`${coverImage}`}
                                    alt={props.Title || "Blog cover"}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center text-gray-500">
                                    No cover image
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content section - flex-grow fills space */}
                    <div className="flex flex-col justify-between p-4 space-y-2 bg-white group-hover:bg-white group-hover:rounded-none flex-grow">
                        <div>
                            {/* Date */}
                            <h6 className="text-xs text-gray-400 mb-1">
                                {new Date(props.createdAt).toLocaleDateString("en-GB")}
                            </h6>

                            {/* Title */}
                            <h2 className="font-bold text-xl text-black group-hover:text-orange-400">{props.Title}</h2>

                            {/* Subtitle - flex-grow on parent allows expansion */}
                            <p className="blog-text text-gray-900 font-light text-sm mt-2 flex-grow">
                                {props.SubTitle?.substring(0, 120)}...
                            </p>
                        </div>

                        {/* Skills and tags - stays at bottom */}
                        <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                            {props.skills.map((skill) => (
                                <span
                                    key={skill.documentId}
                                    className="px-2 py-1 text-xs font-medium text-white bg-orange-400 rounded-full whitespace-nowrap"
                                >
                                    {skill.Name}
                                </span>
                            ))}
                            {props.tags.map((tag) => (
                                <span
                                    key={tag.documentId}
                                    className="px-2 py-1 text-xs font-medium text-white bg-orange-500 rounded-full whitespace-nowrap"
                                >
                                    {tag.TagName}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default BlogCard;
