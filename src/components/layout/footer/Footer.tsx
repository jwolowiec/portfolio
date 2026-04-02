import Container from "@/components/ui/Container";
import {FaChevronRight, FaGithub, FaLinkedin, FaRegCopyright} from "react-icons/fa6";
import {navLinks} from "@/constants/navigation";
import {NavLink} from "@/types";
import BentoContainer from "@/components/ui/BentoContainer";
import {MdLocationOn, MdMail, MdPerson, MdPhone} from "react-icons/md";
import {personalInfo} from "@/constants/personalInfo";
import {Link} from "@/i18n/navigation";
import EncodedLink from "@/components/ui/EncodedLink";
import {useTranslations} from "next-intl";
import LocalesList from "@/components/layout/footer/LocalesList";
import FooterColumn from "@/components/layout/footer/FooterColumn";

// :TODO Make legal routes before add links
const legalLinks: NavLink[] = [
    // {name: "privacyPolicy", href: "/privacy-policy"}
]

export default function Footer() {
    const linksT = useTranslations("common.Links");
    const t = useTranslations("common.Footer");

    return (
        <footer>
            <Container className="mt-1 text-neutral-400">
                <BentoContainer className="flex flex-col gap-6">
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                        <FooterColumn title={t("shortcuts")}>
                            <nav>
                                <ul className="flex flex-col gap-2">
                                    {navLinks.map((link) => {
                                        return (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className="flex flex-row items-center gap-2"
                                                >
                                                    <FaChevronRight className="text-green-400"/>
                                                    {linksT(`navLinks.${link.name}`)}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </nav>
                        </FooterColumn>
                        <FooterColumn title={t("contactData")}>
                            <ul className="flex flex-col">
                                <li className="flex flex-row items-center gap-2">
                                    <MdPerson className="text-green-400"/>
                                    {personalInfo.name} {personalInfo.surname}
                                </li>
                                <li className="flex flex-row items-center gap-2">
                                    <MdPhone className="text-green-400"/>
                                    <EncodedLink type="phone" encodedText={personalInfo.encodedPhone}/>
                                </li>
                                <li className="flex flex-row items-center gap-2">
                                    <MdMail className="text-green-400"/>
                                    <EncodedLink type="mail" encodedText={personalInfo.encodedMail}/>
                                </li>
                                <li className="flex flex-row items-center gap-2">
                                    <MdLocationOn className="text-green-400"/>
                                    {personalInfo.location}
                                </li>
                            </ul>
                        </FooterColumn>
                        <FooterColumn title={t("findMore")}>
                            <ul className="flex flex-col">
                                <li>
                                    <a
                                        href={personalInfo.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-row items-center gap-2"
                                    >
                                        <FaLinkedin className="text-green-400"/>
                                        LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={personalInfo.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-row items-center gap-2"
                                    >
                                        <FaGithub className="text-green-400"/>
                                        GitHub
                                    </a>
                                </li>
                            </ul>
                        </FooterColumn>
                    </section>
                    <hr className="border border-neutral-800"/>
                    <section className="flex flex-col items-center gap-3">
                        <p className="text-center md:text-left leading-relaxed">
                            <span className="inline-flex items-center mr-1">
                                Copyright <FaRegCopyright className="mx-1"/> {new Date().getFullYear()}
                            </span>
                            Jakub Wołowiec. {t("allRightsReserved")}
                        </p>
                        <ul className="flex flex-col sm:flex-row sm:gap-4">
                            {legalLinks.map((link) => {
                                return (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="flex flex-row items-center gap-2"
                                        >
                                            <FaChevronRight className="text-green-400"/>
                                            {linksT(`legalLinks.${link.name}`)}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                        <LocalesList />
                    </section>
                </BentoContainer>
            </Container>
        </footer>
    );
}