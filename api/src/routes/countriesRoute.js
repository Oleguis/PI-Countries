const {Router} = require('express');
const { Op } = require('sequelize')
const { Country, Continents, ActiviTur } = require('../db');
const axios = require('axios');
const router = Router();    


const actividades = [
    {
        // id: 1,
        nombre: 'Velerismo',
        dificultad: '3',
        temporada: 'otoño',
        duracion: ['1','2','3','4','5','3','2'][Math.floor(Math.random()*10 % 7)],
        countryId : ['BOL','ECU','BRA','ARG','FLK','COL','CHL','GUF','GUY','SUR','PRY','URY','VEN','PER']
    },
    {
        // id: 2,
        nombre: 'Ski',
        dificultad: '5',
        temporada: 'primavera',
        duracion: ['1','2','3','4','5','3','2'][Math.floor(Math.random()*10 % 7)],
        countryId : ['BOL','ECU','BRA','ARG','FLK','COL','CHL','GUF','GUY','SUR','PRY','URY','VEN','PER']
    },
    {
        // id: 3,
        nombre: 'Natación',
        dificultad: '1',
        temporada: 'verano',
        duracion: ['1','2','3','4','5','3','2'][Math.floor(Math.random()*10 % 7)],
        countryId : ['BOL','ECU','GUF','GUY','SUR','PRY','URY','VEN','PER']
    },
    {
        // id: 4,
        nombre: 'Pesca',
        dificultad: '1',
        temporada: 'primavera',
        duracion: ['1','2','3','4','5','3','2'][Math.floor(Math.random()*10 % 7)],
        countryId : ['COD', 'AGO', 'DZA', 'REU', 'COG', 'SLE', 'SSD', 'SYC', 'BWA', 'NAM', 'ETH', 'CMR', 'BDI', 'MLI', 'SHN', 'GNQ', 'LSO', 'COM', 'SOM', 'EGY', 'LBR', 'NGA', 'MOZ', 'ZAF', 'TZA', 'NER', 'MRT', 'MAR', 'ERI', 'GAB', 'ZMB', 'GHA', 'GIN']
    },
    {
        // id: 5,
        nombre: 'Voleiball',
        dificultad: '5',
        temporada: 'primavera',
        duracion: ['1','2','3','4','5','3','2'][Math.floor(Math.random()*10 % 7)],
        countryId : ['TON', 'NIU', 'FJI', 'COK', 'FSM', 'SLB', 'AUS', 'NRU', 'ASM', 'NZL', 'NCL', 'PCN', 'GUM', 'NFK', 'PYF', 'TKL', 'UMI', 'TUV', 'MNP', 'TLS', 'PNG', 'KIR', 'WLF', 'PLW', 'MHL', 'WSM', 'VUT']
    },
    {
        // id: 6,
        nombre: 'BasketBall',
        dificultad: '4',
        temporada: 'invierno',
        duracion: ['1','2','3','4','5','3','2'][Math.floor(Math.random()*10 % 7)],
        countryId : ['TON', 'NIU', 'FJI', 'COK', 'FSM', 'SLB', 'AUS', 'NRU', 'ASM', 'NZL', 'NCL', 'PCN', 'GUM', 'NFK', 'PYF', 'TKL', 'UMI', 'TUV', 'MNP', 'TLS', 'PNG', 'KIR', 'WLF', 'PLW', 'MHL', 'WSM', 'VUT']
    },
    {
        // id: 1,
        nombre: 'Ecoturismo',
        dificultad: '1',
        temporada: 'primavera',
        duracion: ['1','2','3','4','5','3','2'][Math.floor(Math.random()*10 % 7)],
        countryId : ['BOL','ECU','BRA','ARG','FLK','COL','CHL','GUF','GUY','SUR','PRY','URY','VEN','PER']
    },
    {
        // id: 2,
        nombre: 'Patinaje',
        dificultad: '4',
        temporada: 'primavera',
        duracion: ['1','2','3','4','5','3','2'][Math.floor(Math.random()*10 % 7)],
        countryId : ['BOL','ECU','GUF','GUY','SUR','PRY','URY','VEN','PER']
    },
    {
        // id: 3,
        nombre: 'Apicultura',
        dificultad: '5',
        temporada: 'Otoño',
        duracion: ['1','2','3','4','5','3','2'][Math.floor(Math.random()*10 % 7)],
        countryId : ['SUR','PRY','URY','VEN','PER']
    },
    {
        // id: 4,
        nombre: 'Domino',
        dificultad: '1',
        temporada: 'primavera',
        duracion: ['1','2','3','4','5','3','2'][Math.floor(Math.random()*10 % 7)],
        countryId : ['COD', 'AGO', 'DZA', 'REU', 'COG', 'SLE', 'SSD', 'SYC', 'BWA', 'NAM', 'ETH', 'CMR', 'BDI', 'MLI', 'SHN', 'GNQ', 'LSO', 'COM', 'SOM', 'EGY', 'LBR', 'NGA', 'MOZ', 'ZAF', 'TZA', 'NER', 'MRT', 'MAR', 'ERI', 'GAB', 'ZMB', 'GHA', 'GIN']
    },
    {
        // id: 5,
        nombre: 'Caminata en el Bosque',
        dificultad: '5',
        temporada: 'verano',
        duracion: ['1','2','3','4','5','3','2'][Math.floor(Math.random()*10 % 7)],
        countryId : ['TON', 'NIU', 'FJI', 'COK', 'FSM', 'SLB', 'AUS', 'NRU', 'ASM', 'NZL', 'NCL', 'PCN', 'GUM', 'NFK', 'PYF', 'TKL', 'UMI', 'TUV', 'MNP', 'TLS', 'PNG', 'KIR', 'WLF', 'PLW', 'MHL', 'WSM', 'VUT']
    },
    {
        // id: 6,
        nombre: 'Pintura al Oleo',
        dificultad: '1',
        temporada: 'invierno',
        duracion: ['1','2','3','4','5','3','2'][Math.floor(Math.random()*10 % 7)],
        countryId : ['TON', 'NIU', 'FJI', 'COK', 'FSM', 'VEN', 'AUS', 'NRU', 'ASM', 'NZL', 'NCL', 'PCN', 'GUM', 'NFK', 'PYF', 'TKL', 'UMI', 'TUV', 'MNP', 'TLS', 'PNG', 'KIR', 'WLF', 'PLW', 'MHL', 'WSM', 'VUT']
    },
    {
        // id: 7,
        nombre: 'Motociclismo',
        dificultad: '4',
        temporada: 'verano',
        duracion: ['1','2','3','4','5','3','2'][Math.floor(Math.random()*10 % 7)],
        countryId : ['VEN', 'COL']
    },
]

