import { Injectable } from '@nestjs/common';
import { LocationProvider, LocationResult } from './location-provider.interface';

const MOCK_LOCATIONS: LocationResult[] = [
  { name: 'Porto Alegre', lat: -30.0346, lng: -51.2177, country: 'BR', state: 'RS' },
  { name: 'Porto Seguro', lat: -16.4419, lng: -39.0647, country: 'BR', state: 'BA' },
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333, country: 'BR', state: 'SP' },
];

@Injectable()
export class GoogleLocationService implements LocationProvider {
  async search(query: string): Promise<LocationResult[]> {
    if (!query || query.trim().length < 2) {
      return [];
    }
    const q = query.toLowerCase();
    return MOCK_LOCATIONS.filter(loc => loc.name.toLowerCase().includes(q));
  }
}
