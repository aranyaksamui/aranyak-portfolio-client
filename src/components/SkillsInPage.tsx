import { Link } from "react-router-dom";
import { fallbackIcon, getSkillIcon } from "../utils/SkillIcons";
import { Skill } from "../types/skill";

function SkillsInPage(skill: Skill | null) {
    const SkillIcon = getSkillIcon(skill ? skill.Name : "") || fallbackIcon;
    return (
        <div className="bg-white">
            <Link to={`/skills/${skill?.documentId}`} key={skill?.documentId}>
                <div className="h-full bg-white text-black font-bold flex items-center justify-between sm:px-3 md:px-4 py-3 lg:px-4 2xl:px-5">
                    <span>{skill && <SkillIcon size={"25"} />}</span>
                    <span>{skill?.Name}</span>
                </div>
            </Link>
        </div>
    );
}

export default SkillsInPage;
