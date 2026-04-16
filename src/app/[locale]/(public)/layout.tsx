import Header from "@/components/layout/header/Header";
import Container from "@/components/ui/Container";
import Footer from "@/components/layout/footer/Footer";
import {use} from "react";
import {setRequestLocale} from "next-intl/server";

export default function Layout({children, params}: { children: React.ReactNode, params: Promise<{locale: string}> }) {
    const {locale} = use(params);

    setRequestLocale(locale);
    return (
        <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-200">
            <Header/>
            <main className="grow flex flex-col">
                <Container className="md:pt-25 w-full grow grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 gap-5 auto-rows-[minmax(12rem,auto)]">
                    {children}
                </Container>
            </main>
            <Footer />
        </div>
    );
}