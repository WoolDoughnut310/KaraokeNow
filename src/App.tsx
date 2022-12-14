import MicrophoneInput from "./MicrophoneInput";

export default function App() {
    return (
        <main className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="font-bold font-sans text-6xl">KaraokeNow</h1>
            <p className="mb-4">React ⚛️ + Vite ⚡ + Replit 🌀</p>
            <MicrophoneInput />
        </main>
    );
}
