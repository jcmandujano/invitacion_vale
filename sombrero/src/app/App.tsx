import { useState } from 'react';
import { featureFlags } from '../config/featureFlags';
import { guestRepository } from '../data/guestRepository';
import { eventIdentity } from '../data/eventIdentity';
import type { Guest, SeatAssignment } from '../domain/types';
import { Ceremony } from '../features/ceremony/Ceremony';
import { GuestConfirmation } from '../features/guest-search/GuestConfirmation';
import { GuestSearch } from '../features/guest-search/GuestSearch';

type AppView = 'search' | 'confirm' | 'ceremony';

export function App() {
  const [view, setView] = useState<AppView>('search');
  const [guest, setGuest] = useState<Guest | null>(null);
  const [assignment, setAssignment] = useState<SeatAssignment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const beginCeremony = (selectedGuest: Guest) => {
    try {
      setAssignment(guestRepository.resolve(selectedGuest.id));
      setError(null);
      setView('ceremony');
    } catch {
      setGuest(null);
      setAssignment(null);
      setError('El libro encantado no pudo resolver esta asignación. Inténtalo nuevamente.');
      setView('search');
    }
  };
  const selectGuest = (selectedGuest: Guest) => {
    setGuest(selectedGuest);
    setAssignment(null);
    setError(null);
    if (featureFlags.showGuestConfirmation) {
      setView('confirm');
      return;
    }
    beginCeremony(selectedGuest);
  };
  const reset = () => { setView('search'); setGuest(null); setAssignment(null); setError(null); };
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Saltar al contenido</a><div className="ambient-orb ambient-orb-one" aria-hidden="true" /><div className="ambient-orb ambient-orb-two" aria-hidden="true" />
      {import.meta.env.VITE_INVITATION_URL && view !== 'ceremony' && <a className="invitation-return" href={import.meta.env.VITE_INVITATION_URL}>← Volver a la invitación</a>}
      <header className="brand" aria-label={`${eventIdentity.eventName}, ${eventIdentity.celebration} de ${eventIdentity.honoreeFirstName}`}>
        <span className="brand-monogram" aria-hidden="true"><strong>{eventIdentity.initials}</strong><small>XV</small></span>
        <span className="brand-copy"><small>{eventIdentity.institution}</small><strong>{eventIdentity.eventName}</strong></span>
      </header>
      <main id="main-content" className="app-main">
        {error && <p className="error-banner" role="alert">{error}</p>}
        {view === 'search' && <GuestSearch repository={guestRepository} onSelect={selectGuest} />}
        {view === 'confirm' && guest && <GuestConfirmation guest={guest} onBack={() => setView('search')} onConfirm={() => beginCeremony(guest)} />}
        {view === 'ceremony' && assignment && <Ceremony assignment={assignment} onClose={reset} onSearchAgain={reset} />}
      </main>
      {view !== 'ceremony' && <footer className="site-footer"><span aria-hidden="true">—</span> {eventIdentity.celebration} de {eventIdentity.honoreeFirstName} <span aria-hidden="true">—</span></footer>}
    </div>
  );
}
