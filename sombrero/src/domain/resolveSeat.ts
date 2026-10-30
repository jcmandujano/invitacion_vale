import type { Guest, House, SeatAssignment, Table } from './types';

export class DataIntegrityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DataIntegrityError';
  }
}

export function resolveSeat(
  guestId: string,
  guests: readonly Guest[],
  tables: readonly Table[],
  houses: readonly House[],
): SeatAssignment {
  const guest = guests.find((candidate) => candidate.id === guestId);
  if (!guest) throw new DataIntegrityError(`No existe el registro de invitado: ${guestId}`);
  if (!Number.isSafeInteger(guest.approvedPlaces) || guest.approvedPlaces < 1) throw new DataIntegrityError(`La cantidad de lugares de ${guest.id} debe ser un entero positivo.`);
  const table = tables.find((candidate) => candidate.id === guest.tableId);
  if (!table) throw new DataIntegrityError(`La mesa ${guest.tableId} no existe.`);
  const house = houses.find((candidate) => candidate.id === table.houseId);
  if (!house) throw new DataIntegrityError(`La casa ${table.houseId} no existe.`);

  return {
    guestId: guest.id,
    guestDisplayName: guest.displayName,
    approvedPlaces: guest.approvedPlaces,
    tableId: table.id,
    tableLabel: table.label,
    houseId: house.id,
    houseName: house.name,
    houseColorToken: house.colorToken,
    houseSymbol: house.symbol,
    houseMotto: house.motto,
  };
}

export function validateDataset(
  guests: readonly Guest[],
  tables: readonly Table[],
  houses: readonly House[],
): void {
  const ensureUnique = (label: string, ids: readonly string[]) => {
    if (new Set(ids).size !== ids.length) throw new DataIntegrityError(`Hay IDs duplicados en ${label}.`);
  };
  ensureUnique('invitados', guests.map(({ id }) => id));
  ensureUnique('mesas', tables.map(({ id }) => id));
  ensureUnique('casas', houses.map(({ id }) => id));
  tables.forEach((table) => {
    if (!houses.some((house) => house.id === table.houseId)) throw new DataIntegrityError(`La casa ${table.houseId} no existe.`);
  });
  guests.forEach(({ id }) => resolveSeat(id, guests, tables, houses));
}
