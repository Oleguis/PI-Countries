import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { get_pais_detalle } from '../../actions';
import './Search.css'

function Search() {
    const dispatch = useDispatch();
    const [paisABuscar, setpaisABuscar] = useState('')

    function handleInputChange(e){
        setpaisABuscar(e.target.value)
    }

    function buscarUnPais(e){
        e.preventDefault();
        dispatch(get_pais_detalle(paisABuscar))
        setpaisABuscar('')
    }
    
    return (
            <form className='divBuscar' onSubmit={buscarUnPais}>
                <input className="inputSearch" type="text" onChange={handleInputChange} value={paisABuscar}/>
                <div className="divLupa" onClick={buscarUnPais}>
                    <div className="lupa">
                        <div className="montura">
                            <div className="cristal">
                                <div className="cristalbrillo"></div>
                                <div className="cristalbrillo"></div>
                            </div>
                        </div>
                        <div className="mango"></div>
                    </div>
                </div>
            </form>
    )
}

export default Search