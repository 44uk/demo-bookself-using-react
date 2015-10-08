import Connect  from 'ncmb';
import React    from 'react';
import ReactDOM from 'react-dom';

import config from './config/app';
import App    from './components/app';

global.config = config;

var conn = new Connect(config.APP_KEY, config.CLI_KEY);
var storeItem   = conn.DataStore('items');
var storeReview = conn.DataStore('reviews');


document.addEventListener('DOMContentLoaded', (ev) => {
  ReactDOM.render(
    <App
      storeItem={storeItem}
      storeReview={storeReview}
    />,
    document.getElementById('app')
  );
});
