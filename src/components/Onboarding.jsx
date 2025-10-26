import React, { useMemo, useState } from 'react';

const goalsList = [
  { key: 'anxiety', label: 'Manage Anxiety' },
  { key: 'confidence', label: 'Build Confidence' },
  { key: 'stress', label: 'Reduce Stress' },
  { key: 'sleep', label: 'Improve Sleep' },
  { key: 'wellness', label: 'General Wellness' },
];

const questions = [
  'How often did you feel stressed this week?',
  'How well did you sleep last night?',
  'How confident do you feel today?',
  'How anxious do you feel right now?',
  'How supported do you feel socially?',
];

export default function Onboarding({ user, onComplete }) {
  const [step, setStep] = useState(0); // 0 Welcome, 1 Account, 2 Goals, 3 Assessment, 4 Recommendation
  const [selected, setSelected] = useState([]);
  const [answers, setAnswers] = useState([3,3,3,3,3]);

  const recs = useMemo(() => {
    const list = [];
    if (selected.includes('anxiety')) list.push('Box breathing 4-4-4-4');
    if (selected.includes('stress')) list.push('10-minute body scan');
    if (selected.includes('sleep')) list.push('Wind-down routine at 9pm');
    if (selected.includes('confidence')) list.push('Evidence log worksheet');
    if (selected.includes('wellness')) list.push('Gratitude journaling');
    if (!list.length) list.push('Daily 5-minute check-in');
    return list;
  }, [selected]);

  return (
    <section className="mx-auto w-full max-w-6xl px-6 md:px-8 mt-12" aria-labelledby="onboard-heading">
      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        {step === 0 && (
          <div className="relative">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #cfe0ff, #e6dbff)' }} />
            <div className="relative p-10 text-center">
              <h2 id="onboard-heading" className="text-3xl font-semibold text-gray-900">Welcome to MindGrow</h2>
              <p className="mt-2 text-gray-700">A calm space to track mood, chat with an AI companion, and grow a garden of small wins.</p>
              <button onClick={()=>setStep(1)} className="mt-6 rounded-lg px-4 py-2 text-sm text-white" style={{ backgroundColor: '#B4A7D6' }}>Get started</button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-900">Create your account</h3>
            <p className="text-sm text-gray-600">You're signed in as <span className="font-medium">{user?.name}</span>. You can edit your profile anytime.</p>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">Plan: <span className="font-medium capitalize">{user?.plan}</span></div>
              <button onClick={()=>setStep(2)} className="rounded-lg px-4 py-2 text-sm text-white" style={{ backgroundColor: '#A8D5BA' }}>Continue</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-900">Choose your goals</h3>
            <p className="text-sm text-gray-600">Select all that apply. You can change these later.</p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {goalsList.map(g => {
                const active = selected.includes(g.key);
                return (
                  <button
                    key={g.key}
                    onClick={() => setSelected(prev => active ? prev.filter(k=>k!==g.key) : [...prev, g.key])}
                    className={`rounded-xl border p-4 text-left shadow-sm ${active ? 'bg-[#A8D5BA]/30 border-[#A8D5BA]' : 'bg-white border-gray-200'}`}
                  >
                    <div className="text-gray-900 font-medium">{g.label}</div>
                    <div className="text-xs text-gray-600 mt-1">{active ? 'Selected' : 'Tap to select'}</div>
                  </button>
                );
              })}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <button onClick={()=>setStep(1)} className="rounded-lg px-4 py-2 text-sm border border-gray-200 bg-white text-gray-800">Back</button>
              <button onClick={()=>setStep(3)} className="rounded-lg px-4 py-2 text-sm text-white" style={{ backgroundColor: '#B4A7D6' }}>Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-900">Quick assessment</h3>
            <p className="text-sm text-gray-600">Answer with how you feel right now (1-5).</p>
            <div className="mt-6 space-y-5">
              {questions.map((q, i) => (
                <div key={i} className="rounded-lg border border-gray-100 p-4 bg-white">
                  <div className="text-sm text-gray-800">{q}</div>
                  <input type="range" min="1" max="5" value={answers[i]} onChange={e => setAnswers(a => a.map((v, idx) => idx===i ? Number(e.target.value) : v))} className="w-full mt-3" />
                  <div className="text-xs text-gray-500">Current: {answers[i]}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <button onClick={()=>setStep(2)} className="rounded-lg px-4 py-2 text-sm border border-gray-200 bg-white text-gray-800">Back</button>
              <button onClick={()=>setStep(4)} className="rounded-lg px-4 py-2 text-sm text-white" style={{ backgroundColor: '#A8D5BA' }}>See recommendations</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-900">Your plan</h3>
            <p className="text-sm text-gray-600">Based on your goals, we suggest:</p>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-800">
              {recs.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-end">
              <button onClick={onComplete} className="rounded-lg px-4 py-2 text-sm text-white" style={{ backgroundColor: '#B4A7D6' }}>Start using MindGrow</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
