import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/lightbox_actions';
import Lightbox from '../components/Lightbox';
import history from '../history';

let unlisten;

class LightboxContainer extends Component {
  componentDidUpdate() {
    if (this.props.visBool) {
      unlisten = history.listenBefore(this.props.lukkLightbox);
    } else if (unlisten) {
      unlisten(this.props.lukkLightbox);
    }
  }

  render() {
    const { visBool, children, lukkLightbox } = this.props;
    if (visBool) {
      return <Lightbox lukkLightbox={lukkLightbox}>{children}</Lightbox>;
    }
    return null;
  }
}

LightboxContainer.propTypes = {
  visBool: PropTypes.bool,
  children: PropTypes.element,
  lukkLightbox: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    visBool: state.lightbox.vis === true,
    children: state.lightbox.children,
  };
};

const Container = connect(mapStateToProps, { lukkLightbox: actions.lukkLightbox })(LightboxContainer);

export default Container;
