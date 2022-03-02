import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './ActiviTurs.css'
import { agregar_actividad, get_actividades } from '../../actions'

const paisesPorContinente = {} //"Europe": [], "Oceania": [], "North America": [], "South America": [], "Asia": [], "Africa": [], "Antarctica": []}

const initialState = {
    "nombre": "",
    "dificultad": "1",
    "duracion": "1",
    "temporada": "Otoño",
    "countriesId" : []
}

function ActiviTurs() {
    const dispatch = useDispatch()
    const [newActividadTuristica, setnewActividadTuristica] = useState(initialState);
    const {paisesOriginal, actividadesTuristicas} = useSelector(store => store);
    const paisesOrdenadosPorContinante = paisesOriginal.sort((a,b)=>{
        if (a.continente+a.id > b.continente+b.id) return 1;
        else if (a.continente+a.id < b.continente+b.id) return -1;
        else return 0
    })
    
    paisesOrdenadosPorContinante.forEach(pais => {
        if (!paisesPorContinente[pais.continente]) paisesPorContinente[pais.continente] = [pais.id]
        else paisesPorContinente[pais.continente].push(pais.id)
    });

    let continenteActual = '';
    const [mensajeError, setmensajeError] = useState({error: ['','','','','']});

    const embiarFormulario = async function (e) {
        e.preventDefault();
        let errores = ['','','','','']
        if (newActividadTuristica.nombre == '') errores[0] = 'Error: Nombre de la actividad es obligatorio. Por favor indiquq el nombre de la actividad.';
        if (!['1','2','3','4','5'].includes(newActividadTuristica.dificultad)) errores[1] = 'Error: La dificultad debe estar dentro de un rango de 1 a 5. Por Favor verifique su elección';
        if (!['1','2','3','4','6'].includes(newActividadTuristica.duracion)) errores[2] = 'Error: La duración debe ser 1, 2, 3, 4 ó 6. Por Favor verifique su elección';
        if (!['verano', 'otoño', 'primavera','invierno'].includes(newActividadTuristica.temporada.toLowerCase())) errores[3] = 'Error: La Temporada debe ser "Verano", "Otoño, "Invierno" ó "Primavera". Por Favor verifique su elección';
        if (newActividadTuristica.countriesId.length == 0) errores[4] = 'Error: No hay paises asociados a esta actividad. Por favor seleccione los paises de la lista de paises.'
        if (errores.join(',') === ',,,,') {
            dispatch(agregar_actividad(newActividadTuristica))
            alert(`Actividad agregada con éxito\n
                    Nombre: ${newActividadTuristica.nombre}
                    Dificultad: ${newActividadTuristica.dificultad}
                    Duración: ${newActividadTuristica.duracion}
                    Temporada: ${newActividadTuristica.temporada}
                    Nro. de paises que la practican: ${newActividadTuristica.countriesId.length}
            `)
            setnewActividadTuristica({
                "nombre": "",
                "dificultad": "1",
                "duracion": "1",
                "temporada": "Otoño",
                "countriesId" : []
            })                 
        }else {
            alert(errores)
            
            return setmensajeError({error: errores})
        }
    }

    const changeSelection = function (e){
        if (e.target.name == 'countriesId') {
            if (e.target.checked) setnewActividadTuristica({...newActividadTuristica, countriesId: [...newActividadTuristica.countriesId, paisesOrdenadosPorContinante[e.target.value].id]})
            else setnewActividadTuristica({...newActividadTuristica, countriesId: newActividadTuristica.countriesId.filter(pais => pais !== paisesOrdenadosPorContinante[e.target.value].id )})
        }else setnewActividadTuristica({...newActividadTuristica, [e.target.name] : e.target.value})
    }

    return (
        <div className='divActividadesTuristicas'>
            <header>
                <h1>Actividades Turisticas</h1>
            </header>
            <form className='formularioActividades' onSubmit={(e)=>embiarFormulario(e)}>
                <div className='divParteIzquierda'>
                    <div className='divActividadNombre'>
                        <label>Nombre de la actividad Turistica: </label>
                        <input className='inputNombreActividad' name='nombre' type={"text"} placeholder="nombre de la actividad" onChange={changeSelection} value={newActividadTuristica.nombre}></input>
                        <span className={mensajeError.error[0] === '' ? 'labelErrorNombreNone': 'labelErrorNombre'}>{mensajeError.error}</span>
                    </div>
                    <div className='divActividadDificultad'>
                        <label>Dificultad de la actividad Turistica: </label>
                        <ol>
                            <li><input type="radio" name="dificultad" defaultChecked={"true"} className='dificultadUno' value="1" onChange={changeSelection}></input>Uno</li>
                            <li><input type="radio" name="dificultad" className='dificultadDos' value="2" onChange={changeSelection}></input>Dos</li>
                            <li><input type="radio" name="dificultad" className='dificultadTres' value="3" onChange={changeSelection}></input>Tres</li>
                            <li><input type="radio" name="dificultad" className='dificultadCuatro' value="4" onChange={changeSelection}></input>Cuatro</li>
                            <li><input type="radio" name="dificultad" className='dificultadCinco' value="5" onChange={changeSelection}></input>Cinco</li>
                        </ol>
                    </div>
                    <div className='divActividadDuracion'>
                        <label>Duración de la actividad Turistica en meses:</label>
                        <ul>
                            <li><input type="radio" name="duracion" defaultChecked="true" className='duracionUno' value="1" onChange={changeSelection}></input>Uno</li>
                            <li><input type="radio" name="duracion" className='duracionDos' value="2" onChange={changeSelection}></input>Dos</li>
                            <li><input type="radio" name="duracion" className='duracionTres' value="3" onChange={changeSelection}></input>Tres</li>
                            <li><input type="radio" name="duracion" className='duracionCuatro' value="4" onChange={changeSelection}></input>Cuatro</li>
                            <li><input type="radio" name="duracion" className='duracionCinco' value="6" onChange={changeSelection}></input>Seis</li>
                        </ul>
                    </div>
                    <div className='divActividadTemporada'>
                        <label>Temporada de la actividad Turistica:</label>
                        <ul>
                            <li><input type="radio" name="temporada" defaultChecked="true" className='temporadaOtoño' value="Otoño" onChange={changeSelection}></input>Otoño</li>
                            <li><input type="radio" name="temporada" className='temporadaVerano' value="Verano" onChange={changeSelection}></input>Verano</li>
                            <li><input type="radio" name="temporada" className='temporadaInvierno' value="Invierno" onChange={changeSelection}></input>Invierno</li>
                            <li><input type="radio" name="temporada" className='temporadaPrimavera' value="Primavera" onChange={changeSelection}></input>Primavera</li>
                        </ul>
                    </div>
                </div>
                <div className='divListadoPaises'>
                    <label>{`Total Paises seleccionados: ` + newActividadTuristica.countriesId.length}</label>
                    <span className='errorPaises'>{``}</span>
                    <ul className='UnOrderListPaises'>
                        {paisesOrdenadosPorContinante.map((pais, pos)=>{
                            if (!pais.selected) pais.selected = false;
                            if(continenteActual !== pais.continente){
                                continenteActual = pais.continente;
                                return (
                                    <>
                                        <li key={pais.continente + pos} className='tipoContinente' >{continenteActual}</li>
                                        <li key={pais.id + pos} className='tipoPais'><input type="checkbox" name='countriesId' value={pos} onChange={changeSelection}></input>{pais.nombrecorto}</li>
                                    </>
                                )
                            }else return (
                                <>  
                                    <li key={pais.id + pos} className='tipoPais'><input type="checkbox" name='countriesId' value={pos} onChange={changeSelection}></input>{pais.nombrecorto}</li>
                                </>
                            )
                        })}
                    </ul>
                </div>
                {newActividadTuristica.nombre.length == 0 || newActividadTuristica.countriesId.length == 0 ?
                    <span className='buttonRemplazado'>Por favor incluya el Nombre de la actividad y selecione los paises que poseen esta actividad</span>
                    :
                    <button className='botonEnviarActividad' type='submit'>Enviar</button>
                }
            </form>
        </div>
    )
}

export default ActiviTurs