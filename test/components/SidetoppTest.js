import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Sidetopp from '../../js/components/Sidetopp';

chai.use(chaiEnzyme());
const expect = chai.expect;

describe('Sidetopp', () => {
    let komponent;

    beforeEach(() => {
        komponent = shallow(<Sidetopp tittel="Søknad om sykepenger" illustrasjon>
            <p>Test</p>
        </Sidetopp>);
    });

    it('viser header', () => {
        expect(komponent.find('header.sidetopp')).to.have.length(1);
    });

    it('viser h1', () => {
        expect(komponent.find('h1')).to.have.length(1);
    });

    it('viser tittel', () => {
        expect(komponent.contains('Søknad om sykepenger')).to.be.equal(true);
    });

    it('viser children', () => {
        expect(komponent.contains(<p>Test</p>)).to.equal(true);
    });

    it('viser div når det finns children', () => {
        expect(komponent.find('div.sidetopp__intro')).to.have.length(1);
    });
});

