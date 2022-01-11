import { FeiloppsummeringFeil } from 'nav-frontend-skjema';
import { FieldErrors } from 'react-hook-form';

export const mapErrors = (errors: FieldErrors): FeiloppsummeringFeil[] => {
  const keys = Object.keys(errors);
  return keys
    .filter((key) => errors[key])
    .map((key) => {
      return {
        skjemaelementId: key,
        feilmelding: errors[key].message,
      };
    });
};
