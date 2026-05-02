import { AiFillMail, AiFillLinkedin, AiFillGithub, AiOutlineInstagram, AiFillRedditCircle } from "react-icons/ai";

import SocialCard from "../../components/SocialCard";

function Socials() {
    return (
<section id="socials" className="max-w-4xl w-full mx-auto px-6 md:px-12 flex flex-col">
            {/* 
               flex-wrap ensures they stack neatly on tiny mobile screens. 
               mt-8 matches the spacing of the other sections.
            */}
            <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4 md:gap-6">
                <SocialCard socialLink="mailto:aranyaksamui29@email.com" SocialIcon={AiFillMail} label="Email" />
                <SocialCard socialLink="https://www.linkedin.com/in/aranyaksamui" SocialIcon={AiFillLinkedin} label="LinkedIn" />
                <SocialCard socialLink="https://github.com/aranyaksamui" SocialIcon={AiFillGithub} label="GitHub" />
                <SocialCard socialLink="https://www.instagram.com/nawgmented" SocialIcon={AiOutlineInstagram} label="Instagram" />
                <SocialCard socialLink="https://www.reddit.com/user/TypeZ3R0" SocialIcon={AiFillRedditCircle} label="Reddit" />
            </div>
            
        </section>
    );
}

export default Socials;
