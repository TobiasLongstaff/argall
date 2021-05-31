import React, { Component } from 'react';
import Swal from 'sweetalert2'
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
                idbulto: cookies.get('idPallet'),
                movimiento: cookies.get('User'),
                idpuesto: cookies.get('Puesto')
            },
            form_close:
            {
                idpallet: '',
                movimiento: cookies.get('User'),
                idpuesto: cookies.get('Puesto')
            },
            infoPost:[],
            error: null,
            isLoaded: false,
            fila:[]
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
        let res = await fetch(url);
        let data = await res.json();

        let cant_filas = Object.keys(data).length;
        var mul = 0 ;
        let fila = data.slice(mul, mul+1);
        var puesto = fila.map(datos => datos.puesto);
        var pallet = fila.map(datos => datos.pallet); 

        while(puesto.toString() !== cookies.get('Puesto'))
        {
            if(cant_filas !== mul)
            {
                mul++;
                puesto = fila.map(datos => datos.puesto); 
                pallet = fila.map(datos => datos.pallet); 
            }
            else
            {
                console.log('No se encontro pallet');
                break;
            }
        }

        var idpallet = pallet.toString().substring(1);

        this.setState(
        {
            isLoaded: true,
            fila,
            form_close:
            {
                ...this.state.form_close,
                idpallet: idpallet
            }
        }, () => 
        {
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
            console.log(this.state.form) 
            console.log(e.target.value);
            this.peticionPost_save();
        });
    }

    peticionPost_save= async () => 
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
                // var creo_pallet = observacion.substring(0, 17)
                // console.log(creo_pallet);

                document.getElementById("popup_error").classList.add('active');
                
            }
            else
            {
                var creo_pallet = observacion.substring(0, 17)
                console.log(creo_pallet);
                if(creo_pallet === "Se creó el pallet")
                {
                    Swal.fire(
                    {
                        title: '¿Cambiar de pallet?',
                        text: "Se creó un Nuevo pallet ¿deseas cambiar a ese pallet o seguir en este?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Cambiar de pallet'

                    }).then((result) => 
                    {
                        document.getElementById("textbox-codigo-agregar").value = '';
                        if(result.isConfirmed) 
                        {
                            this.fetchExercises();
                            console.log('Cambio pallet');
                        }
                    })
                }
                else
                {
                    document.getElementById("popup_success").classList.add('active');
                    setTimeout(
                        function cerrar_popup_success()
                        {
                            document.getElementById("textbox-codigo-agregar").value = '';
                            document.getElementById("popup_success").classList.remove('active');
                            this.fetchExercises()
                        }, 2000
                    );                    
                }
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

    peticionPost_close= async () => 
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
                body: JSON.stringify(this.state.form_close)
            }

            let res = await fetch(url, config);
            console.log(res);
            console.log(this.state.form_close);
            let infoPost = await res.json();
            let observacion = infoPost.observacion;
            this.setState(
            {
                isLoaded: true,
                infoPost: observacion
            });
            console.log(infoPost);
        }
        catch (error)
        {
            this.setState(
            {
                error
            });
        }
    }

    cerrar_popup_error=e=>
    {
        e.preventDefault();
        document.getElementById("textbox-codigo-agregar").value = '';
        document.getElementById("popup_error").classList.remove('active');
    }

    render() 
    {
        const { isLoaded, infoPost, fila } = this.state;
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
                        <label>Puesto: {cookies.get('Puesto')}</label><br/>
                        <label>Movimiento: {cookies.get('User')}</label>
                    </nav>
                    <div className="container-pallet">
                        {fila.map(datos => (
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
                                {fila.map(datos => (
                                    <label key="{data}" className="text-pallets-agregar">{datos.articulo}</label>   
                                ))}                     
                            </div>
                            <i className="box-pallets-agregar fas fa-box-open"></i><br/>
                            <div className="container-text-cajas">
                                {fila.map(datos => (
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
                        <button className="btn-op-agregar" type="button" onClick={this.peticionPost_close}><i className="fas fa-box"></i></button>
                    </div>
                </div>
                <div className="popup" id="popup_error">
                    <i className="fas fa-exclamation-circle icono-error"></i><br/>
                    <label className="titulo-error">{infoPost}</label><br/>
                    <button type="button" className="btn-error-popup" onClick={this.cerrar_popup_error}>Continuar</button>
                </div>
                <div className="popup" id="popup_success">
                    <i className="fas fa-check-circle icono-error"></i><br/>
                    <label className="titulo-error">{infoPost}</label><br/>
                </div>
                </>
            );            
        }
    }   
}

export default Agregar;