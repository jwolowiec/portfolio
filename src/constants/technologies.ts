import {IconType} from "react-icons";
import {
    SiNextdotjs,
    SiReact,
    SiTypescript,
    SiTailwindcss,
    SiJavascript,
    SiBootstrap,
    SiPostgresql, SiMongodb, SiExpress, SiNginx, SiLinux
} from "react-icons/si";

export interface Technology {
    name: string;
    icon: IconType;
}

export const technologies: Technology[] = [
    {name: "Next.js", icon: SiNextdotjs},
    {name: "React", icon: SiReact},
    {name: "Express.js", icon: SiExpress},
    {name: "JavaScript", icon: SiJavascript},
    {name: "TypeScript", icon: SiTypescript},
    {name: "PostgreSQL", icon: SiPostgresql},
    {name: "MongoDB", icon: SiMongodb},
    {name: "Linux", icon: SiLinux},
    {name: "Nginx", icon: SiNginx},
    {name: "Tailwind CSS", icon: SiTailwindcss},
    {name: "Bootstrap", icon: SiBootstrap},
];