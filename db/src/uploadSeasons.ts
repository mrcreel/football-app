import 'reflect-metadata'

import { AppDataSource } from './data-source'

import { seasonsData } from '../../scraper/rawData/exports.js'
import { Season } from './entity/Season'

const main = async () => {
  try {
    await AppDataSource.initialize().then(async (connection) => {
      console.log(`Connected to MongoDb`)

      seasonsData.forEach(async (seasonData) => {
        const season = new Season()
        season.season = seasonData.season
        season.slug = seasonData.slug
        season.district = seasonData.district
        season.districtWins = seasonData.divisionWins
        season.districtLosses = seasonData.divisionLosses
        season.districtTies = seasonData.divisionTies
        season.overallWins = seasonData.overallWins
        season.overallLosses = seasonData.overallLosses
        season.overallTies = seasonData.overallTies
        season.playoffWins = seasonData.playoffWins
        season.playoffLosses = seasonData.playoffWins
        season.teamPointsFor = seasonData.teamPointsFor
        season.teamPointsAgainst = seasonData.teamPointsAgainst
        season.teamPointsPerGameFor = seasonData.teamPointsPerGameFor
        season.teamPointsPerGameAgainst = seasonData.teamPointsAgainst

        await AppDataSource.manager.save(season)
        console.log('Saved a new season with id: ' + season.id)
      })
    })
  } catch (error) {
    console.error(error)
  }
}

main()
