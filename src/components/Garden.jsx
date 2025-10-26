import React from 'react';
import { Leaf, Sprout } from 'lucide-react';

const Plant = ({ stage = 0 }) => {
  const stages = [
    { emoji: '🌱', label: 'Seedling' },
    { emoji: '🌿', label: 'Growing' },
    { emoji: '🌳', label: 'Flourishing' },
  ];
  const s = stages[Math.min(stage, stages.length - 1)];
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-4xl" aria-hidden>{s.emoji}</div>
      <div className="mt-2 text-sm text-gray-700">{s.label}</div>
    </div>
  );
};

export default function Garden() {
  const seeds = 3; // demo value
  const plants = [0, 1, 2, 1, 0, 2];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 md:px-8 mt-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Your Mind Garden</h2>
            <p className="text-gray-600 text-sm">Plant seeds you earn from daily activities</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-[#A8D5BA] text-gray-800">
            <Sprout className="h-4 w-4" /> {seeds} seeds available
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {plants.map((p, i) => (
            <Plant key={i} stage={p} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button className="rounded-lg px-4 py-2 text-sm text-white shadow" style={{ backgroundColor: '#A8D5BA' }}>
            Plant a seed
          </button>
          <button className="rounded-lg px-4 py-2 text-sm border border-gray-200 bg-white hover:bg-gray-50 text-gray-800">
            Log an activity
          </button>
          <div className="text-xs text-gray-600 flex items-center gap-2">
            <Leaf className="h-4 w-4" /> Grow with small, steady steps.
          </div>
        </div>
      </div>
    </section>
  );
}
