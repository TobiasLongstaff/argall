import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import Agregar from '../pages/Agregar';
import Eliminar from '../pages/Eliminar';
import AbrirPallets from '../pages/AbrirPallets';

function Routes() {
  
  return (
    <BrowserRouter>
        <Route exact path="/" component={Login}/>
        <Route exact path="/menu" component={Menu}/>
        <Route exact path="/agregar" component={Agregar}/>
        <Route exact path="/eliminar" component={Eliminar}/>
        <Route exact path="/abrir-pallet" component={AbrirPallets}/>
    </BrowserRouter>
  );
}

export default Routes;
