import React, { Component } from 'react';
import '../styles/style.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const url = 'https://localhost:44347/api/pallets';

class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            form:
            {
                idusuario: '',
                password: '',
                puesto: '10'
            },
            nombre: '',
            error: ''
        }    
        this.handleChange = this.handleChange.bind(this);    
    }

    handleSubmit = async e =>
    {
        e.preventDefault();
        let config = 
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.form)
        }
        let res = await fetch(url, config)
        let infoPost = await res.json();
        let nombre = infoPost.nombre;
        this.setState(
        {
            nombre: nombre
        });
        console.log(infoPost)

        if(nombre != null )
        {
            cookies.set('IdSession', '1', {path: '/'});
            cookies.set('User', this.state.nombre, {path: '/'});
            cookies.set('Puesto', this.state.form.puesto, {path: '/'});
            window.location.href='./menu';            
        }
        else
        {
            let error = 'Usuario o Contraseña Incorrecto';
            this.setState(
            {
                error: error
            });
        }
    }

    handleChange(e)
    {
        this.setState(
        {
            form:
            {
                ...this.state.form,
                [e.target.name]: e.target.value
            },
        }, () =>
        {
            console.log(this.state.form);
        });
    }

    componentDidMount()
    {
        if(cookies.get('IdSession'))
        {
            window.location.href='./menu';
        }
    }

    render()
    {
        const { error } = this.state;
        return(
            <div className="container-principal">
                <form onSubmit={this.handleSubmit}>
                    <label className="titulo">Login</label><br/>
                    <input className="textbox-login" type="text" name="idusuario" placeholder="Usuario" onChange={this.handleChange} /><br/>
                    <input className="textbox-login" type="password" name="password" placeholder="Contraseña" onChange={this.handleChange}/><br/>
                    <label className="">Puesto:</label>
                    <select className="textbox-puesto" name="puesto" onChange={this.handleChange}>
                        <option>10</option>
                        <option>11</option>
                    </select><br/>
                    <label className="text-error-login">{error}</label>
                    <button className="btn-login" type="submit">Iniciar Sesión</button>
                </form>
            </div>
        );
    }
}

export default Login;