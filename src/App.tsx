import React from "react";
import { useAtomValue } from "jotai";
import LyricsBody from "./lyrics/LyricsBody";
import MicrophoneInput from "./MicrophoneInput";
import SongTitle from "./SongTitle";
import { lyricsAtom } from "./store";
import SongRateInput from "./SongRateInput";
import ErrorMessage from "./ErrorMessage";
import AuthButton from "./AuthButton";
import cookie from "cookie";

export default function App() {
  const lyrics = useAtomValue(lyricsAtom);

  const accessToken = cookie.parse(document.cookie)["accessToken"];

  const renderedChild =
    lyrics === "" ? (
      accessToken === "" ? (
        <AuthButton />
      ) : (
        <MicrophoneInput />
      )
    ) : (
      <>
        <SongTitle />
        <LyricsBody />
        <SongRateInput />
      </>
    );

  return (
    <main className="w-full h-full px-10 flex flex-col justify-center items-center">
      <h1 className="font-bold font-sans text-6xl">KaraokeNow</h1>
      <p className="mb-5">React ⚛️ + Vite ⚡</p>
      {renderedChild}
      <ErrorMessage />
    </main>
  );
}
