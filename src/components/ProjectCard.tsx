import { Link } from "react-router-dom";
import { Project } from "../types/project";

function ProjectCard(props: Project) {
     const coverImage = props.Media ? props.Media[0]?.url : null;

    return (
        <div className="relative group h-full">
            <Link to={`/projects/${props.documentId}`} className="block w-full h-full relative z-10">
                
                {/* 
                    1. The Brutalist Shadow Block 
                    This sits behind the card. It's hidden by default, but snaps down and right 
                    on hover, creating a sharp, solid 3D effect matching your profile picture.
                */}
                <div className="absolute inset-0 bg-[#fe8e0d] translate-x-0 translate-y-0 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-200 ease-out z-0 border border-[#fe8e0d]"></div>

                {/* 
                    2. The Main Card
                    Sharp borders, dark background. 
                */}
                <div className="relative h-full flex flex-col bg-[#1a1a1a] border border-[#404040] group-hover:border-white transition-colors duration-200 z-10">
                    
                    {/* Cover Image Container */}
                    <div className="relative pt-[60%] border-b border-[#404040] overflow-hidden bg-[#111]">
                        {coverImage ? (
                            <img
                                src={`${coverImage}`}
                                alt={props.Title || "Project cover"}
                                // Added grayscale that turns to full color on hover!
                                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                        ) : (
                            // Minimalist fallback for missing images instead of a random stock photo
                            <div className="absolute inset-0 flex items-center justify-center font-mono text-[#404040] text-sm">[ IMAGE_NOT_FOUND ]
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col flex-grow p-5 space-y-3">
                        <div>
                            {/* Date (Terminal Style) */}
                            <div className="font-mono text-xs text-[#808080] mb-2">
                                {">"} {new Date(props.createdAt).toLocaleDateString("en-GB")}
                            </div>

                            {/* Title */}
                            <h2 className="text-md font-bold text-white tracking-tight uppercase group-hover:text-[#fe8e0d] transition-colors">
                                {props.Title}
                            </h2>

                            {/* Subtitle */}
                            <p className="text-[#afafaf] font-light text-sm mt-2 leading-relaxed flex-grow">
                                {props.SubTitle?.substring(0, 120)}...
                            </p>
                        </div>

                        {/* Skills / Tags (Wireframe Terminal Style) */}
                        <div className="flex flex-wrap gap-x-3 gap-y-1 pt-4 mt-auto">
                            {props.skills.map((skill) => (
                                <span
                                    key={skill.documentId}
                                    className="font-mono text-xs text-[#fe8e0d]"
                                >
                                    [{skill.Name.toUpperCase()}]
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                
            </Link>
        </div>
    );
}

export default ProjectCard;
