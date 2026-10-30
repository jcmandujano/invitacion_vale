import type { Guest } from './types';

export function normalizeSearchText(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es-MX').trim().replace(/\s+/g, ' ');
}

export function searchGuests(query: string, guests: readonly Guest[]): Guest[] {
  const normalizedQuery = normalizeSearchText(query);
  if (normalizedQuery.length < 2) return [];
  const queryTokens = normalizedQuery.split(' ');

  return guests
    .flatMap<{ guest: Guest; rank: number }>((guest) => {
      const values = [guest.displayName, ...(guest.searchAliases ?? [])].map(normalizeSearchText);
      const exact = values.some((value) => value === normalizedQuery);
      const startsWith = values.some((value) => value.startsWith(normalizedQuery));
      const tokensMatch = values.some((value) => queryTokens.every((token) => value.split(' ').some((word) => word.startsWith(token))));
      if (!exact && !startsWith && !tokensMatch) return [];
      return [{ guest, rank: exact ? 0 : startsWith ? 1 : 2 }];
    })
    .sort((left, right) => left.rank - right.rank || left.guest.displayName.localeCompare(right.guest.displayName, 'es-MX'))
    .map(({ guest }) => guest);
}
