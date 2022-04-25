// DEPENDENCIES
const { Op } = require('sequelize')
const bands = require('express').Router()
const db = require('../models')
const { Band } = db

// FIND ALL BANDS
bands.get('/all', async (req, res) => {
  try {
      const foundBands = await Band.findAll()
      res.status(200).json(foundBands)
  } catch (error) {
      res.status(500).json(error)
  }
})


// FIND BANDS BY NAME, ID, or GENRE BASED on QUERY SENT
bands.get('/', async (req, res) => {
  try {
    const foundBandNames = await Band.findAll({
      order: [ [ 'available_start_time', 'ASC' ] ],
      where: {
        name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
      }
    })

    const foundBandIds = await Band.findAll({
      order: [ [ 'available_start_time', 'ASC' ] ],
      where: {
        band_id: { [Op.eq]: req.query.id }
      }
    })

    const foundBandGenres = await Band.findAll({
      order: [ [ 'available_start_time', 'ASC' ] ],
      where: {
        genre: { [Op.like]: `%${req.query.genre ? req.query.genre : ''}%` }
      }
    })

    if(req.query.id) {
      res.status(200).json(foundBandIds)
    }

    if(req.query.name) {
      res.status(200).json(foundBandNames)
    }

    if(req.query.genre) {
      res.status(200).json(foundBandGenres)
    }

  } catch (error) {
      res.status(500).json(error)
  }
})

// FIND A SPECIFIC BAND
bands.get('/:id', async (req, res) => {
  try {
      const foundBand = await Band.findOne({
          where: { band_id: req.params.id }
      })
      res.status(200).json(foundBand)
  } catch (error) {
      res.status(500).json(error)
  }
})

// FIND A SPECIFIC BAND BY NAME
bands.get('/name/:name', async (req, res) => {
  try {
      const foundBand = await Band.findOne({
          where: { name: req.params.name }
      })
      res.status(200).json(foundBand)
  } catch (error) {
      res.status(500).json(error)
  }
})

// CREATE A BAND
bands.post('/', async (req, res) => {
  try {
      const newBand = await Band.create(req.body)
      res.status(200).json({
          message: 'Successfully inserted a new band',
          data: newBand
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// UPDATE A BAND
bands.put('/:id', async (req, res) => {
  try {
      const updatedBands = await Band.update(req.body, {
          where: {
              band_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully updated ${updatedBands} band(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// DELETE A BAND
bands.delete('/:id', async (req, res) => {
  try {
      const deletedBands = await Band.destroy({
          where: {
              band_id: req.params.id
          }
      })
      res.status(200).json({
          message: `Successfully deleted ${deletedBands} band(s)`
      })
  } catch(err) {
      res.status(500).json(err)
  }
})

// EXPORT
module.exports = bands
