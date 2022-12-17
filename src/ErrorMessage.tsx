import React from "react";
import { errorAtom } from "./store";
import { useAtomValue } from "jotai";

export default function ErrorMessage() {
    const error = useAtomValue(errorAtom);
    if (!error) return null;

    return (
        <div className="bg-red-500 px-6 py-4 m-7 h-24 flex overflow-auto rounded-2xl">
            <p className="font-mono my-auto w-80 whitespace-nowrap text-center">
                {error}
            </p>
        </div>
    );
}
