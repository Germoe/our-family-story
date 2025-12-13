import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { cn } from '@/lib/utils';

interface EditableTextProps {
  path: string;
  value: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
}

export const EditableText = forwardRef<HTMLElement, EditableTextProps>(({
  path,
  value,
  as: Component = 'p',
  className,
  multiline = false,
}, ref) => {
  const { isAdmin, updateData } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    updateData(path, editValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    }
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (!isAdmin) {
    return <Component ref={ref as any} className={className}>{value}</Component>;
  }

  if (isEditing) {
    const InputComponent = multiline ? 'textarea' : 'input';
    return (
      <InputComponent
        ref={inputRef as any}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full bg-background/80 backdrop-blur-sm border-2 border-primary/40 rounded-lg p-2 focus:outline-none focus:border-primary transition-colors',
          multiline && 'min-h-[150px] resize-y',
          className
        )}
        style={{ font: 'inherit' }}
      />
    );
  }

  return (
    <Component
      ref={ref as any}
      onClick={() => setIsEditing(true)}
      className={cn(
        className,
        'cursor-pointer hover:ring-2 hover:ring-primary/40 hover:ring-offset-2 rounded transition-all'
      )}
      title="Click to edit"
    >
      {value}
    </Component>
  );
});

EditableText.displayName = 'EditableText';
