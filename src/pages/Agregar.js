import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
import '../styles/style.css';

const cookies = new Cookies();

class Agregar extends Component 
{
    componentDidMount()
    {
        if(!cookies.get('IdSession'))
        {
            window.location.href='./';
        }
        else
        {
            document.getElementById("textbox-codigo").focus();
        }
    }

    render() 
    {
        return (
            <div>
                <nav className="nav-agregar">
                    <label>Puesto: 10</label><br/>
                    <label>Movimiento: Tobias Longstaff</label>
                </nav>
                <div className="container-pallet">
                    <label className="text-pallets">Nº Pallet: 45</label>
                    <div className="container-info-pallets">
                        <div className="container-texto">
                            <label className="text-codigo">Codigo</label>
                        </div>
                        <input id="textbox-codigo" className="textbox-agregar" type="text"/>
                        <div className="container-texto">
                            <label className="text-pallets">LENGUA S/EPITELIO</label>                            
                        </div>
                        <i className="box-pallets fas fa-box-open"></i><br/>
                        <label className="text-n-pallets">4</label>                        
                    </div>
                </div>
                <div className="container-btn">
                    <Link to="/menu">
                        <button className="btn-op" type="button">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                    </Link>
                    <button className="btn-op" type="button"><i className="fas fa-box"></i></button>
                </div>
            </div>
        );
    }
}

export default Agregar;