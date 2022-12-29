import React from 'react';
import ReactDOM from 'react-dom/client';
import './layout/styles.css';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* Here we are registering our Store Context to use in our app globally and adding <App/> as child */}
    <StoreContext.Provider value={store}> 
       {/* <BrowserRouter>
        <App />
       </BrowserRouter>        */}
       <RouterProvider router={router}/>
    </StoreContext.Provider> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

