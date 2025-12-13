import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { EditableText } from '@/components/admin/EditableText';
import { EditableImage } from '@/components/admin/EditableImage';
import { useInView } from '@/hooks/useInView';
import { Home, Trees, GraduationCap, Users, MapPin, Heart } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Trees,
  GraduationCap,
  Users,
  MapPin,
  Heart,
};

export const HomeSection: React.FC = () => {
  const { data } = useAdmin();
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="home" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-20 right-0 w-80 h-80 bg-terracotta-light/10 rounded-full blur-3xl" />
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="section-container"
      >
        <div className="text-center mb-12">
          <EditableText
            path="home.title"
            value={data.home.title}
            as="h2"
            className="heading-section text-foreground mb-4"
          />
          <EditableText
            path="home.subtitle"
            value={data.home.subtitle}
            as="p"
            className="text-lg text-muted-foreground"
          />
        </div>

        {/* Main images grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden shadow-medium"
          >
            <EditableImage
              path="home.homeImage"
              value={data.home.homeImage}
              alt="Our home"
              className="w-full aspect-[4/3]"
              placeholderClassName="w-full aspect-[4/3]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-6">
              <p className="text-primary-foreground font-serif text-xl">Our Home</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden shadow-medium"
          >
            <EditableImage
              path="home.neighborhoodImage"
              value={data.home.neighborhoodImage}
              alt="Our neighborhood"
              className="w-full aspect-[4/3]"
              placeholderClassName="w-full aspect-[4/3]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-6">
              <p className="text-primary-foreground font-serif text-xl">Our Neighborhood</p>
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <EditableText
            path="home.description"
            value={data.home.description}
            as="p"
            className="body-large text-muted-foreground"
            multiline
          />
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.home.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Home;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className="glass-card rounded-xl p-6 text-center hover:shadow-medium transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>
                <EditableText
                  path={`home.features.${index}.title`}
                  value={feature.title}
                  as="h3"
                  className="font-serif text-lg font-medium text-foreground mb-2"
                />
                <EditableText
                  path={`home.features.${index}.description`}
                  value={feature.description}
                  as="p"
                  className="text-sm text-muted-foreground"
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
