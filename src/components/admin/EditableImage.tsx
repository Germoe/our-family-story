import React, { useState, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { cn } from '@/lib/utils';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditableImageProps {
  path: string;
  value: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  path,
  value,
  alt,
  className,
  placeholderClassName,
}) => {
  const { isAdmin, updateData } = useAdmin();
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData(path, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateData(path, '');
  };

  if (!value) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center bg-muted/50 border-2 border-dashed border-muted-foreground/30 rounded-lg',
          isAdmin && 'cursor-pointer hover:border-primary/50 hover:bg-muted/70 transition-all',
          placeholderClassName || className
        )}
        onClick={() => isAdmin && fileInputRef.current?.click()}
      >
        <ImageIcon className="w-12 h-12 text-muted-foreground/50 mb-2" />
        {isAdmin && (
          <>
            <p className="text-sm text-muted-foreground">Click to upload</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn('relative', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={value} alt={alt} className="w-full h-full object-cover" />
      {isAdmin && isHovered && (
        <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center gap-2 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-1" /> Replace
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};
