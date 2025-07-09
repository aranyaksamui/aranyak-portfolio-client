import { IconType } from "react-icons";

interface SocialCard {
    socialLink: string;
    SocialIcon: IconType;
}

function SocialCard(props: SocialCard) {
    return (
        <a
            href={props.socialLink}
            className="w-full bg-white flex items-center justify-center sm:px-2 sm:py-1 md:px-6 md:py-3 lg:px-8 lg:py-4 2xl:px-10 2xl:py-5 hover:bg-gray-200 hover:transition-colors"
        >
            <props.SocialIcon  size={"35"} color="black"/>
        </a>
    );
}

export default SocialCard;
