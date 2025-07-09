import { AiFillMail, AiFillLinkedin, AiFillGithub, AiOutlineInstagram, AiFillRedditCircle } from "react-icons/ai";

import SocialCard from "../../components/SocialCard";

function Socials() {
    return (
        <section className="h-screen flex items-center justify-center text-white sm:h-max sm:my-24 sm:flex-col lg:h-screen">
            <div className="flex items-center justify-evenly sm:gap-2 md:gap-6">
                <SocialCard socialLink="mailto:aranyaksamui29@gmail.com" SocialIcon={AiFillMail} />
                <SocialCard socialLink="https://www.linkedin.com/in/aranyak-samui-15002b229/" SocialIcon={AiFillLinkedin} />
                <SocialCard socialLink="https://github.com/aranyaksamui" SocialIcon={AiFillGithub} />
                <SocialCard socialLink="https://instagram.com/typez3r0" SocialIcon={AiOutlineInstagram} />
                <SocialCard socialLink="https://www.reddit.com/user/TypeZ3R0/" SocialIcon={AiFillRedditCircle} />
            </div>
        </section>
    );
}

export default Socials;
