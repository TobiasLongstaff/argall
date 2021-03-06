import React, { Component } from 'react'
import Swal from 'sweetalert2'
import Cookies from 'universal-cookie'
import Nav from '../components/Nav'
import BtnVolver from '../components/BtnVolver'
import '../styles/style.css'
import soundError from '../sounds/error.wav' 
import soundSuccess from '../sounds/success.wav'
import url from '../services/Settings'

const cookies = new Cookies();

class Agregar extends Component 
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            form:
            {
                idbulto: '',
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
            fila:[],
            pallet: '',
            play: false
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
            let url_actual = window.location.pathname;
            url_actual = url_actual.substring(9);

            if(url_actual !== '')
            {
                console.log(url_actual)
                this.setState(
                {
                    pallet: url_actual
                    
                },() => 
                {
                    console.log(this.state.pallet) 
                })
                await this.fetchExercises_id()
            }
            else
            {
                await this.fetchExercises()
                               
            }
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

        cookies.set('idpallet', pallet.toString(), {path: '/'});

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
            console.log('Carga...');
        });
    }

    fetchExercises_id = async () => 
    {
        let res = await fetch(url);
        let data = await res.json();
        var fila = data.filter(pallet => pallet.pallet === this.state.pallet)
        var pallet = this.state.pallet
        console.log(fila);

        cookies.set('idpallet', pallet.toString(), {path: '/'});

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
            console.log('Carga...');
        });
    }

    obtener_caja = async () => 
    {
        let res = await fetch(url);
        let data = await res.json();

        var cant_cajas = data.filter(filas => filas.pallet === cookies.get('idpallet')).map(datos => datos.caja);
        console.log(cant_cajas);

        let fila = this.state.fila

        // if(cant_cajas === null)
        // {
            fila[0].caja = cant_cajas.toString();   
        // }

        this.setState(
        {
            fila: fila

        }, () => 
        {
            console.log(this.state.fila);
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
            var cant_caracters = e.target.value.length;
            console.log(cant_caracters);
            if(cant_caracters >= 6)
            {
                // if(e.target.value.charAt(0) !== 'B')
                // {
                //     document.getElementById("textbox-codigo-agregar").value = '';
                // }
                // else
                // {
                    this.peticionPost_save();
                // }                
            }
        });
    }

    peticionPost_save = async () => 
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
        if(error === "0")
        {
            var creo_pallet = observacion.substring(0, 17)
            if(creo_pallet === "Se cre?? el pallet")
            {
                console.log(creo_pallet);
                Swal.fire(
                {
                    title: '??Cambiar de pallet?',
                    text: "Se cre?? un Nuevo pallet ??deseas cambiar a ese pallet o seguir en este?",
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
                this.obtener_caja(); 
                this.audio2 = new Audio(soundSuccess)
                this.audio2.play();
                Swal.fire(
                {
                    icon: 'success',
                    title: '??Operaci??n realizada correctamente!',
                    showConfirmButton: false,
                    timer: 1500
                })              
            }
        }
        else
        {
            this.audio = new Audio(soundError)
            this.audio.play();
            Swal.fire(
                'Error',
                observacion,
                'error'
              )
        }
        document.getElementById("textbox-codigo-agregar").value = '';
        document.getElementById("textbox-codigo-agregar").focus(); 
    }

    peticionPost_close= () => 
    {
        Swal.fire(
        {
            title: '??Cerrar pallet?',
            text: "??Est??s seguro que queres cerrar el pallet?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Cerrar'
        }).then((result) => 
        {
            if(result.isConfirmed) 
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
        
                    let res = fetch(url, config);
                    // console.log(res);
                    console.log(this.state.form_close);
                    let infoPost = res.json();
                    console.log(infoPost);
                }
                catch (error)
                {
                    this.setState(
                    {
                        error
                    });
                }
                
                this.audio2 = new Audio(soundSuccess)
                this.audio2.play();
                Swal.fire(
                    '??Pallet Cerrado!',
                    'El pallet fue cerrado correctamente.',
                    'success'
                )
                this.fetchExercises();
            }
        })
    }

    render() 
    {
        const { isLoaded, fila } = this.state;
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
                    <Nav/>
                    <div className="container-pallet">
                        {fila.map(datos => (
                            <label key="{data}" className="text-pallets-agregar">
                                N?? Pallet: {datos.pallet}
                            </label>
                        ))}
                        <div className="container-info-pallets">
                            <div className="container-texto">
                                <label className="text-codigo-agregar">Codigo</label>
                            </div>
                            <input id="textbox-codigo-agregar" name="idbulto" className="textbox-agregar" type="text" autoComplete="off" value={this.state.value}  onChange={this.handleChange}/>
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
                        <BtnVolver/>
                        <button className="btn-op-agregar" type="button" onClick={this.peticionPost_close}><i className="fas fa-box"></i></button>
                    </div>
                </>
            );         
        }
    }   
}

export default Agregar;