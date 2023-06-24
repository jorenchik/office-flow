import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SectionHeading from "@/Components/Typography/SectionHeading";
import ContentFrame from "@/Layouts/ContentFrame";
import Navbar from "@/Components/Navigation/Navbar";

export default function Reviews({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Navbar activeElement="Reviews" className="mt-14" />
            <ContentFrame activeNavbarElement="Reviews">
                <SectionHeading>Reviews</SectionHeading>
            </ContentFrame>
        </AuthenticatedLayout>
    );
}
