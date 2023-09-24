import React, { useEffect, useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  currentWordAtom,
  lyricsAtom,
  lyricWordsAtom,
  nextWordAtom,
  songRateAtom,
} from "../store";
import parseLyrics from "./parser";
import countSyllables from "./countSyllables";

export default function LyricsBody() {
  const lyrics = useAtomValue(lyricsAtom);
  const nextWord = useSetAtom(nextWordAtom);
  const songRate = useAtomValue(songRateAtom);
  const currentWord = useAtomValue(currentWordAtom);
  const lyricWords = useAtomValue(lyricWordsAtom);

  const segments = useMemo(() => parseLyrics(lyrics), [lyrics]);

  useEffect(() => {
    let request: number;

    const delay = (60 * 1000) / songRate;
    let start: number;
    let previousTime: number;

    const animateWords = (time: number) => {
      if (!start) {
        start = time;
        previousTime = time;
      }

      const syllableCount = countSyllables(lyricWords[currentWord]);
      console.log(syllableCount, lyricWords[currentWord]);

      if (time - previousTime >= delay * syllableCount) {
        nextWord();
        previousTime = time;
      }

      request = window.requestAnimationFrame(animateWords);
    };

    request = window.requestAnimationFrame(animateWords);

    return () => {
      window.cancelAnimationFrame(request);
    };
  }, [songRate, lyricWords, currentWord]);

  return (
    <div className="border-dashed border-4 border-slate-400 rounded-3xl p-2 w-full">
      <p className="text-3xl font-serif leading-loose h-80 overflow-y-auto text-center whitespace-pre-wrap">
        {segments}
      </p>
    </div>
  );
}
