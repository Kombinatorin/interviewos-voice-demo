import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

/**
 * InterviewOS – Voice Demo (Vercel-safe)
 * - No API / Mic access on initial render
 * - Starts ONLY after explicit user click
 * - Prevents white screen & autoplay crashes
 */

const SYSTEM_PROMPT = `
Du bist ein freundlicher, fröhlicher KI-Agent.
Sprich ausschließlich Deutsch.

Sage exakt diesen Text:

"Hi Marko, schöne Grüße von Matthias.

Was sagt ein Holzwurmvater abends zu seinen Kindern?
Ab ins Brettchen!

Und übrigens:
Heute Abend zwischen 19 und 20 Uhr bekommst du beim Tischtennis ordentlich auf den Arsch.
Überleg dir schon mal was – ich freue mich drauf.

Danke dir fürs Zuhören."
`;

type Status = 'IDLE' | 'CONNECTING' | 'SPEAKING' | 'FINISHED' | 'ERROR';

export default function App() {
  const [status, setStatus] = useState<Status>('IDLE');
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);

  const startDemo = async () => {
    try {
      setStatus('CONNECTING');

      // 🔐 API key (Vercel-safe)
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Missing VITE_GEMINI_API_KEY');
      }

      // 🎤 Audio context (must be user-triggered)
      const audioContext = new AudioContext({ sampleRate: 24000 });
      audioContextRef.current = audioContext;

      const ai = new GoogleGenAI({ apiKey });

      const session = await ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_PROMPT,
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Zephyr' }
            }
          }
        },
        callbacks: {
          onmessage: async (msg: any) => {
            const audioData =
              msg?.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

            if (!audioData) return;

            setStatus('SPEAKING');

            const binary = Uint8Array.from(atob(audioData), c =>
              c.charCodeAt(0)
            ).buffer;

            const audioBuffer = await audioContext.decodeAudioData(binary);
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start();

            source.onended = () => {
              setStatus('FINISHED');
              session.close();
            };
          },
          onerror: (e: any) => {
            console.error(e);
            setError('Voice-Fehler');
            setStatus('ERROR');
          }
        }
      });

      sessionRef.current = session;

      // 🚀 Trigger first response
      session.sendRealtimeInput({});
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Unbekannter Fehler');
      setStatus('ERROR');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f172a',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>InterviewOS</h1>

        {status === 'IDLE' && (
          <button onClick={startDemo} style={buttonStyle}>
            ▶️ Start Voice Demo
          </button>
        )}

        {status === 'CONNECTING' && <p>Verbinde…</p>}
        {status === 'SPEAKING' && <p>KI spricht…</p>}
        {status === 'FINISHED' && <p>✅ Demo beendet</p>}
        {status === 'ERROR' && <p style={{ color: '#f87171' }}>{error}</p>}
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  background: '#22d3ee',
  color: '#020617',
  border: 'none',
  borderRadius: 8,
  padding: '14px 20px',
  fontSize: 16,
  cursor: 'pointer'
};
