'use client';
import { useState } from 'react';

const moods = [
  { value: 'great', emoji: '😊', label: 'Great', cls: 'mood-great' },
  { value: 'good', emoji: '🙂', label: 'Good', cls: 'mood-good' },
  { value: 'okay', emoji: '😐', label: 'Okay', cls: 'mood-okay' },
  { value: 'bad', emoji: '😟', label: 'Bad', cls: 'mood-bad' },
  { value: 'terrible', emoji: '😢', label: 'Terrible', cls: 'mood-terrible' },
];

export default function MoodSelector({ name = 'mood', selected = '', required = false }) {
  const [value, setValue] = useState(selected);

  return (
    <div className="mood-grid">
      {moods.map(m => (
        <label
          key={m.value}
          className={`mood-option ${m.cls} ${value === m.value ? 'selected' : ''}`}
          tabIndex={0}
          role="radio"
          aria-checked={value === m.value}
          aria-label={m.label}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setValue(m.value); } }}
        >
          <input type="radio" name={name} value={m.value} required={required && !value}
            checked={value === m.value} onChange={() => setValue(m.value)} />
          <span className="mood-emoji">{m.emoji}</span>
          <span className="mood-label">{m.label}</span>
        </label>
      ))}
    </div>
  );
}

export function moodEmoji(mood) {
  const m = moods.find(x => x.value === mood);
  return m ? m.emoji : '';
}
