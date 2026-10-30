import type { CeremonyPhase, SeatAssignment } from '../../domain/types';

const houseThoughts: Readonly<Record<string, string>> = {
  gryffindor: 'Mmm… veo valentía y un corazón dispuesto a darlo todo.',
  hufflepuff: 'Ah… lealtad, paciencia y una gran alegría de compartir.',
  ravenclaw: 'Interesante… una mente curiosa, ingeniosa y llena de ideas.',
  slytherin: 'Vaya… determinación, astucia y ganas de llegar muy lejos.',
  muggle: 'La magia está en las personas que hacen posible esta celebración.',
};

export function getCeremonyCopy(phase: CeremonyPhase, assignment: SeatAssignment): string {
  switch (phase) {
    case 'summon': return 'El Sombrero Seleccionador despierta…';
    case 'wake': return `${assignment.guestDisplayName}… Veamos dónde perteneces.`;
    case 'ponder': return houseThoughts[assignment.houseId] ?? 'Valor, lealtad, ingenio… Hay mucho que considerar.';
    case 'reveal': return assignment.houseId === 'muggle' ? '¡Tu lugar está en la mesa Muggle!' : `¡Tu casa es ${assignment.houseName}!`;
    case 'result': return `${assignment.guestDisplayName}: ${assignment.houseId === 'muggle' ? 'mesa Muggle' : `casa ${assignment.houseName}`}, mesa ${assignment.tableLabel}, con ${assignment.approvedPlaces} ${assignment.approvedPlaces === 1 ? 'lugar aprobado' : 'lugares aprobados'}.`;
  }
}
