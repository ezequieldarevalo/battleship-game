import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
