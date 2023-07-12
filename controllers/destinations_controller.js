// DEPENDENCIES
require('dotenv').config()
const destinations = require('express').Router()
const db = require('../models')
const { Destination } = db
const { createClient } =require( '@supabase/supabase-js')
const DATABASE_URL = 'https://kzpuwykecupbyqdjibud.supabase.co'
const DATABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6cHV3eWtlY3VwYnlxZGppYnVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4NTU3NjgsImV4cCI6MjAwNDQzMTc2OH0.oeGSvX55KS0rCby8Ip1ZdSn5rkkswIOZLVySftlpyqo"

const supabase = createClient(DATABASE_URL,DATABASE_KEY);


// FIND ALL DESTINATIONS
destinations.get('/', async (req, res) => {
    try {
        const {foundDestinations, Error} = await supabase.from("destinations").select()
        return res.send(foundDestinations)
    } catch (Error) {
        console.log(Error)
        res.status(500).send('Oh no, could not find destinations')
    }
})

// FIND A DESTINATION
destinations.get('/:name', async (req, res) => {
    try {
        const foundDestination = await supabase
        .from("desintations")
        .select()
        .eq("name", request.params.id)
    
        res.status(200).json(foundDestination)
    } catch (Error) {
        console.log(Error)
        res.status(500).send('Oh no, could not find destination')
    }
})

// CREATE A DESTINATION
destinations.post('/', async (req, res) => {
    try {
        const newDestination = await Destination.create(req.body)
        res.status(200).json({
            message: 'Successfully created a new destination',
            data: newDestination
        })
    } catch (Error) {
        res.status(500).json(Error)
    }
})

// UPDATE A DESTINATION
destinations.put('/:name', async (req, res) => {
    try {
        const updatedDestination = await Destination.update(req.body, {
            where: {
                name: req.params.name
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedDestination} Destination`
        })
    } catch (Error) {
        res.status(500).json(Error)
    }
})

// DELETE A DESTINATION
destinations.delete('/:name', async (req, res) => {
    try {
        const deletedDestination = await Destination.destroy({
            where: {
                name: req.params.name
            }
        })

        res.status(200).json({
            message: `Successfully deleted ${deletedDestination}`
        })
    } catch (Error) {
        res.status(500).json(Error)
    }
})


// EXPORT
module.exports = destinations