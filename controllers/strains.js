const express = require('express')
const Name = require('../models/strain')
const {
  handleValidateId,
  handleRecordExists
} = require('../middleware/custom_errors')

const router = express.Router()

// GET ALL STRAINS
router.get('/', (req, res, next) => {
  Name.find()
    .then(strain => { res.json(strain) })
    .catch(next)
})

// GET STRAINS BY ID
router.get('/:id', handleValidateId, (req, res, next) => {
  // console.log(req)
  Name.findById(req.params.id)
    .then(strain => { res.json(strain) })
    .catch(next)
})

// CREATE|ADD NEW STRAIN
router.post('/strains', (req, res, next) => {
  Name.create(req.body)
    .then((strain) => res.json(strain))
    .catch(next)
})

// EDIT STRAIN BY ID
router.put('/:id', handleValidateId, (req, res, next) => {
  Name.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  })
    .then(handleRecordExists)
    .then((strain) => res.json(strain))
    .catch(next)
})

// DELETE STRAIN BY ID
router.delete('/:id', handleValidateId, (req, res, next) => {
  Name.findOneAndDelete({
    _id: req.params.id
  })
    .then(handleRecordExists)
    .then((strain) => res.json(strain))
    .catch(next)
})

module.exports = router
