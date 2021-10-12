import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import MotebehovContainer from '../sider/MotebehovSide';
import Landing from '../MVP/views/landing/Landing';
import DialogmoteSide from '../sider/DialogmoteSide';
import Moteinnkallelse from '../MVP/views/moteinnkallelse/Moteinnkallelse';
import Motereferat from '../MVP/views/motereferat/Motereferat';

const AppRouter = ({ history }) => {
  return (
    <Router history={history}>
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/:narmestelederId`} component={Landing} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/:narmestelederId/behov`} component={MotebehovContainer} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/:narmestelederId/mote`} component={DialogmoteSide} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/:narmestelederId/innkallelse`} component={Moteinnkallelse} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/:narmestelederId/referat(/:date)`} component={Motereferat} />
    </Router>
  );
};

AppRouter.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default AppRouter;
