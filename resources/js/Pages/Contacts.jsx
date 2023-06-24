import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentFrame from "@/Layouts/ContentFrame";
import SectionHeading from "@/Components/Typography/SectionHeading";

export default function Contacts({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <ContentFrame className="mt-5">
                <SectionHeading children={"Contacts"} />
            </ContentFrame>
        </AuthenticatedLayout>
    );
}
