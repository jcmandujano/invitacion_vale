export type HouseColorToken = 'house-ember' | 'house-verdant' | 'house-celestial' | 'house-solar' | 'house-muggle';

export type House = {
  id: string;
  name: string;
  colorToken: HouseColorToken;
  symbol: string;
  motto: string;
};

export type Table = { id: string; label: string; houseId: string };

export type Guest = {
  id: string;
  displayName: string;
  tableId: string;
  approvedPlaces: number;
  searchAliases?: string[];
  disambiguationLabel?: string;
};

export type SeatAssignment = {
  guestId: string;
  guestDisplayName: string;
  approvedPlaces: number;
  tableId: string;
  tableLabel: string;
  houseId: string;
  houseName: string;
  houseColorToken: HouseColorToken;
  houseSymbol: string;
  houseMotto: string;
};

export type CeremonyPhase = 'summon' | 'wake' | 'ponder' | 'reveal' | 'result';
