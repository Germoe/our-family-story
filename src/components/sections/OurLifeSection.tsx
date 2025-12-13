import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { EditableText } from '@/components/admin/EditableText';
import { EditableImage } from '@/components/admin/EditableImage';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Sparkles } from 'lucide-react';

export const OurLifeSection: React.FC = () => {
  const { data, isAdmin, updateData } = useAdmin();
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const addActivity = () => {
    const newActivity = {
      id: Date.now().toString(),
      title: 'New Activity',
      description: 'Tell us about this activity or tradition...',
      image: '',
    };
    updateData('ourLife.activities', [...data.ourLife.activities, newActivity]);
  };

  const removeActivity = (id: string) => {
    updateData(
      'ourLife.activities',
      data.ourLife.activities.filter((a) => a.id !== id)
    );
  };

  return (
    <section id="life" className="section-padding bg-sage-light/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-blush/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="section-container relative"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6"
          >
            <Sparkles className="w-7 h-7 text-primary" />
          </motion.div>
          <EditableText
            path="ourLife.title"
            value={data.ourLife.title}
            as="h2"
            className="heading-section text-foreground mb-4"
          />
          <EditableText
            path="ourLife.subtitle"
            value={data.ourLife.subtitle}
            as="p"
            className="text-lg text-muted-foreground"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <EditableText
            path="ourLife.description"
            value={data.ourLife.description}
            as="p"
            className="body-large text-muted-foreground"
            multiline
          />
        </motion.div>

        {/* Activities */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {data.ourLife.activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
              className={`glass-card rounded-2xl overflow-hidden group relative flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {isAdmin && (
                <button
                  onClick={() => removeActivity(activity.id)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              
              <div className="md:w-1/2">
                <EditableImage
                  path={`ourLife.activities.${index}.image`}
                  value={activity.image}
                  alt={activity.title}
                  className="w-full h-full min-h-[250px] md:min-h-[300px]"
                  placeholderClassName="w-full min-h-[250px] md:min-h-[300px]"
                />
              </div>
              
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <EditableText
                  path={`ourLife.activities.${index}.title`}
                  value={activity.title}
                  as="h3"
                  className="font-serif text-2xl font-medium text-foreground mb-4"
                />
                <EditableText
                  path={`ourLife.activities.${index}.description`}
                  value={activity.description}
                  as="p"
                  className="text-muted-foreground leading-relaxed"
                  multiline
                />
              </div>
            </motion.div>
          ))}
        </div>

        {isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-8"
          >
            <Button
              onClick={addActivity}
              variant="outline"
              className="rounded-full border-primary/30 text-primary hover:bg-primary/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
