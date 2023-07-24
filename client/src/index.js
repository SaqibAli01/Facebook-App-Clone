import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';


import { Provider } from 'react-redux';
import store from './ReduxToolKit/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>


      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>

    </Provider>
  </React.StrictMode>
);

reportWebVitals();
