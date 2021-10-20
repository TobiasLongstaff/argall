import React from 'react'
import { Link } from 'react-router-dom';


const FilasPallets = ({datos}) =>
{
    if(datos === null)
    {
        console.log('hola')
        return <label>No se encontraron pallets</label> 
    }
    else
    {
        return(
            <Link to={"agregar/"+datos.pallet} className="container-pallet-abierto">
                <label className="text-pallets-agregar">{datos.pallet}</label>
                <label className="text-pallets-agregar">{datos.articulo}</label>
                <div className="container-n-caja">
                    <i className="box-ver-pallet fas fa-box-open"></i> 
                    <div className="container-carga-ver-pallet">
                        <label className="text-n-cajas-ver-pallet">{datos.caja}</label>                            
                    </div>                            
                </div>  
            </Link>
        )
    }
}

export default FilasPallets