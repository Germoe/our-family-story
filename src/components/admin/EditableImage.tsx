import React from 'react';
import { cn } from '@/lib/utils';
import { Image as ImageIcon } from 'lucide-react';

interface EditableImageProps {
  path: string;
  value: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  path: _path,
  value,
  alt,
  className,
  placeholderClassName,
}) => {
  if (!value) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center bg-muted/50 border-2 border-dashed border-muted-foreground/30 rounded-lg',
          placeholderClassName || className
        )}
      >
        <ImageIcon className="w-12 h-12 text-muted-foreground/50 mb-2" />
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      <img src={value} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};
