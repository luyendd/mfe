import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import Header from './components/Header';
import Progress from './components/Progress';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'ctn',
});

export default () => {
  const [isSignIn, setIsSignIn] = useState(false);
  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header signedIn={isSignIn} onSignOut={() => setIsSignIn(false)} />
        <Switch>
          <Suspense fallback={<Progress />}>
            <Route path='/auth'>
              <AuthLazy onSignIn={() => setIsSignIn(true)} />
            </Route>
            <Route path='/' component={MarketingLazy} />
          </Suspense>
        </Switch>
      </StylesProvider>
    </BrowserRouter>
  );
};
