"use client";

import React, {useEffect, useRef, useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface Breakpoints {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

interface SliderProps {
    children?: React.ReactNode;
    className?: string;
    breakpoints?: Breakpoints
}

export default function Slider({children, className = "", breakpoints}: SliderProps){
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState<number>(0);
    const [currentCols, setCurrentCols] = useState<number>(1);
    const [gapSize, setGapSize] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let newCols = 1;

            if (breakpoints?.xl && width >= 1280) {
                newCols = breakpoints.xl;
            } else if (breakpoints?.lg && width >= 1024) {
                newCols = breakpoints.lg;
            } else if (breakpoints?.md && width >= 768) {
                newCols = breakpoints.md;
            } else if (breakpoints?.sm && width >= 640) {
                newCols = breakpoints.sm;
            }

            if (newCols !== currentCols) {
                setCurrentCols(newCols);
            }

            if (sliderRef.current) {
                const cssObj = window.getComputedStyle(sliderRef.current);
                const currentGap = parseFloat(cssObj.gap) || 0;
                if (currentGap !== gapSize) {
                    setGapSize(currentGap);
                }
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoints, currentCols, gapSize]);

    const childrenLength = React.Children.count(children);
    const slideCount = childrenLength - currentCols + 1;
    const pagination = slideCount < 1 ? 1 : slideCount;

    const getScrollStep = () => {
        if (!sliderRef.current) return 0;
        const sliderWidth = sliderRef.current.clientWidth;
        const numberOfGaps = currentCols > 1 ? currentCols - 1 : 0;
        const exactSlideWidth = (sliderWidth - (numberOfGaps * gapSize)) / currentCols;
        return exactSlideWidth + gapSize;
    };

    const scrollNext = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: getScrollStep(), behavior: "smooth" });
        }
    };

    const scrollPrev = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
        }
    };

    const scrollToSlide = (index: number) => {
        if (sliderRef.current) {
            sliderRef.current.scrollTo({ left: getScrollStep() * index, behavior: "smooth" });
        }
    };

    const handleScroll = () => {
        if (!sliderRef.current) return;

        const scrollPosition = sliderRef.current.scrollLeft;
        const slideWidth = sliderRef.current.clientWidth / currentCols;

        const currentIndex = Math.round(scrollPosition / slideWidth);

        if (currentIndex !== isActive) {
            setIsActive(currentIndex);
        }
    };

    if (childrenLength === 0) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="text-lg">Brak</div>
            </div>
        );
    }

    const numberOfGaps = currentCols > 1 ? currentCols - 1 : 0;

    return (
        <div className="w-full h-full flex flex-col md:flex-row justify-center items-center gap-3">
            <div className="hidden md:block">
                <button
                    onClick={scrollPrev}
                    disabled={isActive === 0}
                    className="cursor-pointer disabled:opacity-30 disabled:cursor-default transition-opacity"
                >
                    <ChevronLeft className="text-green-400" strokeWidth={1} size={48}/>
                </button>
            </div>
            <div ref={sliderRef}
                 onScroll={handleScroll}
                 className={`w-full h-full grow flex flex-row overflow-x-auto snap-x snap-mandatory scroll-smooth
                           [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ${className}`}>
                {React.Children.map(children, (child, index) => {
                    return (
                        <div
                            key={index}
                            style={{ width: `calc((100% - ${numberOfGaps * gapSize}px) / ${currentCols})` }}
                            className={`h-full px-px snap-start shrink-0`}>
                            {child}
                        </div>
                    );
                })}
            </div>
            <div className="hidden md:block">
                <button
                    onClick={scrollNext}
                    disabled={isActive === pagination - 1}
                    className="cursor-pointer disabled:opacity-30 disabled:cursor-default transition-opacity"
                >
                    <ChevronRight className="text-green-400" strokeWidth={1} size={48}/>
                </button>
            </div>
            <div className="md:hidden flex justify-center items-center gap-2">
                {pagination > 1 && Array.from({length: pagination }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isActive === index
                                ? "bg-green-500 w-4"
                                : "bg-neutral-600 hover:bg-neutral-400"
                        }`}
                        aria-label={`Przejdź do slajdu ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}