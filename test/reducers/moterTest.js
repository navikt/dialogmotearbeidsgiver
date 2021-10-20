import deepFreeze from 'deep-freeze';
import { expect } from 'chai';
import sinon from 'sinon';
import { konverterTid } from '../../js/utils/moteplanleggerUtils';
import * as actions from '../../js/actions/moter_actions';
import moter from '../../js/reducers/moter';
import * as mockdata from '../mock/mockMote';

describe('moter', () => {
  // eslint-disable-next-line no-unused-vars
  let clock;
  beforeEach(() => {
    clock = sinon.useFakeTimers(1484524800000); // 16. januar 2017
  });

  afterEach(() => {
    clock.restore();
  });

  describe('henter', () => {
    let initialState = deepFreeze({
      data: [],
      henter: false,
      hentingFeilet: false,
      hentingForsokt: false,
    });

    it('håndterer MOTER_HENTET', () => {
      const action = actions.moterHentet(mockdata.moter);
      const nextState = moter(initialState, action);

      expect(nextState).to.deep.equal({
        data: mockdata.moter.map(konverterTid),
        henter: false,
        hentingFeilet: false,
        hentet: true,
        hentingForsokt: true,
      });
    });

    it('håndterer HENTER_MOTER', () => {
      const action = actions.henterMoter();
      const nextState = moter(initialState, action);
      expect(nextState).to.deep.equal({
        data: [],
        henter: true,
        hentingFeilet: false,
        hentet: false,
        hentingForsokt: false,
      });
    });

    it('håndterer HENT_MOTER_FEILET', () => {
      initialState = deepFreeze({
        data: [],
        henter: false,
        hentingFeilet: false,
        hentet: true,
        hentingForsokt: false,
      });

      const action = actions.hentMoterFeilet();
      const nextState = moter(initialState, action);
      expect(nextState).to.deep.equal({
        data: [],
        henter: false,
        hentingFeilet: true,
        hentet: true,
        hentingForsokt: true,
      });
    });

    it('Skal returnere riktig state ved svarSendt()', () => {
      const state = {
        data: [
          {
            moteUuid: 'abc',
            deltakere: [
              {
                type: 'Bruker',
                svar: [
                  {
                    id: 17,
                    valgt: false,
                  },
                  {
                    id: 18,
                    valgt: false,
                  },
                ],
              },
              {
                type: 'arbeidsgiver',
                svar: [
                  {
                    id: 17,
                    valgt: false,
                  },
                  {
                    id: 18,
                    valgt: false,
                  },
                ],
              },
            ],
          },
        ],
      };
      const action = actions.svarSendt([17], 'Bruker', 'abc');
      const res = moter(deepFreeze(state), action);
      expect(res).to.deep.equal({
        data: [
          {
            moteUuid: 'abc',
            deltakere: [
              {
                type: 'Bruker',
                svar: [
                  {
                    id: 17,
                    valgt: true,
                  },
                  {
                    id: 18,
                    valgt: false,
                  },
                ],
                svartidspunkt: new Date('2017-01-16T00:00:00.000Z'),
              },
              {
                type: 'arbeidsgiver',
                svar: [
                  {
                    id: 17,
                    valgt: false,
                  },
                  {
                    id: 18,
                    valgt: false,
                  },
                ],
              },
            ],
          },
        ],
      });
    });
  });
});
