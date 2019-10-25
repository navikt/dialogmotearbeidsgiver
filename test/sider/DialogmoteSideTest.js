import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { DialogmoteSideComponent, mapStateToProps } from '../../js/sider/DialogmoteSide';
import AppSpinner from '../../js/components/AppSpinner';
import Feilmelding from '../../js/components/Feilmelding';
import Svarside from '../../js/components/dialogmoter/dialogmoteplanlegger/Svarside';
import { konverterTid } from '../../js/utils/moteplanleggerUtils';
import { moter } from '../mock/mockMote';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('DialogmoteContainer', () => {
    const sykmeldt1 = {
        navn: 'test testersen',
        fnr: '12345678910',
        orgnr: '81549300',
        koblingId: 123,
    };
    const sykmeldt2 = {
        navn: 'Tore Tang',
        fnr: '58202293302',
        orgnr: '12304829',
        koblingId: 456,
    };

    describe('mapStateToProps', () => {
        let state;
        let ownProps;

        beforeEach(() => {
            state = {
                svar: {

                },
                ledetekster: {
                    data: {
                        'min.tekst': 'Dette er en test',
                    },
                },
                moter: {
                    data: [{
                        navn: 'Are Arbeidsgiver',
                        fnr: '12345678910',
                    }],
                },
                sykmeldte: {
                    data: [sykmeldt1, sykmeldt2],
                },
                motebehov: {
                    data: [],
                },
            };
            ownProps = {
                params: {
                    koblingId: '123',
                },
            };
        });

        it('Skal returnere møte hvis det finnes en gyldig koblingId', () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.mote).to.deep.equal({
                navn: 'Are Arbeidsgiver',
                fnr: '12345678910',
            });
        });

        it('Skal ikke returnere møte hvis det ikke finnes en gyldig koblingId', () => {
            ownProps.params.koblingId = 'abc';
            const res = mapStateToProps(state, ownProps);
            expect(res.mote).to.equal(undefined);
        });

        it('Skal returnere sender === true dersom det sendes svar', () => {
            state.svar.sender = true;
            const res = mapStateToProps(state, ownProps);
            expect(res.sender).to.equal(true);
        });

        it('Skal returnere sender === false dersom det ikke sendes svar', () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.sender).to.equal(false);
        });

        it('Skal returnere sendingFeilet === true dersom sending ikke har feilet', () => {
            state.svar.sendingFeilet = true;
            const res = mapStateToProps(state, ownProps);
            expect(res.sendingFeilet).to.equal(true);
        });

        it('Skal returnere sendingFeilet === false dersom sending har feilet', () => {
            const res = mapStateToProps(state, ownProps);
            expect(res.sendingFeilet).to.equal(false);
        });
    });

    describe('DialogmoteSideComponent', () => {
        const mote = konverterTid(moter[0]);
        let clock;
        let hentMotebehov;

        beforeEach(() => {
            clock = sinon.useFakeTimers(1485524800000); // in a distant future in a galaxy far, far away
            hentMotebehov = sinon.spy();
        });

        afterEach(() => {
            clock.restore();
        });

        it('Skal vise Svarside', () => {
            const component = shallow(<DialogmoteSideComponent hentMotebehov={hentMotebehov} mote={mote} sykmeldt={sykmeldt1} />);
            expect(component.find(Svarside)).to.have.length(1);
            expect(component.find(AppSpinner)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(0);
        });

        it('Skal sende props videre til Svarside', () => {
            const component = shallow(<DialogmoteSideComponent hentMotebehov={hentMotebehov} mote={mote} bananprop="bananprop" sykmeldt={sykmeldt1} />);
            expect(component.find(Svarside).prop('bananprop')).to.equal('bananprop');
        });

        it('Skal sende riktig deltakertype videre til Svarside', () => {
            const component = shallow(<DialogmoteSideComponent hentMotebehov={hentMotebehov} mote={mote} sykmeldt={sykmeldt1} />);
            expect(component.find(Svarside).prop('deltakertype')).to.equal('arbeidsgiver');
        });

        it('viser spinner om det mangler data', () => {
            const component = shallow(<DialogmoteSideComponent hentMotebehov={hentMotebehov} mote={mote} henter sykmeldt={sykmeldt1} />);
            expect(component.find(AppSpinner)).to.have.length(1);
            expect(component.find(Feilmelding)).to.have.length(0);
        });

        it('viser feilmelding om et kall har feilet', () => {
            const component = shallow(<DialogmoteSideComponent hentMotebehov={hentMotebehov} mote={mote} hentingFeilet sykmeldt={sykmeldt1} />);
            expect(component.find(AppSpinner)).to.have.length(0);
            expect(component.find(Feilmelding)).to.have.length(1);
        });
    });
});
