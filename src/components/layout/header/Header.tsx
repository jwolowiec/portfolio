import DesktopNav from "@/components/layout/header/DesktopNav";
import MobileNav from "@/components/layout/header/MobileNav";

export default function Header() {
    return (
        <header className="w-full flex flex-row justify-center fixed top-0 inset-x-0 z-1000">
            <DesktopNav />
            <MobileNav />
        </header>
    );
};