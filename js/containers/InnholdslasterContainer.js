import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hentSykmeldinger } from '../sykmeldinger/data/sykmeldinger_actions';
import {
    hentSykmeldte,
    hentSykmeldteBerikelser,
} from '../actions/sykmeldte_actions';
import { hentMoter } from '../actions/moter_actions';
import { tilgangFeiletSelector } from '../selectors/tilgangSelectors';

export const SYKMELDINGER = 'sykmeldinger';
export const MOTER = 'moter';

const getHentfunksjon = (reducer, actions) => {
    const reducerToHentfunksjonMap = {
        [SYKMELDINGER]: actions.hentSykmeldinger,
        [MOTER]: actions.hentMoter,
    };
    return reducerToHentfunksjonMap[reducer];
};

const dataForAlleSykmeldteHentesISammeKall = (reducer) => {
    return reducer === MOTER;
};

export class Container extends Component {
    componentWillMount() {
        const {
            skalHenteSykmeldte,
            actions,
        } = this.props;

        this.hentDataavhengigheter();

        if (skalHenteSykmeldte) {
            actions.hentSykmeldte();
        }
    }

    componentDidUpdate() {
        this.hentDataavhengigheter();
    }

    hentDataavhengigheter() {
        const {
            actions,
            dataavhengigheterSomSkalHentes,
            berikelserSomSkalHentes,
        } = this.props;

        dataavhengigheterSomSkalHentes
            .forEach((dataavhengighetSomSkalHentes) => {
                const hentfunc = getHentfunksjon(dataavhengighetSomSkalHentes.reducer, actions);
                if (dataForAlleSykmeldteHentesISammeKall(dataavhengighetSomSkalHentes.reducer)) {
                    hentfunc();
                } else {
                    dataavhengighetSomSkalHentes.koblingIder.forEach(hentfunc);
                }
            });
        if (berikelserSomSkalHentes.length > 0) {
            actions.hentSykmeldteBerikelser(berikelserSomSkalHentes);
        }
    }

    render() {
        const { henter, hentingFeilet, tilgangFeilet } = this.props;
        return this.props.render
            ? this.props.render({ henter, hentingFeilet, tilgangFeilet })
            : null;
    }
}

Container.propTypes = {
    skalHenteSykmeldte: PropTypes.bool,
    actions: PropTypes.shape({
        hentSykmeldte: PropTypes.func,
        hentSykmeldteBerikelser: PropTypes.func,
    }),
    berikelserSomSkalHentes: PropTypes.arrayOf(PropTypes.number),
    dataavhengigheterSomSkalHentes: PropTypes.arrayOf(PropTypes.shape),
    henter: PropTypes.bool,
    hentingFeilet: PropTypes.bool,
    tilgangFeilet: PropTypes.bool,
    render: PropTypes.func,
};

const avhengighetHenter = (state, reducer, koblingId) => {
    return dataForAlleSykmeldteHentesISammeKall(reducer)
        ? state[reducer].henter
        : state[reducer][`${koblingId}`] && state[reducer][`${koblingId}`].henter;
};

const avhengighetHentet = (state, reducer, koblingId) => {
    const _reducer = state[reducer][`${koblingId}`];
    return dataForAlleSykmeldteHentesISammeKall(reducer)
        ? state[reducer].hentet
        : _reducer && (_reducer.hentet || _reducer.hentet);
};

const avhengighetHentingFeilet = (state, reducer, koblingId) => {
    return dataForAlleSykmeldteHentesISammeKall(reducer)
        ? state[reducer].hentingFeilet
        : state[reducer][`${koblingId}`] && state[reducer][`${koblingId}`].hentingFeilet;
};

export function mapDispatchToProps(dispatch) {
    const actions = bindActionCreators({
        hentSykmeldinger,
        hentSykmeldte,
        hentMoter,
        hentSykmeldteBerikelser,
    }, dispatch);

    return {
        actions,
    };
}

export const mapStateToProps = (state, ownProps) => {
    const avhengigheter = ownProps.avhengigheter || [];
    const koblingIderSomStrengEllerInt = ownProps.koblingIder || [];
    const koblingIder = koblingIderSomStrengEllerInt.map((id) => {
        return parseInt(id, 10);
    });
    const skalHenteSykmeldte = !state.sykmeldte.hentet && !state.sykmeldte.henter;

    const alleDataavhengigheter = skalHenteSykmeldte
        ? []
        : avhengigheter
            .map((reducer) => {
                return {
                    reducer,
                    koblingIder,
                };
            });

    const dataavhengigheterSomSkalHentes = skalHenteSykmeldte
        ? []
        : alleDataavhengigheter
            .map((dataavhengighet) => {
                return {
                    ...dataavhengighet,
                    koblingIder: koblingIder.filter((koblingId) => {
                        const _hentet = avhengighetHentet(state, dataavhengighet.reducer, koblingId);
                        const _henter = avhengighetHenter(state, dataavhengighet.reducer, koblingId);
                        return !_hentet && !_henter;
                    }),
                };
            })
            .filter((dataavhengighet) => {
                return dataavhengighet.koblingIder.length > 0;
            });

    const henter = alleDataavhengigheter
        .filter((dataavhengighet) => {
            return dataavhengighet.koblingIder.filter((koblingId) => {
                const _hentet = avhengighetHentet(state, dataavhengighet.reducer, koblingId);
                const _henter = avhengighetHenter(state, dataavhengighet.reducer, koblingId);
                return dataForAlleSykmeldteHentesISammeKall(dataavhengighet.reducer)
                    ? !_hentet || _henter
                    : !state[dataavhengighet.reducer][`${koblingId}`] || !_hentet || _henter;
            }).length > 0;
        }).length > 0 || state.sykmeldte.henter || !state.sykmeldte.hentet;

    const hentingFeilet = alleDataavhengigheter
        .filter((dataavhengighet) => {
            return dataavhengighet.koblingIder.filter((koblingId) => {
                return avhengighetHentingFeilet(state, dataavhengighet.reducer, koblingId);
            }).length > 0;
        }).length > 0 || !!state.sykmeldte.hentingFeilet;

    const berikelserSomSkalHentes = skalHenteSykmeldte
        ? []
        : state.sykmeldte.data
            .filter((sykmeldt) => {
                return koblingIder.indexOf(sykmeldt.koblingId) > -1;
            })
            .filter((sykmeldt) => {
                return sykmeldt.navn === '' || !sykmeldt.navn;
            })
            .filter((sykmeldt) => {
                return state.sykmeldte.henterBerikelser.indexOf(sykmeldt.koblingId) === -1;
            })
            .map((sykmeldt) => {
                return sykmeldt.koblingId;
            });

    const tilgangFeilet = koblingIder.reduce((acc, cur) => {
        return acc || tilgangFeiletSelector(state, cur);
    }, false);

    return {
        skalHenteSykmeldte,
        berikelserSomSkalHentes,
        dataavhengigheterSomSkalHentes,
        henter: henter
            || state.ledetekster.henter
            || !state.ledetekster.hentet
            || (state.sykmeldte.henterBerikelser.length > 0 && !state.sykmeldte.hentingFeilet),
        hentingFeilet,
        tilgangFeilet,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
