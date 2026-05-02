import ScrollReveal from "../components/ScrollReveal";
import Blogs from "../sections/home_sections/Blogs";
import Intro from "../sections/home_sections/Intro";
import Project from "../sections/home_sections/Project";
import Skills from "../sections/home_sections/Skills";
import Socials from "../sections/home_sections/Socials";

// The home page
function HomePage() {
    const envMode = import.meta.env.VITE_NODE_ENV;

    return (
        <div className="flex flex-col w-full space-y-32 pt-10 pb-20">
            {envMode === "development" &&
                <div className="fixed bottom-4 left-4 p-4 bg-black text-white">
                    <div className="sm:hidden">XS: &lt;360px</div>
                    <div className="hidden sm:block md:hidden">SM: 360-663px</div>
                    <div className="hidden md:block lg:hidden">MD: 664-1023px</div>
                    <div className="hidden lg:block xl:hidden">LG: 1024-1279px</div>
                    <div className="hidden xl:block 2xl:hidden">XL: 1280-1535px</div>
                    <div className="hidden 2xl:block">2XL: ≥1920px</div>
                </div>}
            <ScrollReveal>
                <Intro />
            </ScrollReveal>
            <ScrollReveal>
                <Skills />
            </ScrollReveal>
            <ScrollReveal>
                <Project />
            </ScrollReveal>
            <ScrollReveal>
                <Blogs />
            </ScrollReveal>
            <ScrollReveal>
                <Socials />
            </ScrollReveal>
        </div>
    );
}

export default HomePage;
