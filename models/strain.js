const mongoose = require('../db/connection')

const strainSchema = new mongoose.Schema(
  {
    title: String,
    name: String,
    genetics: String,
    parents: String,
    thcContent: String,
    cbdContent: String,
    smellAndFlavor: String,
    effect: String
  }

)

module.exports = mongoose.model('Strain', strainSchema)
