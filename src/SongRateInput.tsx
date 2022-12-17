import React from "react";
import { useAtom } from "jotai";
import { songRateAtom } from "./store";
import Slider from "react-input-slider";

export default function SongRateInput() {
    const [rate, setRate] = useAtom(songRateAtom);

    const onChange = ({ x }: { x: number }) => setRate(x);

    return (
        <div className="max-w-2xl w-full absolute bottom-8">
            <Slider
                axis="x"
                x={rate}
                xmin={100}
                xmax={250}
                onChange={onChange}
                styles={{
                    track: {
                        width: "100%",
                    },
                }}
            />
            <p className="text-center">Song Rate (WPM)</p>
        </div>
    );
}
