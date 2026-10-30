import { useId, useMemo, useRef, useState } from 'react';
import type { GuestRepository } from '../../data/guestRepository';
import { eventIdentity } from '../../data/eventIdentity';
import type { Guest } from '../../domain/types';

export function GuestSearch({ repository, onSelect }: { repository: GuestRepository; onSelect: (guest: Guest) => void }) {
  const [query, setQuery] = useState('');
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => repository.search(query), [query, repository]);
  const hasQuery = query.trim().length > 0;
  const isSearchable = query.trim().length >= 2;
  const status = !hasQuery
    ? 'Escribe al menos dos letras para consultar la lista.'
    : !isSearchable
      ? 'Añade una letra más para que el Sombrero pueda buscar.'
      : results.length === 0
        ? 'Ese nombre no aparece en los registros. Revisa cómo está escrito.'
        : `${results.length} ${results.length === 1 ? 'nombre encontrado' : 'nombres encontrados'}.`;

  return (
    <section className="search-panel" aria-labelledby="search-heading">
      <p className="eyebrow">{eventIdentity.editorial.searchEyebrow}</p>
      <p className="search-summons">{eventIdentity.editorial.searchSummons}</p>
      <h1 id="search-heading">{eventIdentity.editorial.searchTitle}</h1>
      <p className="intro-copy">{eventIdentity.editorial.searchIntroduction}</p>
      <div className="search-field">
        <label htmlFor={inputId}>{eventIdentity.editorial.searchLabel}</label>
        <div className="input-shell">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
          <input ref={inputRef} id={inputId} type="search" value={query} autoComplete="off" spellCheck="false" placeholder={eventIdentity.editorial.searchPlaceholder} onChange={(event) => setQuery(event.target.value)} />
          {hasQuery && <button className="clear-button" type="button" onClick={() => { setQuery(''); inputRef.current?.focus(); }}><span aria-hidden="true">×</span><span className="sr-only">Borrar búsqueda</span></button>}
        </div>
      </div>
      <p className="search-status" role="status" aria-live="polite">{status}</p>
      {isSearchable && results.length > 0 && (
        <ul className="guest-results" aria-label="Coincidencias">
          {results.map((guest) => (
            <li key={guest.id}>
              <button type="button" onClick={() => onSelect(guest)}>
                <span className="result-monogram" aria-hidden="true">{guest.displayName.charAt(0)}</span>
                <span className="result-copy"><strong>{guest.displayName}</strong>{(guest.disambiguationLabel || repository.isDemo) && <small>{guest.disambiguationLabel ?? 'Invitación de demostración'}</small>}</span>
                <span className="result-arrow" aria-hidden="true">→</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {repository.isDemo && <p className="demo-note"><span aria-hidden="true">◇</span> Los nombres actuales son de demostración.</p>}
    </section>
  );
}
