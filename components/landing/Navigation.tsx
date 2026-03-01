'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import NexoraLogo from '@/components/ui/NexoraLogo';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Premium Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-gray-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50' 
            : 'bg-transparent border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Animation */}
            <Link href="/" className="group relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <NexoraLogo size="md" showText={true} />
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-primary-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </Link>

            {/* Desktop Navigation Links with Premium Styling */}
            <div className="hidden md:flex items-center gap-2">
              {[
                { href: '#features', label: 'Features' },
                { href: '#how-it-works', label: 'How It Works' },
                { href: '#pricing', label: 'Pricing' },
              ].map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors group"
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Bottom Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </motion.a>
              ))}
            </div>

            {/* Desktop CTA with Premium Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hidden md:flex items-center gap-4"
            >
              <Link
                href="/login"
                className="text-sm font-semibold text-gray-300 hover:text-white transition-colors px-4 py-2"
              >
                Sign In
              </Link>
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/20 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                  <span className="relative flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Get Started
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button with Animation */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative p-2 text-gray-300 hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Premium Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 md:hidden bg-black/80 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel with Slide Animation */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-20 right-0 bottom-0 z-50 w-80 md:hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border-l border-white/10 shadow-2xl overflow-y-auto"
            >
              <div className="p-6 space-y-2">
                {/* Navigation Links */}
                {[
                  { href: '#features', label: 'Features', icon: '✨' },
                  { href: '#how-it-works', label: 'How It Works', icon: '⚙️' },
                  { href: '#pricing', label: 'Pricing', icon: '💎' },
                ].map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="block py-4 px-5 text-base font-semibold text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-300 border border-transparent hover:border-white/10"
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.label}
                  </motion.a>
                ))}

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

                {/* Sign In Link */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 px-5 text-base font-semibold text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-300 border border-transparent hover:border-white/10"
                  >
                    🔐 Sign In
                  </Link>
                </motion.div>

                {/* Get Started Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="pt-4"
                >
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Get Started Free
                    </button>
                  </Link>
                </motion.div>

                {/* Bottom Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="pt-8 text-center"
                >
                  <p className="text-xs text-gray-500">
                    Join 1,000+ professionals growing on LinkedIn
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
