import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useCloudStorage = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File, folder: string = 'images'): Promise<string | null> => {
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('profile-media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('profile-media')
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFile = async (url: string): Promise<boolean> => {
    try {
      // Extract path from URL
      const urlObj = new URL(url);
      const path = urlObj.pathname.split('/profile-media/')[1];
      
      if (!path) return false;

      const { error } = await supabase.storage
        .from('profile-media')
        .remove([path]);

      return !error;
    } catch (error) {
      console.error('Delete error:', error);
      return false;
    }
  };

  return { uploadFile, deleteFile, isUploading };
};
