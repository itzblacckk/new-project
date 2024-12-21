import React, { useState } from 'react';
import { TourCard } from '../components/tours/TourCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { useCollection } from '../hooks/useFirebase';
import { Tour } from '../types';
import { TOUR_CATEGORIES, TourCategory } from '../types/categories';

export default function Tours() {
  const { data: tours, loading, error } = useCollection<Tour>('tours');
  const [selectedCategory, setSelectedCategory] = useState<TourCategory | 'all'>('all');

  if (loading) return <div className="p-8 text-center">Loading tours...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading tours: {error.message}</div>;

  const filteredTours = selectedCategory === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Our Tours</h1>
      
      <CategoryFilter
        categories={TOUR_CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => setSelectedCategory(category)}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}