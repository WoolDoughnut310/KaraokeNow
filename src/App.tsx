import { useAtomValue } from "jotai";
import React from "react";
import LyricsBody from "./LyricsBody";
import MicrophoneInput from "./MicrophoneInput";
import SongTitle from "./SongTitle";
import { lyricsAtom } from "./store";

export default function App() {
    const lyrics = useAtomValue(lyricsAtom);

    const renderedChild =
        lyrics === "" ? (
            <MicrophoneInput />
        ) : (
            <>
                <SongTitle />
                <LyricsBody />
            </>
        );

    return (
        <main className="w-full h-full px-10 flex flex-col justify-center items-center">
            <h1 className="font-bold font-sans text-6xl">KaraokeNow</h1>
            <p className="mb-5">React ⚛️ + Vite ⚡ + Replit 🌀</p>
            {renderedChild}
        </main>
    );
}
