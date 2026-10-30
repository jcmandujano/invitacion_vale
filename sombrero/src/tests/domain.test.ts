import { describe, expect, it } from 'vitest';
import { guests, houses, tables } from '../data/demoData';
import { DataIntegrityError, resolveSeat, validateDataset } from '../domain/resolveSeat';
import { normalizeSearchText, searchGuests } from '../domain/searchGuests';

describe('contrato de datos', () => {
  it('valida el dataset completo', () => expect(() => validateDataset(guests, tables, houses)).not.toThrow());
  it('resuelve la casa, mesa y lugares predefinidos', () => { const result = resolveSeat('demo-01', guests, tables, houses); expect(result).toMatchObject({ guestDisplayName: 'Valeria Ejemplo', tableLabel: '1', houseName: 'Gryffindor', approvedPlaces: 4 }); expect(resolveSeat('demo-01', guests, tables, houses)).toEqual(result); });
  it('asigna las dos mesas de cada casa según el plano', () => {
    expect(tables.map(({ label, houseId }) => [label, houseId])).toEqual([
      ['1', 'gryffindor'], ['2', 'gryffindor'], ['3', 'hufflepuff'], ['4', 'hufflepuff'],
      ['5', 'ravenclaw'], ['6', 'slytherin'], ['7', 'slytherin'], ['8', 'slytherin'],
      ['principal', 'muggle'], ['principal', 'gryffindor'], ['principal', 'hufflepuff'],
    ]);
  });
  it('falla explícitamente ante una referencia inválida', () => { const invalidGuests = [{ id: 'broken', displayName: 'Registro roto', tableId: 'missing', approvedPlaces: 1 }]; expect(() => resolveSeat('broken', invalidGuests, tables, houses)).toThrow(DataIntegrityError); });
  it.each([0, -1, 1.5, NaN])('rechaza una cantidad inválida de lugares: %s', (approvedPlaces) => {
    const invalidGuests = [{ id: 'broken', displayName: 'Registro roto', tableId: 'table-01', approvedPlaces }];
    expect(() => validateDataset(invalidGuests, tables, houses)).toThrow(DataIntegrityError);
  });
});

describe('búsqueda controlada', () => {
  it('normaliza acentos, espacios y mayúsculas', () => { expect(normalizeSearchText('  MARÍA   José  ')).toBe('maria jose'); expect(searchGuests('lucia fernandez', guests)[0]?.displayName).toBe('Lucía Fernández'); });
  it('acepta prefijos sin coincidencias arbitrarias', () => { expect(searchGuests('mate rio', guests)[0]?.displayName).toBe('Mateo del Río'); expect(searchGuests('xyz', guests)).toEqual([]); });
  it('conserva homónimos', () => { const matches = searchGuests('Alex Rivera', guests); expect(matches).toHaveLength(2); expect(matches.map(({ disambiguationLabel }) => disambiguationLabel)).toEqual(['Grupo Aurora', 'Grupo Lucero']); });
});
