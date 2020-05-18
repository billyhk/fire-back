const express = require('express')
const Strain = require('../models/strain')

const router = express.Router()

// GET /:strain
router.get('/:strain', (req, res) => {
  Strain.find({ strain: req.params.strain })
    .then(strain => { res.json(strain) })
})

// GET /:id
router.get('/:strain/:id', (req, res, next) => {
  Strain.findById(req.params.id)
    .then(strainID => { res.json(strainID) })
    .catch(next)
})

module.exports = router
