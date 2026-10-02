import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';
import { NotificationProvider } from './context/NotificationContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ComparisonBar from './components/ComparisonBar';
import LiveChatWidget from './components/LiveChatWidget';

import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import MapPage from './pages/MapPage';
import CalculatorPage from './pages/CalculatorPage';
import ComparePage from './pages/ComparePage';
import AgentsPage from './pages/AgentsPage';
import AgentDetailPage from './pages/AgentDetailPage';
import WishlistPage from './pages/WishlistPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <CompareProvider>
            <NotificationProvider>
              <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/properties" element={<PropertiesPage />} />
                    <Route path="/properties/:id" element={<PropertyDetailPage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/calculator" element={<CalculatorPage />} />
                    <Route path="/compare" element={<ComparePage />} />
                    <Route path="/agents" element={<AgentsPage />} />
                    <Route path="/agents/:id" element={<AgentDetailPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/my-bookings" element={<MyBookingsPage />} />
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                  </Routes>
                </main>
                <Footer />
                <ComparisonBar />
                <LiveChatWidget />
                <Toaster
                  position="bottom-left"
                  toastOptions={{
                    style: {
                      background: '#0f172a',
                      color: '#f8fafc',
                      border: '1px solid #334155',
                      borderRadius: '1rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    },
                    success: {
                      iconTheme: {
                        primary: '#10b981',
                        secondary: '#ffffff',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#f43f5e',
                        secondary: '#ffffff',
                      },
                    },
                  }}
                />
              </div>
            </NotificationProvider>
          </CompareProvider>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
