import { AnimalListing } from '../types';
import { AVITO_SAMPLE_DATABASE, AvitoListingTemplate } from '../data/avitoCatalog';

export const AUTO_AVITO_STORAGE_KEY = 'zoomayak_auto_avito_feed_v2';

/**
 * Converts an Avito listing template to a unified ZooMayak AnimalListing
 */
export function convertAvitoToAnimalListing(template: AvitoListingTemplate): AnimalListing {
  return {
    id: template.id,
    title: template.title,
    species: template.species,
    breed: template.breed,
    age: template.age,
    sex: template.sex,
    price: template.price,
    city: template.city,
    source: 'Avito',
    sourceUrl: template.sourceUrl,
    imageUrl: template.imageUrl,
    description: template.description,
    publishedAt: template.publishedAt,
    verified: template.hasVetPassport || template.hasPedigree,
  };
}

/**
 * Automatic background parser engine:
 * Silently ingests and updates Avito animal listings into the unified feed
 */
export function getAutoParsedAvitoListings(): AnimalListing[] {
  try {
    const cached = localStorage.getItem(AUTO_AVITO_STORAGE_KEY);
    if (cached) {
      const parsed: AnimalListing[] = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  // Initial silent ingestion of Avito listings
  const initial = AVITO_SAMPLE_DATABASE.map(convertAvitoToAnimalListing);
  try {
    localStorage.setItem(AUTO_AVITO_STORAGE_KEY, JSON.stringify(initial));
  } catch {
    // ignore
  }
  return initial;
}

/**
 * Background auto-sync function:
 * Simulates background parser polling new/updated animal listings from Avito
 */
export async function syncAvitoFeedInBackground(): Promise<{ updatedCount: number; listings: AnimalListing[] }> {
  // Simulate rapid background parser fetch
  await new Promise((resolve) => setTimeout(resolve, 600));

  const allFromCatalog = AVITO_SAMPLE_DATABASE.map(convertAvitoToAnimalListing);

  try {
    localStorage.setItem(AUTO_AVITO_STORAGE_KEY, JSON.stringify(allFromCatalog));
  } catch {
    // ignore
  }

  return {
    updatedCount: allFromCatalog.length,
    listings: allFromCatalog,
  };
}
