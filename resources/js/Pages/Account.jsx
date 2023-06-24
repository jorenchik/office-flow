import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentFrame from "@/Layouts/ContentFrame";
import SectionHeading from "@/Components/SectionHeading";

export default function Account({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <ContentFrame className="mt-5">
                <SectionHeading children={"Account"} />
            </ContentFrame>
        </AuthenticatedLayout>
    );
}
