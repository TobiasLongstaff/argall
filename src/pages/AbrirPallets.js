import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
import '../styles/style.css';

const cookies = new Cookies();
const url = 'https://192.168.101.3:5001/api/pallets';

class AbrirPallets extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            isLoaded: false,
            data:[],
            puesto: cookies.get('Puesto')
        }
    }

    async componentDidMount()
    {
        if(!cookies.get('IdSession'))
        {
            window.location.href='./';
        }
        else
        {
            await this.fetchExercises()
        }
    }

    fetchExercises = async () => 
    {
        let res = await fetch(url);
        let data = await res.json();

        this.setState(
        {
            isLoaded: true,
            data: data
        }, () => 
        {
            console.log(this.state.data)
            console.log(data)
            console.log('Carga...');
        });
    }

    render() 
    {
        const { isLoaded, data, puesto } = this.state;
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
                <div className="container-app">
                    <nav className="nav-abrir-pallet">
                        <label>Puesto: {cookies.get('Puesto')}</label><br/>
                        <label>Movimiento: {cookies.get('User')}</label>
                    </nav>
                    
                    <div className="container-palletes-ver-pallet">
                    {data.filter(puestos => puestos.puesto === puesto).map(datos => (
                        <a href={"agregar/"+datos.pallet} className="container-pallet-abierto">
                            <label key="{pallet}" className="text-pallets-agregar">{datos.pallet}</label>
                            <label key="{articulo}" className="text-pallets-agregar">{datos.articulo}</label>
                            <div className="container-n-caja">
                                <i className="box-ver-pallet fas fa-box-open"></i> 
                                <div className="container-carga-ver-pallet">
                                    <label key="{caja}" className="text-n-cajas-ver-pallet">{datos.caja}</label>                            
                                </div>                            
                            </div>                        
                        </a>
                    ))}
                    </div>
                    <Link to="/menu">
                        <button className="btn-op-ver-pallet" type="button">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                    </Link>
                </div>
            );            
        }
    }
}

export default AbrirPallets;