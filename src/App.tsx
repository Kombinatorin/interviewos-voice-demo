import React, { useState } from "react";
import VoiceDemo from "./VoiceDemo";
import LandingPage from "./LandingPage";

export default function App() {
  return <LandingPage />;
}
const App: React.FC = () => {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center max-w-xl px-6">
          <h1 className="text-5xl font-bold mb-6">
            Interview<span className="text-cyan-400">OS</span>
          </h1>

          <p className="text-lg text-gray-300 mb-10">
            Ein neues Betriebssystem für Interviews, Dialoge und KI-Agenten.
            Ruhig. Intelligent. Menschlich.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="px-8 py-4 rounded-xl text-lg font-semibold
                       bg-cyan-500 hover:bg-cyan-400 transition-all"
          >
            Entdecke InterviewOS
          </button>
        </div>
      </div>
    );
  }

  // Voice startet NUR nach Klick
  return <VoiceDemo />;
};

export default App;
