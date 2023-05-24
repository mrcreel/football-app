const mongoose = require('mongoose')

const SeasonSchema = new mongoose.Schema({
  season: { type: Number },
  slug: {
    type: String,
    ref: 'School'
  },
  district: {type: String},
  divisionWins: {type: Number},
  divisionLosses: {type: Number},
  divisionTies: {type: Number},
  overallWins: {type: Number},
  overallLosses: {type: Number},
  overallTies: {type: Number},
  playoffWins: {type: Number},
  playoffLosses: {type: Number},
  teamPointsFor: {type: Number},
  teamPointsAgainst: {type: Number},
  teamPointsPerGameFor: {type: Number},
  teamPointsPerGameAgainst: {type: Number},
})

module.exports = mongoose.model('Season', SeasonSchema)