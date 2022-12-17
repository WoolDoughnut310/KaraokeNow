import React from "react";
import { useAtomValue } from "jotai";
import { titleAtom } from "./store";

export default function SongTitle() {
    const title = useAtomValue(titleAtom);
    return (
        <div
            title={title}
            className="px-4 py-2 bg-gray-400/60 rounded-3xl shadow-md mb-2"
        >
            <h4 className="font-bold text-xl">{title}</h4>
        </div>
    );
}
