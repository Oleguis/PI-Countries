import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cambiar_pagina } from '../../actions';
import './Buscador.css'

function Buscardor() {
	const {cartaInicial, cantidadCartas} = useSelector(store => store)
	const paisesADesplegar = useSelector(store => store.paisesADesplegar);
	const dispatch = useDispatch();

	// const [primeraCard, setprimeraCard] = useState(0);
	const maximoNrodeCard = cantidadCartas;
	const nroPaginas = Math.ceil(paisesADesplegar.length / maximoNrodeCard);
	const [btns, setbtns] = useState([ 1, 2, 3 ]);
	
	useEffect(() => {
		if (cartaInicial == 0) setbtns([1, 2, 3]);
	}, [cartaInicial]);
	
	function paginado (e) {
		if (e.target.id === 'btn0') {
			setbtns([1, 2, 3]);
			dispatch(cambiar_pagina(0));
		} else if (e.target.id === 'btn6') {
			setbtns([ nroPaginas - 2, nroPaginas - 1, nroPaginas]);
			dispatch(cambiar_pagina((nroPaginas - 1) * maximoNrodeCard));
		} else if (e.target.id === 'btn1'){
			dispatch(cambiar_pagina(cartaInicial - maximoNrodeCard));
			setbtns([ btns[0] - 1, btns[1] - 1, btns[2] - 1]);
		} else if (e.target.id === 'btn5'){
			dispatch(cambiar_pagina(cartaInicial + maximoNrodeCard));
			setbtns([ btns[0] + 1, btns[1] + 1, btns[2] + 1]);
		} else dispatch(cambiar_pagina((e.target.innerText - 1) * maximoNrodeCard))
	}


  return (

    <div className='divPaginadoBuscar'>
		<div className='paisesAdesplegar'>{`Paises Listados: ${paisesADesplegar.length}`}</div>
        <div className='divPaginado'>
			<button id='btn0' onClick={(e)=>paginado(e)} disabled={nroPaginas < 4 || btns[0] < 2 ? true : false} >{'<<'}</button>
			<button id='btn1' onClick={(e)=>paginado(e)} disabled={btns[0] < 2 ? true : false} >{`<`}</button>
			<button id='btn2' onClick={(e)=>paginado(e)} disabled={nroPaginas < 1 ? true : false} >{`${btns[0]}`}</button>
			<button id='btn3' onClick={(e)=>paginado(e)} disabled={nroPaginas < 2 ? true : false} >{`${btns[1]}`}</button>
			<button id='btn4' onClick={(e)=>paginado(e)} disabled={nroPaginas < 3 ? true : false} >{`${btns[2]}`}</button>
			<button id='btn5' onClick={(e)=>paginado(e)} disabled={btns[2] >= nroPaginas || nroPaginas == 0 ? true : false}>{'>'}</button>
			<button id='btn6' onClick={(e)=>paginado(e)} disabled={nroPaginas < 4 || btns[2] == nroPaginas ? true : false}>{'>>'}</button>
        </div>
        <div className='divBuscar'>
            <input className="inputSearch" type="text"/>
            <div className="divLupa">
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
        </div>
    </div>
    )
}

export default Buscardor