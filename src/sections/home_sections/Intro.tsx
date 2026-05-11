import { AiFillMail, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import ProfilePicture from "../../components/ProfilePicture";

function Intro() {
    return (
        <section
            id="Intro"
            className="max-w-4xl w-full mx-auto px-6 md:px-12 pt-20 md:pt-32 text-white"
        >
            <div className="w-full flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-12 md:gap-20">
                
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight font-mono">
                        {">"} myself
                        <span className="opacity-0 group-hover:opacity-100 inline-block w-3 h-6 bg-gray-100 ml-3 -mb-1 animate-fast-pulse"></span>
                    </h1>

                    <div className="text-base md:text-md text-[#c4c4c4] font-light leading-relaxed space-y-4">
                        <p>
                            This is <strong className="bg-white text-black px-1 font-bold">Aranyak Samui</strong> 👋🏽!
                        </p>
                        <p>
                            A <strong className="border-b-2 border-[#fe8e0d] font-normal pb-0.5">developer</strong>, a{" "}
                            <strong className="border-b-2 border-[#fe8e0d] font-normal pb-0.5">visual artist</strong> and a{" "}
                            <strong className="border-b-2 border-[#fe8e0d] font-normal pb-0.5">creator</strong>.
                        </p>
                        <p className="max-w-lg">
                            I'm a Full-Stack Developer with a passion for blending software engineering with digital art. My day-to-day involves building scalable apps (MERN) and automating tasks with Python. Beyond the web, I channel my creativity into developing video games and XR (Unity), crafting 2D/3D art. I love using this mix of logic and design to build cool, functional things!
                        </p>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center space-x-6 pt-2">
                        <a href="mailto:aranyaksamui29@gmail.com" className="text-[#c4c4c4] hover:text-[#fe8e0d] transition-colors">
                            <AiFillMail size={"24"} />
                        </a>
                        <a href="https://www.linkedin.com/in/aranyaksamui/" className="text-[#c4c4c4] hover:text-[#fe8e0d] transition-colors">
                            <AiFillLinkedin size={"24"} />
                        </a>
                        <a href="https://github.com/aranyaksamui" className="text-[#c4c4c4] hover:text-[#fe8e0d] transition-colors">
                            <AiFillGithub size={"24"} />
                        </a>
                    </div>
                </div>

                {/* Profile Picture */}
                <div className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-80 flex-shrink-0 relative">
                    <ProfilePicture />
                </div>

            </div>
        </section>
    );
}

export default Intro;
