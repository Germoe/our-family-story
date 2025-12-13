import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Settings, EyeOff, LogIn, LogOut, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export const AdminToggle: React.FC = () => {
  const { isAdmin, toggleAdmin, isAuthenticated, isAdminUser, authLoading, signIn, signOut, user } = useAdmin();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Check for ?admin=login in URL to show login form
  const urlParams = new URLSearchParams(window.location.search);
  const showAdminLogin = urlParams.get('admin') === 'login';

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signed In",
          description: "Welcome back!",
        });
        setShowAuthForm(false);
        setEmail('');
        setPassword('');
        // Admin status will be checked automatically via context
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed Out",
        description: "You have been signed out.",
      });
    }
  };

  const handleToggleAdmin = () => {
    if (!isAuthenticated) {
      setShowAuthForm(true);
    } else {
      toggleAdmin();
    }
  };

  // Still loading auth state
  if (authLoading) {
    return null;
  }

  // Not an admin user and not showing auth form and no URL param - hide completely
  if (!isAdminUser && !showAuthForm && !showAdminLogin) {
    return null;
  }

  // Show login button if URL param is set
  const shouldShowLoginButton = showAdminLogin && !isAuthenticated;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      {/* Auth Form Modal */}
      <AnimatePresence>
        {showAuthForm && !isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-full right-0 mb-3 w-80 p-6 glass-card rounded-xl shadow-lg"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Admin Sign In
            </h3>
            <form onSubmit={handleAuth} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <LogIn className="w-4 h-4 mr-2" />
                )}
                Sign In
              </Button>
            </form>
            <button
              onClick={() => setShowAuthForm(false)}
              className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center"
            >
              Cancel
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login button for ?admin=login URL */}
      {shouldShowLoginButton && !showAuthForm && (
        <Button
          onClick={() => setShowAuthForm(true)}
          size="lg"
          className="rounded-full shadow-medium px-6 bg-card text-foreground hover:bg-muted border border-border"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Admin Login
        </Button>
      )}

      {/* Main Toggle Button - only show if admin user */}
      {isAdminUser && (
        <div className="flex flex-col items-end gap-2">
          <Button
            onClick={handleSignOut}
            size="sm"
            variant="ghost"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-3 h-3 mr-1" />
            Sign Out ({user?.email?.split('@')[0]})
          </Button>
          
          <Button
            onClick={handleToggleAdmin}
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
        </div>
      )}
      
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
              Click on any text or image to edit. Changes are saved to the cloud automatically.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
