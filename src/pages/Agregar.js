import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom';
import '../styles/style.css';

const cookies = new Cookies();
const url = 'https://localhost:44347/api/pallets';

class Agregar extends Component 
{
    constructor(props){
        super(props);
        this.state = 
        {
            form:
            {
                idbulto: '',
                movimiento: cookies.get('User'),
                idpuesto: '10'
            },
            infoPost:[],
            error: null,
            isLoaded: false,
            data:[]
        }
        this.handleChange = this.handleChange.bind(this);
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
        let res = await fetch(url)
        let data = await res.json()
        this.setState(
        {
            isLoaded: true,
            data
        });
    }

    handleChange(e) 
    {               
        this.setState(
        {
            form:
            {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        }, () => 
        {
            // console.log(this.state.form) 
            // console.log(e.target.value);   
            this.peticionPost();
        });
    }

    peticionPost= async () => 
    {
        try 
        {
            let config = 
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.form)
            }

            let res = await fetch(url, config)
            let infoPost = await res.json();
            let observacion = infoPost.observacion;
            this.setState(
            {
                isLoaded: true,
                infoPost: observacion
            });
            console.log(infoPost)
            var error = infoPost.error
            if(error >= 100)
            {
                document.getElementById("popup").classList.add('active');
            }
            else
            {

            }
        }
        catch (error)
        {
            this.setState(
            {
                error
            });
        }
    }

    cerrar_popup=e=>
    {
        e.preventDefault();
        document.getElementById("textbox-codigo-agregar").value = '';
        document.getElementById("popup").classList.remove('active');
        
    }

    render() 
    {
        const { isLoaded, data, infoPost } = this.state;
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
                <>
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
                            <input id="textbox-codigo-agregar" name="idbulto" className="textbox-agregar" type="text" value={this.state.value}  onChange={this.handleChange}/>
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
                        <Link to="/menu">
                            <button className="btn-op-agregar" type="button">
                                <i className="fas fa-chevron-left"></i>
                            </button>
                        </Link>
                        <button className="btn-op-agregar" type="button"><i className="fas fa-box"></i></button>
                    </div>
                </div>
                <div className="popup" id="popup">
                    <i className="fas fa-exclamation-circle icono-error"></i><br/>
                    <label className="titulo-error">{infoPost}</label><br/>
                    <button type="button" className="btn-error-popup" onClick={this.cerrar_popup}>Continuar</button>
                </div>
                </>
            );            
        }
    }   
}

export default Agregar;