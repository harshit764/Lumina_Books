/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import BookStore from './pages/BookStore';
import BookDetails from './pages/BookDetails';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Contact from './pages/Contact';
import ScrollToTop from './components/utils/ScrollToTop';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-[#f5f2ed] text-[#1a1a1a] font-sans flex flex-col">
          <Navigation />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<BookStore />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}
