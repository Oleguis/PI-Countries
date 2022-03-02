import React, { useState, useEffect} from "react";
import { Route, Routes, Switch } from "react-router-dom";
import {useDispatch} from 'react-redux'

import NavBar from "./components/NavBar/NavBar";
import ActiviTurs from "./components/ActiviTurs/ActiviTurs";
import LandingPage from './components/InitialPage/InitialPage'
import Cards from "./components/Cards/Cards";
import { get_actividades, get_paises, get_pais_detalle } from "./actions";
import PaisDetalle from "./components/PaisDetalle/PaisDetalle";



export default function App() {
	const dispatch = useDispatch();
	const [initialPage, setinitialPage] = useState(true);

	function chageState(){
		setinitialPage(false)
	}
	
	useEffect(()=>{
		dispatch(get_paises())
		dispatch(get_actividades())
		dispatch(get_pais_detalle())
	},[dispatch])


	return (
		initialPage ? 
			<LandingPage chageState={chageState}/> :
			<React.Fragment>
				<NavBar />
				<Routes>
					<Route exact path="/" element={<Cards />} />
					<Route path="/detalle" element={<PaisDetalle />} />
					<Route path="/detalle/:paisId" element={<PaisDetalle />} />
					<Route path="/Turismo" element={<ActiviTurs />} />
				</Routes>
			</React.Fragment>
	);
}

