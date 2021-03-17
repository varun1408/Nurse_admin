import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './approuter';


// boostrap
import "bootstrap/dist/css/bootstrap.min.css";

//fontawesome
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

import './assets/css/all.css';
import './assets/css/all.min.css';
import './assets/css/fontawesome.min.css';
import './assets/css/app.css';
import 'font-awesome/css/font-awesome.min.css';

//style
import './assets/css/style.css';

import './assets/css/feathericon.min.css';
import './assets/js/script.js';

ReactDOM.render(<React.StrictMode><AppRouter/></React.StrictMode>, document.getElementById('root'));
