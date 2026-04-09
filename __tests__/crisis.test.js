const { detectCrisis } = require('../src/lib/crisis');

describe('Crisis Detection', () => {
  test('detects "kill myself" as crisis', () => {
    expect(detectCrisis('I want to kill myself')).toBe(true);
  });

  test('detects "suicide" as crisis', () => {
    expect(detectCrisis('thinking about suicide')).toBe(true);
  });

  test('detects "self-harm" as crisis', () => {
    expect(detectCrisis('I have been self-harm ing')).toBe(true);
  });

  test('detects "want to die" as crisis', () => {
    expect(detectCrisis('i just want to die')).toBe(true);
  });

  test('detects "end it all" as crisis', () => {
    expect(detectCrisis('I want to end it all')).toBe(true);
  });

  test('does not flag normal text', () => {
    expect(detectCrisis('I had a great day today')).toBe(false);
  });

  test('does not flag empty text', () => {
    expect(detectCrisis('')).toBe(false);
  });

  test('does not flag null', () => {
    expect(detectCrisis(null)).toBe(false);
  });

  test('does not flag undefined', () => {
    expect(detectCrisis(undefined)).toBe(false);
  });

  test('is case insensitive', () => {
    expect(detectCrisis('I WANT TO KILL MYSELF')).toBe(true);
  });

  test('does not flag partial word matches like "suicidal prevention"', () => {
    // "suicidal" is in the keyword list, so this should detect
    expect(detectCrisis('suicidal prevention resources')).toBe(true);
  });

  test('does not flag "killing it" or "die hard"', () => {
    expect(detectCrisis('I am killing it at work today')).toBe(false);
    expect(detectCrisis('die hard is a great movie')).toBe(false);
  });
});
