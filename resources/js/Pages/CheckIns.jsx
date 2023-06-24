import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SectionHeading from "@/Components/Typography/SectionHeading";
import ContentFrame from "@/Layouts/ContentFrame";
import Navbar from "@/Components/Navigation/Navbar";

export default function CheckIns({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Navbar activeElement="Check Ins" className="mt-14" />
            <ContentFrame>
                <SectionHeading>Check ins</SectionHeading>
            </ContentFrame>
        </AuthenticatedLayout>
    );
}
