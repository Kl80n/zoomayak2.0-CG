export type PetSpecies = 'dog' | 'cat' | 'bird' | 'rodent' | 'reptile' | 'other';

export interface WeightRecord {
  date: string;
  weightKg: number;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  ageText: string;
  birthDate: string;
  gender: 'male' | 'female';
  photoUrl: string;
  zmId: string;
  microchipId: string;
  status: 'safe' | 'lost' | 'medical_care';
  healthScore: number;
  weight: number;
  weightUnit: string;
  weightHistory: WeightRecord[];
  allergies: string[];
  diet: string;
  passportNumber: string;
  vetClinic: string;
  primaryVet: string;
  emergencyContacts: EmergencyContact[];
  specialNotes?: string;
  features: string[];
}

export interface MedicalRecord {
  id: string;
  petId: string;
  title: string;
  type: 'vaccine' | 'parasite' | 'examination' | 'surgery' | 'lab';
  date: string;
  nextDueDate?: string;
  doctor: string;
  clinic: string;
  medicineName?: string;
  batchNumber?: string;
  status: 'completed' | 'upcoming' | 'overdue';
  notes?: string;
  fileAttachment?: string;
}

export interface ReminderItem {
  id: string;
  petId: string;
  title: string;
  category: 'vaccine' | 'parasite' | 'grooming' | 'medicine' | 'vet' | 'nutrition';
  dueDate: string;
  dueTime?: string;
  repeatFrequency: string;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
  note?: string;
}

export interface LostAlert {
  id: string;
  petId?: string;
  petName: string;
  species: PetSpecies;
  breed: string;
  photoUrl: string;
  zmId: string;
  location: string;
  coordinates: { lat: number; lng: number };
  lostDate: string;
  reward?: string;
  ownerName: string;
  ownerPhone: string;
  distinguishingFeatures: string;
  status: 'active' | 'found';
}

export interface ServiceListing {
  id: string;
  title: string;
  category: 'vet' | 'grooming' | 'sitter' | 'hotel' | 'training' | 'walking';
  rating: number;
  reviewsCount: number;
  address: string;
  district: string;
  priceFrom: number;
  priceUnit: string;
  imageUrl: string;
  verified: boolean;
  badges: string[];
  phone: string;
  openHours: string;
  description: string;
}

export interface AnimalListing {
  id: string;
  title: string;
  species: PetSpecies;
  breed: string;
  age: string;
  sex: 'male' | 'female';
  price: number;
  city: string;
  source: 'Avito' | 'VK' | 'Telegram' | 'ЗооМаяк';
  sourceUrl: string;
  imageUrl: string;
  description: string;
  publishedAt: string;
  verified?: boolean;
}

export type ActiveNavTab = 'home' | 'account' | 'lost' | 'services';
