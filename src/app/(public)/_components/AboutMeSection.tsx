import BentoContainer from "@/components/ui/BentoContainer";
import {LuMapPin, LuTerminal, LuAppWindow} from "react-icons/lu";

export default function AboutMeSection() {
    return (
        <BentoContainer className="col-span-full md:col-span-2 lg:col-span-3 row-span-2 flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-3 text-3xl lg:text-4xl font-extrabold text-neutral-200">
                <p>Projektuję <span className="text-green-400">design</span>.</p>
                <p>Piszę <span className="text-green-400">kod</span>.</p>
                <p>Wdrażam <span className="text-green-400">aplikacje</span>.</p>
            </div>

            <div className="grow grid grid-cols-2 gap-3">
                <div
                    className="
                        flex flex-col col-span-1 md:col-span-2 lg:col-span-1 justify-center items-start gap-3 p-4
                        rounded-xl bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30
                        hover:border-green-500/30 transition-all duration-400 group/tile"
                >
                    <LuMapPin className="text-neutral-500 group-hover/tile:text-green-400 transition-all duration-400" size={36}/>
                    <span className="text-base text-neutral-200 font-medium">Poznań/Zdalnie</span>
                </div>

                <div
                    className="
                        flex flex-col col-span-1 md:col-span-2 lg:col-span-1 justify-center items-start gap-3 p-4
                        rounded-xl bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30
                        hover:border-green-500/30 transition-all duration-400 group/tile"
                >
                    <LuAppWindow
                        className="text-neutral-500 group-hover/tile:text-green-400 transition-all duration-400"
                        size={36}/>
                    <span className="text-base text-neutral-200 font-medium">Aplikacje Webowe</span>
                </div>

                <div
                    className="
                        col-span-2 flex flex-row items-center gap-3 p-4
                        rounded-xl bg-neutral-900/80 backdrop-blur-md border border-neutral-500/30
                        hover:border-green-500/30 transition-all duration-400 group/tile"
                >
                    <LuTerminal className="text-neutral-500 group-hover/tile:text-green-400 transition-all duration-400"
                                size={36}/>
                    <span className="text-base text-neutral-200 font-medium">Fullstack Developer</span>
                </div>
            </div>

        </BentoContainer>
    );
}