const Strain = require('../models/Strain')

const seedData = require('./seeds.json')

Strain.deleteMany()
  .then(() => Strain.insertMany(seedData))
  .then(console.log)
  .catch(console.error)
  .finally(process.exit)
