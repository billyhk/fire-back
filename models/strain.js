const mongoose = require('../db/connection')

const strainSchema = mongoose.Schema(
  {
    title: String,
    strain: String,
    genetics: String,
    parents: String,
    thc: String,
    cbd: String,
    smellandflavour: String,
    effect: String
  }

)

module.exports = mongoose.model('Strain', strainSchema)
