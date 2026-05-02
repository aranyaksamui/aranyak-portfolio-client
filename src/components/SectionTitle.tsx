function SectionTitle(props: { title: string, count: number }) {
    return (
        <div className="mb-8 md:mb-5">
            <h2 className="text-xl md:text-lg font-bold tracking-tight text-white flex items-center">        
                {/* Lowercasing the title makes it feel more like a terminal command */}
                {">"} {props.title.toLowerCase()}: 
                
                {/* The count styled as a system output array length */}
                <span className="text-[#fe8e0d] font-normal text-lg md:text-lg ml-3">
                    [{props.count}]
                </span>
            </h2>
        </div>
    );
}

export default SectionTitle;
