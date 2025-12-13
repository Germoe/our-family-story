import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { EditableText } from '@/components/admin/EditableText';
import { EditableImage } from '@/components/admin/EditableImage';
import { useInView } from '@/hooks/useInView';

export const AboutSection: React.FC = () => {
  const { data } = useAdmin();
  const [ref, isInView] = useInView({ threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cream to-transparent" />
      <div className="absolute -left-20 top-1/2 w-40 h-40 bg-sage-light/30 rounded-full blur-3xl" />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="section-container relative"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <EditableText
            path="aboutUs.title"
            value={data.aboutUs.title}
            as="h2"
            className="heading-section text-foreground mb-6"
          />
          <EditableText
            path="aboutUs.intro"
            value={data.aboutUs.intro}
            as="p"
            className="body-large text-muted-foreground max-w-3xl mx-auto"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Partner 1 */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <EditableImage
              path="aboutUs.partner1.image"
              value={data.aboutUs.partner1.image}
              alt={data.aboutUs.partner1.name}
              className="w-full aspect-[4/3] rounded-t-2xl"
              placeholderClassName="w-full aspect-[4/3]"
            />
            <div className="p-6 lg:p-8">
              <EditableText
                path="aboutUs.partner1.name"
                value={data.aboutUs.partner1.name}
                as="h3"
                className="heading-sub text-foreground mb-1"
              />
              <EditableText
                path="aboutUs.partner1.role"
                value={data.aboutUs.partner1.role}
                as="p"
                className="text-primary font-medium mb-4"
              />
              <EditableText
                path="aboutUs.partner1.bio"
                value={data.aboutUs.partner1.bio}
                as="p"
                className="text-muted-foreground leading-relaxed"
                multiline
              />
            </div>
          </motion.div>

          {/* Partner 2 */}
          <motion.div
            variants={itemVariants}
            className="glass-card rounded-2xl overflow-hidden"
          >
            <EditableImage
              path="aboutUs.partner2.image"
              value={data.aboutUs.partner2.image}
              alt={data.aboutUs.partner2.name}
              className="w-full aspect-[4/3] rounded-t-2xl"
              placeholderClassName="w-full aspect-[4/3]"
            />
            <div className="p-6 lg:p-8">
              <EditableText
                path="aboutUs.partner2.name"
                value={data.aboutUs.partner2.name}
                as="h3"
                className="heading-sub text-foreground mb-1"
              />
              <EditableText
                path="aboutUs.partner2.role"
                value={data.aboutUs.partner2.role}
                as="p"
                className="text-primary font-medium mb-4"
              />
              <EditableText
                path="aboutUs.partner2.bio"
                value={data.aboutUs.partner2.bio}
                as="p"
                className="text-muted-foreground leading-relaxed"
                multiline
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
