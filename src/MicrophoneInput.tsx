import React, { useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { Mic, MicOff, Activity } from "react-feather";
import axios from "axios";
import { useSetAtom } from "jotai";
import { errorAtom } from "./store";

export default function MicrophoneInput() {
    const setError = useSetAtom(errorAtom);
    const { status, startRecording, stopRecording } = useReactMediaRecorder({
        audio: true,
        onStop: (_url, blob) => {
            onSubmit(blob);
        },
    });
    console.log(status);

    const onClick = async () => {
        if (status === "recording") {
            return;
        }

        await startRecording();

        await new Promise((resolve) => {
            setTimeout(resolve, 20000);
        });
    };

    const onSubmit = async (blob: Blob) => {
        const body = new FormData();
        body.append("file", blob);

        try {
            let response = await axios.post("/api/acr-identify", body, {
                timeout: 30000,
            });

            const trackISRC = response.data;

            response = await axios.get("/api/find-lyrics", {params: {isrc: trackISRC}});
            const lyrics = response.data;

            setLyrics(lyrics)
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const Icon = status === "recording" ? Activity : Mic;

    return (
        <button
            type="button"
            className="bg-slate-500 rounded-2xl border-gray-300 border-2 p-7"
            onClick={onClick}
            disabled={status === "recording"}
        >
            <Icon className="w-12 h-12" />
        </button>
    );
}
