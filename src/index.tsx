import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { setupServer } from './services/mirage/server';
import { Provider } from 'react-redux';
import store from './App/store';
import { BrowserRouter as Router } from 'react-router-dom';

if (process.env.NODE_ENV === 'development') {
  setupServer();
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);