import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { EditableText } from '@/components/admin/EditableText';
import { Button } from '@/components/ui/button';
import { Play, Heart, ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, isAdmin, updateData } = useAdmin();
  const [showVideo, setShowVideo] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState(data.hero.videoUrl);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleVideoUrlChange = (url: string) => {
    setVideoUrl(url);
    updateData('hero.videoUrl', url);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-background to-background" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-terracotta-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-sage-light/30 rounded-full blur-3xl" />
      
      <div className="relative section-container text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          {/* Heart icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blush mb-8"
          >
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </motion.div>

          <EditableText
            path="hero.title"
            value={data.hero.title}
            as="h1"
            className="heading-display text-foreground mb-6"
          />

          <EditableText
            path="hero.subtitle"
            value={data.hero.subtitle}
            as="p"
            className="body-large text-muted-foreground max-w-2xl mx-auto mb-10"
          />

          {/* Video section */}
          <div className="mb-12">
            {data.hero.videoUrl ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-medium"
              >
                {showVideo ? (
                  <div className="aspect-video">
                    <iframe
                      src={data.hero.videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div
                    className="aspect-video bg-muted flex items-center justify-center cursor-pointer group"
                    onClick={() => setShowVideo(true)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative z-10 w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-glow group-hover:bg-primary transition-colors"
                    >
                      <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                    </motion.div>
                    <p className="absolute bottom-6 text-primary-foreground font-medium">
                      Watch Our Introduction Video
                    </p>
                  </div>
                )}
              </motion.div>
            ) : isAdmin ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="max-w-xl mx-auto"
              >
                <div className="p-6 rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/30">
                  <Play className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">Add your introduction video</p>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => handleVideoUrlChange(e.target.value)}
                    placeholder="Paste YouTube or Vimeo embed URL..."
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Example: https://www.youtube.com/embed/VIDEO_ID
                  </p>
                </div>
              </motion.div>
            ) : (
              <Button
                variant="default"
                size="lg"
                className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
                onClick={scrollToAbout}
              >
                Learn More About Us
              </Button>
            )}
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.button
              onClick={scrollToAbout}
              className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
