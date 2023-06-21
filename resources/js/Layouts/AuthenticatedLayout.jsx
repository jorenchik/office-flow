import Header from "@/Components/Header"
import Footer from "@/Components/Footer"
import ContentWrapper from "@/Components/ContentWrapper"

export default function Authenticated({ user, children }) {
    return (
        <div>
            <div className="flex flex-col min-h-screen bg-gray-50">
                <Header user={user} />
                <ContentWrapper className='flex-grow'>
                    {children}
                </ContentWrapper>
            </div>
            <Footer />
        </div>
    )
}