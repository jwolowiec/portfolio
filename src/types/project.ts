import {Image, Label, Project} from "@/generated/prisma/browser";

export interface LocalizedProject extends Project{
    label: Label;
    image: Image;
}