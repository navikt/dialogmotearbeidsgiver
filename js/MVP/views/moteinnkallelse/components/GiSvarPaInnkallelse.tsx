import { trackOnClick } from '@/amplitude/amplitude';
import { eventNames } from '@/amplitude/events';
import { SvarRespons, SvarType } from '@/api/types/brevTypes';
import DialogmotePanel from '@/MVP/containers/DialogmotePanel';
import { useSvarPaInnkallelse } from '@/MVP/queries/brev';
import { mapErrors } from '@/MVP/utils/formUtils';
import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Feiloppsummering, Radio, RadioGruppe, Textarea } from 'nav-frontend-skjema';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { ReactElement, useEffect } from 'react';
import { Control, Controller, useForm, UseFormRegisterReturn } from 'react-hook-form';
import styled from 'styled-components';

const SvarStyled = styled(DialogmotePanel)`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const KnappStyled = styled(Hovedknapp)`
  width: fit-content;
`;

const texts = {
  title: 'Svar om du kan komme',
  infoRequired: 'Alle felt er obligatoriske.',
  svarLegend: 'Svar på innkallingen',
  svarRequired: 'Du må velge et svar',
  svarKommer: 'Jeg kommer',
  svarEndring: 'Jeg ønsker å endre tidspunkt eller sted',
  svarAvlysning: 'Jeg ønsker å avlyse',
  infoEndring: `NAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet endres. Hvis du ikke får et nytt varsel, er det fortsatt tidspunktet og stedet i denne innkallingen som gjelder.\n\nHusk å begrunne svaret godt slik at NAV-kontoret kan ta beslutningen på et best mulig grunnlag.`,
  infoAvlysning: `NAV-kontoret vil vurdere ønsket ditt. Du får et nytt varsel hvis møtet avlyses. Hvis du ikke får noe nytt varsel, må du fortsatt stille til møtet i denne innkallingen.\n\nSelv om du ønsker å avlyse, kan det hende NAV-kontoret likevel konkluderer med at et møte er nødvendig. Husk å begrunne svaret godt slik at NAV-kontoret kan ta beslutningen på et best mulig grunnlag.`,
  begrunnelseRequired: 'Begrunnelse er obligatorisk',
  begrunnelseMaxLength: 'Begrunnelse kan ikke være lenger enn 300 tegn',
  begrunnelseEndringLabel: 'Hvorfor ønsker du å endre tidspunkt eller sted?',
  begrunnelseAvlysningLabel: 'Hvorfor ønsker du å avlyse?',
  begrunnelseDescription: 'Ikke skriv sensitiv informasjon, for eksempel detaljerte opplysninger om helse.',
  feiloppsummeringTittel: 'For å gå videre må du rette opp følgende:',
  errorMessage: 'Svaret ditt kom ikke frem. Kan du prøve igjen?',
};

const fields = {
  SVAR: 'svar',
  BEGRUNNELSE_ENDRING: 'begrunnelseEndring',
  BEGRUNNELSE_AVLYSNING: 'begrunnelseAvlysning',
};

interface BegrunnelseProps {
  control: Control;
  name: string;
  label: string;
  error: string;
}

const BegrunnelseInput = ({ control, name, label, error }: BegrunnelseProps): ReactElement => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={''}
      rules={{
        required: texts.begrunnelseRequired,
        maxLength: { value: 300, message: texts.begrunnelseMaxLength },
      }}
      render={({ field }) => (
        <Textarea
          id={name}
          {...field}
          label={label}
          description={texts.begrunnelseDescription}
          maxLength={300}
          feil={error}
        />
      )}
    />
  );
};

interface RadioProps {
  radio: UseFormRegisterReturn;
  label: string;
  value: string;
}

const RadioValg = ({ radio, label, value }: RadioProps): ReactElement => {
  return (
    <Radio
      label={label}
      name={radio.name}
      value={value}
      radioRef={radio.ref}
      onChange={radio.onChange}
      onBlur={radio.onBlur}
    />
  );
};

interface AdvarselProps {
  children: string;
}

const Advarsel = ({ children }: AdvarselProps): ReactElement => {
  return (
    <AlertStripeAdvarsel>
      <Tekstomrade>{children}</Tekstomrade>
    </AlertStripeAdvarsel>
  );
};

interface Props {
  brevUuid: string;
}

const GiSvarPaInnkallelse = ({ brevUuid }: Props): ReactElement => {
  const svarPaInnkallelse = useSvarPaInnkallelse(brevUuid);
  const { register, watch, formState, handleSubmit, getValues, control, clearErrors } = useForm();
  const { errors } = formState;
  const watchSvar = watch(fields.SVAR, false);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === fields.SVAR) {
        clearErrors();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, clearErrors]);

  const sendSvar = (): void => {
    const selectedSvar = getValues(fields.SVAR);
    const svar: SvarRespons = {
      svarType: selectedSvar,
      ...begrunnelse(selectedSvar),
    };
    svarPaInnkallelse.mutate(svar);
  };

  const begrunnelse = (selectedSvar: SvarType): { svarTekst: string } | undefined => {
    switch (selectedSvar) {
      case 'NYTT_TID_STED':
        return { svarTekst: getValues(fields.BEGRUNNELSE_ENDRING) };
      case 'KOMMER_IKKE':
        return { svarTekst: getValues(fields.BEGRUNNELSE_AVLYSNING) };
    }
    return undefined;
  };

  const radio = register(fields.SVAR, { required: texts.svarRequired });

  const feil = mapErrors(errors);

  return (
    <SvarStyled>
      <Systemtittel>{texts.title}</Systemtittel>
      <Tekstomrade>{texts.infoRequired}</Tekstomrade>
      <FormStyled onSubmit={handleSubmit(sendSvar)}>
        <RadioGruppe legend={texts.svarLegend} feil={errors.svar?.message}>
          <RadioValg radio={radio} label={texts.svarKommer} value={'KOMMER'} />
          <RadioValg radio={radio} label={texts.svarEndring} value={'NYTT_TID_STED'} />
          <RadioValg radio={radio} label={texts.svarAvlysning} value={'KOMMER_IKKE'} />
        </RadioGruppe>

        {watchSvar == 'NYTT_TID_STED' && (
          <>
            <Advarsel>{texts.infoEndring}</Advarsel>
            <BegrunnelseInput
              control={control}
              name={fields.BEGRUNNELSE_ENDRING}
              error={errors.begrunnelseEndring?.message}
              label={texts.begrunnelseEndringLabel}
            />
          </>
        )}

        {watchSvar == 'KOMMER_IKKE' && (
          <>
            <Advarsel>{texts.infoAvlysning}</Advarsel>
            <BegrunnelseInput
              control={control}
              name={fields.BEGRUNNELSE_AVLYSNING}
              error={errors.begrunnelseAvlysning?.message}
              label={texts.begrunnelseAvlysningLabel}
            />
          </>
        )}

        {!!feil.length && <Feiloppsummering tittel={texts.feiloppsummeringTittel} feil={feil} />}

        {svarPaInnkallelse.isError && <AlertStripeFeil>{texts.errorMessage}</AlertStripeFeil>}

        <KnappStyled
          disabled={svarPaInnkallelse.isLoading}
          spinner={svarPaInnkallelse.isLoading}
          onClick={() => trackOnClick(eventNames.sendSvarPaInnkallelse, { svarAlternativ: watchSvar })}
        >
          Send svar
        </KnappStyled>
      </FormStyled>
    </SvarStyled>
  );
};

export default GiSvarPaInnkallelse;
