import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SectionHeading from '@/Components/SectionHeading';
import ContentFrame from '@/Layouts/ContentFrame';

export default function Reviews({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <ContentFrame activeNavbarElement="Reviews">
                <SectionHeading>
                    Reviews
                </SectionHeading> 
            </ContentFrame>
        </AuthenticatedLayout>
    );
};
