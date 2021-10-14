import React, {useEffect, useState} from 'react'
import Cookies from 'universal-cookie'
import '../styles/style.css';
import useFetch from '../hooks/useFetch'
import url from '../services/Settings'
import Nav from '../components/Nav'
import BtnVolver from '../components/BtnVolver'
import Loading from '../components/Loading'
import ErrorApi from '../components/ErrorApi'
import Swal from 'sweetalert2'
import soundError from '../sounds/error.wav'; 
import soundSuccess from '../sounds/success.wav'; 

const color = 'var(--rojo)'
const cookies = new Cookies();

const Eliminar = ({history}) =>
{
    const {loading, error} = useFetch(url) 
    const [form, setForm ] = useState({idpuesto: cookies.get('Puesto'), idbulto: '1', movimiento: cookies.get('User'), tipo: 'Eliminar'})
    const textboxCodigoPallet = React.createRef()

    useEffect (() => 
    {
        if(!cookies.get('IdSession'))
        {
            history.push('/')
        }
        else
        {
            if(!loading)
            {
                textboxCodigoPallet.current.focus()
            }
        } 
    })

    const handleChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
        textboxCodigoPallet.current.focus()
    }

    const handleSubmit = async e =>
    {
        e.preventDefault()
        console.log(form)
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
                body: JSON.stringify(form)
            }
            let res = await fetch(url, config)
            console.log(res.json())
            const audio = new Audio(soundSuccess)
            audio.play();
            Swal.fire(
            {
                icon: 'success',
                title: '¡Operación realizada correctamente!',
                showConfirmButton: false,
                timer: 1500
            })
            textboxCodigoPallet.current.value = ''
            
        }
        catch (error)
        {
            console.error(error)
            const audio = new Audio(soundError)
            audio.play();
            Swal.fire(
                'Error',
                error,
                'error'
            )
        }
    }

    if(loading)
    return <Loading />
        
    if(error)
        return <ErrorApi />

    return(
        <>
            <Nav backgroundColor={color}/>
            <div className="container-pallet">
                <div className="container-info-pallets">
                    <div className="container-texto">
                        <label className="text-codigo-eliminar">Codigo</label>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input ref={textboxCodigoPallet} id="textbox-codigo-eliminar" name="idbulto" className="textbox-eliminar" type="text" onChange={handleChange}/>
                    </form>
                    <div className="container-text-eliminar">
                        <i className="box-pallets-eliminar fas fa-trash"></i><br/>
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