import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  type DocumentData
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import type { Book } from '../types';

interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string; }[];
  }
}

function handleFirestoreError(error: any, operationType: FirestoreErrorInfo['operationType'], path: string | null = null): never {
  const user = auth.currentUser;
  const errorInfo: FirestoreErrorInfo = {
    error: error.message || 'Unknown Firestore error',
    operationType,
    path,
    authInfo: {
      userId: user?.uid || 'anonymous',
      email: user?.email || 'none',
      emailVerified: user?.emailVerified || false,
      isAnonymous: user?.isAnonymous || true,
      providerInfo: user?.providerData.map(p => ({
        providerId: p.providerId,
        displayName: p.displayName || '',
        email: p.email || ''
      })) || []
    }
  };
  throw new Error(JSON.stringify(errorInfo));
}

const BOOKS_COLLECTION = 'books';

export const bookService = {
  async getAllBooks(categorySlug?: string, searchQuery?: string) {
    try {
      let q = query(collection(db, BOOKS_COLLECTION), orderBy('createdAt', 'desc'));
      
      if (categorySlug && categorySlug !== 'all') {
        q = query(collection(db, BOOKS_COLLECTION), where('category', '==', categorySlug), orderBy('createdAt', 'desc'));
      }

      const snapshot = await getDocs(q);
      let books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));

      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        books = books.filter(book => 
          book.title.toLowerCase().includes(lowerQuery) || 
          book.author.toLowerCase().includes(lowerQuery)
        );
      }

      return books;
    } catch (error) {
      handleFirestoreError(error, 'list', BOOKS_COLLECTION);
    }
  },

  async getBookById(id: string) {
    try {
      const docRef = doc(db, BOOKS_COLLECTION, id);
      const snapshot = await getDoc(docRef);
      if (!snapshot.exists()) return null;
      return { id: snapshot.id, ...snapshot.data() } as Book;
    } catch (error) {
      handleFirestoreError(error, 'get', `${BOOKS_COLLECTION}/${id}`);
    }
  },

  async createBook(bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const docRef = await addDoc(collection(db, BOOKS_COLLECTION), {
        ...bookData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, 'create', BOOKS_COLLECTION);
    }
  },

  async updateBook(id: string, bookData: Partial<Book>) {
    try {
      const docRef = doc(db, BOOKS_COLLECTION, id);
      await updateDoc(docRef, {
        ...bookData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, 'update', `${BOOKS_COLLECTION}/${id}`);
    }
  },

  async deleteBook(id: string) {
    try {
      const docRef = doc(db, BOOKS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, 'delete', `${BOOKS_COLLECTION}/${id}`);
    }
  }
};
