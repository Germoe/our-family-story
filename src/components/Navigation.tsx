import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, ChevronDown } from 'lucide-react';

const navItems = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Home', href: '#home' },
  { label: 'Family & Friends', href: '#family' },
  { label: 'Our Life', href: '#life' },
  { label: 'Gallery', href: '#gallery' },
];

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-md shadow-soft'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2"
            >
              <Heart className="w-6 h-6 text-primary fill-primary" />
              <span className="font-serif text-xl font-medium text-foreground">Our Family</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium text-sm"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => scrollTo('#contact')}
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get in Touch
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 lg:hidden"
          >
            <div className="bg-background/95 backdrop-blur-lg border-b border-border shadow-medium">
              <div className="section-container py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollTo(item.href)}
                    className="block w-full text-left py-3 px-4 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  onClick={() => scrollTo('#contact')}
                  className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
                >
                  Get in Touch
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
