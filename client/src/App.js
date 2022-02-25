import React, { useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'

import NavBar from "./components/NavBar/NavBar";
import ActiviTurs from "./components/ActiviTurs/ActiviTurs";
import LandingPage from './components/InitialPage/InitialPage'
import Cards from "./components/Cards/Cards";
import Opciones from "./components/Opciones/Opciones";
import { get_actividades, get_paises } from "./actions";



export default function App() {
	const dispatch = useDispatch();
	const [initialPage, setinitialPage] = useState(true);

	function chageState(){
		setinitialPage(false)
	}
	
	useEffect(()=>{
		dispatch(get_paises())
		dispatch(get_actividades())
	},[])


	return (
		initialPage ? 
			<LandingPage chageState={chageState}/> :
			<React.Fragment>
				<NavBar />
				<Opciones />
				<Routes>
					<Route exact path="/" element={<Cards />} />
					<Route path="/Turismo" element={<ActiviTurs />} />
				</Routes>
			</React.Fragment>
	);
}

