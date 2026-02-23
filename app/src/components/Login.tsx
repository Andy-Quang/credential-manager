import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { auth } from '../lib/firebase';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl transition-all border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-center mb-8 text-slate-800 dark:text-white">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 dark:bg-red-900/30 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600 dark:text-slate-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none disabled:opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-600 dark:text-slate-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full p-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none disabled:opacity-50"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-600/20 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isLoading && !isLogin ? <Loader2 className="animate-spin" size={20} /> : isLogin && isLoading ? <Loader2 className="animate-spin" size={20} /> : null}
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
          <span className="text-sm text-slate-400">OR</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full mt-6 py-3 flex items-center justify-center gap-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />}
          <span className="font-medium text-slate-700 dark:text-white">Sign in with Google</span>
        </button>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            disabled={isLoading}
            className="text-cyan-600 hover:underline font-medium disabled:opacity-50"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
