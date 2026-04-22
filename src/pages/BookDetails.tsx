import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { bookService } from '../services/bookService';
import { Book } from '../types';
import { formatPrice } from '../lib/utils';
import { ArrowLeft, Share2, Heart, ShoppingBag, CheckCircle2 } from 'lucide-react';

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      bookService.getBookById(id).then(data => {
        setBook(data || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-40 flex justify-center">
        <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-40 text-center space-y-8">
        <h1 className="text-4xl font-serif">A lost manuscript...</h1>
        <p className="font-serif italic text-ink/60">We couldn't find the book you're looking for.</p>
        <Link to="/books" className="inline-block border-b border-ink uppercase tracking-widest text-xs font-bold py-2">Return to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <Link 
        to="/books" 
        className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest hover:text-gold transition-colors mb-12"
      >
        <ArrowLeft className="w-3 h-3" />
        <span>Back to Collection</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
        {/* Book Cover */}
        <div className="lg:col-span-5 xl:col-span-4">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-32"
          >
            <div className="relative group perspective-1000">
              <div className="bg-ink shadow-2xl overflow-hidden aspect-[2/3] border border-ink/5 relative z-10">
                <img 
                  src={book.coverUrl} 
                  alt={book.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative back shadows */}
              <div className="absolute top-4 left-4 w-full h-full bg-gold/10 -z-10 translate-x-4 translate-y-4"></div>
            </div>

            <div className="mt-12 flex justify-center space-x-8">
               <button className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold hover:text-gold transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
               </button>
               <button className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold hover:text-gold transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
               </button>
            </div>
          </motion.div>
        </div>

        {/* Info */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-4">
              <span className="text-[10px] uppercase tracking-[0.3em] bg-gold/10 text-gold px-3 py-1 font-bold rounded-full">{book.category}</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-ink/30">SKU: {book.id.slice(0, 8).toUpperCase()}</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-serif font-light leading-tight tracking-tight">{book.title}</h1>
            <p className="text-2xl font-serif italic text-ink/60">by {book.author}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-baseline space-x-6 py-8 border-y border-ink/10"
          >
            <span className="text-5xl font-sans font-light tracking-tighter">{formatPrice(book.price)}</span>
            <span className="text-xs uppercase tracking-widest text-[#22c55e] font-bold flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1" /> In Stock
            </span>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
             className="space-y-6"
          >
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-ink/40">Synopsis</h3>
            <div className="prose prose-lg max-w-none">
              <p className="font-serif italic text-xl leading-relaxed text-ink/80 whitespace-pre-wrap">
                {book.description || "No description provided for this edition."}
              </p>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="pt-8 flex flex-col sm:flex-row gap-6"
          >
            <button className="flex-1 bg-ink text-paper py-6 px-12 uppercase tracking-[0.3em] text-xs font-bold hover:bg-gold hover:text-ink transition-all flex items-center justify-center space-x-4 group shadow-xl">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Acquire This Work</span>
            </button>
            <button className="py-6 px-12 border border-ink/20 uppercase tracking-[0.3em] text-xs font-bold hover:bg-ink hover:text-paper transition-all">
              Sample Chapter
            </button>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.7 }}
             className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-16 border-t border-ink/10"
          >
             <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-ink/40">Format</p>
                <p className="text-sm font-serif">Hardcover</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-ink/40">Pages</p>
                <p className="text-sm font-serif">384</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-ink/40">Language</p>
                <p className="text-sm font-serif">English</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-ink/40">Publisher</p>
                <p className="text-sm font-serif">Lumina Press</p>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
