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
            // Matches the wrapper alignment so the layout doesn't jump when it finishes loading
            <div className="max-w-4xl w-full mx-auto px-6 md:px-12 font-mono text-gray-400">
                {">"} loading skills...
            </div>
        );
    }

    if (error) {
        return (
            // Brutalist error state: sharp borders, terminal text, no rounded corners
            <div className="max-w-4xl w-full mx-auto px-6 md:px-12">
                <div className="border border-red-500 text-red-500 p-4 font-mono text-sm">
                    {">"} Error loading skills: {error}
                </div>
            </div>
        );
    }

    return (
        <section id="skills" className="max-w-4xl w-full mx-auto px-6 md:px-12 flex flex-col">
            <SectionTitle title="SKILLS" count={skillsMeta ? skillsMeta.pagination.total : 0} />
            
            <div className="mt-3 flex flex-col md:flex-row gap-8 md:gap-10 items-start">
                
                {/* Left Side: Minimal Typography instead of bulky blocks */}
                <div className="w-full md:w-48 flex flex-row md:flex-col flex-wrap gap-4 md:gap-3 font-normal text-sm tracking-widest flex-shrink-0">
                    <span className="text-[#646464]">DEVELOPER</span>
                    <span className="text-[#646464]">ARTIST</span>
                    <span className="text-[#646464]">CREATOR</span>
                </div>

                {/* Right Side: The Skills Grid */}
                {/* I kept grid-cols-2 sm:grid-cols-3 to keep your white buttons perfectly aligned */}
                <div className="w-full grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 xl:grid-cols-9 gap-3 md:gap-4">
                    {skills && skills.length > 0 ? (
                        skills.map((skill) => (
                            <SkillsInPage key={skill.id} {...skill} iconSize={28} />
                        ))
                    ) : (
                        <span className="text-gray-400 font-mono text-sm col-span-full">{">"} no skills found.</span>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Skills;
