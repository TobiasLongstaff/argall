import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
import '../styles/style.css';

const cookies = new Cookies();

class Eliminar extends Component
{
    state = 
    {
        error: null,
        isLoaded: false,
        data:[]
    }

    async componentDidMount()
    {
        if(!cookies.get('IdSession'))
        {
            window.location.href='./';
        }
        else
        {
            await this.fetchExercises();
            document.getElementById("textbox-codigo-eliminar").focus();
        }
    }

    fetchExercises = async () => 
    {
        let res = await fetch('https://localhost:44347/api/pallets')
        let data = await res.json()
        this.setState(
        {
            isLoaded: true,
            data
        })
    }

    render() 
    {
        const { isLoaded, data } = this.state;
        if (!isLoaded) 
        {
            return(
                <div>
                    <div className="conteiner-cargando">
                        <label className="text-carga">Cargando</label>
                    </div>                         
                    <div className="container-carga">     
                        <div className="carga"></div>                    
                    </div>                    
                </div>

            );
        } 
        else 
        {
            return (
                <div>
                    <nav className="nav-eliminar">
                        <label>Puesto: 10</label><br/>
                        <label>Movimiento: {cookies.get('User')}</label>
                    </nav>
                    <div className="container-pallet">
                        {data.map(datos => (
                            <label key="{data}" className="text-pallets-eliminar">
                                Nº Pallet: {datos.pallet}
                            </label>
                        ))}
                        <div className="container-info-pallets">
                            <div className="container-texto">
                                <label className="text-codigo-eliminar">Codigo</label>
                            </div>
                            <input id="textbox-codigo-eliminar" className="textbox-eliminar" type="text"/>
                            <div className="container-texto">
                                {data.map(datos => (
                                    <label key="{data}" className="text-pallets-eliminar">{datos.articulo}</label>   
                                ))}                            
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

}

export default Eliminar;