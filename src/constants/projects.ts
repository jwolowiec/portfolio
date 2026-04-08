import grawerkiCnc from "@public/grawerki-cnc.png";
import embeddedSystemsServer from "@public/embedded-systems-server.png";
import {Project} from "@/types/project";

export const projects: Project[] = [
    {
        image: grawerkiCnc,
        name: "PZ Grawerki - Oficjalna strona",
        url: "https://grawerki-cnc.pl",
        technologies: ["Node.js", "Express.js", "MongoDB", "Git", "Ubuntu", "Nginx", "Bootstrap"],
        description: "Kompleksowa platforma internetowa dla branży CNC zrealizowana w modelu end-to-end. Odpowiadałem za pełen cykl życia projektu: od stworzenia wydajnego backendu w Express.js, po migrację usług, zarządzanie DNS i produkcyjne wdrożenie na serwerze Ubuntu.",
        characteristics: ["Design, tworzenie, wdrożenie", "Autorski CMS do zarządzania stroną"],
    },
    {
        image: embeddedSystemsServer,
        name: "System zarządzania kartami RFID",
        url: "https://github.com/jwolowiec/embedded-systems-server",
        technologies: ["Node.js", "Express.js", "MongoDB", "Python", "Git", "SQLite", "Bootstrap"],
        description: "Zintegrowany system do zarządzania uprawnieniami kart RFID i archiwizacji logów. Projekt łączy intuicyjny panel webowy z wydajną, dwukierunkową komunikacją sieciową z zewnętrznymi urządzeniami IoT, opierając się na architekturze Node.js i bazie SQLite.",
        characteristics: ["Integracja z warstwą sprzetową"],
    },
]