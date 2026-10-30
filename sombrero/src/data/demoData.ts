import type { Guest, House, Table } from '../domain/types';

export const houses: readonly House[] = [
  { id: 'gryffindor', name: 'Gryffindor', colorToken: 'house-ember', symbol: '✦', motto: 'El valor enciende el camino' },
  { id: 'slytherin', name: 'Slytherin', colorToken: 'house-verdant', symbol: '❧', motto: 'La astucia encuentra su senda' },
  { id: 'ravenclaw', name: 'Ravenclaw', colorToken: 'house-celestial', symbol: '☾', motto: 'La curiosidad abre los cielos' },
  { id: 'hufflepuff', name: 'Hufflepuff', colorToken: 'house-solar', symbol: '☼', motto: 'La lealtad hace hogar' },
  { id: 'muggle', name: 'Muggle', colorToken: 'house-muggle', symbol: '✧', motto: 'La magia también está en compartir' },
];

export const tables: readonly Table[] = [
  { id: 'table-01', label: '1', houseId: 'gryffindor' },
  { id: 'table-02', label: '2', houseId: 'gryffindor' },
  { id: 'table-03', label: '3', houseId: 'hufflepuff' },
  { id: 'table-04', label: '4', houseId: 'hufflepuff' },
  { id: 'table-05', label: '5', houseId: 'ravenclaw' },
  { id: 'table-06', label: '6', houseId: 'slytherin' },
  { id: 'table-07', label: '7', houseId: 'slytherin' },
  { id: 'table-08', label: '8', houseId: 'slytherin' },
  { id: 'main-muggle', label: 'principal', houseId: 'muggle' },
  { id: 'main-gryffindor', label: 'principal', houseId: 'gryffindor' },
  { id: 'main-hufflepuff', label: 'principal', houseId: 'hufflepuff' },
];

export const guests: readonly Guest[] = [
  { id: 'demo-01', displayName: 'Valeria Ejemplo', tableId: 'table-01', approvedPlaces: 4 },
  { id: 'demo-02', displayName: 'Marco Demostración', tableId: 'table-05', approvedPlaces: 2 },
  { id: 'demo-03', displayName: 'Lucía Fernández', tableId: 'table-03', approvedPlaces: 1 },
  { id: 'demo-04', displayName: 'Mateo del Río', tableId: 'table-07', approvedPlaces: 3 },
  { id: 'demo-05', displayName: 'Sofía Montaño', tableId: 'table-06', approvedPlaces: 2 },
  { id: 'demo-06', displayName: 'Nicolás Solís', tableId: 'table-02', approvedPlaces: 1 },
  { id: 'demo-07', displayName: 'Alex Rivera', tableId: 'table-08', approvedPlaces: 4, disambiguationLabel: 'Grupo Aurora' },
  { id: 'demo-08', displayName: 'Alex Rivera', tableId: 'table-04', approvedPlaces: 2, disambiguationLabel: 'Grupo Lucero' },
  { id: 'demo-09', displayName: 'María José Luna', tableId: 'table-01', approvedPlaces: 3, searchAliases: ['Ma. José Luna'] },
  { id: 'demo-10', displayName: 'Emilio Robles', tableId: 'table-04', approvedPlaces: 1 },
];
