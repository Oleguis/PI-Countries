import React from 'react';
import { NavLink } from 'react-router-dom';
import Buscador from '../Buscador/Buscador';
import MapaMundi from '../MapaMundi/MapaMundi'

import './NavBar.css';

export default function NavBar() {
	return (
      <nav className="divNavbar">
          <MapaMundi />
          <div className="contenedorUlSearch">    
            <div className="divunOderList">
              <NavLink end to="/" >Home</NavLink>
              <NavLink to="/Turismo" >Actividades Turisticas</NavLink>
            </div>
            <Buscador />
          </div>
      </nav>
	)
}
