'use client';
import { useState, useRef, useCallback, useEffect } from 'react';

export default function ExerciseClient({ exercise }) {
  if (exercise.type === 'breathing') return <BreathingExercise />;
  if (exercise.type === 'grounding') return <GroundingExercise steps={exercise.steps} />;
  if (exercise.type === 'prompts') return <PromptsExercise prompts={exercise.prompts} />;
  if (exercise.type === 'affirmations') return <AffirmationsExercise affirmations={exercise.affirmations} />;
  return null;
}

function BreathingExercise() {
  const [running, setRunning] = useState(false);
  const [text, setText] = useState('Start');
  const [instruction, setInstruction] = useState('Press start to begin');
  const timerRef = useRef(null);
  const phases = [
    { text: 'Breathe In', duration: 4000 },
    { text: 'Hold', duration: 4000 },
    { text: 'Breathe Out', duration: 4000 },
    { text: 'Hold', duration: 4000 },
  ];
  const phaseRef = useRef(0);

  const runPhase = useCallback(() => {
    const phase = phases[phaseRef.current % phases.length];
    setText(phase.text);
    setInstruction(`${phase.text}... ${phase.duration / 1000} seconds`);
    let sec = phase.duration / 1000;
    const countdown = setInterval(() => {
      sec--;
      if (sec > 0) setText(String(sec));
    }, 1000);
    timerRef.current = setTimeout(() => {
      clearInterval(countdown);
      phaseRef.current++;
      runPhase();
    }, phase.duration);
  }, []);

  const start = () => { setRunning(true); phaseRef.current = 0; runPhase(); };
  const stop = () => { setRunning(false); clearTimeout(timerRef.current); setText('Start'); setInstruction('Press start to begin'); };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <div className="card-serenity text-center">
      <div className={`breathing-circle ${running ? '' : 'paused'}`}><span>{text}</span></div>
      <p className="mb-3 fs-5 fw-semibold text-muted">{instruction}</p>
      <div className="d-flex justify-content-center gap-2">
        {!running ? <button className="btn btn-primary-gradient" onClick={start}><i className="bi bi-play-fill" /> Start</button>
          : <button className="btn btn-outline-purple" onClick={stop}><i className="bi bi-stop-fill" /> Stop</button>}
      </div>
      <div className="mt-4"><small className="text-muted">Breathe in for 4 seconds, hold for 4, breathe out for 4, hold for 4. Repeat.</small></div>
    </div>
  );
}

function GroundingExercise({ steps }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  if (done) return (
    <div className="card-serenity text-center">
      <div style={{ fontSize: '3rem', marginBottom: 16 }}>🌟</div>
      <h3>Well done!</h3>
      <p className="text-muted">You&apos;ve completed the grounding exercise.</p>
      <a href="/coping" className="btn btn-primary-gradient mt-2">Back to Tools</a>
    </div>
  );

  const s = steps[step];
  return (
    <div className="grounding-step">
      <div className="step-number">{s.count}</div>
      <h3>{s.prompt}</h3>
      <p>{s.detail}</p>
      <div className="grounding-inputs">
        {Array.from({ length: s.count }, (_, i) => (
          <input key={i} type="text" className="form-control form-control-serenity" placeholder={`${s.placeholder} #${i + 1}`} />
        ))}
      </div>
      {step < steps.length - 1
        ? <button className="btn btn-primary-gradient" onClick={() => setStep(step + 1)}>Next <i className="bi bi-arrow-right" /></button>
        : <button className="btn btn-primary-gradient" onClick={() => setDone(true)}><i className="bi bi-check-lg" /> Complete</button>}
    </div>
  );
}

function PromptsExercise({ prompts }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="card-serenity text-center">
      <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>✍️</div>
      <h3 className="mb-4">{prompts[idx]}</h3>
      <button className="btn btn-primary-gradient mb-3" onClick={() => setIdx((idx + 1) % prompts.length)}>
        <i className="bi bi-shuffle" /> Another Prompt
      </button>
      <div className="mt-3"><a href="/journal/new" className="btn btn-outline-purple"><i className="bi bi-journal-text" /> Write in Journal</a></div>
    </div>
  );
}

function AffirmationsExercise({ affirmations }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="card-serenity text-center">
      <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>💜</div>
      <h3 className="mb-4" style={{ fontStyle: 'italic' }}>&quot;{affirmations[idx]}&quot;</h3>
      <button className="btn btn-primary-gradient" onClick={() => setIdx((idx + 1) % affirmations.length)}>
        <i className="bi bi-arrow-right" /> Next Affirmation
      </button>
    </div>
  );
}
