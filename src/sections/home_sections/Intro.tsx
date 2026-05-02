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
        //         <section
        //             id="Intro"
        //             className="text-white h-screen flex flex-row justify-center sm:flex-col md:flex-row md:items-center md:gap-10 lg:gap-16 xl:gap-5"
        //         >
        //             <div className="w-full sm:h-[18rem] md:h-full relative flex items-center">
        //                 <ProfilePicture />
        //             </div>
        //             <div className="bg-[#121212] w-full flex flex-row items-center sm:items-start sm:flex-col sm:p-3 md:w-10/12 md:p-5 lg:w-10/12 lg:p-8 xl:p-10 2xl:p-10 2xl:w-8/12">
        //                 {/* Intro text and socials div */}
        //                 <h1 className="sm:font-bold sm:text-xl sm:mb-2 md:text-2xl lg:text-2xl lg:mb-5 2xl:text-3xl 2xl:font-black">
        //                     <span className="bg-white text-white ">  </span>{">"} myself:
        //                 </h1>
        //                 <div className="sm:text-sm md:text-base leading-[2.4rem] sm:leading-[1.4rem] md:leading-[1.35] md:text-gray-200 lg:text-base 2xl:text-xl 2xl:font-normal 2xl:font-regular">
        //                     <p className="">
        //                         This is <strong className="bg-white text-black">Aranyak Samui</strong> 👋🏽.
        //                     </p>
        //                     <p className="">
        //                         A <strong className="border-b-2 border-orange-400">developer</strong>, a{" "}
        //                         <strong className="border-b-2 border-orange-400">visual artist</strong> and a{"  "}
        //                         <strong className="border-b-2 border-orange-400">creator</strong>.
        //                     </p>
        //                     <p className="sm:mt-2 md:mt-3 lg:text-lg lg:font-light">
        // I'm a Full-Stack Developer with a passion for blending software engineering with digital art. My day-to-day involves building scalable apps (MERN) and automating tasks with Python. Beyond the web, I channel my creativity into developing video games and XR (Unity), crafting 2D/3D art. I love using this mix of logic and design to build cool, functional things!
        //                     </p>
        //                 </div>
        //                 <div className="flex space-x-4 sm:mt-3 md:mt-3 xl:mt-5">
        //                     {/* Social links */}
        //                     <a href="mailto:aranyaksamui29@gmail.com" className="text-white hover:text-orange-400">
        //                         <AiFillMail size={"25"} />
        //                     </a>
        //                     <a
        //                         href="https://www.linkedin.com/in/aranyaksamui/"
        //                         className="text-white hover:text-orange-400"
        //                     >
        //                         <AiFillLinkedin size={"25"} />
        //                     </a>
        //                     <a href="https://github.com/aranyaksamui" className="text-white hover:text-orange-400">
        //                         <AiFillGithub size={"25"} />
        //                     </a>
        //                     {/* Add more social links as needed */}
        //                 </div>
        //             </div>
        //         </section>
    );
}

export default Intro;
