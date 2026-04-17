import { IoArrowBackSharp, IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { fallbackIcon, getSkillIcon } from "../utils/SkillIcons";

function PageTitle(props: { title: string | null; count: number | null; skillIconName: string | null }) {
    const SkillIcon = getSkillIcon(props.skillIconName ? props.skillIconName : "") || fallbackIcon;

    return (
        <div className="sm:mt-20 lg:mt-10 2xl:mt-16 flex sm:gap-2 md:gap-5 items-center justify-between">
            <div className="h-full">
                <Link to={"/"}>
                    <div className="h-full bg-[#1f1f1f] flex justify-between items-center font-black sm:px-2 md:px-5 2xl:px-8">
                        <IoArrowBackSharp size={"30"} color="white" />
                    </div>
                </Link>
            </div>
            <div className="w-full h-full bg-[#1f1f1f] flex justify-between items-center font-black sm:px-2 sm:py-2 md:px-5 lg:px-8 2xl:px-8 2xl:py-3">
                <span className="text-white sm:text-lg md:text-2xl flex items-center">
                    {props.skillIconName && <SkillIcon size={"30"} className="inline sm:mr-1 md:mr-3" />}
                    {props.title && props.title.toUpperCase()}
                </span>
                <span className="text-white sm:text-lg md:text-2xl">{props.count && `#${props.count}`}</span>
            </div>
            {/* <div className="h-full bg-[#1f1f1f] flex justify-between items-center font-black sm:px-2 md:px-5 2xl:px-8">
                <IoSearchSharp size={"30"} color="white" />
            </div> */}
        </div>
    );
}

export default PageTitle;
