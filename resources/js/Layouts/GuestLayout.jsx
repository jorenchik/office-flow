import ApplicationLogo from "@/Components/Logo/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children }) {
    return (
        <div className="flex flex-col items-center pt-6 min-h-screen bg-gray-100 sm:justify-center sm:pt-0">
            <div>
                <Link
                    href="/"
                    className="flex justify-center place-items-center"
                >
                    <ApplicationLogo className="w-[80%] rounded-xl" />
                </Link>
            </div>

            <div className="overflow-hidden px-6 py-4 mt-6 w-full bg-white shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
