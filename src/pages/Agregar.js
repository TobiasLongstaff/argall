import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
import '../styles/style.css';
import axios from 'axios';

const cookies = new Cookies();
const url = 'https://localhost:44347/api/pallets';
class Agregar extends Component 
{
    state = 
    {
        error: null,
        isLoaded: false,
        data:[],
        from:
        {
            idbulto: 0,
            movimiento: '',
            idpuesto: 0
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
            document.getElementById("textbox-codigo-agregar").focus();
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

    peticionPost=async()=>
    {
        await axios.post(url,this.state.from).then(response=>
        {
            this.fetchExercises();
        }).catch(error=>
        {
            console.log(error.message);
        })
    }

    handelChange=async e=>
    {
        e.persist();
        await this.setState(
        {
            from:
            {
                ...this.state.from,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.from);
        
    }

    render() 
    {
        const { isLoaded, data, from } = this.state;
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
                    <nav className="nav-agregar">
                        <label>Puesto: 10</label><br/>
                        <label>Movimiento: {cookies.get('User')}</label>
                    </nav>
                    <div className="container-pallet">
                        {data.map(datos => (
                            <label key="{data}" className="text-pallets-agregar">
                                Nº Pallet: {datos.pallet}
                            </label>
                        ))}
                        <div className="container-info-pallets">
                            <div className="container-texto">
                                <label className="text-codigo-agregar">Codigo</label>
                            </div>
                            <input id="textbox-codigo-agregar" name="idbulto" className="textbox-agregar" type="text" onChange={this.handelChange} value={from.idbulto}/>
                            <input type="hidden" name="idpuesto" value={cookies.get('User')} onChange={this.handelChange}/>
                            <input type="hidden" name="movimiento" value="tobias" onChange={this.handelChange}/>
                            <div className="container-texto">
                                {data.map(datos => (
                                    <label key="{data}" className="text-pallets-agregar">{datos.articulo}</label>   
                                ))}                     
                            </div>
                            <i className="box-pallets-agregar fas fa-box-open"></i><br/>
                            <div className="container-text-cajas">
                                {data.map(datos => (
                                    <label key="{data}" className="text-n-cajas">{datos.caja}</label>    
                                ))}                                  
                            </div>  
                        </div>
                    </div>
                    <div className="container-btn">
                        <button type="button" onClick={()=>this.peticionPost()}>Enviar</button>
                        <Link to="/menu">
                            <button className="btn-op-agregar" type="button">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                        </Link>
                        <button className="btn-op-agregar" type="button"><i className="fas fa-box"></i></button>
                    </div>
                </div>
            );            
        }
    }   
}

export default Agregar;