import React, { Component } from 'react';
import '../styles/style.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component
{
    handleSubmit = e =>
    {
        cookies.set('IdSession', '1', {path: '/'});
        window.location.href='./menu';
        e.preventDefault();
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
        return(
            <div className="container-principal">
                <form onSubmit={this.handleSubmit}>
                    <label className="titulo">Login</label><br/>
                    <input className="textbox-login" type="text" placeholder="Usuario"/><br/>
                    <input className="textbox-login" type="password" placeholder="Contraseña"/><br/>
                    <button className="btn-login" type="submit">Iniciar Sesión</button>
                </form>
            </div>
        );
    }
}

export default Login;