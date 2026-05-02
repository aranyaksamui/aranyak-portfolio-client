import { Link } from "react-router-dom";
import { fallbackIcon, getSkillIcon } from "../utils/SkillIcons";

function PageTitle(props: { title: string | null; count: number | null; skillIconName: string | null }) {
    const SkillIcon = getSkillIcon(props.skillIconName ? props.skillIconName : "") || fallbackIcon;

    return (
       <div className="mb-10 md:mb-12 flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#404040] pb-6 gap-4">
            
            <div className="flex flex-col gap-5">
                {/* Back Button (Wireframe Terminal Style) */}
                <Link
                    to={"/"}
                    className="inline-flex w-max text-xs md:text-sm text-[#404040] hover:text-[#fe8e0d] transition-colors uppercase tracking-widest"
                >
                    {"<"} RETURN
                </Link>

                {/* Terminal Header */}
                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center uppercase">
                    {">"} {props.title}
                    
                    {/* Render the icon if viewing a specific skill's projects */}
                    {props.skillIconName && (
                        <SkillIcon size={"28"} className="ml-4 text-[#fe8e0d]" />
                    )}
                </h1>
            </div>

            {/* Count Array Item */}
            {props.count !== null && (
                <div className="text-[#fe8e0d] text-lg md:text-xl">
                    [{props.count}]
                </div>
            )}
            
        </div>
    );
}

export default PageTitle;
