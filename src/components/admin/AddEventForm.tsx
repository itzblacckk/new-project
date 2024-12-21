import React, { useState, useEffect } from 'react';
import { useCollection } from '../../hooks/useFirebase';
import { uploadImage } from '../../lib/storage';
import { Event } from '../../types';
import { EVENT_CATEGORIES } from '../../types/categories';
import { toast } from 'react-hot-toast';

interface AddEventFormProps {
  initialData?: Event;
  onSuccess?: () => void;
}

export function AddEventForm({ initialData, onSuccess }: AddEventFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    imageUrl: '',
    price: '',
    capacity: '',
    category: EVENT_CATEGORIES[0],
    registeredCount: 0
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { addItem, updateItem } = useCollection<Event>('events');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        date: initialData.date,
        location: initialData.location,
        imageUrl: initialData.imageUrl,
        price: initialData.price.toString(),
        capacity: initialData.capacity.toString(),
        category: initialData.category,
        registeredCount: initialData.registeredCount
      });
    }
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'event-images');
      }

      const eventData = {
        ...formData,
        imageUrl,
        price: Number(formData.price),
        capacity: Number(formData.capacity)
      };

      if (initialData?.id) {
        await updateItem(initialData.id, eventData);
        toast.success('Event updated successfully');
      } else {
        await addItem(eventData);
        toast.success('Event added successfully');
      }

      onSuccess?.();
    } catch (error) {
      toast.error(initialData ? 'Failed to update event' : 'Failed to add event');
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
          onChange={(e) => setFormData({ ...formData, category: e.target.value as Event['category'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        >
          {EVENT_CATEGORIES.map((category) => (
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
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
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
        <label className="block text-sm font-medium text-gray-700">Image</label>
        {formData.imageUrl && (
          <img src={formData.imageUrl} alt="Preview" className="w-32 h-32 object-cover mb-2 rounded" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full"
          required={!formData.imageUrl}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Capacity</label>
        <input
          type="number"
          value={formData.capacity}
          onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
          min="1"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? (initialData ? 'Updating...' : 'Adding...') : (initialData ? 'Update Event' : 'Add Event')}
      </button>
    </form>
  );
}