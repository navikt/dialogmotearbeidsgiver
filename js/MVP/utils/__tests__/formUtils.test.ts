import { mapErrors } from '@/MVP/utils/formUtils';

describe('formUtils', () => {
  describe('mapErrors', () => {
    test('should return empty array', () => {
      const feil = mapErrors({});
      expect(feil).toEqual([]);
    });

    test('should return mapped errors', () => {
      const errors = {
        begrunnelseAvlysning: { message: 'Begrunnelse er obligatorisk' },
        svar: { message: 'Du må velge et svar' },
      };

      const feil = mapErrors(errors);
      expect(feil).toEqual([
        {
          feilmelding: 'Begrunnelse er obligatorisk',
          skjemaelementId: 'begrunnelseAvlysning',
        },
        {
          feilmelding: 'Du må velge et svar',
          skjemaelementId: 'svar',
        },
      ]);
    });
  });
});
