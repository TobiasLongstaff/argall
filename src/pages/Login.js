import React, { useEffect, useState } from 'react'
import '../styles/style.css'
import Cookies from 'universal-cookie'
import url from '../services/Settings'
import useFetch from '../hooks/useFetch'
import Loading from '../components/Loading'
import ErrorApi from '../components/ErrorApi'

const cookies = new Cookies();

const Login = ({history}) =>
{
    const {data, loading, error} = useFetch(url+'/puesto/PAL') 
    const [ MensajeError, setError ] = useState(null)
    const [form, setForm] = useState({idusuario: '', password: '', puesto: '80'})

    useEffect (() => 
    {
        if(cookies.get('IdSession'))
        {
            history.push('/menu')
        }
    })

    const handleSubmit = async e =>
    {
        e.preventDefault();
        try
        {
            let config = 
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            }
            let res = await fetch(url, config)
            let infoPost = await res.json()
            let nombre = infoPost.nombre
            console.log(infoPost)     
            if(nombre != null )
            {
                cookies.set('IdSession', '1', {path: '/'});
                cookies.set('User', nombre, {path: '/'});
                cookies.set('Puesto', form.puesto, {path: '/'});
                history.push('/menu')            
            }
            else
            {
                let error = 'Usuario o Contraseña Incorrecto';
                setError(error);
            }       
        }
        catch(error)
        {
            setError(error);
        }

    }

    const handleChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }

    if(loading)
        return <Loading />
            
    if(error)
        return <ErrorApi />

    return(
        <div className="container-principal">
            <form onSubmit={handleSubmit}>
                <label className="titulo">Login</label><br/>
                <input className="textbox-login" type="text" name="idusuario" placeholder="Usuario" onChange={handleChange} /><br/>
                <input className="textbox-login" type="password" name="password" placeholder="Contraseña" onChange={handleChange}/><br/>
                <label className="">Puesto:</label>
                <select className="textbox-puesto" name="puesto" onChange={handleChange}>
                    {data.map(datos => (
                        <option key={datos.puestosNombre}> {datos.idpuesto}</option>
                    ))}
                </select><br/>
                <label className="text-error-login">{MensajeError}</label>
                <button className="btn-login" type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
}

export default Login;