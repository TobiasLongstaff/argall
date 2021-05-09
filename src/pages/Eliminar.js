import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
import '../styles/style.css';

const cookies = new Cookies();

class Eliminar extends Component
{
    componentDidMount()
    {
        if(!cookies.get('IdSession'))
        {
            window.location.href='./';
        }
        else
        {
            document.getElementById("textbox-codigo-eliminar").focus();
        }
    }

    render() 
    {
        return (
            <div>
                <nav className="nav-eliminar">
                    <label>Puesto: 10</label><br/>
                    <label>Movimiento: Tobias Longstaff</label>
                </nav>
                <div className="container-pallet">
                    <label className="text-pallets-eliminar">Nº Pallet: 45</label>
                    <div className="container-info-pallets">
                        <div className="container-texto">
                            <label className="text-codigo-eliminar">Codigo</label>
                        </div>
                        <input id="textbox-codigo-eliminar" className="textbox-eliminar" type="text"/>
                        <div className="container-texto">
                            <label className="text-pallets-eliminar">LENGUA S/EPITELIO</label>                            
                        </div>
                        <div className="container-text-eliminar">
                            <label className="text-elimianar">Eliminar</label>     
                        </div>                
                    </div>
                </div>
                <div className="container-btn">
                    <Link to="/menu">
                        <button className="btn-op-eliminar" type="button">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

}

export default Eliminar;