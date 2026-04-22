import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { bookService } from '../services/bookService';
import { Book } from '../types';
import { CATEGORIES } from '../constants';
import { formatPrice } from '../lib/utils';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Save, 
  Search, 
  Image as ImageIcon,
  BookOpen,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  author: z.string().min(1, 'Author is required').max(200),
  description: z.string().max(2000),
  price: z.number().min(0, 'Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  coverUrl: z.string().url('Invalid image URL').min(1, 'Cover URL is required'),
});

type BookFormData = z.infer<typeof bookSchema>;

export default function AdminDashboard() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [search, setSearch] = useState('');

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      description: '',
      price: 0,
      category: '',
      coverUrl: ''
    }
  });

  useEffect(() => {
    if (isAdmin) {
      loadBooks();
    }
  }, [isAdmin]);

  const loadBooks = async () => {
    setLoading(true);
    const data = await bookService.getAllBooks();
    setBooks(data || []);
    setLoading(false);
  };

  const onSubmit = async (data: BookFormData) => {
    try {
      if (editingBook) {
        await bookService.updateBook(editingBook.id, data);
      } else {
        await bookService.createBook(data as any);
      }
      setIsOpen(false);
      setEditingBook(null);
      reset();
      loadBooks();
    } catch (error) {
      console.error(error);
      alert('Operation failed. Please check your permissions.');
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setValue('title', book.title);
    setValue('author', book.author);
    setValue('description', book.description);
    setValue('price', book.price);
    setValue('category', book.category);
    setValue('coverUrl', book.coverUrl);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this book from the collection?')) {
      await bookService.deleteBook(id);
      loadBooks();
    }
  };

  if (authLoading) return null;
  if (!isAdmin) return <Navigate to="/login" />;

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-gold">
             <LayoutDashboard className="w-5 h-5" />
             <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Administration</span>
          </div>
          <h1 className="text-5xl font-serif">Inventory Control</h1>
        </div>

        <button 
          onClick={() => { setEditingBook(null); reset(); setIsOpen(true); }}
          className="bg-ink text-paper px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold flex items-center space-x-3 hover:bg-gold hover:text-ink transition-all shadow-xl"
        >
          <Plus className="w-4 h-4" />
          <span>New Acquisition</span>
        </button>
      </header>

      <div className="bg-white border border-ink/5 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-ink/5 bg-paper/20">
           <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
              <input 
                type="text" 
                placeholder="Find in inventory..."
                className="w-full bg-white border border-ink/10 py-3 pl-12 pr-4 focus:outline-none focus:border-gold font-serif italic"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-paper/10 text-[10px] uppercase tracking-widest text-ink/40 font-bold border-b border-ink/5">
                <th className="px-8 py-6">Work</th>
                <th className="px-8 py-6">Genre</th>
                <th className="px-8 py-6">Valuation</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {filteredBooks.map(book => (
                <tr key={book.id} className="hover:bg-paper/10 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-16 bg-ink/5 overflow-hidden flex-shrink-0">
                         <img 
                          src={book.coverUrl} 
                          alt={book.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="font-serif text-lg leading-tight group-hover:text-gold transition-colors">{book.title}</p>
                        <p className="font-serif italic text-sm text-ink/50">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] uppercase tracking-widest bg-paper px-3 py-1 font-bold rounded-full">{book.category}</span>
                  </td>
                  <td className="px-8 py-6 font-sans font-semibold">
                    {formatPrice(book.price)}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end space-x-4">
                      <button 
                        onClick={() => handleEdit(book)}
                        className="p-2 hover:text-gold transition-colors" title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(book.id)}
                        className="p-2 hover:text-red-500 transition-colors" title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredBooks.length === 0 && !loading && (
            <div className="py-20 text-center">
              <p className="font-serif italic text-ink/40">The archives are empty.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white shadow-2xl p-0 max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-ink/5 p-8 flex justify-between items-center z-10">
                 <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gold/10 text-gold rounded-full">
                       <BookOpen className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-serif">{editingBook ? 'Revise Entry' : 'New Acquisition'}</h2>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-paper rounded-full transition-colors">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-ink/50">Full Title</label>
                       <input 
                         {...register('title')} 
                         className="w-full bg-paper/30 border border-ink/10 py-3 px-4 focus:outline-none focus:border-gold font-serif text-lg" 
                         placeholder="The Great Gatsby"
                       />
                       {errors.title && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-ink/50">Primary Author</label>
                       <input 
                         {...register('author')} 
                         className="w-full bg-paper/30 border border-ink/10 py-3 px-4 focus:outline-none focus:border-gold font-serif text-lg" 
                         placeholder="F. Scott Fitzgerald"
                       />
                       {errors.author && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">{errors.author.message}</p>}
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-ink/50">Genre / Category</label>
                       <select 
                         {...register('category')}
                         className="w-full bg-paper/30 border border-ink/10 py-3 px-4 focus:outline-none focus:border-gold font-serif"
                       >
                          <option value="">Select a discipline...</option>
                          {CATEGORIES.map(cat => (
                            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                          ))}
                       </select>
                       {errors.category && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">{errors.category.message}</p>}
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-bold text-ink/50">Retail Valuation (USD)</label>
                       <input 
                         type="number" 
                         step="0.01"
                         {...register('price', { valueAsNumber: true })} 
                         className="w-full bg-paper/30 border border-ink/10 py-3 px-4 focus:outline-none focus:border-gold font-sans font-semibold" 
                         placeholder="24.99"
                       />
                       {errors.price && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">{errors.price.message}</p>}
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-ink/50">Cover Illustration URL</label>
                    <div className="flex space-x-4">
                       <div className="flex-grow relative">
                          <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20" />
                          <input 
                            {...register('coverUrl')} 
                            className="w-full bg-paper/30 border border-ink/10 py-3 pl-10 pr-4 focus:outline-none focus:border-gold font-sans text-sm" 
                            placeholder="https://images.unsplash.com/..."
                          />
                       </div>
                    </div>
                    {errors.coverUrl && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">{errors.coverUrl.message}</p>}
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-ink/50">Manifesto / Synopsis</label>
                    <textarea 
                      {...register('description')} 
                      rows={4} 
                      className="w-full bg-paper/30 border border-ink/10 py-4 px-6 focus:outline-none focus:border-gold font-serif leading-relaxed italic text-lg" 
                      placeholder="A tragic tale of romance, ambition, and the American dream..."
                    />
                    {errors.description && <p className="text-[10px] text-red-500 uppercase tracking-widest mt-1">{errors.description.message}</p>}
                 </div>

                 <div className="pt-8 border-t border-ink/5 flex justify-end space-x-6">
                    <button 
                      type="button" 
                      onClick={() => setIsOpen(false)}
                      className="px-8 py-4 text-[10px] uppercase tracking-widest font-bold text-ink/40 hover:text-ink transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="bg-ink text-paper px-12 py-4 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-gold hover:text-ink transition-all shadow-xl flex items-center space-x-3"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingBook ? 'Update Archieve' : 'Finalize Entry'}</span>
                    </button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
