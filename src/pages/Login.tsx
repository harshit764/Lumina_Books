import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn } from 'lucide-react';

export default function Login() {
  const { user, login, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/" />;

  return (
    <div className="min-h-[80vh] flex items-center justify-center container mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 border border-ink/5 shadow-2xl space-y-10 text-center"
      >
        <div className="space-y-4">
          <h1 className="text-4xl font-serif">Welcome Back</h1>
          <p className="font-serif italic text-ink/50">Enter the library using your digital key.</p>
        </div>

        <button 
          onClick={login}
          className="w-full flex items-center justify-center space-x-4 bg-ink text-paper py-5 px-8 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-gold transition-all group"
        >
          <LogIn className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Login with Google</span>
        </button>

        <p className="text-[10px] uppercase tracking-widest text-ink/30 px-8 leading-loose">
          By logging in, you agree to our terms of service and library protocols.
        </p>
      </motion.div>
    </div>
  );
}
