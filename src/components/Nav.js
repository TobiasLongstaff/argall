import React from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const Nav = ({backgroundColor}) =>
(
    <nav className="nav-agregar" style={{backgroundColor:backgroundColor}}>
        <label>Puesto: {cookies.get('Puesto')}</label><br/>
        <label>Movimiento: {cookies.get('User')}</label>
    </nav>
)

export default Nav