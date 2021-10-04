import React from 'react';
import { Link } from 'react-router-dom';

const BtnVolver = ({color,font}) =>
(

    <Link to="/menu">
        <button style={{
            backgroundColor:color,
            color:font
        }} 
        className="btn-op-agregar" type="button">
            <i className="fas fa-chevron-left"></i>
        </button>
    </Link>


)

export default BtnVolver;