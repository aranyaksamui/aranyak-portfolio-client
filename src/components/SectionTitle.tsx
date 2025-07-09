function SectionTitle(props: { title: string, count: number }) {
    return (
        <div className="bg-white mb-6 flex justify-between items-center font-bold sm:w-4/6 sm:px-4 sm:py-2 lg:w-2/6">
            <span className="text-black text-lg">{props.title.toUpperCase()}</span>
            <span className="text-black text-lg">#{props.count}</span>
        </div>
    );
}

export default SectionTitle;
