import { describe, expect, it } from 'vitest';
import { localeFor } from './i18n';

describe('localeFor', () => {
  it('ordnet Deutsch die Locale de-DE zu', () => {
    expect(localeFor('de')).toBe('de-DE');
  });

  it('ordnet Englisch die Locale en-GB zu', () => {
    expect(localeFor('en')).toBe('en-GB');
  });
});
