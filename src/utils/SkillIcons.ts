import { IconType } from "react-icons";
import { IoLogoReact, IoLogoJavascript, IoLogoPython, IoLogoNodejs, IoLogoHtml5, IoLogoCss3 } from "react-icons/io5";
import { BiLogoTypescript, BiLogoMongodb } from "react-icons/bi";
import {
    SiExpress,
    SiUnity,
    SiBlender,
    SiCplusplus,
    SiUnrealengine,
    SiAdobepremierepro,
    SiAdobeaftereffects,
    SiAdobelightroom,
    SiAdobeillustrator,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { FaMedal } from "react-icons/fa";

const skillIconMap: Record<string, IconType> = {
    react: IoLogoReact,
    javascript: IoLogoJavascript,
    typescript: BiLogoTypescript,
    python: IoLogoPython,
    nodejs: IoLogoNodejs,
    html: IoLogoHtml5,
    css: IoLogoCss3,
    mongodb: BiLogoMongodb,
    express: SiExpress,
    csharp: TbBrandCSharp,
    unity: SiUnity,
    blender: SiBlender,
    cplusplus: SiCplusplus,
    unrealengine: SiUnrealengine,
    premierpro: SiAdobepremierepro,
    aftereffects: SiAdobeaftereffects,
    lightroom: SiAdobelightroom,
    illustrator: SiAdobeillustrator,
};

export const getSkillIcon = (skillName: string): IconType => {
    if (skillName.length === 0) return fallbackIcon;
    const normalizedSkillName = skillName
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9]/g, "");
    return skillIconMap[normalizedSkillName] || null;
};

export const fallbackIcon = FaMedal;
