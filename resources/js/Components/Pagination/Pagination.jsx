function PageLink({ children, className, isActive, href, ...props }) {
    return (
        <a href={href ? href : "#"}>
            <div
                className={`px-4 py-2 border-slate-200 text-xl border-y-2 font-bold ${className} ${
                    isActive ? "text-white bg-cyan-600" : ""}`}
            >
                {children}
            </div>
        </a>
    );
}

export default function Pagination({ children, className, pages, ...props }) {
    return (
        <div
            className={`flex justify-between items-center px-5 pt-14 text-2xl ${className}`}
        >
            <div>Showing 5 to 10 of 42.</div>
            <div className="flex">
                <PageLink className="rounded-l-md border-x-2" children={"<"} />
                <PageLink className="border-r-2" children={"1"} />
                <PageLink
                    className="border-r-2"
                    isActive={true}
                    children={"2"}
                />
                <PageLink className="border-r-2" children={"..."} />
                <PageLink className="border-r-2" children={"3"} />
                <PageLink className="border-r-2" children={"4"} />
                <PageLink className="rounded-r-md border-r-2" children={">"} />
            </div>
        </div>
    );
}
