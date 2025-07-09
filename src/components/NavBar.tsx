import { Link } from "react-router-dom";

function NavBar() {
    return (
        <div className="">
            <div className="px-5 py-3 absolute left-1/2 -translate-x-1/2 flex justify-between bg-[#1F1F1F] z-50 text-white sm:hidden md:hidden lg:bottom-5 lg:w-3/6 xl:w-2/6 lg:flex lg:fixed">
                <div className="flex items-center justify-center">
                    <h4 className="font-bold">ARANYAK SAMUI</h4>
                </div>
                <div className="flex gap-6 justify-evenly items-center">
                    <span className="hover:text-orange-400 transition-colors">
                        <Link to={"/"}>HOME</Link>
                    </span>
                    <span className="hover:text-orange-400 transition-colors">
                        <Link to={"/#skills"}>SKILLS</Link>
                    </span>
                    <span className="hover:text-orange-400 transition-colors">
                        <Link to={"/projects"}>PROJECTS</Link>
                    </span>
                    <span className="hover:text-orange-400 transition-colors">
                        <Link to={"/blogs"}>BLOGS</Link>
                    </span>
                </div>
            </div>
            <div className="w-full px-5 py-3 left-1/2 -translate-x-1/2 flex justify-between bg-[#1F1F1F] z-50 text-white fixed sm:flex lg:hidden">
                <div className="flex items-center justify-center">
                    <h4 className="sm:hidden md:block font-bold">ARANYAK SAMUI</h4>
                    <h4 className="sm:block md:hidden italic font-black">AS</h4>
                </div>
                <div className="flex gap-6 justify-evenly items-center">
                    <span className="hover:text-orange-400 transition-colors">
                        <Link to={"/"}>HOME</Link>
                    </span>
                    <span className="hover:text-orange-400 transition-colors">
                        <Link to={"/#skills"}>SKILLS</Link>
                    </span>
                    <span className="hover:text-orange-400 transition-colors">
                        <Link to={"/projects"}>PROJECTS</Link>
                    </span>
                    <span className="hover:text-orange-400 transition-colors">
                        <Link to={"/blogs"}>BLOGS</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
