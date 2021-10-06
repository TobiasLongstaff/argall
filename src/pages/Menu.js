import React, { Component } from 'react';
import '../styles/style.css';
import Swal from 'sweetalert2'
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

    cerrar_sesion(e)
    {

        Swal.fire(
        {
            title: '¿Cerrar sesion?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Cerrar sesion'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                cookies.remove('IdSession', {path: '/'});
                window.location.href='./';        
            }
        })
    }
    
    render()
    {
        return(
            <div>
                <nav className="nav-menu">
                    <button className="btn-cerrar_sesion" onClick={()=>this.cerrar_sesion()}><i className="btn-cerrar fas fa-times"></i></button>
                    <div className="container-menu-titulo">
                        <label className="titulo">Menu</label> 
                    </div>
                </nav>
                <div className="container-menu">
                    <Link to="/agregar">
                        <button className="btn-menu">
                            <i className="iconos fas fa-pallet"></i><br/>
                            <label className="titulo-btn">Agregar</label> 
                        </button>
                    </Link>
                    <Link to="/abrir-pallet">
                        <button className="btn-menu">
                            <i className="iconos fas fa-boxes"></i><br/>
                            <label className="titulo-btn">Ver Pallets</label>
                        </button>
                    </Link>
                    <Link to="/camara">
                        <button className="btn-menu">
                            <i className="iconos fas fa-dolly"></i><br/>
                            <label className="titulo-btn">Asignar Camara</label>
                        </button>
                    </Link>
                    <Link to="/eliminar">
                        <button className="btn-menu"> 
                            <i className="iconos fas fa-trash"></i><br/>
                            <label className="titulo-btn">Eliminar</label>
                        </button>
                    </Link>
                    <Link to="/menu"><button className="btn-menu">
                    </button></Link>
                    <Link to="/menu"><button className="btn-menu">
                    </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Menu;