require( 'dotenv' ).config()
const mongoose = require( 'mongoose' )

const {
  schoolsData,
  seasonsData,
  gamesData
} = require( '../scraper/rawData/exports' )

const MONGO_URI = process.env.MONGO_URI_v0

const schoolSchema = new mongoose.Schema( {
  slug: String,
  name: { type: String, required: true },
  inState: { type: Boolean, required: true, default: true }
} )
const School = mongoose.model( 'School', schoolSchema )

const seasonSchema = new mongoose.Schema( {
  season: Number,
  slug: String,
  district: String,
  divisionWins: Number,
  divisionLosses: Number,
  divisionTies: Number,
  overallWins: Number,
  overallLosses: Number,
  overallTies: Number,
  playoffWins: Number,
  playoffLosses: Number,
  teamPointsFor: Number,
  teamPointsAgainst: Number,
  teamPointsPerGameFor: Number,
  teamPointsPerGameAgainst: Number
} )
const Season = mongoose.model( 'Season', seasonSchema )

const gameSchema = new mongoose.Schema( {
  gameSeason: Number,
  gameSeasonWeek: Number,
  gameDate: String,
  gameTeamName: String,
  gameTeamSlug: String,
  gameTeamMascot: String,
  gameLocation: String,
  gameOpponentName: String,
  gameisDistrictGame: Boolean,
  gameResult: String,
  gamePointsFor: Number,
  gamePointsAgainst: Number
} )
const Game = mongoose.model( 'Game', gameSchema )

const main = async () => {
  await mongoose.connect( MONGO_URI+'v0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, } )


  await schoolsData.map(async schoolData => {
    const school = new School({
      slug: schoolData.slug,
      name: schoolData.name,
      inState: schoolData.inState
    })
    await school.save()
  })



  await seasonsData.map(async seasonData => {
    const season = new Season({
      season: seasonData.season,
      slug: seasonData.slug,
      district: seasonData.district,
      divisionWins: seasonData.divisionWins,
      divisionLosses: seasonData.divisionLosses,
      divisionTies: seasonData.divisionTies,
      overallWins: seasonData.overallWins,
      overallLosses: seasonData.overallLosses,
      overallTies: seasonData.overallTies,
      playoffWins: seasonData.playoffWins,
      playoffLosses: seasonData.playoffLosses,
      teamPointsFor: seasonData.teamPointsFor,
      teamPointsAgainst: seasonData.teamPointsAgainst,
      teamPointsPerGameFor: seasonData.teamPointsPerGameFor,
      teamPointsPerGameAgainst: seasonData.teamPointsPerGameAgainst
    })
    await season.save()
    console.log(season)
  })



  // System choked when tried to send whole gamesData to mongo
  const chunk = gamesData.splice( 70000, 20000 )
  await chunk.map( async gameData => {
    const game = new Game( {
      gameSeason: gameData.gameSeason,
      gameSeasonWeek: gameData.gameSeasonWeek,
      gameDate: gameData.gameDate,
      gameTeamName: gameData.gameTeamName,
      gameTeamSlug: gameData.gameTeamSlug,
      gameTeamMascot: gameData.gameTeamMascot,
      gameLocation: gameData.gameLocation,
      gameOpponentName: gameData.gameOpponentName,
      gameisDistrictGame: gameData.gameisDistrictGame,
      gameResult: gameData.gameResult,
      gamePointsFor: gameData.gamePointsFor,
      gamePointsAgainst: gameData.gamePointsAgainst
    } )
    console.clear()
    await game.save()
    console.log( game )
  } )



}

main().catch( ( error ) => {
  console.log( error )
  throw new Error( error )
} )