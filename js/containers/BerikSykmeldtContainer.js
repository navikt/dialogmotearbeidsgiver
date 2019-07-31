import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppSpinner from '../components/AppSpinner';
import { hentSykmeldteBerikelser as hentSykmeldteBerikelserAction } from '../actions/sykmeldte_actions';
import { beregnSkalHenteSykmeldtBerikelse } from '../utils/sykmeldtUtils';

export class Container extends Component {
    componentDidMount() {
        this.hentBerikelser();
    }

    componentDidUpdate() {
        this.hentBerikelser();
    }

    hentBerikelser() {
        const {
            skalHenteBerikelse,
            hentSykmeldteBerikelser,
            koblingId,
        } = this.props;

        if (skalHenteBerikelse) {
            hentSykmeldteBerikelser([koblingId]);
        }
    }

    render() {
        const { henterBerikelser, children } = this.props;
        return henterBerikelser ? <AppSpinner /> : children;
    }
}

Container.propTypes = {
    skalHenteBerikelse: PropTypes.bool,
    henterBerikelser: PropTypes.bool,
    hentSykmeldteBerikelser: PropTypes.func,
    koblingId: PropTypes.number,
    children: PropTypes.node,
};

export const mapStateToProps = (state, ownProps) => {
    const sykmeldt = state.sykmeldte.data.find((s) => {
        return s.koblingId === ownProps.koblingId;
    });
    const skalHenteBerikelse = beregnSkalHenteSykmeldtBerikelse(sykmeldt, state);

    return {
        skalHenteBerikelse,
        henterBerikelser: state.sykmeldte.henterBerikelser.indexOf(ownProps.koblingId) > -1,
    };
};

const BerikSykmeldtContainer = connect(mapStateToProps, { hentSykmeldteBerikelser: hentSykmeldteBerikelserAction })(Container);

export default BerikSykmeldtContainer;
