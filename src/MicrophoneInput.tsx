import React, { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Mic, Activity } from "react-feather";
import axios, { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import { errorAtom, lyricsAtom, titleAtom } from "./store";

const RECORD_DURATION = 15000;

export default function MicrophoneInput() {
  const setError = useSetAtom(errorAtom);
  const setLyrics = useSetAtom(lyricsAtom);
  const setTitle = useSetAtom(titleAtom);
  const { status, startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
    onStop: (_url, blob) => {
      onSubmit(blob);
    },
  });
  const [endTime, setEndTime] = useState(0);
  const [progressHeight, setProgressHeight] = useState(100);

  const updateProgress = () => {
    // elapsed time / duration
    const recorded = Math.max(0, endTime - Date.now()) / RECORD_DURATION;

    // Reset the height to full when completed
    setProgressHeight(recorded === 0 ? 100 : recorded * 100);
    window.requestAnimationFrame(updateProgress);
  };

  const onClick = async () => {
    if (status === "recording") {
      return;
    }

    // Clear the error when recording again
    setError("");
    await startRecording();

    // Trigger the animation to start
    setEndTime(Date.now() + RECORD_DURATION);

    await new Promise((resolve) => {
      setTimeout(resolve, RECORD_DURATION);
    });

    stopRecording();
  };

  useEffect(() => {
    if (endTime === 0) return;
    const request = window.requestAnimationFrame(updateProgress);

    return () => {
      window.cancelAnimationFrame(request);
    };
  }, [endTime]);

  const onSubmit = async (blob: Blob) => {
    const body = new FormData();
    body.append("file", blob);

    try {
      let response = await axios.post("/api/acr-identify", body);

      const trackName = response.data;

      response = await axios.post("/api/lyrics", {
        access_token,
        q: trackName,
      });

      const lyrics = response.data;

      setTitle(trackName);
      setLyrics(lyrics);
    } catch (err) {
      let message: string;
      console.log("the error is", err);

      if (err instanceof AxiosError) {
        message = err.response?.data?.message;
      } else {
        message = (err as Error).message;
      }

      setError(message);
    }
  };

  const Icon = status === "recording" ? Activity : Mic;

  return (
    <button
      type="button"
      className="bg-indigo-300 rounded-2xl border-gray-300 border-2 p-7 relative"
      onClick={onClick}
      disabled={status === "recording"}
    >
      <div
        style={{
          height: `${progressHeight}%`,
        }}
        className="absolute rounded-2xl w-full bg-indigo-500 bottom-0 left-0"
      />
      <Icon className="relative z-10 w-12 h-12" />
    </button>
  );
}
