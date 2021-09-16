import PropTypes from 'prop-types';
import React from 'react';
import { Route, Router } from 'react-router';
import Landing from '../MVP/views/landing/Landing';
import MotebehovContainer from '../sider/MotebehovSide';

const AppRouter = ({ history }) => {
  return (
    <Router history={history}>
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/:koblingId`} component={Landing} />
      <Route path={`${process.env.REACT_APP_CONTEXT_ROOT}/:koblingId/behov`} component={MotebehovContainer} />
    </Router>
  );
};

AppRouter.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default AppRouter;
