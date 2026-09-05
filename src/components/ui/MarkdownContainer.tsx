"use client";

import {HTMLMotionProps, motion} from "framer-motion";
import ReactMarkdown from "react-markdown";

interface MarkdownContainerProps extends HTMLMotionProps<"div">{
    markdown: string;
}

export default function MarkdownContainer({markdown, ...motionProps}: MarkdownContainerProps) {
    return (
        <motion.div
            {...motionProps}
            className="grow max-w-none prose prose-invert prose-green
                       prose-headings:text-neutral-200 prose-headings:font-semibold
                       prose-p:text-neutral-400
                       prose-a:text-green-400 prose-a:hover:text-green-300 prose-a:transition-colors prose-a:duration-200
                       prose-li:text-neutral-400 prose-li:marker:text-green-500/50"
        >
            <ReactMarkdown>
                {markdown}
            </ReactMarkdown>
        </motion.div>
    );
}