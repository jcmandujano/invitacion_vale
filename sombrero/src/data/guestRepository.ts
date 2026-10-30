import { guests, houses, tables } from './demoData';
import { resolveSeat, validateDataset } from '../domain/resolveSeat';
import { searchGuests } from '../domain/searchGuests';
import type { Guest, SeatAssignment } from '../domain/types';

export type GuestRepository = {
  search(query: string): readonly Guest[];
  resolve(guestId: string): SeatAssignment;
  isDemo: boolean;
};

validateDataset(guests, tables, houses);

const privateFiles = import.meta.glob<{ default: Guest[] }>('../private/guests.json', { eager: true });
const privateGuests = Object.values(privateFiles)[0]?.default;
const activeGuests = privateGuests ?? guests;
validateDataset(activeGuests, tables, houses);

export const guestRepository: GuestRepository = {
  search: (query) => searchGuests(query, activeGuests),
  resolve: (guestId) => resolveSeat(guestId, activeGuests, tables, houses),
  isDemo: privateGuests === undefined,
};
