import Navbar from "@/Components/Navigation/Navbar";

export default function ContentFrame({
    children,
    activeNavbarElement,
    className,
    navbarHidden,
}) {
    return (
        <div
            className={`flex flex-col flex-grow items-center place-content-center w-full ${className}`}
        >
            <div className="flex overflow-hidden flex-col flex-grow px-10 py-20 mt-14 w-full bg-white shadow-lg">
                {children}
            </div>
        </div>
    );
}
