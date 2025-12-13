import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '@/context/AdminContext';
import { EditableText } from '@/components/admin/EditableText';
import { EditableImage } from '@/components/admin/EditableImage';
import { useInView } from '@/hooks/useInView';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Heart } from 'lucide-react';

export const FamilyFriendsSection: React.FC = () => {
  const { data, isAdmin, updateData } = useAdmin();
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const addMember = () => {
    const newMember = {
      id: Date.now().toString(),
      name: 'New Family Member',
      relationship: 'Relationship',
      description: 'Tell us about this person...',
      image: '',
    };
    updateData('familyFriends.members', [...data.familyFriends.members, newMember]);
  };

  const removeMember = (id: string) => {
    updateData(
      'familyFriends.members',
      data.familyFriends.members.filter((m) => m.id !== id)
    );
  };

  return (
    <section id="family" className="section-padding bg-cream relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sage-light/40 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      
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
            <Heart className="w-7 h-7 text-primary" />
          </motion.div>
          <EditableText
            path="familyFriends.title"
            value={data.familyFriends.title}
            as="h2"
            className="heading-section text-foreground mb-4"
          />
          <EditableText
            path="familyFriends.subtitle"
            value={data.familyFriends.subtitle}
            as="p"
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <EditableText
            path="familyFriends.description"
            value={data.familyFriends.description}
            as="p"
            className="body-large text-muted-foreground"
            multiline
          />
        </motion.div>

        {/* Members grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {data.familyFriends.members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
              className="glass-card rounded-2xl overflow-hidden group relative"
            >
              {isAdmin && (
                <button
                  onClick={() => removeMember(member.id)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <EditableImage
                path={`familyFriends.members.${index}.image`}
                value={member.image}
                alt={member.name}
                className="w-full aspect-[16/10]"
                placeholderClassName="w-full aspect-[16/10]"
              />
              <div className="p-6">
                <EditableText
                  path={`familyFriends.members.${index}.name`}
                  value={member.name}
                  as="h3"
                  className="font-serif text-xl font-medium text-foreground mb-1"
                />
                <EditableText
                  path={`familyFriends.members.${index}.relationship`}
                  value={member.relationship}
                  as="p"
                  className="text-primary font-medium text-sm mb-3"
                />
                <EditableText
                  path={`familyFriends.members.${index}.description`}
                  value={member.description}
                  as="p"
                  className="text-muted-foreground text-sm"
                  multiline
                />
              </div>
            </motion.div>
          ))}

          {isAdmin && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={addMember}
              className="min-h-[300px] rounded-2xl border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
            >
              <Plus className="w-10 h-10 mb-3" />
              <span className="font-medium">Add Family or Friends</span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </section>
  );
};
