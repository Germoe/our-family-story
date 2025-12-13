import React, { useState, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { cn } from '@/lib/utils';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCloudStorage } from '@/hooks/useCloudStorage';
import { useToast } from '@/hooks/use-toast';

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
  const { isAdmin, updateData, isAuthenticated } = useAdmin();
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, isUploading } = useCloudStorage();
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to upload images.",
        variant: "destructive",
      });
      return;
    }

    // For non-authenticated mode, fall back to base64 (for preview only)
    const url = await uploadFile(file);
    
    if (url) {
      updateData(path, url);
      toast({
        title: "Image Uploaded",
        description: "Your image has been saved successfully.",
      });
    } else {
      // Fallback to local preview if upload fails
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData(path, reader.result as string);
        toast({
          title: "Local Preview",
          description: "Image saved locally. Sign in to persist permanently.",
          variant: "destructive",
        });
      };
      reader.readAsDataURL(file);
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
        {isUploading ? (
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-2" />
        ) : (
          <ImageIcon className="w-12 h-12 text-muted-foreground/50 mb-2" />
        )}
        {isAdmin && (
          <>
            <p className="text-sm text-muted-foreground">
              {isUploading ? 'Uploading...' : 'Click to upload'}
            </p>
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
          {isUploading ? (
            <Loader2 className="w-8 h-8 text-background animate-spin" />
          ) : (
            <>
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
            </>
          )}
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
