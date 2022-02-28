const initialState = {
	paisesOriginal: [],
	paisesADesplegar: [],
	actividadesTuristicas:[],
	paisDetalle: {},
	displayConfig: {
		ordenadoPor: 1,
		tipoOrdenado: 1,
		continentes: [],
		actividades: [],
	},
	cartaInicial: 0,
	cantidadCartas: 9,
};

export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_PAISES':
			return {
				...state,
				paisesOriginal: action.payload,
				paisesADesplegar: action.payload
			};
			
		case 'GET_ACTIVIDADES':
			const listaDeAactividades = action.payload.sort((a,b) => a.nombre > b.nombre ? 1: a.nombre < b.nombre ? -1: 0)
			return {
				...state,
				actividadesTuristicas: listaDeAactividades,
			};

		case 'GET_PAIS_DETALLE':
			return {
				...state,
				paisDetalle: action.payload
			};
		case 'DISPLAY_CONFIG':
			return {
				...state,
				displayConfig: action.payload
			};
		case 'ACTUALIZAR_DISPLAY':
			return {
				...state,
				paisesADesplegar: action.payload
			};
		case 'CAMBIAR_PAGINA':
			return {
				...state,
				cartaInicial: action.payload
			};
		case 'AGREGAR_ACTIVIDAD':
			console.log('reduce: ', action.payload)
			return {
				...state,
				actividadesTuristicas: [...state.actividadesTuristicas, action.payload]
			}
		default: 
            return state;
	}
}
