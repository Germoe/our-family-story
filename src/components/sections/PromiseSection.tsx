import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { EditableText } from '@/components/admin/EditableText';
import { useInView } from '@/hooks/useInView';
import { Heart } from 'lucide-react';

export const PromiseSection: React.FC = () => {
  const { data } = useAdmin();
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section className="section-padding bg-cream relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-terracotta-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-blush/40 rounded-full blur-3xl" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="section-container relative"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6"
            >
              <Heart className="w-7 h-7 text-primary" />
            </motion.div>
            <EditableText
              path="promise.title"
              value={data.promise.title}
              as="h2"
              className="heading-section text-foreground"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-card rounded-2xl p-8 md:p-12 shadow-medium"
          >
            <EditableText
              path="promise.letter"
              value={data.promise.letter}
              as="div"
              className="font-serif text-lg md:text-xl leading-relaxed text-foreground whitespace-pre-line mb-8"
              multiline
            />
            <div className="text-right">
              <EditableText
                path="promise.signature"
                value={data.promise.signature}
                as="p"
                className="font-serif text-xl italic text-primary"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