router.get('/', async (req, res, next)=> {
    try {
        if (req.query.name) {
            let pais = req.query.name;
            let encontro = await Country.findOne(
                {
                    where: {  
                        [Op.or]: [
                        {id : {[Op.iLike]: pais}},
                        {nro : isNaN(Number(pais)) ? 999999: Number(pais)},
                        {nombrecorto: {[Op.iLike]: pais}},
                        ]}, 
                    include: ActiviTur
                }
            )
            if (encontro) return res.send(encontro)
            return res.status(404).send(`Error: Pais : ${pais} no se encuentra en la base de datos`)
        }
        let continentes = {};
        let paises = await axios('https://restcountries.com/v3.1/all')
        const allCountriesApi = paises.data.map(ele => {
            if (!continentes[ele.continents[0]]) continentes[ele.continents[0]] = [ele.cca3];
            else continentes[ele.continents[0]].push(ele.cca3);
            return { //let city = {
                "id": ele.cca3,
                "nro": ele.ccn3 ? Number(ele.ccn3) : 0,
                "nombrecorto": ele.translations.spa.common,
                "nombrelargo": ele.translations.spa.official,
                "continente": ele.continents[0],
                "capital": ele.capital ? ele.capital[0] : 'Sin capital',
                "region": ele.region,
                "subregion": ele.subregion,
                "area": ele.area,
                "poblacion": ele.population,
                "bandera": ele.flags.svg,
                "escudo": ele.coatOfArms.svg
            }
            // let [ cityes , creada ] = Country.findOrCreate({
            //     where: { id: city.id },
            //     defaults : city
            // })
            // console.log('\n----------- cityes -----------\n', cityes, '\n--------- end cityes ---------\n')
            // return cityes
        })
        // await Continents.destroy({truncate: true})
        let AllCountrysDb = await Country.findAll()
        if (AllCountrysDb.length == 0) {
            allCountriesApi.sort((a,b) => a.id > b.id ? 1 : -1)
            await Country.bulkCreate(allCountriesApi);
            actividades.forEach(async act => {
                let newActividad = await ActiviTur.create(act)
                await newActividad.addCountry(act.countryId)
            })
            if (Continents) await Continents.bulkCreate(Object.keys(continentes).map(cnt => {
                return {continente : cnt, paises: continentes[cnt].toString()}}))
        } else return res.send(AllCountrysDb);
        res.send(allCountriesApi)
    } catch (error) {
        next(error);
    }
})


router.get('/:pais', async (req, res, next) => {
    try {
    let pais = req.params.pais;
    let encontro = await Country.findOne(
        {
            where: {  
                [Op.or]: [
                    {id : {[Op.iLike]: pais}},
                    {nro : isNaN(Number(pais)) ? 999999: Number(pais)},
                    {nombrecorto: {[Op.iLike]: pais}},
                ]}, 
            include: ActiviTur
        }
    )
    if (encontro) return res.send(encontro)
    res.status(404).send(`Error: Pais : ${pais} no se encuentra en la base de datos`)
    } catch (error) {
        next(error)
    }
})



module.exports = router;