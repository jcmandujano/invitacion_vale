import { describe, expect, it } from 'vitest';
import type { SeatAssignment } from '../domain/types';
import { getCeremonyCopy } from '../features/ceremony/ceremonyCopy';

const assignment: SeatAssignment = { guestId: 'demo', guestDisplayName: 'Invitada Demo', approvedPlaces: 3, tableId: 'table-05', tableLabel: '5', houseId: 'ravenclaw', houseName: 'Ravenclaw', houseColorToken: 'house-celestial', houseSymbol: '☾', houseMotto: 'La curiosidad abre los cielos' };
describe('copy de ceremonia', () => {
  it('revela la casa de la asignación', () => expect(getCeremonyCopy('reveal', assignment)).toContain('Ravenclaw'));
  it('muestra la mesa y los lugares solo al resultado', () => { expect(getCeremonyCopy('ponder', assignment)).not.toContain('5'); expect(getCeremonyCopy('result', assignment)).toContain('mesa 5'); expect(getCeremonyCopy('result', assignment)).toContain('3 lugares aprobados'); });
  it('usa el singular para un solo lugar', () => expect(getCeremonyCopy('result', { ...assignment, approvedPlaces: 1 })).toContain('1 lugar aprobado'));
  it.each([
    ['gryffindor', 'valentía'],
    ['hufflepuff', 'lealtad'],
    ['ravenclaw', 'curiosa'],
    ['slytherin', 'astucia'],
    ['muggle', 'celebración'],
  ])('adapta la deliberación a %s sin revelar el nombre de la casa', (houseId, expected) => {
    const copy = getCeremonyCopy('ponder', { ...assignment, houseId, houseName: houseId });
    expect(copy).toContain(expected);
    expect(copy.toLowerCase()).not.toContain(houseId);
  });
  it('presenta Muggle como mesa y no como casa', () => {
    expect(getCeremonyCopy('reveal', { ...assignment, houseId: 'muggle', houseName: 'Muggle' })).toBe('¡Tu lugar está en la mesa Muggle!');
  });
  it('usa una deliberación general para casas futuras', () => {
    expect(getCeremonyCopy('ponder', { ...assignment, houseId: 'nueva' })).toContain('Hay mucho que considerar');
  });
});
