import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import "./assets/Layout/_all.scss";
// import "./assets/helpers/_variables.scss"
import { RouterProvider } from 'react-router-dom'; 
import routes from './router/index.jsx';
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './redux/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
         <RouterProvider router={routes} /> 
    </Provider>
  </StrictMode>,
)
