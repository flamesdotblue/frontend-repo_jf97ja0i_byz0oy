import React, { useState } from 'react';
import { Mail, Lock, User, Shield, UserCircle2 } from 'lucide-react';

export default function AuthPanel({ onAuth }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onAuth({ id: 'demo-user', name: name || 'You', email: email || 'anon@mindgrow', plan: 'free', anonymous: false });
      setLoading(false);
    }, 600);
  };

  const googleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      onAuth({ id: 'google-123', name: 'Google User', email: 'user@gmail.com', plan: 'free', anonymous: false });
      setLoading(false);
    }, 600);
  };

  const anonLogin = () => {
    onAuth({ id: 'anon', name: 'Anonymous', email: 'anonymous@mindgrow', plan: 'free', anonymous: true });
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-6 md:px-8 mt-12" aria-labelledby="auth-heading">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCircle2 className="h-6 w-6 text-gray-700" />
            <h2 id="auth-heading" className="text-xl font-semibold text-gray-900">Sign in to MindGrow</h2>
          </div>
          <div className="text-xs text-gray-600 flex items-center gap-2">
            <Shield className="h-4 w-4" /> Privacy-first • Anonymous option
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <form onSubmit={submit} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="text-sm text-gray-700">Name</label>
                <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <input value={name} onChange={(e)=>setName(e.target.value)} className="flex-1 outline-none text-sm" placeholder="Your name" />
                </div>
              </div>
            )}
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="flex-1 outline-none text-sm" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-700">Password</label>
              <div className="mt-1 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                <Lock className="h-4 w-4 text-gray-500" />
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="flex-1 outline-none text-sm" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              By continuing you agree to our
              <a className="underline" href="#">Terms</a> and <a className="underline" href="#">Privacy</a>.
            </div>
            <button disabled={loading} type="submit" className="w-full rounded-lg px-4 py-2 text-sm text-white" style={{ backgroundColor: '#B4A7D6' }}>
              {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
            <div className="text-sm text-gray-700">
              {mode === 'login' ? (
                <span>New here? <button type="button" className="underline" onClick={()=>setMode('signup')}>Create an account</button></span>
              ) : (
                <span>Have an account? <button type="button" className="underline" onClick={()=>setMode('login')}>Sign in</button></span>
              )}
            </div>
          </form>
          <div className="space-y-3">
            <button onClick={googleSignIn} className="w-full rounded-lg px-4 py-2 text-sm border border-gray-200 bg-white hover:bg-gray-50 text-gray-900">Continue with Google</button>
            <button onClick={anonLogin} className="w-full rounded-lg px-4 py-2 text-sm border border-gray-200 bg-white hover:bg-gray-50 text-gray-900">Continue anonymously</button>
            <div className="rounded-lg border border-gray-100 p-4 bg-gradient-to-br from-[#B4A7D6]/10 to-[#A8D5BA]/20 text-sm text-gray-700">
              Tip: You can start anonymous and link your account later. We value your privacy.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
