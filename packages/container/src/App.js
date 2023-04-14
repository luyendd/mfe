import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Header from './components/Header';
import Progress from './components/Progress';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'ctn',
});

const history = createBrowserHistory();

export default () => {
  const [isSignIn, setIsSignIn] = useState(false);

  useEffect(() => {
    if (isSignIn) {
      history.push('/dashboard');
    }
  }, [isSignIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header signedIn={isSignIn} onSignOut={() => setIsSignIn(false)} />
        <Switch>
          <Suspense fallback={<Progress />}>
            <Route path='/auth'>
              <AuthLazy onSignIn={() => setIsSignIn(true)} />
            </Route>
            <Route path='/dashboard'>
              {!isSignIn && <Redirect to='/' />}
              <DashboardLazy />
            </Route>
            <Route path='/' component={MarketingLazy} />
          </Suspense>
        </Switch>
      </StylesProvider>
    </Router>
  );
};
