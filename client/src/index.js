import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Contextprovider from "./NewCom/context/Contextprovider";



ReactDOM.render(
  <Contextprovider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Contextprovider>
  ,
  document.getElementById('root')
);

