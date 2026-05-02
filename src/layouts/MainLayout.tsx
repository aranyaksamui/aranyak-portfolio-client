import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="min-h-screen bg-[#1a1a1a] text-gray-200 flex flex-col selection:bg-orange-500 selection:text-white pb-24">
            <main className="flex-grow w-full">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
