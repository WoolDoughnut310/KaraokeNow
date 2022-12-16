import { atom } from "jotai";

export const errorAtom = atom("");
export const titleAtom = atom("");

// Measured in words per minute
export const songRateAtom = atom(160);
let L =
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

// Displaying lyrics
export const lyricsAtom = atom("");
export const currentWordAtom = atom(0);
export const nextWordAtom = atom(
    null,
    (get, set) => {
        const words = [...get(lyricsAtom).matchAll(/[\w']+/g)].map((match) => match[0]);
        set(currentWordAtom, (prev) => {
            if (prev >= words.length - 1) {
                return 0
            }
            return prev + 1
        });
    }
);