import Header from "@/components/layout/Header";
import Container from "@/components/ui/Container";

export default function Layout({
                                   children
                               }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-200">
            <Header/>
            <main className="grow flex flex-col">
                <Container className="md:pt-20 w-full grow">
                    {children}
                </Container>
            </main>
            <footer>Stopka</footer>
        </div>
    );
}