export const HENT_MOTER_FEILET = 'HENT_MOTER_FEILET';
export const MOTER_HENTET = 'MOTER_HENTET';
export const HENTER_MOTER = 'HENTER_MOTER';
export const HENT_MOTER_FORESPURT = 'HENT_MOTER_FORESPURT';

export const SEND_SVAR_FORESPURT = 'SEND_SVAR_FORESPURT';
export const SVAR_SENDT = 'SVAR_SENDT';
export const SENDER_SVAR = 'SENDER_SVAR';
export const SEND_SVAR_FEILET = 'SEND_SVAR_FEILET';

export function henterMoter() {
  return {
    type: HENTER_MOTER,
  };
}

export function moterHentet(data = []) {
  return {
    type: MOTER_HENTET,
    data,
  };
}

export function hentMoterFeilet() {
  return {
    type: HENT_MOTER_FEILET,
  };
}

export function hentMoter() {
  return {
    type: HENT_MOTER_FORESPURT,
  };
}

export function sendSvar(moteUuid, deltakertype, data) {
  return {
    type: SEND_SVAR_FORESPURT,
    moteUuid,
    deltakertype,
    data,
  };
}

export function svarSendt(data, deltakertype, moteUuid) {
  return {
    type: SVAR_SENDT,
    data,
    deltakertype,
    moteUuid,
  };
}

export function senderSvar() {
  return {
    type: SENDER_SVAR,
  };
}

export function sendSvarFeilet() {
  return {
    type: SEND_SVAR_FEILET,
  };
}
