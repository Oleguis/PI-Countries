import React from 'react'
import './InitialPage.css'

function InitialPage({chageState}) {

  return (
    <div className="landingpage contenedor">
        <div className="div-Video">
            <img src={'../../assets/img/banderas.webp'} alt={'#'} ></img>
        </div>
        <div className="video-overlay"></div>
        <div className="video-content">
            <h1>Proyecto Individual</h1>
            <h1>Countries</h1>
            <h4>Realizado por: Jorge Nuñez</h4>
            <button onClick={chageState}>Continuar</button>
        </div>
    </div>
  )
}

export default InitialPage