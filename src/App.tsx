import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// 🔹 Supabase Client (liest aus .env.local)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are missing')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function App() {
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const saveAnswer = async (answer: 'yes' | 'no') => {
    setStatus('saving')
    setError(null)

    const { error } = await supabase.from('interviews').insert({
      status: 'test',
      final_variables: {
        simple_test: true,
        answer,
        created_at: new Date().toISOString(),
      },
    })

    if (error) {
      console.error(error)
      setError(error.message)
      setStatus('error')
    } else {
      setStatus('done')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f172a',
      color: 'white',
      fontFamily: 'system-ui'
    }}>
      <div style={{
        background: '#020617',
        padding: '32px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center'
      }}>
        {status === 'idle' && (
          <>
            <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>
              Supabase Connection Test
            </h1>
            <p style={{ marginBottom: '24px', opacity: 0.8 }}>
              Should we write a test record to the database?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => saveAnswer('yes')}>Yes</button>
              <button onClick={() => saveAnswer('no')}>No</button>
            </div>
          </>
        )}

        {status === 'saving' && <p>Saving to database…</p>}

        {status === 'done' && (
          <>
            <h2 style={{ color: '#22c55e' }}>Saved successfully ✅</h2>
            <p>You can now check Supabase → interviews</p>
          </>
        )}

        {status === 'error' && (
          <>
            <h2 style={{ color: '#ef4444' }}>Error ❌</h2>
            <p>{error}</p>
          </>
        )}
      </div>
    </div>
  )
}