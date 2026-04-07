const keywords = [
  'kill myself', 'want to die', 'end my life', 'end it all',
  'suicide', 'suicidal', 'self-harm', 'self harm', 'hurt myself',
  'cutting myself', "don't want to live", 'dont want to live',
  'no reason to live', 'better off dead', 'wish i was dead',
  'wish i were dead', "can't go on", 'cant go on',
  'want to disappear', 'overdose', 'jump off', 'hang myself'
];

export function detectCrisis(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return keywords.some(kw => lower.includes(kw));
}
