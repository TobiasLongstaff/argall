import React from 'react'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const Nav = ({backgroundColor, height}) =>
(
    <nav className="nav-agregar" style={
        {
            backgroundColor:backgroundColor,
            height:height
        }}>
        <label>Puesto: {cookies.get('Puesto')}</label><br/>
        <label>Movimiento: {cookies.get('User')}</label>
    </nav>
)

export default Nav