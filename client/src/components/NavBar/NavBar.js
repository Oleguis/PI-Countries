import React from 'react';
import { NavLink } from 'react-router-dom';
import MapaMundi from '../MapaMundi/MapaMundi'
import Buscador from '../Buscador/Buscador'

import './NavBar.css';

export default function NavBar() {
	return (
      <nav className="divNavbar">
          <MapaMundi />
          <div className="divunOderList">
            <NavLink end to="/" >Home</NavLink>
            <NavLink to="/Detalle" >Detalle de un Pais</NavLink>
            <NavLink to="/Turismo" >Actividades Turisticas</NavLink>
          </div>
          <Buscador />
      </nav>
	)
}
