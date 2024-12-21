import React, { useState } from 'react';
import { EventCard } from '../components/events/EventCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { useCollection } from '../hooks/useFirebase';
import { Event } from '../types';
import { EVENT_CATEGORIES, EventCategory } from '../types/categories';

export default function Events() {
  const { data: events, loading, error } = useCollection<Event>('events');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'all'>('all');

  if (loading) return <div className="p-8 text-center">Loading events...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Error loading events: {error.message}</div>;

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>

      <CategoryFilter
        categories={EVENT_CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => setSelectedCategory(category)}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}