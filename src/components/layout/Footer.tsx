import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-serif mb-6 tracking-tight">Lumina Books</h2>
            <p className="text-paper/60 max-w-md font-serif leading-relaxed italic">
              "A library is not a luxury but one of the necessities of life."
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold/80">Curating stories since 2024</p>
          </div>
          
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gold mb-6">Explore</h3>
            <ul className="space-y-4 text-sm font-sans">
              <li><Link to="/books" className="hover:text-gold transition-colors">All Books</Link></li>
              <li><Link to="/books?category=fiction" className="hover:text-gold transition-colors">Fiction</Link></li>
              <li><Link to="/books?category=non-fiction" className="hover:text-gold transition-colors">Non-Fiction</Link></li>
              <li><Link to="/books?category=biography" className="hover:text-gold transition-colors">Biographies</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gold mb-6">Support</h3>
            <ul className="space-y-4 text-sm font-sans">
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-paper/40">
          <p>© {new Date().getFullYear()} Lumina Books Collective. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="hover:text-paper">Instagram</a>
            <a href="#" className="hover:text-paper">Twitter</a>
            <a href="#" className="hover:text-paper">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
