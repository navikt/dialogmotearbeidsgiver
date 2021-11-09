import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AvbruttMote from '../../../../js/components/dialogmoter/dialogmoteplanlegger/AvbruttMote';
import { moteAvbrutt } from '../../../mock/mockMote';
import { BRUKER } from '../../../../js/enums/moteplanleggerDeltakerTyper';

describe('AvbruttMote', () => {
  it('Skal vise alternativene', () => {
    const kvittering = shallow(<AvbruttMote mote={moteAvbrutt} deltakertype={BRUKER} />);
    expect(kvittering.find('.avbrutt__mote__svar')).to.have.length(2);
  });
});
