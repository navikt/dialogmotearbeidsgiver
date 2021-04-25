import { expect } from 'chai';
import * as actions from '../../js/actions/moter_actions';

describe('moter_actions', () => {
  describe('hentmote', () => {
    it('Har en hentMote()-funksjon som returnerer riktig action', () => {
      const res = actions.hentMoter();
      expect(res).to.deep.equal({
        type: actions.HENT_MOTER_FORESPURT,
      });
    });

    it('Har en moteHentet()-funksjon som returnerer riktig action', () => {
      const res = actions.moterHentet({ data: 'data' });
      expect(res).to.deep.equal({
        type: actions.MOTER_HENTET,
        data: {
          data: 'data',
        },
      });
    });

    it('Har en henterMote()-funksjon som returnerer riktig action', () => {
      const res = actions.henterMoter();
      expect(res).to.deep.equal({
        type: actions.HENTER_MOTER,
      });
    });

    it('Har en hentMoteFeilet()-funksjon som returnerer riktig action', () => {
      const res = actions.hentMoterFeilet();
      expect(res).to.deep.equal({
        type: actions.HENT_MOTER_FEILET,
      });
    });
  });

  describe('Svar_actions', () => {
    it('Har en sendSvar()-funksjon som returnerer riktig action', () => {
      expect(actions.sendSvar('olsen', 'Bruker', { test: 'OK' })).to.deep.equal({
        type: actions.SEND_SVAR_FORESPURT,
        moteUuid: 'olsen',
        data: {
          test: 'OK',
        },
        deltakertype: 'Bruker',
      });
    });

    it('Har en svarSendt()-funksjon som returnerer riktig action', () => {
      expect(actions.svarSendt([1, 2], 'Bruker', 'min-mote-uuid')).to.deep.equal({
        type: actions.SVAR_SENDT,
        data: [1, 2],
        deltakertype: 'Bruker',
        moteUuid: 'min-mote-uuid',
      });
    });
  });
});
