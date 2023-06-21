import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SectionHeading from '@/Components/SectionHeading';
import ContentFrame from '@/Layouts/ContentFrame';

export default function Offices({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <ContentFrame activeNavbarElement="Offices">
                <SectionHeading>
                    Offices
                </SectionHeading> 
            </ContentFrame>
        </AuthenticatedLayout>
    );
};
