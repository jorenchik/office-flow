import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SectionHeading from "@/Components/Typography/SectionHeading";
import ContentFrame from "@/Layouts/ContentFrame";
import Navbar from "@/Components/Navigation/Navbar";

export default function Offices({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Navbar activeElement="Offices" className="mt-14" />
            <ContentFrame activeNavbarElement="Offices">
                <SectionHeading>Offices</SectionHeading>
            </ContentFrame>
        </AuthenticatedLayout>
    );
}
