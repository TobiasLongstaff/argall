import React, { Component } from 'react';
import '../styles/style.css';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';

const cookies = new Cookies();

class Menu extends Component
{
    componentDidMount()
    {
        if(!cookies.get('IdSession'))
        {
            window.location.href='./';
        }
    }

    cerrar_sesion=()=>
    {
        cookies.remove('IdSession', {path: '/'});
    }
    
    render()
    {
        return(
            <div>
                <nav className="nav-menu">
                    <Link to='/' onClick={()=>this.cerrar_sesion()}><i className="btn-cerrar fas fa-times"></i></Link>
                    <label className="titulo">Menu</label> 
                    <label className="titulo">Id: {cookies.get('IdSession')}</label>                   
                </nav>
                <div className="container-menu">
                    <Link to="/agregar"><button className="btn-menu">
                        <i className="iconos fas fa-pallet"></i><br/>
                        <label className="titulo-btn">Agregar</label> 
                    </button>
                    </Link>
                    <Link to="/abrir-pallet"><button className="btn-menu">
                        <i className="iconos fas fa-boxes"></i><br/>
                        <label className="titulo-btn">Ver Pallets</label>
                    </button>
                    </Link>
                    <Link to="/menu"><button className="btn-menu">
                        <i className="iconos fas fa-trash-alt"></i><br/>
                        <label className="titulo-btn">Eliminar</label>
                    </button>
                    </Link>
                    <Link to="/menu"><button className="btn-menu">
                        <i className="iconos fas fa-pallet"></i><br/>
                        <label className="titulo-btn">Agregar</label> 
                    </button>
                    </Link>
                    <Link to="/menu"><button className="btn-menu">
                        <i className="iconos fas fa-pallet"></i><br/>
                        <label className="titulo-btn">Agregar</label> 
                    </button></Link>
                    <Link to="/menu"><button className="btn-menu">
                        <i className="iconos fas fa-cog"></i><br/>
                        <label className="titulo-btn">Config.</label> 
                    </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Menu;