import { useCallback, useEffect, useRef, useState } from 'react';
import { HouseSigil } from '../../components/HouseSigil';
import { MagicHat } from '../../components/MagicHat';
import type { CeremonyPhase, SeatAssignment } from '../../domain/types';
import { getCeremonyCopy } from './ceremonyCopy';
import { eventIdentity } from '../../data/eventIdentity';

type CeremonyProps = {
  assignment: SeatAssignment;
  onClose: () => void;
  onSearchAgain: () => void;
};

const phaseOrder: CeremonyPhase[] = ['summon', 'wake', 'ponder', 'reveal'];

export function Ceremony({ assignment, onClose, onSearchAgain }: CeremonyProps) {
  const [reducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [phase, setPhase] = useState<CeremonyPhase>(reducedMotion ? 'result' : 'summon');
  const [run, setRun] = useState(0);
  const sceneRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<{ kill: () => void } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isResult = phase === 'result';

  const showResult = useCallback(() => {
    timelineRef.current?.kill();
    timelineRef.current = null;
    setPhase('result');
  }, []);

  useEffect(() => { closeRef.current?.focus(); }, []);

  useEffect(() => {
    let disposed = false;
    if (reducedMotion) return undefined;

    void import('gsap').then(({ gsap }) => {
      const scene = sceneRef.current;
      if (disposed || !scene) return;

      const hat = scene.querySelector('.magic-hat');
      const crown = scene.querySelector('.hat-crown-group');
      const brim = scene.querySelector('.hat-brim-group');
      const face = scene.querySelector('.hat-face');
      const shadow = scene.querySelector('.hat-floor-shadow');
      const dialogue = scene.querySelector('.ceremony-dialogue');
      const flash = scene.querySelector('.scene-flash');
      const lightBeam = scene.querySelector('.scene-light-beam');
      const ring = scene.querySelector('.hat-ritual-ring');
      const sparks = scene.querySelectorAll('.hat-spark');
      const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
      timelineRef.current = timeline;

      gsap.set(hat, { autoAlpha: 0, y: 120, scale: .68, rotation: -4 });
      gsap.set(crown, { transformOrigin: '50% 95%', scaleY: .76, rotation: -6 });
      gsap.set(brim, { transformOrigin: '50% 50%', scaleX: .7, scaleY: 1.18 });
      gsap.set(face, { autoAlpha: 0 });
      gsap.set(shadow, { transformOrigin: '50% 50%', scaleX: .35, opacity: .1 });
      gsap.set(dialogue, { autoAlpha: 0, y: 10 });
      gsap.set(ring, { autoAlpha: 0, scale: .6, rotation: -35 });
      gsap.set(sparks, { autoAlpha: 0, scale: 0, y: 12 });

      timeline
        // Invocación: la luz llega antes que el personaje y el ala absorbe el impacto.
        .fromTo(lightBeam, { autoAlpha: 0, scaleY: .25 }, { autoAlpha: .72, scaleY: 1, duration: .65, ease: 'power1.out' })
        .to(ring, { autoAlpha: .7, scale: 1, rotation: 0, duration: 1.15, ease: 'back.out(1.4)' }, '<.08')
        .to(hat, { autoAlpha: 1, y: 0, scale: 1, rotation: 0, duration: 1.35, ease: 'back.out(1.28)' }, '<.12')
        .to(shadow, { scaleX: 1, opacity: .62, duration: 1.1 }, '<')
        .to(brim, { scaleX: 1.08, scaleY: .88, duration: .22, ease: 'power2.out' }, '-=.23')
        .to(brim, { scaleX: 1, scaleY: 1, duration: .46, ease: 'elastic.out(1, .45)' })
        .to(crown, { scaleY: 1.04, rotation: 2, duration: .42, ease: 'back.out(2)' }, '<-.2')
        .to(crown, { scaleY: 1, rotation: 0, duration: .45 })
        .to(sparks, { autoAlpha: 1, scale: 1, y: -8, duration: .45, stagger: { each: .045, from: 'random' } }, '<-.5')
        .to(dialogue, { autoAlpha: 1, y: 0, duration: .38 }, '<.12')
        .to({}, { duration: .65 })

        // Despertar: primero reacciona el cuerpo, luego abre la cara y busca al invitado.
        .to(dialogue, { autoAlpha: 0, y: -8, duration: .2 })
        .call(() => setPhase('wake'))
        .to(crown, { rotation: -4, scaleY: 1.035, duration: .42, ease: 'power2.out' })
        .to(brim, { rotation: 1.8, scaleX: 1.025, duration: .42 }, '<')
        .to(face, { autoAlpha: 1, duration: .18 }, '<.12')
        .to(crown, { rotation: 2.5, duration: .55, ease: 'sine.inOut' })
        .to(crown, { rotation: 0, scaleY: 1, duration: .38 })
        .to(brim, { rotation: 0, scaleX: 1, duration: .38 }, '<')
        .to(dialogue, { autoAlpha: 1, y: 0, duration: .34 }, '<-.12')
        .to({}, { duration: 1.05 })

        // Deliberación: movimientos desiguales para que parezca pensar, no oscilar en bucle.
        .to(dialogue, { autoAlpha: 0, y: -8, duration: .2 })
        .call(() => setPhase('ponder'))
        .to(hat, { x: -7, rotation: -3.5, y: -7, duration: .62, ease: 'sine.inOut' })
        .to(dialogue, { autoAlpha: 1, y: 0, duration: .34 }, '<.16')
        .to(crown, { rotation: -5.5, scaleY: .975, duration: .48 }, '<')
        .to(hat, { x: 6, rotation: 2.4, y: -3, duration: .8, ease: 'sine.inOut' })
        .to(crown, { rotation: 3.5, scaleY: 1.025, duration: .7 }, '<')
        .to(hat, { x: -2, rotation: -.8, y: -6, duration: .55 })
        .to(crown, { rotation: -1.5, scaleY: 1, duration: .5 }, '<')
        .to({}, { duration: .85 })

        // Revelación: pausa, contracción y expansión de color antes de entregar el resultado.
        .to(dialogue, { autoAlpha: 0, y: -8, duration: .22 })
        .to(hat, { y: 5, scaleX: 1.045, scaleY: .94, duration: .28, ease: 'power2.in' })
        .call(() => setPhase('reveal'))
        .to(hat, { x: 0, y: -22, rotation: 0, scaleX: .98, scaleY: 1.08, duration: .48, ease: 'back.out(2.5)' })
        .to(flash, { autoAlpha: .9, scale: 1.25, duration: .18, ease: 'power3.out' }, '<.14')
        .to(flash, { autoAlpha: 0, scale: 1.7, duration: .8, ease: 'power2.out' })
        .to(ring, { autoAlpha: 1, scale: 1.12, rotation: 24, duration: .9, ease: 'power2.out' }, '<')
        .to(sparks, { autoAlpha: 1, scale: 1.7, y: -34, duration: .72, stagger: { each: .035, from: 'center' }, ease: 'power2.out' }, '<')
        .to(hat, { y: -9, scaleX: 1, scaleY: 1, duration: .5, ease: 'bounce.out' }, '<.22')
        .to(dialogue, { autoAlpha: 1, y: 0, duration: .3 }, '<.12')
        .to({}, { duration: 1.35 })
        .to(dialogue, { autoAlpha: 0, y: -8, duration: .25 })
        .call(() => setPhase('result'));
    }).catch(() => { if (!disposed) setPhase('result'); });

    const handleVisibilityChange = () => { if (document.hidden) showResult(); };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      disposed = true;
      timelineRef.current?.kill();
      timelineRef.current = null;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [reducedMotion, run, showResult]);

  const replay = () => {
    timelineRef.current?.kill();
    setPhase(reducedMotion ? 'result' : 'summon');
    setRun((current) => current + 1);
  };

  return (
    <section
      ref={sceneRef}
      className="ceremony-scene"
      data-house={assignment.houseColorToken}
      data-phase={phase}
      aria-labelledby={isResult ? 'result-title' : 'ceremony-title'}
    >
      <div className="scene-vignette" />
      <div className="scene-light-beam" aria-hidden="true" />
      <div className="scene-flash" aria-hidden="true" />
      <div className="stars" aria-hidden="true">{Array.from({ length: 22 }, (_, index) => <i key={index} />)}</div>

      <header className="ceremony-header">
        <div>
          <p>{eventIdentity.editorial.ceremonyEyebrow}</p>
          {!isResult && (
            <div className="phase-indicator" aria-hidden="true">
              {phaseOrder.map((step) => <i key={step} data-active={step === phase || phaseOrder.indexOf(step) < phaseOrder.indexOf(phase)} />)}
            </div>
          )}
        </div>
        <button ref={closeRef} className="round-button" type="button" onClick={onClose}>
          <span aria-hidden="true">×</span><span className="sr-only">Cerrar ceremonia</span>
        </button>
      </header>

      <div className="scene-content">
        {!isResult ? (
          <>
            <MagicHat phase={phase} />
            <div className="ceremony-dialogue" aria-live="polite">
              <span className="dialogue-mark" aria-hidden="true">“</span>
              <p id="ceremony-title">{getCeremonyCopy(phase, assignment)}</p>
            </div>
          </>
        ) : (
          <article className="result-card" aria-labelledby="result-title" aria-live="assertive">
            <p className="eyebrow">{eventIdentity.editorial.resultEyebrow}</p>
            <HouseSigil symbol={assignment.houseSymbol} name={assignment.houseName} />
            <p className="result-name">{assignment.guestDisplayName}</p>
            <h1 id="result-title">{assignment.houseName}</h1>
            <p className="house-motto">{assignment.houseMotto}</p>
            <div className="table-reveal"><span>{eventIdentity.editorial.resultTableLabel}</span><strong>Mesa {assignment.tableLabel}</strong></div>
            <div className="places-reveal"><span>Lugares aprobados para este grupo</span><strong>{assignment.approvedPlaces} {assignment.approvedPlaces === 1 ? 'lugar' : 'lugares'}</strong><small>Incluye a {assignment.guestDisplayName}.</small></div>
            <p className="result-event-line">{eventIdentity.editorial.resultClosing}</p>
            <div className="result-actions">
              <button className="button button-primary" type="button" onClick={replay}>Repetir selección</button>
              <button className="button button-ghost" type="button" onClick={onSearchAgain}>Buscar otro nombre</button>
            </div>
          </article>
        )}
      </div>

      {!isResult && (
        <footer className="ceremony-controls">
          <button className="text-button" type="button" onClick={showResult}>Omitir animación<span aria-hidden="true"> →</span></button>
        </footer>
      )}
    </section>
  );
}
