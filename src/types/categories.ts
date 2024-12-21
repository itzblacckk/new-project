export const TOUR_CATEGORIES = [
  'Trekking',
  'Camping',
  'Rock Climbing',
  'Wildlife Safari',
  'Cultural Tours'
] as const;

export const EVENT_CATEGORIES = [
  'Adventure Workshops',
  'Training Programs',
  'Team Building',
  'Competitions',
  'Cultural Events'
] as const;

export type TourCategory = typeof TOUR_CATEGORIES[number];
export type EventCategory = typeof EVENT_CATEGORIES[number];