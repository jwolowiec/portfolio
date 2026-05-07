import {Prisma, PrismaClient, Status} from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    adapter,
});

const projectData: Prisma.ProjectCreateInput[] = [
    {
        url: "https://grawerki-cnc.pl",
        technologies: ["Node.js", "Express.js", "MongoDB", "Git", "Ubuntu", "Nginx", "Bootstrap"],
        image: {
            create: {
                path: "/uploads/grawerki-cnc.png",
                status: Status.SAVED,
            },
        },
        labels: {
            create: [
                {
                    language: "pl",
                    name: "PZ Grawerki - Oficjalna strona",
                    slug: "pz-grawerki-oficjalna-strona",
                    description: "Kompleksowa platforma internetowa dla branży CNC zrealizowana w modelu end-to-end. Odpowiadałem za pełen cykl życia projektu: od stworzenia wydajnego backendu w Express.js, po migrację usług, zarządzanie DNS i produkcyjne wdrożenie na serwerze Ubuntu.",
                    characteristics: ["Design, tworzenie, wdrożenie", "Autorski CMS do zarządzania stroną"],
                },
                {
                    language: "en",
                    name: "PZ Grawerki - Official Website",
                    slug: "pz-grawerki-official-website",
                    description: "A comprehensive web platform for the CNC industry implemented in an end-to-end model. I was responsible for the full project lifecycle: from creating an efficient Express.js backend, to service migration, DNS management, and production deployment on an Ubuntu server.",
                    characteristics: ["Design, development, deployment", "Custom CMS for website management"],
                }
            ],
        },
    },
    {
        url: "https://github.com/jwolowiec/embedded-systems-server",
        technologies: ["Node.js", "Express.js", "MongoDB", "Python", "Git", "SQLite", "Bootstrap"],
        image: {
            create: {
                path: "/uploads/embedded-systems-server.png",
                status: Status.SAVED,
            },
        },
        labels: {
            create: [
                {
                    language: "pl",
                    name: "System zarządzania kartami RFID",
                    slug: "system-zarzadzania-kartami-rfid",
                    description: "Zintegrowany system do zarządzania uprawnieniami kart RFID i archiwizacji logów. Projekt łączy intuicyjny panel webowy z wydajną, dwukierunkową komunikacją sieciową z zewnętrznymi urządzeniami IoT, opierając się na architekturze Node.js i bazie SQLite.",
                    characteristics: ["Integracja z warstwą sprzetową"],
                },
                {
                    language: "en",
                    name: "RFID Card Management System",
                    slug: "rfid-card-management-system",
                    description: "An integrated system for managing RFID card permissions and archiving logs. The project combines an intuitive web panel with efficient, two-way network communication with external IoT devices, relying on Node.js architecture and an SQLite database.",
                    characteristics: ["Hardware layer integration"],
                }
            ],
        },
    },
];

export async function main() {
    console.log(`Start seeding...`);

    await prisma.label.deleteMany();
    await prisma.project.deleteMany();
    await prisma.image.deleteMany();

    for (const p of projectData) {
        const project = await prisma.project.create({ data: p });
        console.log(`Created project with id: ${project.id}`);
    }

    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });