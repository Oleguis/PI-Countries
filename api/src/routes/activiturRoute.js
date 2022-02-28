const { Router, response } = require('express');
const { Country, ActiviTur } = require('../db');

const router = Router(); 
    

router.get('/', async (req, res, next)=> {
    try {
        let allActivitis = await ActiviTur.findAll({include: [{model: Country, attributes: ["id","nro","nombrecorto"]}]})
        if (!allActivitis) return res.status(404).send('No exite datos de actividades turisticas en la base de datos');
        let respuesta = allActivitis.map(actividad => {
            return {
                id: actividad.id,
                nombre: actividad.nombre,
                dificultad: actividad.dificultad,
                temporada: actividad.temporada,
                duracion: actividad.duracion,
                paises: actividad.countries.map(ele => ele.id),
                countries: actividad.countries
            }
        })
        res.send(respuesta)
    } catch {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    console.log('entró')
    let allActivitis = await ActiviTur.findAll({include: Country})
    if (allActivitis.length > 0 ) return response.send(allActivitis);
    res.status(404).send('No exite datos de actividades turisticas en la base de datos')
});

router.post('/', async (req, res, next) => {
    try {
        if (!Object.keys(req.body).length) return res.status(400).send('Error. No se recibio información de la Actividad a agregar por el Body')
        const bodyObj = req.body;
        if (
            bodyObj.nombre == undefined ||
            bodyObj.nombre == '' ||
            bodyObj.dificultad == undefined ||
            bodyObj.temporada == undefined ||
            !['1','2','3','4','5'].includes(bodyObj.dificultad) ||
            !['verano', 'otoño', 'invierno', 'primavera'].includes(bodyObj.temporada.toLowerCase())) {
                return res.status(400).send('Error. No se recibio la data correctamente, verifique e intente de nuevo.\nDificultad debe ser de 1 hasta 5. Temporada debe ser : "Verano", "Otoño", "Invierno" ó "Primavera"')
            }
        if (!bodyObj.duracion || typeof Number(bodyObj.duracion) !== 'number') bodyObj.duracion = 1;
        const seekActividad = await ActiviTur.findOne({where: {nombre: bodyObj.nombre},
            include: {
                model:Country,
                attributes: ['id','nombrecorto'],
                through: {
                    attributes: [],
                },
            },
            raw: true,
        })
        if (seekActividad) return res.status(400).json(`Error:. Actividad ${bodyObj.nombre} ya existe en la base de datos`)
        const newActividad = await ActiviTur.create(bodyObj)
        await newActividad.addCountry(bodyObj.countriesId)
        res.send(newActividad)
    } catch (error) {
        next(error)
    }
})

module.exports = router;