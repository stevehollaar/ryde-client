import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'App';

const appMountNode = document.getElementById('app-mount');
function renderApp(AppComponent) {
  render(
    <AppContainer>
      <AppComponent />
    </AppContainer>,
    appMountNode
  );
}
renderApp(App);

// For hot-reloading the application in dev.
if (module.hot) {
  console.log('module.hot');
  module.hot.accept('App', () => {
    console.log('rendering App');
    renderApp(require('App')); // eslint-disable-line global-require
  });
}
