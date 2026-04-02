import DesktopNav from "@/components/layout/header/DesktopNav";
import MobileNav from "@/components/layout/header/MobileNav";

export default function Header() {
    return (
        <header className="w-full flex flex-row justify-center p-2 fixed z-50">
            <DesktopNav />
            <MobileNav />
        </header>
    );
};