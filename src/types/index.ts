import { TourCategory, EventCategory } from './categories';

export interface Tour {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Expert';
  imageUrl: string;
  images: string[];
  location: string;
  maxGroupSize: number;
  startDates: string[];
  included: string[];
  notIncluded: string[];
  category: TourCategory;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  images: string[];
  createdAt: string;
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  images: string[];
  price: number;
  capacity: number;
  registeredCount: number;
  category: EventCategory;
}

export interface Analytics {
  pageViews: number;
  uniqueVisitors: number;
  averageTimeOnSite: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
  visitorsByDay: Array<{
    date: string;
    count: number;
  }>;
}