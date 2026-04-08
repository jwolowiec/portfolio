import {StaticImageData} from "next/image";

export interface Project {
    name: string;
    image: StaticImageData;
    url: string;
    technologies: string[],
    description: string,
    characteristics: string[]
}