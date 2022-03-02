import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { display_config, actualizar_display, cambiar_pagina } from '../../actions'

import './Opciones.css'

let newDisplayConfig = {
    ordenadoPor: '1',
    tipoOrdenado: '1',
    continentes: {},
    actividades: {}
}

export default function Opciones() {
    let {actividadesTuristicas, displayConfig, paisesOriginal} = useSelector(store => store);    

    const dispatch = useDispatch();
    const continentes = ['Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America']

    function cambiarCheck(e){
        if (e.target.name === 'ordenar' && e.target.checked) newDisplayConfig.ordenadoPor = e.target.value;
        else if (e.target.name === 'tipo' && e.target.checked) newDisplayConfig.tipoOrdenado = e.target.value;
        else if (e.target.name === 'continentes') newDisplayConfig.continentes[e.target.value] = e.target.checked;
        else if (e.target.name === 'actividades') {
            newDisplayConfig.actividades[e.target.value] = e.target.checked;
        }

        let nuevoDisplayConfig = {
            tipoOrdenado: Number(newDisplayConfig.tipoOrdenado),
            ordenadoPor: Number(newDisplayConfig.ordenadoPor),
            continentes: Object.keys(newDisplayConfig.continentes).reduce((t,e,p) => newDisplayConfig.continentes[e] ? t.concat([continentes[e]]): t,[]),
            actividades: Object.keys(newDisplayConfig.actividades).reduce((t,e,p) => newDisplayConfig.actividades[e] ? t.concat([actividadesTuristicas[e].nombre]) : t,[]),
        }
        dispatch(display_config(nuevoDisplayConfig));

        const paisesADesplegar = paisesOriginal.filter((pais)=>{
            return (nuevoDisplayConfig.continentes.length == 0 || nuevoDisplayConfig.continentes.includes(pais.continente)) &&
                (nuevoDisplayConfig.actividades.length == 0 || actividadesTuristicas.reduce(((t,e)=>nuevoDisplayConfig.actividades.includes(e.nombre) ? t.concat(e.countriesId): t),[]).includes(pais.id))
        });

        const paisesADesplegarOrdenado = paisesADesplegar.sort((a,b) => {
            if (nuevoDisplayConfig.tipoOrdenado == 1){
                if (a[['id','nro','nombrecorto','continente','poblacion'][nuevoDisplayConfig.ordenadoPor - 1]] > b[['id','nro','nombrecorto','continente','poblacion'][nuevoDisplayConfig.ordenadoPor - 1]]) {
                    return 1;
                }else if (a[['id','nro','nombrecorto','continente','poblacion'][nuevoDisplayConfig.ordenadoPor - 1]] < b[['id','nro','nombrecorto','continente','poblacion'][nuevoDisplayConfig.ordenadoPor - 1]]) {
                    return -1;
                }
                return 0
            }
            if (a[['id','nro','nombrecorto','continente','poblacion'][nuevoDisplayConfig.ordenadoPor - 1]] > b[['id','nro','nombrecorto','continente','poblacion'][nuevoDisplayConfig.ordenadoPor - 1]]) {
                return -1;
            }else if (a[['id','nro','nombrecorto','continente','poblacion'][nuevoDisplayConfig.ordenadoPor - 1]] < b[['id','nro','nombrecorto','continente','poblacion'][nuevoDisplayConfig.ordenadoPor - 1]]) {
                return 1;
            }
            return 0
        })
        
        dispatch(actualizar_display(paisesADesplegarOrdenado));
        dispatch(cambiar_pagina(0))
    }

    return (
    <section className="divConfiguracion">
        <div className="ordenadoPor divConfig">Ordernar por
            <li key={'l1'+1000}>
                <input id="orden1" type="radio" className="cbOrdenar" defaultChecked={displayConfig.ordenadoPor == 1 ? "checked": null} name="ordenar" onChange={cambiarCheck} value={1}/>
                <label>Por Id (letra)</label>
            </li>
            <li key={'l1'+1001}>
                <input id="orden2" type="radio" className="cbOrdenar" defaultChecked={displayConfig.ordenadoPor == 2 ? "checked": null} name="ordenar" onChange={cambiarCheck} value={2}/>
                <label>Por Id (Nro)</label>
            </li>
            <li key={'l1'+1002}>
                <input id="orden3" type="radio" className="cbOrdenar" defaultChecked={displayConfig.ordenadoPor == 3 ? "checked": null} name="ordenar" onChange={cambiarCheck} value={3}/>
                <label>Por Nombre</label>
            </li>
            <li key={'l1'+1003}>
                <input id="orden4" type="radio" className="cbOrdenar" defaultChecked={displayConfig.ordenadoPor == 4 ? "checked": null} name="ordenar" onChange={cambiarCheck} value={4}/>
                <label>Por Continente</label>
            </li>
            <li key={'l1'+1004}>
                <input id="orden5" type="radio" className="cbOrdenar" defaultChecked={displayConfig.ordenadoPor == 5 ? "checked": null} name="ordenar" onChange={cambiarCheck} value={5}/>
                <label>Por Población</label>            
            </li>
        </div>
        <div className="ordenadoTipo divConfig">Tipo de Ordernardo
            <li key={'l1'+1005}>
                <input id="tipo1" type="radio" className="tpOrdenar" name="tipo" defaultChecked={displayConfig.tipoOrdenado == 1 ? "checked": null} onChange={cambiarCheck} value={1}/>
                <label>Ascendente</label>
            </li>
            <li key={'l1'+1006}>
                <input id="tipo2" type="radio" className="tpOrdenar" name="tipo" defaultChecked={displayConfig.tipoOrdenado == 2 ? "checked": null} onChange={cambiarCheck} value={2}/>
                <label>Descendente</label>
            </li>
        </div>
        <section className="filtradoPor divConfig">Filtrar por Continente
            {continentes.map((cont,pos) => {
                return (
                    <li key={'CT' + cont + pos}>
                        <input id="${cont}" type="checkbox" className="OptionContinente" defaultChecked={displayConfig.continentes.includes(cont) ? "checked": null} onChange={cambiarCheck} name="continentes" value={pos}/>
                        <label>{cont}</label>
                    </li>
                )
            })}
        </section>
        <div className="filtradoPor divConfig">Filtrar por Actividad Turistica
            {actividadesTuristicas.map((actividad, pos) => {
                return (
                    <li key={'AT' + actividad.id}>
                        <input id="${actividad.nombre.trim().replace(' ','_')}" type="checkbox" onChange={cambiarCheck} defaultChecked={displayConfig.actividades.includes(actividad.nombre) ? "checked": null} className="OptionActividad" name="actividades" value={pos}/>
                        <span onClick={cambiarCheck} name="actividades" value={pos}>{actividad.nombre.trim()}</span>
                    </li>
                )
            })}
        </div>
    </section>
  )
}
