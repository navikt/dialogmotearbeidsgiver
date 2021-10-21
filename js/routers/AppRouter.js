import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MotebehovContainer from '../sider/MotebehovSide';
import Landing from '../MVP/views/landing/Landing';
import DialogmoteSide from '../sider/DialogmoteSide';
import Moteinnkallelse from '../MVP/views/moteinnkallelse/Moteinnkallelse';
import Motereferat from '../MVP/views/motereferat/Motereferat';

const AppRouter = () => {
  return (
    <Router>
      <Route exact path={`${process.env.REACT_APP_CONTEXT_ROOT}/:narmestelederId`} component={Landing} />
      <Route
        exact
        path={`${process.env.REACT_APP_CONTEXT_ROOT}/:narmestelederId/behov`}
        component={MotebehovContainer}
      />
      <Route exact path={`${process.env.REACT_APP_CONTEXT_ROOT}/:narmestelederId/mote`} component={DialogmoteSide} />
      <Route
        exact
        path={`${process.env.REACT_APP_CONTEXT_ROOT}/:narmestelederId/innkallelse`}
        component={Moteinnkallelse}
      />
      <Route
        exact
        path={`${process.env.REACT_APP_CONTEXT_ROOT}/:narmestelederId/referat/:date`}
        component={Motereferat}
      />
      <Route exact path={`${process.env.REACT_APP_CONTEXT_ROOT}/:narmestelederId/referat`} component={Motereferat} />
    </Router>
  );
};

export default AppRouter;
