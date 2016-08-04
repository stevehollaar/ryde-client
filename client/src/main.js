import React from 'react';
import { render } from 'react-dom';
import App from 'App';

const appMountNode = document.getElementById('app-mount');
render(
  <App />,
  appMountNode
);
