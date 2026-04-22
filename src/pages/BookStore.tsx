import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { bookService } from '../services/bookService';
import { Book } from '../types';
import { CATEGORIES } from '../constants';
import { formatPrice } from '../lib/utils';

export default function BookStore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const category = searchParams.get('category') || 'all';

  useEffect(() => {
    setLoading(true);
    bookService.getAllBooks(category, searchParams.get('search') || '').then(data => {
      setBooks(data || []);
      setLoading(false);
    });
  }, [category, searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(prev => {
      if (searchQuery) prev.set('search', searchQuery);
      else prev.delete('search');
      return prev;
    });
  };

  const handleCategoryChange = (slug: string) => {
    setSearchParams(prev => {
      if (slug === 'all') prev.delete('category');
      else prev.set('category', slug);
      return prev;
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-20 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.4em] text-gold font-bold">Catalog</span>
            <h1 className="text-6xl font-serif">Storefront</h1>
          </div>

          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Search by title or author..."
              className="w-full bg-transparent border-b border-ink/20 py-4 pl-0 pr-10 focus:outline-none focus:border-gold transition-colors font-serif italic text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-gold transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <button 
            onClick={() => handleCategoryChange('all')}
            className={`px-6 py-2 text-[10px] uppercase tracking-widest border transition-all ${category === 'all' ? 'bg-ink text-paper border-ink' : 'border-ink/10 hover:border-ink/40'}`}
          >
            All Disciplines
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-6 py-2 text-[10px] uppercase tracking-widest border transition-all ${category === cat.slug ? 'bg-ink text-paper border-ink' : 'border-ink/10 hover:border-ink/40'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
          <p className="font-serif italic text-ink/40">Opening the vault...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
            <AnimatePresence mode="popLayout">
              {books.map((book, idx) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group"
                >
                  <Link to={`/books/${book.id}`} className="block space-y-6">
                    <div className="relative aspect-[3/4] bg-ink overflow-hidden border border-ink/5">
                      <img 
                        src={book.coverUrl} 
                        alt={book.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-70"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-ink/80 to-transparent">
                         <div className="flex justify-between items-end text-paper">
                            <span className="text-[10px] uppercase tracking-widest bg-gold px-2 py-1 font-bold">View Selection</span>
                            <ArrowUpRight className="w-5 h-5" />
                         </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                       <div className="flex justify-between items-start gap-4">
                          <h3 className="font-serif text-xl leading-tight group-hover:text-gold transition-colors">{book.title}</h3>
                       </div>
                       <p className="font-serif italic text-ink/50 text-sm">{book.author}</p>
                       <div className="flex justify-between items-center pt-2">
                          <span className="text-[10px] uppercase tracking-widest text-ink/40 font-bold">{book.category}</span>
                          <span className="text-sm font-sans font-semibold tracking-tight">{formatPrice(book.price)}</span>
                       </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {books.length === 0 && (
            <div className="py-40 text-center">
              <div className="max-w-md mx-auto space-y-6">
                <SlidersHorizontal className="w-12 h-12 mx-auto text-ink/10" />
                <h3 className="text-2xl font-serif">No matches found</h3>
                <p className="font-serif italic text-ink/40">We couldn't find any books matching your current search or filters. Perhaps try a broader term?</p>
                <button 
                  onClick={() => { setSearchQuery(''); handleCategoryChange('all'); }}
                  className="text-xs uppercase tracking-widest border-b border-ink hover:text-gold hover:border-gold transition-all"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
