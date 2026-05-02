import { Link } from "react-router-dom";
import { fallbackIcon, getSkillIcon } from "../utils/SkillIcons";
import { Skill } from "../types/skill";

function SkillsInPage(skill: Skill | null) {
    const SkillIcon = getSkillIcon(skill ? skill.Name : "") || fallbackIcon;
    return (
        <Link 
            to={`/skills/${skill?.documentId}`} 
            title={skill?.Name} // CRITICAL: Shows the name when hovering over the icon!
            className="group block w-full h-full"
        >
            {/* 
                - justify-center: Centers the icon perfectly since the text is gone
                - aspect-square (optional): You can add this if you want perfect little square boxes
            */}
            <div className="h-full text-[#808080] flex items-center justify-center transition-all duration-200 group-hover:text-white">
                
                <SkillIcon 
                    size={skill?.iconSize} // Slightly larger icon since it's the only element now
                    className="transition-transform duration-200" 
                />
                
            </div>
        </Link>
    );
}

export default SkillsInPage;
