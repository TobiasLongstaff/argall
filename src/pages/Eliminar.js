import React, {useEffect} from 'react'
import Cookies from 'universal-cookie'
import '../styles/style.css';
import useFetch from '../hooks/useFetch'
import url from '../services/Settings'
import Nav from '../components/Nav'
import BtnVolver from '../components/BtnVolver'
import Loading from '../components/Loading'
import ErrorApi from '../components/ErrorApi'

const color = 'var(--rojo)'
const cookies = new Cookies();

const Eliminar = ({history}) =>
{
    const {data, loading, error} = useFetch(url) 

    useEffect (() => 
    {
        if(!cookies.get('IdSession'))
        {
            history.push('/')
        }
    })

    if(loading)
    return <Loading />
        
    if(error)
        return <ErrorApi />

    return(
        <>
            <Nav backgroundColor={color}/>
            <div className="container-pallet">
                {data.map((datos) => (
                    <label key={datos.pallet} className="text-pallets-eliminar">
                        Nº Pallet: {datos.pallet}
                    </label>
                ))}
                <div className="container-info-pallets">
                    <div className="container-texto">
                        <label className="text-codigo-eliminar">Codigo</label>
                    </div>
                    <input id="textbox-codigo-eliminar" className="textbox-eliminar" type="text"/>
                    <div className="container-texto">
                        {data.map((datos) => (
                            <label key={datos.pallet} className="text-pallets-eliminar">{datos.articulo}</label>   
                        ))}                            
                    </div>
                    <div className="container-text-eliminar">
                        <label className="text-elimianar">Eliminar</label>
                    </div>                
                </div>
            </div>
            <div className="container-btn">
                <BtnVolver color={color}/>
            </div>
        </>
    )           
}

export default Eliminar;