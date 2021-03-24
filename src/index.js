import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactRouter from './Routers/Router';
import {CookiesProvider} from "react-cookie";
import './index.css'

ReactDOM.render(
    <CookiesProvider>
      <Router>
        <ReactRouter/>
      </Router>
    </CookiesProvider>,
    document.getElementById('root')
);
