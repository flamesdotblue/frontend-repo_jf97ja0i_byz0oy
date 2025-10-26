import React, { useEffect, useRef, useState } from 'react';
import Hero from './components/Hero';
import MoodTracker from './components/MoodTracker';
import Garden from './components/Garden';
import ChatbotPanel from './components/ChatbotPanel';

function BreathingModal({ open, onClose }) {
  const [phase, setPhase] = useState('Inhale');
  const [count, setCount] = useState(4);
  const [running, setRunning] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setPhase('Inhale');
    setCount(4);
    setRunning(true);
  }, [open]);

  useEffect(() => {
    if (!open || !running) return;
    timerRef.current = setInterval(() => {
      setCount((c) => {
        if (c > 1) return c - 1;
        // cycle: In 4 -> Hold 4 -> Out 6
        setPhase((p) => {
          if (p === 'Inhale') {
            setCount(4);
            return 'Hold';
          }
          if (p === 'Hold') {
            setCount(6);
            return 'Exhale';
          }
          setCount(4);
          return 'Inhale';
        });
        return 4; // temporary, will be reset above
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [open, running]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">Emergency SOS</h3>
          <p className="mt-1 text-sm text-gray-600">Follow the guided breath to help calm your nervous system.</p>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <div
            className={`transition-all duration-1000 rounded-full flex items-center justify-center text-gray-800`}
            style={{
              width: phase === 'Exhale' ? 140 : 200,
              height: phase === 'Exhale' ? 140 : 200,
              background: 'radial-gradient(circle at 30% 30%, #A8D5BA, #B4A7D6)'
            }}
          >
            <div className="text-center">
              <div className="text-2xl font-semibold">{phase}</div>
              <div className="text-4xl font-bold mt-1">{count}</div>
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-2 text-sm text-gray-700">
          <p>If you are in immediate danger, call your local emergency number. In the U.S., dial 988 for the Suicide & Crisis Lifeline.</p>
          <p>
            You can also try: 5-4-3-2-1 grounding (name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste).
          </p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button onClick={() => setRunning((r) => !r)} className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800">
            {running ? 'Pause' : 'Resume'}
          </button>
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm text-white" style={{ backgroundColor: '#B4A7D6' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [sosOpen, setSosOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#A8D5BA]/20">
      <header className="mx-auto w-full max-w-6xl px-6 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md" style={{ backgroundColor: '#A8D5BA' }} />
          <span className="font-semibold text-gray-900">MindGrow</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a href="#chat" className="hover:text-gray-900">Chat</a>
          <a href="#analytics" className="hover:text-gray-900">Mood</a>
          <a href="#" className="hover:text-gray-900">Garden</a>
          <a href="#" className="hover:text-gray-900">Community</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="rounded-lg px-3 py-2 text-sm border border-gray-200 bg-white text-gray-800">Sign in</button>
          <button className="rounded-lg px-3 py-2 text-sm text-white" style={{ backgroundColor: '#B4A7D6' }}>Go Premium</button>
        </div>
      </header>

      <main>
        <Hero onOpenSOS={() => setSosOpen(true)} />
        <MoodTracker />
        <Garden />
        <ChatbotPanel />
      </main>

      <footer className="mx-auto w-full max-w-6xl px-6 md:px-8 py-10 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>MindGrow — ethical mental wellness. Free value first, premium for deeper tools.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-gray-900" href="#">Privacy</a>
            <a className="hover:text-gray-900" href="#">Terms</a>
            <a className="hover:text-gray-900" href="#">Contact</a>
          </div>
        </div>
      </footer>

      <BreathingModal open={sosOpen} onClose={() => setSosOpen(false)} />

      <button
        onClick={() => setSosOpen(true)}
        className="fixed bottom-5 right-5 rounded-full px-4 py-3 text-sm text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #B4A7D6, #A8D5BA)' }}
        aria-label="Open Emergency SOS"
      >
        SOS
      </button>
    </div>
  );
}
