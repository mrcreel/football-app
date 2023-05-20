require( 'dotenv' ).config()
const { Schema, model, createConnection } = require( 'mongoose' )

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


const main = async () => {
  const v0 = await createConnection( MONGO_URI + 'v0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, } )
  console.log( 'Connected to v0...' )


  const v1 = await createConnection( MONGO_URI + 'v1?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, } )
  console.log( 'Connected to v1...' )


  const SchoolV1 = await v1.model( 'School', schoolSchema )
  let schoolsV1 = await SchoolV1.find().sort( { slug: 1 } )


  const seasonV1Schema = new Schema( {
    slug: String,
    season: Number,
    district: String,
    name: String,
    mascot: String
  } )
  const Season = v1.model( 'Season', seasonV1Schema )


  schoolsV1.map( async ( school, idx ) => {
    const slug = school.slug
    const seasons = await getSeasonsForSchool( slug )
    console.log(`${slug}: ${seasons.length}`)
    seasons.map( async ( seasonData, idx ) => {
      const games = await getGamesForSchoolBySeason( slug, seasonData.season )
      if ( games[ 0 ] !== undefined ) {
        const season = {}
        season.slug = seasonData.slug
        season.season = seasonData.season
        season.district = seasonData.district
        season.name = games[ 0 ].gameTeamName
        season.mascot = games[ 0 ].gameTeamMascot
        const newSeason = new Season( season )
        await newSeason.save()
      }
    } )
  } )

  // uploadSchools()
}

const getSeasonsForSchool = async ( slug ) => {
  return seasonsData.filter( ( season, idx ) => {
    return season.slug == slug
  } )
}
const getGamesForSchoolBySeason = async ( slug, season ) => {
  return gamesData.filter( ( game, idx ) => {
    return game.gameTeamSlug == slug && game.gameSeason == season
  } )
}

const uploadSchools = async () => {

  const SchoolV0 = await v0.model( 'School', schoolSchema )
  let schoolsV0 = await SchoolV0.find().sort( { slug: 1 } )
  const SchoolV1 = await v1.model( 'School', schoolSchema )
  // Add schools from v0 DB as is
  schoolsV0.map( async ( school, idx ) => {
    const newSchool = await new SchoolV1( {
      slug: school.slug,
      name: school.name,
      inState: school.inState
    } )
    await newSchool.save()
  } )
}

const uploadV1Seasons = async () => { }


main().catch( ( error ) => {
  console.log( error )
  throw new Error( error )
} )
