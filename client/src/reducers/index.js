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
			return {
				...state,
				actividadesTuristicas: action.payload.sort((a, b) => a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0),
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
			console.log('--------------\n',action.payload,'\n---------------');
			const newAct = [...state.actividadesTuristicas, action.payload].sort((a,b) => a.nombre > b.nombre ? 1: a.nombre < b.nombre ? -1: 0)
			console.log('--------------\n',newAct,'\n---------------');
			return {
				...state,
				actividadesTuristicas: newAct
			}
		default: 
            return state;
	}
}
