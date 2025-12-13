import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Settings, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminToggle: React.FC = () => {
  const { isAdmin, toggleAdmin } = useAdmin();

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <Button
        onClick={toggleAdmin}
        size="lg"
        className={`
          rounded-full shadow-medium px-6 transition-all duration-300
          ${isAdmin 
            ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
            : 'bg-card text-foreground hover:bg-muted border border-border'
          }
        `}
      >
        <AnimatePresence mode="wait">
          {isAdmin ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-2"
            >
              <EyeOff className="w-4 h-4" />
              <span>Exit Edit Mode</span>
            </motion.div>
          ) : (
            <motion.div
              key="visitor"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              <span>Edit Profile</span>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      
      <AnimatePresence>
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-3 w-64 p-4 glass-card rounded-lg"
          >
            <p className="text-sm font-medium text-foreground mb-1">Edit Mode Active</p>
            <p className="text-xs text-muted-foreground">
              Click on any text or image to edit. Changes are saved automatically.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
