import { expect } from 'chai';
import * as actions from '../../js/actions/motebehov_actions';

describe('motebehov_actions', () => {
  let sykmeldt;
  let fnr;
  let virksomhetsnummer;

  beforeEach(() => {
    sykmeldt = {
      fnr: '1234',
      orgnummer: '1234',
    };
    fnr = sykmeldt.fnr;
    virksomhetsnummer = sykmeldt.orgnummer;
  });

  it('Skal ha en hentMotebehov()-funksjon som returnerer riktig action', () => {
    expect(actions.hentMotebehov(sykmeldt)).to.deep.equal({
      type: actions.HENT_MOTEBEHOV_FORESPURT,
      sykmeldt,
    });
  });

  it('Skal ha en hentMotebehovHenter()-funksjon som returnerer riktig action', () => {
    expect(actions.hentMotebehovHenter(fnr, virksomhetsnummer)).to.deep.equal({
      type: actions.HENT_MOTEBEHOV_HENTER,
      fnr,
      virksomhetsnummer,
    });
  });

  it('har en hentMotebehovHentet()-funksjon som returnerer riktig action', () => {
    const data = {};
    expect(actions.hentMotebehovHentet(data, fnr, virksomhetsnummer)).to.deep.equal({
      type: actions.HENT_MOTEBEHOV_HENTET,
      data,
      fnr,
      virksomhetsnummer,
    });
  });

  it('Skal ha en hentMotebehovFeilet()-funksjon som returnerer riktig action', () => {
    expect(actions.hentMotebehovFeilet(fnr, virksomhetsnummer)).to.deep.equal({
      type: actions.HENT_MOTEBEHOV_FEILET,
      fnr,
      virksomhetsnummer,
    });
  });

  it('Skal ha en hentMotebehovForbudt()-funksjon som returnerer riktig action', () => {
    expect(actions.hentMotebehovForbudt(fnr, virksomhetsnummer)).to.deep.equal({
      type: actions.HENT_MOTEBEHOV_FORBUDT,
      fnr,
      virksomhetsnummer,
    });
  });

  it('Skal ha en svarMotebehov()-funksjon som returnerer riktig action', () => {
    const svar = {};
    expect(actions.svarMotebehov(svar, sykmeldt)).to.deep.equal({
      type: actions.SVAR_MOTEBEHOV_FORESPURT,
      svar,
      sykmeldt,
    });
  });

  it('Skal ha en svarMotebehovSender()-funksjon som returnerer riktig action', () => {
    expect(actions.svarMotebehovSender(fnr, virksomhetsnummer)).to.deep.equal({
      type: actions.SVAR_MOTEBEHOV_SENDER,
      fnr,
      virksomhetsnummer,
    });
  });

  it('har en svarMotebehovSendt()-funksjon som returnerer riktig action', () => {
    const svar = {};
    expect(actions.svarMotebehovSendt(svar, fnr, virksomhetsnummer)).to.deep.equal({
      type: actions.SVAR_MOTEBEHOV_SENDT,
      svar,
      fnr,
      virksomhetsnummer,
    });
  });

  it('Skal ha en svarMotebehovFeilet()-funksjon som returnerer riktig action', () => {
    expect(actions.svarMotebehovFeilet(fnr, virksomhetsnummer)).to.deep.equal({
      type: actions.SVAR_MOTEBEHOV_FEILET,
      fnr,
      virksomhetsnummer,
    });
  });
});
