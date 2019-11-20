import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Kvittering from '../../../../js/components/dialogmoter/dialogmoteplanlegger/Kvittering';
import BesvarteTidspunkter from '../../../../js/components/dialogmoter/dialogmoteplanlegger/BesvarteTidspunkter';
import Motested from '../../../../js/components/dialogmoter/dialogmoteplanlegger/Motested';

describe('Kvittering', () => {
    let mote;

    beforeEach(() => {
        window.APP_SETTINGS = {
            APP_ROOT: '/test',
        };
        mote = {
            alternativer: [{
                id: 273,
                tid: new Date('2017-09-09T07:09:00Z'),
                created: new Date('2017-09-09T07:09:00Z'),
                valgt: false,
                sted: 'Oslo',
            }, {
                id: 272,
                tid: new Date('2017-09-08T07:09:00Z'),
                created: new Date('2017-09-09T07:09:00Z'),
                valgt: false,
                sted: 'Oslo',
            }],
            deltakere: [
                {
                    navn: 'Sygve Sykmeldt',
                    type: 'Bruker',
                    svar: [{
                        id: 273,
                        tid: new Date('2017-09-09T07:09:00Z'),
                        created: new Date('2017-09-09T07:09:00Z'),
                        valgt: false,
                        sted: 'Oslo',
                    }, {
                        id: 272,
                        tid: new Date('2017-09-08T07:09:00Z'),
                        created: new Date('2017-09-09T07:09:00Z'),
                        valgt: false,
                        sted: 'Oslo',
                    }],
                    svartidspunkt: null,
                },
                {
                    navn: 'Are Arbeidsgiver',
                    type: 'arbeidsgiver',
                    svar: [
                        {
                            id: 273,
                            tid: new Date('2017-09-09T07:09:00Z'),
                            created: new Date('2017-09-09T07:09:00Z'),
                            valgt: false,
                            sted: 'Oslo',
                        },
                        {
                            id: 272,
                            tid: new Date('2017-09-08T07:09:00Z'),
                            created: new Date('2017-09-09T07:09:00Z'),
                            valgt: false,
                            sted: 'Oslo',
                        },
                    ],
                    svartidspunkt: null,
                },
            ],
        };
    });

    it('Skal vise BesvarteTidspunkter', () => {
        const kvittering = shallow(<Kvittering mote={mote} />);
        expect(kvittering.find(BesvarteTidspunkter)).to.have.length(1);
        expect(kvittering.find(BesvarteTidspunkter).prop('mote')).to.deep.equal(mote);
    });

    it('Skal vise en tittel', () => {
        const kvittering = shallow(<Kvittering mote={mote} />);
        expect(kvittering.find('h1')).to.have.length(1);
    });


    it('Skal vise sted for møtet dersom det er valgt et alternativ', () => {
        mote = Object.assign({}, mote, {
            deltakere: [{
                navn: 'Are Arbeidsgiver',
                type: 'arbeidsgiver',
                svar: [{
                    id: 273,
                    tid: new Date('2017-09-09T07:09:00Z'),
                    created: new Date('2017-09-09T07:09:00Z'),
                    valgt: true,
                    sted: 'Oslo',
                }, {
                    id: 272,
                    tid: new Date('2017-09-08T07:09:00Z'),
                    created: new Date('2017-09-09T07:09:00Z'),
                    valgt: false,
                    sted: 'Oslo',
                }],
                svartidspunkt: new Date('2018-09-09T07:09:00Z'),
            }],
        });

        const kvittering = shallow(<Kvittering
            mote={mote}
        />);
        const m = kvittering.find(Motested);
        expect(m.prop('sted')).to.equal('Oslo');
    });
});
