import React, { useMemo, useRef, useState } from 'react';
import { Send, MessageCircle, AlertTriangle, Lock, Trash2 } from 'lucide-react';

const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'harm myself', 'end my life', 'self-harm', 'hurt myself', 'suicidal'
];

function TypingDots() {
  return (
    <span className="inline-flex gap-1">
      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
    </span>
  );
}

export default function ChatbotPanel({ plan = 'free' }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi, I'm Luna. I'm here with you. How are you feeling today?" }
  ]);
  const [input, setInput] = useState('');
  const [sentToday, setSentToday] = useState(0);
  const [thinking, setThinking] = useState(false);
  const endRef = useRef(null);

  const dailyLimit = plan === 'premium' ? Infinity : 10;
  const isAtLimit = sentToday >= dailyLimit;

  const crisisDetected = useMemo(() => {
    const last = input.toLowerCase();
    return CRISIS_KEYWORDS.some(k => last.includes(k));
  }, [input]);

  const quickReplies = ['Tell me more', 'Try a breathing exercise', 'Change topic'];

  const addAssistant = (text) => {
    setMessages(prev => [...prev, { role: 'assistant', content: text }]);
  };

  const onSend = () => {
    if (!input.trim() || isAtLimit || thinking) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSentToday(c => c + 1);

    // Crisis detection immediate resource
    if (CRISIS_KEYWORDS.some(k => userMsg.content.toLowerCase().includes(k))) {
      addAssistant("I care about you. Please reach out for immediate help. In the U.S., call or text 988 (Suicide & Crisis Lifeline). If you're in danger, call your local emergency number. Let's also take a slow breath together: in 4, hold 4, out 6.");
      return;
    }

    // Simulate GPT-4 response
    setThinking(true);
    setTimeout(() => {
      const reply = [
        "I hear how hard this feels. Here are gentle options:\n• 3-minute grounding: name 5 sights, 4 touches, 3 sounds, 2 smells, 1 taste.\n• Try box breathing (4-4-4-4).\n• Would journaling for 5 mins help?",
        "Thanks for sharing that. You make sense. Try one of these:\n• Label your thought and check the evidence for/against it.\n• A short walk or stretch.\n• Rate your emotion 0-10 before/after.",
        "That sounds heavy. Small steps count:\n• Progressive muscle relaxation for 3 mins.\n• Self-compassion: what would you say to a friend?\n• Tiny goal for today (1 action)."
      ];
      addAssistant(reply[Math.floor(Math.random()*reply.length)]);
      setThinking(false);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }, 1000 + Math.random()*800);
  };

  const onQuickReply = (q) => {
    setInput(q);
  };

  const clearChat = () => {
    if (!confirm('Clear chat history?')) return;
    setMessages([{ role: 'assistant', content: "Hi, I'm Luna. I'm here with you. How are you feeling today?" }]);
    setSentToday(0);
  };

  return (
    <section id="chat" className="mx-auto w-full max-w-6xl px-6 md:px-8 mt-12">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">AI Chat Therapy</h2>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-600">
            {isAtLimit ? <span className="text-red-600">Daily limit reached</span> : <span>{Math.max(0, dailyLimit - sentToday)} messages left today</span>}
            <button onClick={clearChat} className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-gray-200 bg-white hover:bg-gray-50">
              <Trash2 className="h-3.5 w-3.5" /> Clear Chat
            </button>
          </div>
        </div>

        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50/60">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'assistant' ? 'flex gap-2' : 'flex gap-2 justify-end'}>
              <div className={
                'max-w-[75%] rounded-2xl px-3 py-2 text-sm ' +
                (m.role === 'assistant' ? 'bg-white border border-gray-200 text-gray-800' : 'bg-blue-500 text-white')
              }>
                {m.content}
                {m.role === 'assistant' && (
                  <div className="mt-2 flex gap-2">
                    {quickReplies.map(q => (
                      <button key={q} onClick={() => onQuickReply(q)} className="text-[11px] rounded-full px-2 py-1 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex gap-2">
              <div className="max-w-[75%] rounded-2xl px-3 py-2 text-sm bg-white border border-gray-200 text-gray-800">
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {crisisDetected && (
          <div className="px-4 py-3 bg-red-50 border-t border-red-100 text-sm text-red-800 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5" />
            <div>
              Your message mentions words that may indicate crisis. If you are in immediate danger, call your local emergency number. In the U.S., dial 988 for the Suicide & Crisis Lifeline.
            </div>
          </div>
        )}

        <div className="p-3 border-t border-gray-100">
          {isAtLimit ? (
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-gray-700 flex items-center gap-2">
                <Lock className="h-4 w-4" /> Daily free limit reached.
              </div>
              <button className="rounded-md px-3 py-2 text-sm text-white" style={{ backgroundColor: '#B4A7D6' }}>
                Go Premium — $9.99/mo
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onSend()}
                placeholder="Type a message..."
                className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring focus:ring-[#A8D5BA]/40"
              />
              <button
                onClick={onSend}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-900 border border-gray-200 bg-white hover:bg-gray-50"
              >
                <Send className="h-4 w-4" /> Send
              </button>
            </div>
          )}
          <div className="mt-2 text-[11px] text-gray-500">Luna offers supportive suggestions, not medical advice. If you need urgent help, call your local emergency number or 988 (US).</div>
        </div>
      </div>
    </section>
  );
}
