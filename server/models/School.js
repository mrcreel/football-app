const mongoose = require('mongoose')

const SchoolSchema = new mongoose.Schema({
  slug: {type: String},
  name: {type: String},
  inState: {type: Boolean}
})

module.exports = mongoose.model('School', SchoolSchema)