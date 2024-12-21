import React, { useState } from 'react';
import { useCollection } from '../../hooks/useFirebase';
import { ImageUpload } from './ImageUpload';
import { uploadMultipleImages } from '../../lib/storage';
import { Tour } from '../../types';
import { TOUR_CATEGORIES } from '../../types/categories';
import { toast } from 'react-hot-toast';

interface AddTourFormProps {
  initialData?: Tour;
  onSuccess?: () => void;
}

const DEFAULT_TOUR = {
  title: '',
  description: '',
  duration: '2 days',
  price: 2999,
  difficulty: 'Moderate' as const,
  imageUrl: '',
  images: [],
  location: 'Himachal Pradesh',
  maxGroupSize: 10,
  startDates: [],
  included: ['Professional Guide', 'Camping Equipment', 'Meals', 'First Aid'],
  notIncluded: ['Personal Expenses', 'Travel Insurance', 'Transportation'],
  category: 'Trekking' as const
};

export function AddTourForm({ initialData, onSuccess }: AddTourFormProps) {
  const [formData, setFormData] = useState<Omit<Tour, 'id'>>(initialData || DEFAULT_TOUR);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const { addItem, updateItem } = useCollection<Tour>('tours');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let images = formData.images;
      if (imageFiles.length > 0) {
        images = await uploadMultipleImages(imageFiles, 'tour-images');
      }

      const tourData = {
        ...formData,
        images,
        imageUrl: images[0] || formData.imageUrl,
        price: Number(formData.price),
        maxGroupSize: Number(formData.maxGroupSize)
      };

      if (initialData?.id) {
        await updateItem(initialData.id, tourData);
        toast.success('Tour updated successfully');
      } else {
        await addItem(tourData);
        toast.success('Tour added successfully');
      }

      onSuccess?.();
    } catch (error) {
      toast.error(initialData ? 'Failed to update tour' : 'Failed to add tour');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as Tour['category'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        >
          {TOUR_CATEGORIES.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Images (1-5)</label>
        <ImageUpload
          images={formData.images}
          onImagesChange={(images) => setFormData({ ...formData, images })}
          onFilesChange={setImageFiles}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Duration</label>
        <input
          type="text"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          placeholder="e.g., 5 days"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
        <select
          value={formData.difficulty}
          onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as Tour['difficulty'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        >
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Difficult">Difficult</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Max Group Size</label>
        <input
          type="number"
          value={formData.maxGroupSize}
          onChange={(e) => setFormData({ ...formData, maxGroupSize: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          min="1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Included Items</label>
        {formData.included.map((item, index) => (
          <div key={index} className="flex gap-2 mt-1">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newIncluded = [...formData.included];
                newIncluded[index] = e.target.value;
                setFormData({ ...formData, included: newIncluded });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm"
            />
            <button
              type="button"
              onClick={() => {
                const newIncluded = formData.included.filter((_, i) => i !== index);
                setFormData({ ...formData, included: newIncluded });
              }}
              className="px-2 py-1 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData({ ...formData, included: [...formData.included, ''] })}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Add Item
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Not Included Items</label>
        {formData.notIncluded.map((item, index) => (
          <div key={index} className="flex gap-2 mt-1">
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newNotIncluded = [...formData.notIncluded];
                newNotIncluded[index] = e.target.value;
                setFormData({ ...formData, notIncluded: newNotIncluded });
              }}
              className="block w-full rounded-md border-gray-300 shadow-sm"
            />
            <button
              type="button"
              onClick={() => {
                const newNotIncluded = formData.notIncluded.filter((_, i) => i !== index);
                setFormData({ ...formData, notIncluded: newNotIncluded });
              }}
              className="px-2 py-1 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setFormData({ ...formData, notIncluded: [...formData.notIncluded, ''] })}
          className="mt-2 text-blue-600 hover:text-blue-800"
        >
          Add Item
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? 'Saving...' : (initialData ? 'Update Tour' : 'Add Tour')}
      </button>
    </form>
  );
}