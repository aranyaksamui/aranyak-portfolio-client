import { IconType } from "react-icons";

interface SocialCard {
    socialLink: string;
    SocialIcon: IconType;
    label: string;
}

function SocialCard(props: SocialCard) {
    return (
        <a
            href={props.socialLink}
            target="_blank"
            rel="noreferrer"
            title={props.label} // Native tooltip for accessibility
            className="group block"
        >
            {/* 
                Wireframe button styling matching the Skills section:
                Dark border, gray icon -> Inverts to white bg, black icon on hover
            */}
            <div className="p-1 md:p-1 flex items-center justify-center transition-all duration-200 text-[#c4c4c4] group-hover:text-white">
                <props.SocialIcon 
                    size={24} 
                    className="transition-transform duration-200" 
                />
            </div>
        </a>
    );
}

export default SocialCard;
