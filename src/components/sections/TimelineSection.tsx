import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { EditableText } from '@/components/admin/EditableText';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const { data, isAdmin, updateData } = useAdmin();
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const addEvent = () => {
    const newEvent = {
      id: Date.now().toString(),
      year: new Date().getFullYear().toString(),
      title: 'New Milestone',
      description: 'Describe this moment in your journey...',
    };
    updateData('timeline.events', [...data.timeline.events, newEvent]);
  };

  const removeEvent = (id: string) => {
    updateData(
      'timeline.events',
      data.timeline.events.filter((e) => e.id !== id)
    );
  };

  return (
    <section id="timeline" className="section-padding bg-sage-light/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--sage-light)/0.5),transparent_50%)]" />
      
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="section-container relative"
      >
        <div className="text-center mb-16">
          <EditableText
            path="timeline.title"
            value={data.timeline.title}
            as="h2"
            className="heading-section text-foreground mb-4"
          />
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20 md:-translate-x-px" />

          {data.timeline.events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={`relative flex items-start mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1/2 mt-2 shadow-glow z-10" />

              {/* Content */}
              <div
                className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
                }`}
              >
                <div className="glass-card rounded-xl p-6 relative group">
                  {isAdmin && (
                    <button
                      onClick={() => removeEvent(event.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <EditableText
                    path={`timeline.events.${index}.year`}
                    value={event.year}
                    as="span"
                    className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3"
                  />
                  <EditableText
                    path={`timeline.events.${index}.title`}
                    value={event.title}
                    as="h3"
                    className="font-serif text-xl font-medium text-foreground mb-2"
                  />
                  <EditableText
                    path={`timeline.events.${index}.description`}
                    value={event.description}
                    as="p"
                    className="text-muted-foreground"
                  />
                </div>
              </div>
            </motion.div>
          ))}

          {isAdmin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-8"
            >
              <Button
                onClick={addEvent}
                variant="outline"
                className="rounded-full border-primary/30 text-primary hover:bg-primary/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};
