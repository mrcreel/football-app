const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
  gameSeason: { type: Number },
  gameSeasonWeek: { type: Number },
  gameDate: {type: String},
  gameTeamName: {type: String},
  gameTeamSlug: {type: String},
  gameTeamMascot: {type: String},
  gameLocation: {type: String},
  gameOpponentName: {type: String},
  gameisDistrictGame: {type: Boolean},
  gameResult: {type: String},
  gamePointsFor: { type: Number },
  gamePointsAgainst: { type: Number }
})

module.exports = mongoose.model('Game', GameSchema)