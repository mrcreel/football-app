const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { Schema, createConnection, model } = require( 'mongoose' )


const MONGO_URI = process.env.MONGO_URI

const {
  schoolsData,
  seasonsData,
  gamesData
} = require( '../scraper/rawData/exports' )

const v1 = createConnection( MONGO_URI + '/v1?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, } )
console.log( 'Connected to v1...' )

const seasonSchema = new Schema({
  season: Number,
  slug: String,
  district: String,
  schoolName: String,
  schoolMascot: String
})
const Season = v1.model('Season', seasonSchema)
const seasons = []

const main = async () => {


  // let schools = schoolsData.slice(0,1)


  schoolsData.filter((school, idx) => {
    const slug = school.slug
    let schoolName = school.name
    let schoolMascot = ''
    seasonsData.filter(async (seasonData, idx) => {
      if(seasonData.slug == slug){
        const season = {}


        const game = await gamesData.filter(async (gameData, idx) => {
          return gameData.gameTeamSlug == slug && gameData.gameSeason == seasonData.season
        })[0]
        season.slug = slug
        season.season = seasonData.season
        season.district = seasonData.district

        if(game !== undefined){
          schoolName = game.gameTeamName
          schoolMascot = game.gameTeamMascot
        }
        season.schoolName = schoolName
        season.schoolMascot = schoolMascot


        const newSeason = new Season(season)
        console.log(newSeason);
        seasons.push(newSeason)
      }
    })
  })



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



main()
  .then(
    async () => {

      console.log(seasons)
      Season.create(seasons)
    }
  )
  .catch( ( error ) => {
  console.log( error )
  throw new Error( error )
} )
