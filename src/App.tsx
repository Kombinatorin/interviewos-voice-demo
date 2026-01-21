import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { decode, decodeAudioData } from './audioUtils';

type Status = 'IDLE' | 'CONNECTING' | 'SPEAKING' | 'FINISHED' | 'ERROR';

const SYSTEM_PROMPT = `
Du bist ein freundlicher, fröhlicher KI-Agent.
Sprich ausschließlich Deutsch.

Begrüße Marko freundlich und erzähle folgenden Witz exakt:

"Hi Marko, schöne Grüße von Matthias.

Was sagt ein Holzwurmvater abends zu seinen Kindern?
Ab ins Brettchen!

Und jetzt pass auf:
Heute Abend zwischen 19 und 20 Uhr bekommst du beim Tischtennis richtig auf den Arsch.
Überleg dir lieber was – ich freu mich drauf!"

Danach verabschiede dich freundlich und sage nichts mehr.
`;

const App: React.FC = () => {
  const [status, setStatus] = useState<Status>('IDLE');
  const [error, setError] = useState<string | null>(null);

  const sessionRef = useRef<any>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);

  const startVoiceDemo = async () => {
    try {
      setStatus('CONNECTING');
      setError(null);

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('VITE_GEMINI_API_KEY fehlt');
      }

      // AudioContext darf NUR nach User-Click gestartet werden
      const outputCtx = new AudioContext({ sampleRate: 24000 });
      outputAudioContextRef.current = outputCtx;
      nextStartTimeRef.current = outputCtx.currentTime;

      const ai = new GoogleGenAI({ apiKey });

      const session = await ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Zephyr' },
            },
          },
          systemInstruction: SYSTEM_PROMPT,
        },
        callbacks: {
          onmessage: async (message) => {
            const audioData =
              message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

            if (!audioData) return;

            setStatus('SPEAKING');

            const audioBuffer = await decodeAudioData(
              decode(audioData),
              outputCtx,
              24000,
              1
            );

            const source = outputCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputCtx.destination);

            const startTime = Math.max(
              nextStartTimeRef.current,
              outputCtx.currentTime
            );
            source.start(startTime);
            nextStartTimeRef.current = startTime + audioBuffer.duration;

            source.onended = () => {
              setStatus('FINISHED');
              session.close();
            };
          },
          onerror: (e) => {
            console.error(e);
            setError('Fehler bei der Sprachdemo');
            setStatus('ERROR');
          },
        },
      });

      sessionRef.current = session;

      // 🚀 Trigger FIRST model response
      session.sendRealtimeInput({});
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? 'Unbekannter Fehler');
      setStatus('ERROR');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      <h1 className="text-3xl font-bold mb-6">InterviewOS – Voice Demo</h1>

      {status === 'IDLE' && (
        <button
          onClick={startVoiceDemo}
          className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-lg text-lg font-semibold"
        >
          ▶ Start Voice Demo (Marko)
        </button>
      )}

      {status === 'CONNECTING' && (
        <p className="text-xl text-gray-300">Verbinde…</p>
      )}

      {status === 'SPEAKING' && (
        <p className="text-xl text-cyan-400">KI spricht…</p>
      )}

      {status === 'FINISHED' && (
        <button
          onClick={() => setStatus('IDLE')}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-lg font-semibold"
        >
          🔁 Demo erneut starten
        </button>
      )}

      {status === 'ERROR' && (
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => setStatus('IDLE')}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg"
          >
            Zurück
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
