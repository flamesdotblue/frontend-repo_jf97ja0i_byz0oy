import React from 'react';
import Spline from '@splinetool/react-spline';
import { Star, Shield, Heart } from 'lucide-react';

const MeditationsStrip = () => {
  const meditations = [
    'Calm Morning',
    'Body Scan',
    'Loving Kindness',
    'Focus Breath',
    'Gratitude',
    'Release Stress',
    'Sleep Wind-Down',
    'Confidence',
    'Nature Walk',
    'Compassion',
  ];
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Guided Meditations</h3>
        <span className="text-xs text-gray-500">10 sessions</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2" role="list">
        {meditations.map((m) => (
          <button
            key={m}
            className="shrink-0 px-4 py-2 rounded-full bg-white/70 hover:bg-white text-gray-700 shadow-sm border border-white/40 backdrop-blur"
            aria-label={`Play ${m} meditation`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function Hero({ onOpenSOS }) {
  return (
    <section className="relative w-full h-[70vh] md:h-[75vh] rounded-2xl overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-white/70 to-white" />

      <div className="relative h-full flex items-center">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs bg-white/70 border border-white/50 text-gray-700 shadow-sm">
              <Star className="h-3.5 w-3.5 text-yellow-500" />
              MindGrow • Gentle mental wellness
            </span>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight text-gray-900">
              Your private path to mental wellness.
            </h1>
            <p className="text-gray-700 md:text-lg">
              Sign in with email or Google, or continue anonymously. Chat with a supportive AI, set goals, and grow over time.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onOpenSOS}
                className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white shadow-md"
                style={{ backgroundColor: '#B4A7D6' }}
              >
                <Heart className="h-4 w-4" />
                Emergency SOS
              </button>
              <a
                href="#auth"
                className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-gray-800 border border-gray-200 bg-white/80 hover:bg-white"
              >
                Get started
              </a>
              <a
                href="#chat"
                className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-gray-800 border border-gray-200 bg-white/80 hover:bg-white"
              >
                Open chat
              </a>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" /> Privacy-first
              </div>
              <div>Anonymous option</div>
            </div>
            <MeditationsStrip />
          </div>
        </div>
      </div>
    </section>
  );
}
