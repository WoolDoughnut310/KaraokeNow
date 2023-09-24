import { atom } from "jotai";

// Stores errors returned from the serverless functions
export const errorAtom = atom("");

// Stores the song title
export const titleAtom = atom("");

// Measured in words per minute
export const songRateAtom = atom(160 * 0.6);

// Displaying lyrics
export const lyricsAtom = atom("");

// Get every word in the lyrics
export const lyricWordsAtom = atom((get) =>
  [...get(lyricsAtom).matchAll(/[\w']+/g)].map((match) => match[0])
);

export const currentWordAtom = atom(0);

// Allows changing the index of the next word to highlight
export const newWordAtom = atom(-1);

// Write-only atom, updates the index of the highlighted word
export const nextWordAtom = atom(null, (get, set) => {
  // Get every word in the lyrics
  set(currentWordAtom, (prev) => {
    // Override the new word index with any value in `newWordAtom`
    const newWord = get(newWordAtom);
    if (newWord !== -1) {
      set(newWordAtom, -1);
      return newWord;
    }

    return (prev + 1) % get(lyricWordsAtom).length;
  });
});
