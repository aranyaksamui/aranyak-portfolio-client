import pfp from "../assets/images/pfp.jpg";
import minimize_icon from "../assets/icons/minimize.svg";
import maximize_icon from "../assets/icons/maximize.svg";
import close_icon from "../assets/icons/close.svg";

function ProfilePicture() {
    return (
        <div className="aspect-square absolute right-0 flex items-start sm:mb-5 md:mb-0 md:items-center ">
            <div className="aspect-square sm:w-11/12 md:w-10/12 lg:w-8/12 2xl:w-6/12 absolute  border-2 border-[#fe8e0d]" />
            <div className="aspect-square sm:w-11/12 md:w-10/12 lg:w-8/12 2xl:w-6/12 relative px-3 py-[0.2rem] left-5 bg-[#fff] overflow-hidden flex flex-col items-center justify-evenly sm:px-3.5 sm:py-[0.25rem]">
                <div className="w-11/12 flex justify-end">
                    <img src={minimize_icon} className="w-6 sm:w-4 ml-[1.8rem] sm:ml-5" />
                    <img src={maximize_icon} className="w-6 sm:w-4 ml-[1.8rem] sm:ml-5" />
                    <img src={close_icon} className="w-6 sm:w-4 ml-[1.8rem] sm:ml-5" />
                </div>
                {/* <div className="h-[20rem] w-[22rem] rounded-xl flex items-center justify-center overflow-hidden">
                    <img src={pfp} alt="Photo of myself (Aranyak Samui)" className="relative bottom-3" />
                </div> */}
                {/* Image div */}
                <div className="sm:h-5/6 flex items-center justify-center overflow-hidden">
                    <img src={pfp} alt="Aranyak Samui Portrait" className="bg-cover" />
                </div>
            </div>
        </div>
    );
}

export default ProfilePicture;
