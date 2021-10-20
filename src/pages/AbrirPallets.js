import React, { useEffect} from 'react';
import Cookies from 'universal-cookie';
import BtnVolver from '../components/BtnVolver'
import '../styles/style.css';
import url from '../services/Settings'
import Nav from '../components/Nav'
import useFetch from '../hooks/useFetch'
import Loading from '../components/Loading'
import ErrorApi from '../components/ErrorApi'
import FilasPallets from '../components/FilasPallets'

const cookies = new Cookies();

const AbrirPallets = (history) =>
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

    return (
        <div className="container-app">
            <Nav height="auto"/>
            <div className="container-palletes-ver-pallet">
                {data.filter(puestos => puestos.puesto === cookies.get('Puesto')).map(datos => (
                    <FilasPallets key={datos.pallet} datos={datos} />
                ))}
            </div>
            <div className="container-btn-pallets">
                <BtnVolver color="white" font="var(--celeste)"/> 
            </div>
        </div>
    );            
}

export default AbrirPallets;