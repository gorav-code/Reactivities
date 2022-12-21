import React from 'react';
import './App.css';
 
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'; 
import { observer } from 'mobx-react-lite'; 
import { Outlet, Route } from 'react-router-dom'; 

function App() {
  return (
    //empty brackets <> means a root element
    <>
      <NavBar/>
      <Container style={{ marginTop: '7em' }}>
        <Outlet/> 
      </Container>
    </>
  );
}

//export default App;

export default observer(App);
