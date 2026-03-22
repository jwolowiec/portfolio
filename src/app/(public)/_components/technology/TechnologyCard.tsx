import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons";

export interface Technology {
    name: string;
    icon: IconType;
}

interface TechnologyCardProps {
    technology: Technology;
    index: number;
}

export default function TechnologyCard({ technology, index }: TechnologyCardProps) {
    return (
        <div className="flex justify-center items-center w-full h-full perspective-normal">
            <AnimatePresence mode="wait">
                <motion.div
                    key={technology.name}
                    initial={{ rotateY: 90 }}
                    animate={{
                        rotateY: 0,
                        transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    exit={{
                        rotateY: -90,
                        transition: { duration: 0.2, ease: "easeIn", delay: 0.2 * index }
                    }}
                    className="flex flex-col justify-center items-center gap-2"
                >
                    <technology.icon size={64} className="text-green-400" />
                    <p>{technology.name}</p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}