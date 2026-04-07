'use client';
import { useCallback, useRef } from 'react';

const keywords = [
  'kill myself', 'want to die', 'end my life', 'end it all',
  'suicide', 'suicidal', 'self-harm', 'self harm', 'hurt myself',
  'cutting myself', "don't want to live", 'dont want to live',
  'no reason to live', 'better off dead', 'wish i was dead',
];

export default function CrisisScanner({ children }) {
  const triggered = useRef(false);

  const handleInput = useCallback((e) => {
    const text = e.target.value.toLowerCase();
    if (!triggered.current && keywords.some(kw => text.includes(kw))) {
      triggered.current = true;
      const modal = document.getElementById('crisisModal');
      if (modal && window.bootstrap) {
        new window.bootstrap.Modal(modal).show();
      }
    }
    if (triggered.current && !keywords.some(kw => text.includes(kw))) {
      triggered.current = false;
    }
  }, []);

  return <div onInput={handleInput}>{children}</div>;
}
