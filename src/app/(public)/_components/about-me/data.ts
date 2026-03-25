import {LuAppWindow, LuMapPin, LuTerminal} from "react-icons/lu";

export const tiles = [
    {
        text: "Poznań/Zdalnie",
        icon: LuMapPin,
        classes: "flex flex-col col-span-1 md:col-span-2 lg:col-span-1 justify-center items-start [--start-x:-5rem] [--start-y:0] md:[--start-x:0] md:[--start-y:5rem] lg:[--start-x:-5rem] lg:[--start-y:0]"
    },
    {
        text: "Aplikacje Webowe",
        icon: LuAppWindow,
        classes: "flex flex-col col-span-1 md:col-span-2 lg:col-span-1 justify-center items-start [--start-x:5rem] [--start-y:0] md:[--start-x:0] md:[--start-y:5rem] lg:[--start-x:5rem] lg:[--start-y:0]"
    },
    {
        text: "Fullstack Developer",
        icon: LuTerminal,
        classes: "col-span-2 flex flex-row items-center [--start-x:0] [--start-y:5rem]"
    },
];