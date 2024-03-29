import chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Side from '../../js/sider/Side';
import Feilmelding from '../../js/components/Feilmelding';
import Brodsmuler from '../../js/components/Brodsmuler';
import TimeoutBox from '../../js/timeout/TimeoutBox';

import DocumentTitle from 'react-document-title';

chai.use(chaiEnzyme());
const expect = chai.expect;
describe('Side', () => {
  let komponent;

  beforeEach(() => {
    komponent = shallow(<Side tittel="tittel" />);
  });

  it('Skal vise en DocumentTitle', () => {
    expect(komponent.find(DocumentTitle)).to.have.length(1);
    expect(komponent.find(DocumentTitle).props().title).to.be.equal('tittel - www.nav.no');
  });

  it('Skal vise en child', () => {
    komponent = shallow(
      <Side tittel="tittel">
        <Feilmelding />
      </Side>
    );
    expect(komponent.find(Feilmelding)).to.have.length(1);
  });

  it('Skal vise en Brodsmuler', () => {
    expect(komponent.find(Brodsmuler)).to.have.length(1);
  });

  it('Skal rendre TimeoutBox', () => {
    expect(komponent.contains(<TimeoutBox />)).to.equal(true);
  });
});
