import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { Skill } from "../../types/skill";
import api from "../../api/axios";
import { StrapiMeta, StrapiResponse } from "../../types/strapi";
import SkillsInPage from "../../components/SkillsInPage";

function Skills() {
    const [skills, setSkills] = useState<Skill[] | null>(null);
    const [skillsMeta, setSkillsMeta] = useState<StrapiMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                setLoading(true);
                const params = {
                    "fields[0]": "Name",
                };
                const response = await api.get<StrapiResponse<Skill[]>>(`/api/skills`, { params });
                if (response.data) 
                {
                    setSkills(response.data.data);
                    setSkillsMeta(response.data.meta);
                }
                else setError("Failed to lead skills");
            } catch (err) {
                setError("Failed to load skills");
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    if (loading) {
        return (
            <div className="h-64 flex justify-center items-center text-white">
                <div className="">loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto mt-8">
                <p>Error loading projects: {error}</p>
            </div>
        );
    }

    return (
        <section id="#skills" className="text-black h-screen sm:h-max sm:my-24 flex sm:flex-col lg:h-screen">
            <SectionTitle title="SKILLS" count={skillsMeta ? skillsMeta.pagination.total : 0} />
            <div className="mt-10 flex sm:flex-col lg:flex-row lg:justify-between">
                <div className="grid sm:grid-cols-3 sm:gap-3 font-bold lg:grid-rows-3 lg:grid-cols-none lg:w-[15rem] lg:gap-6">
                    <div className="bg-orange-500 h-32 relative lg:h-24 text-white sm:text-sm md:text-base">
                        <span className="sm:p-1 md:p-2 absolute right-0 bottom-0">DEVELOPER</span>
                    </div>
                    <div className="bg-orange-400 h-32 relative lg:h-24 text-white sm:text-sm md:text-base">
                        <span className="sm:p-1 md:p-2 absolute right-0 bottom-0">ARTIST</span>
                    </div>
                    <div className="bg-orange-300 h-32 relative lg:h-24 text-white sm:text-sm md:text-base">
                        <span className="sm:p-1 md:p-2 absolute right-0 bottom-0">CREATOR</span>
                    </div>
                </div>
                <div className="grid sm:mt-8 sm:grid-cols-1 md:grid-cols-3 sm:gap-3 lg:w-4/6 lg:mt-0 lg:grid-cols-3 xl:grid-cols-4 lg:h-14 2xl:h-16 text-white">
                    {skills
                        ? skills.map((skill) => {
                              return <SkillsInPage {...skill} />;
                          })
                        : error}
                </div>
            </div>
        </section>
    );
}

export default Skills;
