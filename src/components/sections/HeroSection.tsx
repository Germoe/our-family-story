import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { EditableText } from '@/components/admin/EditableText';
import { Button } from '@/components/ui/button';
import { Play, Heart, ChevronDown, Video, Link, Upload, X, Check } from 'lucide-react';

// Helper function to convert various video URLs to embed format
const getEmbedUrl = (url: string): string => {
  if (!url) return '';
  
  // Already an embed URL
  if (url.includes('/embed/') || url.includes('player.vimeo.com')) {
    return url;
  }
  
  // YouTube standard URL
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }
  
  // Vimeo standard URL
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  
  // Return as-is for direct video files or other embed URLs
  return url;
};

// Get thumbnail URL for video preview
const getVideoThumbnail = (url: string): string | null => {
  if (!url) return null;
  
  // YouTube thumbnail
  const youtubeMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/);
  if (youtubeMatch) {
    return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
  }
  
  return null;
};

export const HeroSection: React.FC = () => {
  const { data, isAdmin, updateData } = useAdmin();
  const [showVideo, setShowVideo] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnail = getVideoThumbnail(data.hero.videoUrl);

  useEffect(() => {
    setInputUrl(data.hero.videoUrl || '');
  }, [data.hero.videoUrl]);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveUrl = () => {
    const embedUrl = getEmbedUrl(inputUrl);
    updateData('hero.videoUrl', embedUrl);
    setShowUrlInput(false);
  };

  const handleRemoveVideo = () => {
    updateData('hero.videoUrl', '');
    setShowVideo(false);
    setInputUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData('hero.videoUrl', reader.result as string);
        setShowUrlInput(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const embedUrl = getEmbedUrl(data.hero.videoUrl);
  const isDirectVideo = data.hero.videoUrl?.startsWith('data:') || 
                        data.hero.videoUrl?.endsWith('.mp4') ||
                        data.hero.videoUrl?.endsWith('.webm');

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
                className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-medium group"
              >
                {/* Admin controls */}
                {isAdmin && (
                  <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setShowUrlInput(true)}
                      className="shadow-md"
                    >
                      <Link className="w-4 h-4 mr-1" />
                      Change
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={handleRemoveVideo}
                      className="shadow-md"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {showVideo ? (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="aspect-video"
                    >
                      {isDirectVideo ? (
                        <video
                          src={data.hero.videoUrl}
                          controls
                          autoPlay
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <iframe
                          src={`${embedUrl}?autoplay=1`}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="thumbnail"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="aspect-video bg-muted flex items-center justify-center cursor-pointer relative"
                      onClick={() => setShowVideo(true)}
                    >
                      {/* Thumbnail background */}
                      {thumbnail && (
                        <img
                          src={thumbnail}
                          alt="Video thumbnail"
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-foreground/10" />
                      
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10 w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-glow hover:bg-primary transition-colors"
                      >
                        <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                      </motion.div>
                      
                      <p className="absolute bottom-6 left-0 right-0 text-primary-foreground font-medium text-center">
                        Watch Our Introduction Video
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : isAdmin ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="max-w-xl mx-auto"
              >
                <AnimatePresence mode="wait">
                  {showUrlInput ? (
                    <motion.div
                      key="input"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 rounded-2xl glass-card"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Video className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">Add Video URL</span>
                      </div>
                      <input
                        type="text"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="Paste YouTube, Vimeo, or video URL..."
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 mb-3"
                        autoFocus
                      />
                      <p className="text-xs text-muted-foreground mb-4">
                        Supports: youtube.com, youtu.be, vimeo.com, or direct embed URLs
                      </p>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSaveUrl}
                          disabled={!inputUrl.trim()}
                          className="flex-1 bg-primary text-primary-foreground"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Save Video
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowUrlInput(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="options"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-8 rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/30"
                    >
                      <Video className="w-14 h-14 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-foreground font-medium mb-2">Add Your Introduction Video</p>
                      <p className="text-sm text-muted-foreground mb-6">
                        Share a personal video message with birth mothers
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          onClick={() => setShowUrlInput(true)}
                          variant="default"
                          className="bg-primary text-primary-foreground"
                        >
                          <Link className="w-4 h-4 mr-2" />
                          Add Video URL
                        </Button>
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Video
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="video/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
