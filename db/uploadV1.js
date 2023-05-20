require( 'dotenv' ).config()
const {Schema, model, createConnection} = require( 'mongoose' )

const MONGO_URI = process.env.MONGO_URI

const {
  schoolsData,
  seasonsData,
  gamesData
} = require( '../scraper/rawData/exports' )

const schoolSchema = new Schema( {
  slug: String,
  name: { type: String, required: true },
  inState: { type: Boolean, required: true, default: true }
} )
const seasonV0Schema = new Schema( {
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
const gameV0Schema = new Schema( {
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


const main = async () => {
  const v0 = await createConnection(MONGO_URI+'v0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, })
  console.log('Connected to v0...')
  const SchoolV0 = await v0.model( 'School', schoolSchema )
  const SeasonV0 = await v0.model( 'Season', seasonV0Schema )
  const GameV0 = await v0.model( 'Game', gameV0Schema )
  // const schoolsV0 = await SchoolV0.find().sort({slug: 1})

  const v1 = await createConnection(MONGO_URI+'v1?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, })
  console.log('Connected to v1...')
  const SchoolV1 = await v1.model( 'School', schoolSchema )

  /*
  Add schools from v0 DB as is
  schoolsV0.map(async (school, idx) => {
    const newSchool = await new SchoolV1({
      slug: school.slug,
      name: school.name,
      inState: school.inState
    })
    // await newSchool.save()
  })
  */

 const seasonV1Schema = new Schema({
   slug: String,
   season: Number,
   district: String,
   name: String,
   mascot: String
  })
  const SeasonV1 = await v1.model( 'Season', seasonV1Schema )

  let schoolsV1 = await SchoolV1.find().sort({slug: 1})
  schoolsV1 = schoolsV1.slice(0, 2)

  schoolsV1.map(async (school, idx) => {
    const slug = school.slug
    let seasons = await SeasonV0.find({slug: slug}).sort({season: 1})
    seasons = seasons.slice(0,2)
    await console.log(`${slug}: ${seasons.length}`)



    seasons.map(async (season, idx) => {
      const district = season.district
      const games = await GameV0.find({gameTeamSlug: slug, gameSeason: season.season})
      const name = games[0].gameTeamName

      await console.log(name);
      // console.log(game);
      // const newSeason = await new SeasonV1({
      //   slug,
      //   season: season.season,
      //   district,
      //   name: game.gameTeamName,
      //   mascot: game.gameTeamMascot
      // })
      // // await newSeason.save()
      // // console.clear()
      // console.log(newSeason)
    })



  })



}



main().catch( ( error ) => {
  console.log( error )
  throw new Error( error )
} )
