import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, BookOpen, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { bookService } from '../services/bookService';
import { Book } from '../types';
import { formatPrice } from '../lib/utils';

export default function Home() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);

  useEffect(() => {
    bookService.getAllBooks().then(books => {
      setFeaturedBooks(books?.slice(0, 4) || []);
    });
  }, []);

  return (
    <div className="space-y-32 mb-32">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2690&auto=format&fit=crop" 
            alt="Library background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[12vw] md:text-[100px] leading-[0.9] font-serif tracking-tight uppercase">
                Collect <br />
                <span className="italic text-gold">Stories</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg md:text-2xl font-serif italic text-paper/70 max-w-xl leading-relaxed"
            >
              A curated selection of timeless literature and contemporary voices. 
              Discover your next great obsession at Lumina Books.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link 
                to="/books" 
                className="inline-flex items-center space-x-4 bg-gold hover:bg-gold/90 text-ink px-10 py-5 text-xs uppercase tracking-[0.3em] font-bold transition-all group"
              >
                <span>Browse Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="absolute right-0 bottom-0 p-12 hidden lg:block">
           <div className="w-[1px] h-32 bg-gold/50 mb-4 mx-auto"></div>
           <span className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.5em] text-gold/50">Est. MMXXIV</span>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-ink/10 pb-8">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold block mb-4">The Selection</span>
            <h2 className="text-5xl font-serif">Featured Authors</h2>
          </div>
          <Link to="/books" className="mt-8 md:mt-0 text-sm uppercase tracking-widest border-b border-ink/20 hover:border-gold transition-all pb-1 italic">
            See all titles
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {featuredBooks.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={`/books/${book.id}`} className="block">
                <div className="aspect-[2/3] bg-ink/5 overflow-hidden mb-6 relative">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-paper text-ink px-4 py-2 text-[10px] uppercase tracking-widest font-bold">Details</span>
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <h3 className="text-xl font-serif leading-tight group-hover:text-gold transition-colors">{book.title}</h3>
                  <p className="text-sm font-serif italic text-ink/60">{book.author}</p>
                  <p className="text-xs font-sans font-semibold mt-4">{formatPrice(book.price)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
          {featuredBooks.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-ink/10">
              <p className="font-serif italic text-ink/40">Our shelves are being restocked. Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-ink text-paper py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="aspect-square rounded-full border border-paper/10 absolute -top-10 -left-10 w-full h-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2670&auto=format&fit=crop" 
                alt="Reading philosophy" 
                className="w-full aspect-[4/5] object-cover relative z-10 oval-mask"
              />
            </div>
            
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold">Philosophy</span>
                <h2 className="text-6xl font-serif leading-none">The Art of <br /> Slow Reading</h2>
              </div>
              
              <p className="text-xl font-serif italic text-paper/70 leading-relaxed">
                In a world of constant noise, we believe in the sanctuary of the printed word. 
                Our collection is hand-selected to provoke thought, inspire change, and provide escape.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-paper/5 p-4 rounded-full">
                    <Star className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg">Curated Quality</h4>
                    <p className="text-sm text-paper/50 font-sans mt-2">Only the best editions and highest literary merit.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-paper/5 p-4 rounded-full">
                    <BookOpen className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg">Knowledge Hub</h4>
                    <p className="text-sm text-paper/50 font-sans mt-2">More than a shop - a community of deep thinkers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <Truck className="w-8 h-8 mx-auto text-gold" />
            <h3 className="text-xl font-serif">Global Delivery</h3>
            <p className="text-sm text-ink/60 font-sans">We ship stories to every corner of the world, packaged with care.</p>
          </div>
          <div className="space-y-4">
             <Star className="w-8 h-8 mx-auto text-gold" />
            <h3 className="text-xl font-serif">Bespoke Gifting</h3>
            <p className="text-sm text-ink/60 font-sans">Elegant wrapping and personalized notes for the book lovers in your life.</p>
          </div>
          <div className="space-y-4">
            <BookOpen className="w-8 h-8 mx-auto text-gold" />
            <h3 className="text-xl font-serif">Rare Editions</h3>
            <p className="text-sm text-ink/60 font-sans">Access to limited prints and signed copies from world-renowned authors.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
