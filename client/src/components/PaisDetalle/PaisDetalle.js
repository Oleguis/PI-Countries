import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './PaisDetalle.css'
import { get_pais_detalle } from '../../actions';


function PaisDetalle() {
    const dispatch = useDispatch();
    const {paisId} = useParams();
    if (paisId) dispatch(get_pais_detalle(paisId))
    const {paisDetalle, actividadesTuristicas} = useSelector(store => store)
    const listaDeActividades = actividadesTuristicas.filter((act) => act.countriesId.includes(paisDetalle.id))

    return (
        <div className="divdetalleDePais">
            <p className='detalleTitulo'>{paisDetalle.nombrelargo}</p>
            <div className='divDetalleTodo'>
                <div className='divDetalleSoloImagenesyData'>
                    <div className='divContenedorDatayActividades'>
                        <div className="DetalleContenedorImagenes">
                            <div className="detalleContenedorBandera">
                                <div className='divImagenBandera'>
                                    <img className='detalleBandera' src = {`${paisDetalle.bandera}`} alt='Sin Bandera'></img>
                                </div>
                                <p className='detalleNcorto'>Bandera</p>
                            </div>
                            <div className="detalleContenedorEscudo">
                                <div className='divImagenEscudo'>
                                    <img className='detalleEscudo' src = {`${paisDetalle.escudo}`} alt='Sin Escudo'></img>
                                </div>
                                <p className='detalleNcorto'>Escudo</p>
                            </div>
                        </div>
                        <div className="detalleContenedorLabels">
                            <h3>Deltalle y Datos</h3>
                            <div className='divDetalleIds'>
                                <p id='detalleIds'>Id Letras: {paisDetalle.id}</p>
                                <p id='detalleIds'>Id #: {paisDetalle.nro}</p>
                            </div>
                            <div className='divDetalleDeDetalles'>
                                <p className='detalleNcorto'>Nombre corto:</p>
                                <span className='detalleNcorto'>{paisDetalle.nombrecorto}</span>
                            </div>
                            <div className='divDetalleDeDetalles'>
                                <p className='detalleNcorto'>Continente:</p>
                                <span className='detalleNcorto'>{paisDetalle.continente}</span>
                            </div>
                            <div className='divDetalleDeDetalles'>
                                <p className='detalleNcorto'>Capital:</p>
                                <span className='detalleNcorto'>{paisDetalle.capital}</span>
                            </div>
                            <div className='divDetalleDeDetalles'>
                                <p className='detalleNcorto'>Región:</p>
                                <span className='detalleNcorto'>{paisDetalle.region}</span>
                            </div>
                            <div className='divDetalleDeDetalles'>
                                <p className='detalleNcorto'>Sub Región:</p>
                                <span className='detalleNcorto'>{paisDetalle.subregion}</span>
                            </div>
                            <div className='divDetalleDeDetalles'>
                                <p className='detalleNcorto'>Área:</p>
                                <span className='detalleNcorto'>{`${Number(paisDetalle.area).toLocaleString()} Km2.`}</span>
                            </div>
                            <div className='divDetalleDeDetalles'>
                                <p className='detalleNcorto'>Población:</p>
                                <span className='detalleNcorto'>{`${paisDetalle.poblacion.toLocaleString()} Hab.`}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='divListadeActividades'>
                    <h3>Lista de actividades</h3>
                    {listaDeActividades.length > 0 ?
                        <>
                            {listaDeActividades.map((actividad, pos) => <p key={'list' + actividad.id}>{pos + 1 + '.- ' + actividad.nombre}</p>)}
                        </>
                    :
                        <p key={'sinData'}>Sin actividades</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default PaisDetalle