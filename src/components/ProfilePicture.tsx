import pfp from "../assets/images/nawg_mascot.png";
import minimize_icon from "../assets/icons/minimize.svg";
import maximize_icon from "../assets/icons/maximize.svg";
import close_icon from "../assets/icons/close.svg";

function ProfilePicture() {
    return (
        // The parent is set to w-full h-full so it perfectly fills the 48x48 box from Intro.tsx
        <div className="relative w-full h-full">
            
            {/* 1. The Orange Offset Border (Background) */}
            {/* -left-3 and top-3 gives it that offset "shadow" look without breaking the grid */}
            <div className="absolute top-3 -left-3 w-full h-full border-2 border-[#fe8e0d] z-0" />
            
            {/* 2. The White Window (Foreground) */}
            {/* z-10 ensures it sits on top of the orange border */}
            <div className="absolute top-0 left-0 w-full h-full bg-white flex flex-col p-1.5 md:p-2 z-10">
                
                {/* Window Controls (Minimize, Maximize, Close) */}
                {/* space-x-1.5 gives them perfect, consistent spacing instead of massive margins */}
                <div className="flex justify-end w-full space-x-1.5 md:space-x-2 mb-1.5 md:mb-2 px-1 gap-2 items-center">
                    <img src={minimize_icon} className="w-2.5 md:w-3" alt="minimize" />
                    <img src={maximize_icon} className="w-2.5 md:w-3" alt="maximize" />
                    <img src={close_icon} className="w-2.5 md:w-3" alt="close" />
                </div>

                {/* 3. The Image Container */}
                {/* flex-1 makes this box fill the rest of the white window automatically */}
                <div className="flex-1 w-full overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
                    
                    {/* CRITICAL FIX: 'object-cover' ensures the image NEVER squishes, no matter the container size! */}
                    <img 
                        src={pfp} 
                        alt="My Portrait" 
                        className="w-full h-full object-cover object-center" 
                    />
                    
                </div>
                
            </div>
        </div>
    );
}

export default ProfilePicture;
