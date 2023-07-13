// DEPENDENCIES
const continents = require('express').Router()
const db = require('../models')
const { Destination } = db
const { supabase } = require('../supabase')

// FIND ALL DESTINATIONS ON SAME CONTINENT
continents.get('/:continent_name', async (req, res) => {
    try {
        let { data } = await supabase
        .from('destinations')
        .select()
        .is('continent_name', req.params.continent_name)
        res.send(data)
    } catch (Error) {
        console.log(Error)
        res.status(500).send('Oh no, could not find destinations')
    }
})

// EXPORT
module.exports = continents