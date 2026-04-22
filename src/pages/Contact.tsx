import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-20 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="space-y-12">
          <header className="space-y-4">
            <span className="text-xs uppercase tracking-[0.4em] text-gold font-bold">Correspondence</span>
            <h1 className="text-7xl font-serif">Get in <br /> <span className="italic">Touch</span></h1>
            <p className="text-xl font-serif italic text-ink/60 leading-relaxed max-w-lg">
              Whether you have a query about a rare edition or simply wish to discuss your latest read, we are always open to conversation.
            </p>
          </header>

          <div className="space-y-8">
             <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center rounded-full">
                   <Mail className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-ink/40">Email</p>
                   <p className="font-serif text-lg">concierge@luminabooks.com</p>
                </div>
             </div>
             <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center rounded-full">
                   <Phone className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-ink/40">Phone</p>
                   <p className="font-serif text-lg">+1 (234) 567-890</p>
                </div>
             </div>
             <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center rounded-full">
                   <MapPin className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-[10px] uppercase tracking-widest text-ink/40">Visits</p>
                   <p className="font-serif text-lg">123 Library Lane, Oxford, UK</p>
                </div>
             </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-12 border border-ink/5 shadow-2xl space-y-10"
        >
           <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold">Full Name</label>
                    <input type="text" className="w-full bg-paper/30 border border-ink/10 py-4 px-6 focus:outline-none focus:border-gold font-serif" placeholder="John Doe" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold">Email Address</label>
                    <input type="email" className="w-full bg-paper/30 border border-ink/10 py-4 px-6 focus:outline-none focus:border-gold font-serif" placeholder="john@example.com" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest font-bold">Subject</label>
                 <select className="w-full bg-paper/30 border border-ink/10 py-4 px-6 focus:outline-none focus:border-gold font-serif">
                    <option>General Inquiry</option>
                    <option>Order Status</option>
                    <option>Rare Book Acquisition</option>
                    <option>Feedback</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] uppercase tracking-widest font-bold">Message</label>
                 <textarea rows={5} className="w-full bg-paper/30 border border-ink/10 py-4 px-6 focus:outline-none focus:border-gold font-serif" placeholder="How can we assist you today?"></textarea>
              </div>
              
              <button className="w-full flex items-center justify-center space-x-4 bg-ink text-paper py-5 px-8 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-gold transition-all group">
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span>Send Message</span>
              </button>
           </form>
        </motion.div>
      </div>
    </div>
  );
}
