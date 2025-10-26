import React, { useMemo } from 'react';
import { BarChart3 } from 'lucide-react';

function LineChart({ data, color = '#4B5563' }) {
  const { points, minY, maxY } = useMemo(() => {
    const values = data.map(d => d.value);
    const min = Math.min(...values, 0);
    const max = Math.max(...values, 10);
    const w = 280;
    const h = 120;
    const stepX = w / (data.length - 1 || 1);
    const pts = data.map((d, i) => {
      const x = i * stepX;
      const y = h - ((d.value - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    }).join(' ');
    return { points: pts, minY: min, maxY: max };
  }, [data]);

  return (
    <svg viewBox="0 0 300 160" className="w-full h-40">
      <g transform="translate(10,10)">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="3"
          points={points}
        />
        {data.map((d, i) => (
          <circle key={i} cx={(i*(280/(data.length-1||1)))} cy={160-20 - ((d.value - Math.min(...data.map(v=>v.value),0)) / ((Math.max(...data.map(v=>v.value),10) - Math.min(...data.map(v=>v.value),0)) || 1)) * 120} r="3" fill={color} />
        ))}
      </g>
    </svg>
  );
}

export default function MoodTracker() {
  const last7 = [
    { day: 'Mon', value: 4 },
    { day: 'Tue', value: 6 },
    { day: 'Wed', value: 5 },
    { day: 'Thu', value: 7 },
    { day: 'Fri', value: 6 },
    { day: 'Sat', value: 8 },
    { day: 'Sun', value: 7 },
  ];

  return (
    <section id="analytics" className="mx-auto w-full max-w-6xl px-6 md:px-8 mt-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Mood Dashboard</h2>
            <p className="text-gray-600 text-sm">Your last 7 days at a glance</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-[#A8D5BA] text-gray-800">
            <BarChart3 className="h-4 w-4" /> 7-day view (Free)
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-xl border border-gray-100 p-4 bg-gradient-to-br from-white via-white to-[#A8D5BA]/30">
            <LineChart data={last7} color="#6B7280" />
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              {last7.map(d => (
                <span key={d.day}>{d.day}</span>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-lg border border-gray-100 p-4">
              <p className="text-sm text-gray-700">Average mood</p>
              <p className="text-3xl font-semibold text-gray-900">6.1</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4">
              <p className="text-sm text-gray-700">Streak</p>
              <p className="text-3xl font-semibold text-gray-900">5 days</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-4 bg-[#B4A7D6]/10">
              <p className="text-sm text-gray-800 font-medium">Unlock full analytics</p>
              <p className="text-xs text-gray-700">30/90-day trends, triggers, and correlations</p>
              <button className="mt-3 w-full rounded-md px-3 py-2 text-sm text-white" style={{ backgroundColor: '#B4A7D6' }}>
                Go Premium — $9.99/mo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
