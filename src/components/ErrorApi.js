import React from 'react'
import BtnVolver from './BtnVolver'
import Nav from '../components/Nav'

const color = 'var(--rojo)'

const ErrorApi = () =>
(
    <>
        <Nav backgroundColor={color}/>
        <div className="container-pallet">
            <div className="container-info-pallets">
                <div className="container-texto-pallets">
                    <label className="text-codigo-agregar" style={{color:color}}>Error de conexion con el servicio de datos</label>
                </div>        
            </div>             
        </div>
        <div className="container-btn">
            <BtnVolver color={color}/>
        </div>
    </>

    
)

export default ErrorApi