import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SectionHeading from '@/Components/SectionHeading';
import ContentFrame from '@/Layouts/ContentFrame';

export default function CheckIns({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <ContentFrame activeNavbarElement="Check Ins">
                <SectionHeading>
                    Check ins
                </SectionHeading> 
            </ContentFrame>
        </AuthenticatedLayout>
    );
};
