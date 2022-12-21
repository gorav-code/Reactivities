import React from 'react';
import './App.css';
 
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'; 
import { observer } from 'mobx-react-lite'; 
import { Outlet, Route, useLocation } from 'react-router-dom'; 
import HomePage from '../features/home/homepage';

function App() {
  const location = useLocation();

  return (    
    //empty brackets <> means a root element
    <>    
    {location.pathname === '/' ? <HomePage/> : (
      <>
        <NavBar/>
        <Container style={{ marginTop: '7em' }}>
          <Outlet/> 
        </Container>
      </>
    )} 
    </>
  );
}

//export default App;

export default observer(App);
