import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SectionHeading from '@/Components/SectionHeading';
import ContentFrame from '@/Layouts/ContentFrame';

export default function Appointments({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <ContentFrame activeNavbarElement="Appointments">
                <SectionHeading>
                    Appointments
                </SectionHeading> 
            </ContentFrame>
        </AuthenticatedLayout>
    );
};
