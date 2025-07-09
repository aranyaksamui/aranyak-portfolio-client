import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div className="h-screen p-10 text-wrap bg-[#0a0a0a] text-white text-4xl">
            <h1>I did not create a page that exist in this URL! :(</h1>
            <Link to={"/"}>
                <button className="mt-5 px-5 py-2 bg-white rounded-lg text-black text-lg font-medium">Go Home</button>
            </Link>
        </div>
    );
}

export default PageNotFound;
