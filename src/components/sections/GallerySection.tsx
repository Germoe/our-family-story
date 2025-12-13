import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { EditableText } from '@/components/admin/EditableText';
import { EditableImage } from '@/components/admin/EditableImage';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { data, isAdmin, updateData } = useAdmin();
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const addImage = () => {
    const newImage = {
      id: Date.now().toString(),
      url: '',
      caption: 'New photo caption',
    };
    updateData('gallery.images', [...data.gallery.images, newImage]);
  };

  const removeImage = (id: string) => {
    updateData(
      'gallery.images',
      data.gallery.images.filter((img) => img.id !== id)
    );
  };

  const openLightbox = (index: number) => {
    if (data.gallery.images[index].url) {
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (lightboxIndex === null) return;
    const validImages = data.gallery.images.filter((img) => img.url);
    const currentValidIndex = validImages.findIndex(
      (img) => img.id === data.gallery.images[lightboxIndex].id
    );
    let newIndex =
      direction === 'next'
        ? (currentValidIndex + 1) % validImages.length
        : (currentValidIndex - 1 + validImages.length) % validImages.length;
    const realIndex = data.gallery.images.findIndex(
      (img) => img.id === validImages[newIndex].id
    );
    setLightboxIndex(realIndex);
  };

  return (
    <section id="gallery" className="section-padding bg-background relative">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="section-container"
      >
        <div className="text-center mb-12">
          <EditableText
            path="gallery.title"
            value={data.gallery.title}
            as="h2"
            className="heading-section text-foreground mb-4"
          />
          <EditableText
            path="gallery.subtitle"
            value={data.gallery.subtitle}
            as="p"
            className="text-lg text-muted-foreground"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {data.gallery.images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="relative group aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer"
              onClick={() => !isAdmin && openLightbox(index)}
            >
              <EditableImage
                path={`gallery.images.${index}.url`}
                value={image.url}
                alt={image.caption}
                className="w-full h-full"
                placeholderClassName="w-full h-full"
              />
              
              {image.url && (
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <EditableText
                      path={`gallery.images.${index}.caption`}
                      value={image.caption}
                      as="p"
                      className="text-primary-foreground text-sm font-medium"
                    />
                  </div>
                </div>
              )}

              {isAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}

          {isAdmin && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={addImage}
              className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Add Photo</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 rounded-full bg-background/10 text-primary-foreground hover:bg-background/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('prev');
              }}
              className="absolute left-4 p-2 rounded-full bg-background/10 text-primary-foreground hover:bg-background/20 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={data.gallery.images[lightboxIndex].url}
                alt={data.gallery.images[lightboxIndex].caption}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-center text-primary-foreground mt-4 text-lg">
                {data.gallery.images[lightboxIndex].caption}
              </p>
            </motion.div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateLightbox('next');
              }}
              className="absolute right-4 p-2 rounded-full bg-background/10 text-primary-foreground hover:bg-background/20 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
