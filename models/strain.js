const mongoose = require('../db/connection')

const strainSchema = new mongoose.Schema(
  {
    title: String,
    name: String,
    genetics: String,
    plantCategory: String,
    popular: Boolean,
    parents: String,
    thcContent: String,
    cbdContent: String,
    smellAndFlavor: String,
    effect: String,
    info: String,
    img: String
  }

)

module.exports = mongoose.model('Strain', strainSchema)
