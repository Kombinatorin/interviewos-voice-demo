import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';

type Status = 'IDLE' | 'CONNECTING' | 'SPEAKING' | 'ERROR';

const App: React.FC = () => {
  const [status, setStatus] = useState<Status>('IDLE');
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);

  const startVoiceDemo = async () => {
    try {
      setStatus('CONNECTING');

      // ✅ MUST be created + resumed after user click
      const audioContext = new AudioContext({ sampleRate: 24000 });
      await audioContext.resume();
      audioContextRef.current = audioContext;

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Missing VITE_GEMINI_API_KEY');
      }

      const ai = new GoogleGenAI({ apiKey });

      sessionRef.current = await ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Zephyr' }
            }
          },
          systemInstruction: `
Du sprichst Deutsch.
Begrüße Marko freundlich und erzähle kurz einen Witz.
Danach verabschiedest du dich freundlich.
          `.trim()
        },
        callbacks: {
          onopen: () => {
            console.log('✅ Gemini connection opened');
          },
          onmessage: async (msg) => {
            const audioData =
              msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;

            if (audioData && audioContextRef.current) {
              setStatus('SPEAKING');

              const buffer = await audioContextRef.current.decodeAudioData(
                Uint8Array.from(atob(audioData), c => c.charCodeAt(0)).buffer
              );

              const source = audioContextRef.current.createBufferSource();
              source.buffer = buffer;
              source.connect(audioContextRef.current.destination);
              source.start();
            }
          },
          onerror: (err) => {
            console.error('❌ Gemini error', err);
            setStatus('ERROR');
          },
          onclose: () => {
            console.log('🔌 Gemini connection closed');
            setStatus('IDLE');
          }
        }
      });

    } catch (err) {
      console.error(err);
      setStatus('ERROR');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>InterviewOS – Voice Demo</h1>

        {status === 'IDLE' && (
          <button onClick={startVoiceDemo}>Start Voice Demo</button>
        )}

        {status === 'CONNECTING' && <p>Verbinde…</p>}
        {status === 'SPEAKING' && <p>KI spricht…</p>}
        {status === 'ERROR' && <p>Fehler – siehe Konsole</p>}
      </div>
    </div>
  );
};

export default App;
