import Header from "@/components/layout/Header";
import Container from "@/components/ui/Container";

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-200">
            <Header />
            <main>
                <Container className="md:pt-20 grow">
                    {children}
                </Container>
            </main>
            <footer>Stopka</footer>
        </div>
    );
}