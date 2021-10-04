import React from 'react';
import BtnVolver from '../components/BtnVolver'
import Nav from '../components/Nav'

const color = "var(--verde)"

const AsignarCamara = () =>
{
    return(
        <>
            <Nav backgroundColor={color}/>
            <div className="container-pallet">
                <div className="container-info-pallets">
                    <div className="container-texto">
                        <label className="text-codigo-agregar" style={{color:color}}>Codigo Pallet</label>
                    </div>
                    <input id="textbox-codigo-agregar" style={{borderColor:color}} name="idbulto" className="textbox-agregar" type="text" autoComplete="off"/>
                    <label>Camara:</label>
                    <select className="textbox-puesto" name="camara">
                    </select>
                </div>
            </div>
            <div className="container-btn">
                <BtnVolver color={color}/>
            </div>        
        </>
    )
}

export default AsignarCamara