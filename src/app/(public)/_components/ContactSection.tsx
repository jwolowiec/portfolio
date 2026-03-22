import BentoContainer from "@/components/ui/BentoContainer";
import Button from "@/components/ui/Button";
import {FaEnvelope, FaGithub, FaLinkedin} from "react-icons/fa6";

export default function ContactSection() {
    return (
        <BentoContainer className="col-span-full md:col-span-4 lg:col-span-5 row-span-2 flex flex-col">
            <div className="grow flex flex-col justify-center items-center gap-4 p-6 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold">
                    Zainteresowany <span className="text-green-400">współpracą</span>?
                </h2>
                <p className="text-lg md:text-xl font-bold">
                    Potrzebujesz <span className="text-green-400">dewelopera</span> albo <span className="text-green-400">strony internetowej</span>?
                    Skontaktuj się ze mną.
                </p>
                <div className="flex flex-row flex-wrap gap-3 justify-center items-center">
                    <Button
                        href="#"
                        size="xl"
                        className="flex flex-row gap-2"
                    >
                        <span><FaEnvelope /></span>Napisz do mnie
                    </Button>
                    <div className="flex flex-row gap-3">
                        <Button
                            href="https://www.linkedin.com/in/jakub-wołowiec/"
                            target="_blank"
                            rel="noopener noreferrer"
                            size="xl"
                            variant="secondary"
                            shape="circle"
                        >
                            <FaLinkedin />
                        </Button>
                        <Button
                            href="https://github.com/jwolowiec"
                            target="_blank"
                            rel="noopener noreferrer"
                            size="xl"
                            variant="secondary"
                            shape="circle"
                        >
                            <FaGithub />
                        </Button>
                    </div>
                </div>
            </div>
        </BentoContainer>
    )
}