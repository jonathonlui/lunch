
type NumberPair = [number, number];

interface Location {
  latitude: number;
  longitude: number;
}

interface Meal {
  name: string;
  price: number;
}

interface Lunch {
  id: string;
  name: string;
  address?: string;
  description?: string;
  meals: Meal[];
  location?: Location;
  yelpLink?: string;
  imageUrl?: string;
}


declare module 'pigeon-maps';
declare module 'pigeon-overlay';
