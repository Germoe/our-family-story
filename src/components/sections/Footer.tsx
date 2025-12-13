import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-cream border-t border-border/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>and hope</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {currentYear} All rights reserved. Built with love for our future family.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
