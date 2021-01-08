import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import { setupServer } from './services/mirage/server';
import store from './store/store';
import { Provider } from 'react-redux';

if(process.env.NODE_ENV === 'development') {
  setupServer();
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

