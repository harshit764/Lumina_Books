import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { APP_NAME } from '../../constants';

export default function Navigation() {
  const { user, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-serif tracking-tight flex items-center">
            <span className="text-gold mr-1">L</span>umina
            <span className="ml-2 py-0.5 px-2 bg-ink text-paper text-[10px] uppercase tracking-widest font-sans font-semibold">Books</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/books" className="text-sm uppercase tracking-widest hover:text-gold transition-colors">Store</Link>
            <Link to="/contact" className="text-sm uppercase tracking-widest hover:text-gold transition-colors">Contact</Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm uppercase tracking-widest text-gold font-semibold">Admin</Link>
            )}
            
            <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-ink/10">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-serif italic text-ink/60">{user.email}</span>
                  <button 
                    onClick={logout}
                    className="p-2 hover:bg-ink hover:text-paper rounded-full transition-all"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="p-2 hover:bg-ink hover:text-paper rounded-full transition-all"
                  title="Login"
                >
                  <User className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-paper border-b border-ink/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link to="/books" onClick={() => setIsMenuOpen(false)} className="block text-xl font-serif">Store</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block text-xl font-serif">Contact</Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block text-xl font-serif text-gold underline decoration-gold/30">Dashboard</Link>
              )}
              <div className="pt-4 border-t border-ink/5">
                {user ? (
                  <button 
                    onClick={() => { logout(); setIsMenuOpen(false); }}
                    className="flex items-center text-sm uppercase tracking-widest text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center text-sm uppercase tracking-widest">
                    <User className="w-4 h-4 mr-2" /> Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
