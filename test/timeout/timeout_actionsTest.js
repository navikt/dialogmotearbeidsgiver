import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import * as actions from '../../js/timeout/timeout_actions';

chai.use(chaiEnzyme());
const { expect } = chai;

describe('timeout_actions', () => {
    it('Should have a forlengInnloggetSesjon action that returns a proper function', () => {
        expect(actions.forlengInnloggetSesjon()).to.deep.equal({
            type: actions.FORLENG_INNLOGGET_SESJON,
        });
    });

    it('Should have a snartUtlogget action that returns a proper function', () => {
        expect(actions.snartUtlogget()).to.deep.equal({
            type: actions.SNART_UTLOGGET,
        });
    });
});
