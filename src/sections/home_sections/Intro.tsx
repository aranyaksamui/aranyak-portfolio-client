import { AiFillMail, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import ProfilePicture from "../../components/ProfilePicture";

function Intro() {
    return (
        <section
            id="Intro"
            className="text-white h-screen flex flex-row justify-center sm:flex-col md:flex-row md:items-center md:gap-10 lg:gap-16 xl:gap-5"
        >
            <div className="w-full sm:h-[18rem] md:h-full relative flex items-center">
                <ProfilePicture />
            </div>
            <div className="bg-[#121212] w-full flex flex-row items-center sm:items-start sm:flex-col sm:p-3 md:w-10/12 md:p-5 lg:w-10/12 lg:p-8 xl:p-10 2xl:p-10 2xl:w-8/12">
                {/* Intro text and socials div */}
                <h1 className="sm:font-bold sm:text-xl sm:mb-2 md:text-2xl lg:text-2xl lg:mb-5 2xl:text-4xl 2xl:font-black">
                    <span className="bg-white text-white ">.</span> MYSELF:
                </h1>
                <div className="sm:text-sm md:text-base leading-[2.4rem] sm:leading-[1.4rem] md:leading-[1.35] md:text-gray-200 lg:text-base 2xl:text-xl 2xl:font-normal 2xl:font-regular">
                    <p className="">
                        I'm <strong className="bg-white text-black">Aranyak Samui</strong> 👋🏽.
                    </p>
                    <p className="">
                        A <strong className="border-b-2 border-orange-400">developer</strong>, a{" "}
                        <strong className="border-b-2 border-orange-400">visual artist</strong> and a{"  "}
                        <strong className="border-b-2 border-orange-400">creator</strong>.
                    </p>
                    <p className="sm:mt-2 md:mt-3">
                        I create websites, videos games, 3D and 2D visual arts and sometimes I edit videos and also make
                        random things that would help me automate stuffs ✌🏽.
                    </p>
                </div>
                <div className="flex space-x-4 sm:mt-3 md:mt-3 xl:mt-5">
                    {/* Social links */}
                    <a href="mailto:aranyaksamui29@gmail.com" className="text-white hover:text-orange-400">
                        <AiFillMail size={"25"} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/aranyak-samui-15002b229/"
                        className="text-white hover:text-orange-400"
                    >
                        <AiFillLinkedin size={"25"} />
                    </a>
                    <a href="https://github.com/aranyaksamui" className="text-white hover:text-orange-400">
                        <AiFillGithub size={"25"} />
                    </a>
                    {/* Add more social links as needed */}
                </div>
            </div>
        </section>
    );
}

export default Intro;
