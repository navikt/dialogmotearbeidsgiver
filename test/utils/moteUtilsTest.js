import chai from 'chai';
import { getMote } from '../../js/utils/moteUtils';

const expect = chai.expect;

describe('moteUtils', () => {
  describe('getMote', () => {
    it('getMote returnerer nyeste motet', () => {
      const intiallMoter = {
        moter: {
          data: [
            {
              moteUuid: 'abc',
              fnr: 'fnr',
              opprettetTidspunkt: '2017-03-22T07:31:39.399',
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
            {
              moteUuid: 'cba',
              fnr: 'fnr',
              opprettetTidspunkt: '2017-04-22T07:31:39.399',
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
          henter: false,
          hentingFeilet: false,
        },
      };

      const mote = getMote(intiallMoter, 'fnr');
      expect(mote.moteUuid).to.equal('cba');
    });
  });
});
