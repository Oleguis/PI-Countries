import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../Card/Card'
import Buscador from '../Buscador/Buscador'
import Opciones from '../Opciones/Opciones'

import './Cards.css'

function Cards() {
  const { paisesADesplegar, cartaInicial, cantidadCartas} = useSelector(store => store)
  return (
    <>
    <Opciones />
    <Buscador />    
    <div className='cardsDisplay'>
    {paisesADesplegar.map((pais,pos) => {
      if (pos >= cartaInicial && pos <= (cartaInicial + cantidadCartas - (cartaInicial == 0 ? 1 : 0))) {
        console.log(cartaInicial + cantidadCartas)
        return (
            <Card key={pais.id} pais = {pais}/>
        )
      }
    })}
    </div>
    </>
  )
}

export default Cards