import 'reflect-metadata'

import { AppDataSource } from '../utils/data-source'

import { gamesData } from '../../../scraper/rawData/exports.js'
import { Game } from './entity/Game'

const main = async () => {
  try {
    await AppDataSource.initialize().then(async (connection) => {
      console.log(`Connected to MongoDb`)

      gamesData.forEach(async (gameData) => {
        const game = new Game()
        game.season = gameData.gameSeason
        game.week = gameData.gameSeasonWeek
        game.date = gameData.gameDate
        game.name = gameData.gameTeamName
        game.slug = gameData.gameTeamUrl
        game.mascot = gameData.gameTeamMascot
        game.location = gameData.gameLocation
        game.opponent = gameData.gameOpponentName
        game.isDistrict = gameData.gameisDistrictGame
        game.result = gameData.gameResult
        game.pointsFor = gameData.gamePointsFor
        game.pointsAgainst = gameData.gamePointsAgainst

        await AppDataSource.manager.save(game)
        console.log('Saved a new game with id: ' + game.id)
      })
    })
  } catch (error) {
    console.error(error)
  }
}

main()
