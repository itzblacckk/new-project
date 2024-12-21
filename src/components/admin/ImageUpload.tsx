import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  onFilesChange: (files: File[]) => void;
  maxImages?: number;
}

export function ImageUpload({ 
  images = [], 
  onImagesChange, 
  onFilesChange,
  maxImages = 5
}: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalImages = images.length + newFiles.length;
      
      if (totalImages > maxImages) {
        alert(`Maximum ${maxImages} images allowed`);
        return;
      }
      
      setFiles([...files, ...newFiles]);
      onFilesChange([...files, ...newFiles]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newFiles = files.filter((_, i) => i !== index);
    onImagesChange(newImages);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  return (
    <div className="space-y-4">
      {images.length === 0 && (
        <div className="text-red-600 text-sm">At least one image is required</div>
      )}
      
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt="" className="w-24 h-24 object-cover rounded" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {images.length < maxImages && (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple
          className="mt-1 block w-full"
          required={images.length === 0}
        />
      )}

      <p className="text-sm text-gray-500">
        Upload {images.length === 0 ? 'at least one image' : `up to ${maxImages} images`}. 
        {maxImages - images.length} remaining.
      </p>
    </div>
  );
}