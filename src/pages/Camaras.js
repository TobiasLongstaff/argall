import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2'
import BtnVolver from '../components/BtnVolver'
import Nav from '../components/Nav'
import useFetch from '../hooks/useFetch'
import url from '../services/Settings'
import Cookies from 'universal-cookie' 
import Loading from '../components/Loading'
import ErrorApi from '../components/ErrorApi'

const color = "var(--verde)"
const cookies = new Cookies();

const AsignarCamara = ({history}) =>
{
    const {data, loading, error} = useFetch(url+'/1') 
    const [form, setForm ] = useState({idpallet: '', idcamara: '1', movimiento: cookies.get('User')})
    const textboxCodigoPallet = React.createRef()

    useEffect (() => 
    {
        if(!cookies.get('IdSession'))
        {
            history.push('/')
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
        e.preventDefault();
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
                    <div className="container-texto-pallets">
                        <label className="text-codigo-agregar" style={{color:color}}>Codigo Pallet</label>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input ref={textboxCodigoPallet} style={{borderColor:color}} name="idpallet" className="textbox-pallets" type="text" autoComplete="off" onChange={handleChange}/>
                        <label>Seleccionar Camara:</label><br/>
                        <div className="container-selectlist">
                            <select onChange={handleChange} className="textbox-camaras" name="idcamara">
                                {data.map((datos) =>
                                (
                                    <option key={datos.idcamara} value={datos.idcamara}>{datos.camara}</option>
                                ))}
                            </select>  
                            <i className="input-icon fas fa-warehouse"></i>       
                        </div>            
                    </form>
                </div>
            </div>
            <div className="container-btn">
                <BtnVolver color={color}/>
            </div>        
        </>
    )        
}

export default AsignarCamara