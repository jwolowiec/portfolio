import {Prisma, PrismaClient, Status} from "@/generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";
import {Pool} from "pg";
import "dotenv/config";

const pool = new Pool({connectionString: process.env.DATABASE_URL});
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
                    content: `## O projekcie
Kompleksowa platforma internetowa stworzona dla firmy z branży obróbki CNC. Głównym celem było zbudowanie nowoczesnej wizytówki połączonej z autorskim systemem CMS, pozwalającym na samodzielne zarządzanie treścią przez klienta.

### Główne wyzwania
* **Autorski CMS:** Zaprojektowanie i wdrożenie intuicyjnego panelu administracyjnego, dostosowanego do specyficznych, nietypowych potrzeb klienta.
* **Infrastruktura i wdrożenie:** Bezpieczne przeniesienie domen i usług pocztowych, konfiguracja certyfikatów SSL oraz postawienie środowiska produkcyjnego na serwerze Ubuntu z wykorzystaniem Nginx.

### Rezultat końcowy
Strona zyskała nowoczesny, w pełni responsywny design oraz stabilny backend oparty na środowisku **Node.js** i **Express.js**. Znacząco poprawiło to widoczność w wyszukiwarkach (SEO) i ogólną wydajność platformy.`,
                },
                {
                    language: "en",
                    name: "PZ Grawerki - Official Website",
                    slug: "pz-grawerki-official-website",
                    description: "A comprehensive web platform for the CNC industry implemented in an end-to-end model. I was responsible for the full project lifecycle: from creating an efficient Express.js backend, to service migration, DNS management, and production deployment on an Ubuntu server.",
                    characteristics: ["Design, development, deployment", "Custom CMS for website management"],
                    content: `## About the project
A comprehensive web platform created for a company in the CNC machining industry. The main goal was to build a modern showcase combined with a custom CMS system, allowing the client to manage content independently.

### Key challenges
* **Custom CMS:** Designing and implementing an intuitive admin panel tailored to the client's specific, non-standard needs.
* **Infrastructure and deployment:** Secure transfer of domains and email services, SSL certificate configuration, and setting up the production environment on an Ubuntu server using Nginx.

### Final result
The website gained a modern, fully responsive design and a stable backend based on the **Node.js** and **Express.js** environment. This significantly improved search engine visibility (SEO) and overall platform performance.`,
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
                    content: `## Cel projektu
Stworzenie centralnego huba do zarządzania uprawnieniami dostępu opartymi na fizycznych kartach RFID. System musiał bezproblemowo komunikować się z zewnętrznymi czytnikami i na bieżąco archiwizować logi z odbić kart.

### Architektura rozwiązania
* **Dwukierunkowa komunikacja:** Wykorzystanie wydajnych protokołów sieciowych do płynnej synchronizacji danych pomiędzy panelem webowym a sprzętem IoT.
* **Lekka baza danych:** Zastosowanie bazy **SQLite** ze względu na jej szybkość i niezawodność przy zapisie logów oraz konfiguracji urządzeń bezpośrednio na brzegu sieci (edge computing).

### Interfejs i użyteczność
Panel został zaprojektowany z myślą o maksymalnej prostocie obsługi. Pozwala administratorom na natychmiastowe dodawanie nowych użytkowników, blokowanie zgubionych kart oraz przeglądanie pełnej historii wejść w czasie rzeczywistym.`,
                },
                {
                    language: "en",
                    name: "RFID Card Management System",
                    slug: "rfid-card-management-system",
                    description: "An integrated system for managing RFID card permissions and archiving logs. The project combines an intuitive web panel with efficient, two-way network communication with external IoT devices, relying on Node.js architecture and an SQLite database.",
                    characteristics: ["Hardware layer integration"],
                    content: `## Project goal
Creating a central hub for managing access permissions based on physical RFID cards. The system had to seamlessly communicate with external readers and archive logs from card scans on the fly.

### Solution architecture
* **Two-way communication:** Using efficient network protocols for smooth data synchronization between the web panel and IoT hardware.
* **Lightweight database:** Using an **SQLite** database due to its speed and reliability in recording logs and configuring devices directly at the network edge (edge computing).

### Interface and usability
The panel was designed with maximum ease of use in mind. It allows administrators to instantly add new users, block lost cards, and view the full entry history in real-time.`,
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
        const project = await prisma.project.create({data: p});
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