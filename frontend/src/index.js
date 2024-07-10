import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter,BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Footer from './components/footer';
import ProdContext from './Context/ProdContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
      <>
            <BrowserRouter>
                <ProdContext>
                  <App/>
                </ProdContext>
            </BrowserRouter>
         
      </>
);

reportWebVitals();
