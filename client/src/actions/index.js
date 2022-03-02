import axios from 'axios';

export function get_actividades () {
    return async function (dispatch) {
        try {
            const response = await axios(`http://localhost:3001/api/turismo`);
            return dispatch({type: 'GET_ACTIVIDADES', payload: response.data});                
        } catch (error) {
            alert(error)
        }
    }
}

export function agregar_actividad (actividad){
    return async function (dispatch){
        try {
            const response = await axios.post('http://localhost:3001/APi/turismo', actividad);
            return dispatch({type: 'AGREGAR_ACTIVIDAD', payload: response.data});
        } catch (error) {
            alert(error)
        }
    }
}


export function get_pais_detalle (paisABuscar='VEN') {
    return async function (dispatch) {
        try {
            const response = await axios(`http://localhost:3001/api/countries/${paisABuscar}`);
            return dispatch({type: 'GET_PAIS_DETALLE', payload: response.data});                
        } catch (error) {
            alert(`Error el la busqueda de:\n${paisABuscar} No encontrado`)
        }
    }
}


export function get_paises () {
    return async function (dispatch) {
        try {
            const response = await axios(`http://localhost:3001/api/countries`);
            return dispatch({type: 'GET_PAISES', payload: response.data});                
        } catch (error) {
            alert(error)
        }
    }
}

export function actualizar_display(PaisesADesplegar) {
    return function (dispatch) {
        return dispatch({type: 'ACTUALIZAR_DISPLAY', payload: PaisesADesplegar})
    }
}

export function display_config(displayConfig) {    
    return function (dispatch) {
        return dispatch({type: 'DISPLAY_CONFIG', payload: displayConfig})
    }
}

export function cambiar_pagina (nroPagina) {
    return function (dispatch) {
        return dispatch({type: 'CAMBIAR_PAGINA', payload: nroPagina })
    }
}

export function ocultar_configuraciones (ocultar) {
    return function (dispatch) {
        return dispatch({type: 'CAMBIAR_PAGINA', payload: ocultar })
    }
}
