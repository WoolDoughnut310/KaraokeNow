import React from "react";
import { useAtomValue } from "jotai";
import { lyricsAtom } from "./store";

const L =
    "Hello, it's me\n" +
    "I was wondering if after all these years you'd like to meet\n" +
    "To go over everything\n" +
    "They say that time's supposed to heal ya, but I ain't done much healing\n" +
    "\n" +
    "Hello, can you hear me?\n" +
    "I'm in California dreaming about who we used to be\n" +
    "When we were younger and free\n" +
    "I've forgotten how it felt before the world fell at our feet\n" +
    "\n" +
    "There's such a difference between us\n" +
    "And a million miles\n" +
    "\n" +
    "Hello from the other side\n" +
    "\n" +
    "I must've called a thousand times\n" +
    "To tell you I'm sorry for everything that I've done\n" +
    "But when I call, you never seem to be home\n" +
    "\n" +
    "Hello from the outside\n" +
    "...\n" +
    "\n" +
    "******* This Lyrics is NOT for Commercial use *******\n" +
    "(1409618343571)";

export default function LyricsBody() {
    const lyrics = useAtomValue(lyricsAtom);

    return (
        <div className="border-dashed border-4 border-slate-400 rounded-3xl p-2 w-full">
            <p className="text-3xl font-serif leading-loose h-80 overflow-y-auto text-center whitespace-pre-wrap">
                {lyrics}
            </p>
        </div>
    );
}
