import React, { useMemo, useRef, useState } from 'react';
import { Send, MessageCircle, AlertTriangle, Lock } from 'lucide-react';

const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'harm myself', 'end my life', 'self-harm', 'hurt myself', 'suicidal'
];

export default function ChatbotPanel() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi, I\'m MindGrow. I\'m here to listen. What\'s on your mind today?' }
  ]);
  const [input, setInput] = useState('');
  const [sentToday, setSentToday] = useState(0);
  const limit = 10; // free tier daily limit
  const endRef = useRef(null);

  const isAtLimit = sentToday >= limit;

  const crisisDetected = useMemo(() => {
    const last = input.toLowerCase();
    return CRISIS_KEYWORDS.some(k => last.includes(k));
  }, [input]);

  const onSend = () => {
    if (!input.trim()) return;
    if (isAtLimit) return;
    const userMsg = { role: 'user', content: input.trim() };
    const assistantReply = {
      role: 'assistant',
      content: 'Thanks for sharing. I hear you. Try a slow breath: in 4, hold 4, out 6. Would you like a short grounding exercise?'
    };
    setMessages(prev => [...prev, userMsg, assistantReply]);
    setInput('');
    setSentToday(c => c + 1);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <section id="chat" className="mx-auto w-full max-w-6xl px-6 md:px-8 mt-12">
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">AI Chat Therapy</h2>
          </div>
          <div className="text-xs text-gray-600">
            Free: {limit} chats/day • Premium: Unlimited
          </div>
        </div>

        <div className="h-72 overflow-y-auto p-4 space-y-3 bg-gray-50/60">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'assistant' ? 'flex gap-2' : 'flex gap-2 justify-end'}>
              <div className={
                'max-w-[75%] rounded-2xl px-3 py-2 text-sm ' +
                (m.role === 'assistant' ? 'bg-white border border-gray-200 text-gray-800' : 'bg-[#A8D5BA] text-gray-800')
              }>
                {m.content}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {crisisDetected && (
          <div className="px-4 py-3 bg-red-50 border-t border-red-100 text-sm text-red-800 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 mt-0.5" />
            <div>
              Your message mentions words that may indicate crisis. If you are in immediate danger, call your local emergency number. In the U.S., dial 988 for the Suicide & Crisis Lifeline. You can also press the SOS button for a guided breathing exercise and resources.
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
          <div className="mt-2 text-[11px] text-gray-500">MindGrow is not a medical device. If you are experiencing a crisis, please use the SOS button or contact local emergency services.</div>
        </div>
      </div>
    </section>
  );
}
