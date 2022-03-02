import React from 'react'
import {Link} from 'react-router-dom';

import './Card.css';

function Card({pais}) {
  return (
    <Link to={`/detalle/${pais.id}`} className={'LinkCard'}>
    <div className="configDisplay">
        <div className="divListado">
            <div className="contenedorImagenes">
                <div className="contenedorBandera">
                    <img className='bandera' src = {`${pais.bandera}`} alt='Sin bandera'></img>
                    <p className='ncorto'>Bandera</p>
                </div>
                <div className="contenedorEscudo">
                    <img className='escudo' src = {`${pais.escudo}`} alt='Sin Escudo'></img>
                    <p className='ncorto'>Escudo</p>
                </div>
            </div>
            <div className="contenedorLabels">
                <div className='contenedorIds'>
                    <p className='ncorto'>Id Letras: {pais.id}</p>
                    <p className='ncorto'>Id #: {pais.nro}</p>
                </div>                    
                <p className='ncorto'>Pais: {pais.nombrecorto}</p>
                <p className='continente'> Continente: {pais.continente}</p>
            </div>
        </div>
    </div>
    </Link>
)
}

export default Card