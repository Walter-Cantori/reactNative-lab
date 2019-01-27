import React from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';

import './config/ReactotronConfig';
import store from './store';


const app = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default app;
