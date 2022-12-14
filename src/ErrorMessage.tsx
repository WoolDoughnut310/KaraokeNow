import { errorAtom } from "./store";
import { useAtomValue } from "jotai";

export default function ErrorMessage() {
    const error = useAtomValue(errorAtom);

    return (
        <div className="bg-red-500 font-mono p-3 m-7 h-48 overflow-auto rounded-2xl">
            {error}
        </div>
    );
}
