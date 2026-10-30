import { useEffect, useRef } from 'react';
import type { Guest } from '../../domain/types';
import { eventIdentity } from '../../data/eventIdentity';

export function GuestConfirmation({ guest, onBack, onConfirm }: { guest: Guest; onBack: () => void; onConfirm: () => void }) {
  const confirmRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { confirmRef.current?.focus(); }, []);

  return (
    <section className="confirm-panel" aria-labelledby="confirm-heading">
      <p className="eyebrow">{eventIdentity.editorial.confirmationEyebrow}</p>
      <div className="confirmation-seal" aria-hidden="true"><strong>{eventIdentity.initials}</strong><small>XV</small></div>
      <h1 id="confirm-heading">{guest.displayName}</h1>
      {guest.disambiguationLabel && <p className="guest-group">{guest.disambiguationLabel}</p>}
      <p className="intro-copy">{eventIdentity.editorial.confirmationNote}</p>
      <div className="button-stack">
        <button ref={confirmRef} className="button button-primary" type="button" onClick={onConfirm}><span>Iniciar selección</span><span aria-hidden="true">✦</span></button>
        <button className="button button-ghost" type="button" onClick={onBack}>Buscar otro nombre</button>
      </div>
    </section>
  );
}
