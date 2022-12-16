import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { currentWordAtom } from "../store";

interface LyricWordProps {
    index: number;
    word: string;
}

export default function LyricWord({index, word}: LyricWordProps) {
    const elementRef = useRef<HTMLSpanElement | null>(null);
    const [currentWord, setCurrentWord] = useAtom(currentWordAtom);

    useEffect(() => {
        if (index !== currentWord || elementRef.current === null) return;
        elementRef.current.scrollIntoView();
    }, [currentWord]);
    
    const updateCurrentWord = () => {
        setCurrentWord(index);
    }

    let highlight: string;

    const distanceToCurrent = Math.abs(index - currentWord);

    if (index === currentWord) {
        highlight = "text-purple-800 font-bold border-2 p-2 ";
    } else if (distanceToCurrent < 2) {
        highlight = "text-purple-400";
    }
    // else if (distanceToCurrent < 9) {
    //     highlight = "text-purple-200";
    // }
    else {
        highlight = "text-gray-700";
    }
    
    return <span ref={elementRef} className={highlight} onClick={updateCurrentWord}>
        {word}
    </span>
}