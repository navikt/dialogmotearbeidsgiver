import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router';
import DialogmoteContainer from '../sider/DialogmoteSide';
import DialogmoterContainer from '../sider/DialogmoterContainer';
import MotebehovContainer from '../sider/MotebehovSide';

const AppRouter = ({ history }) => {
  return (
    <Router history={history}>
      <Route path="/dialogmotearbeidsgiver/:koblingId" component={DialogmoterContainer} />
      <Route path="/dialogmotearbeidsgiver/:koblingId/behov" component={MotebehovContainer} />
      <Route path="/dialogmotearbeidsgiver/:koblingId/mote" component={DialogmoteContainer} />
    </Router>
  );
};

AppRouter.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default AppRouter;
