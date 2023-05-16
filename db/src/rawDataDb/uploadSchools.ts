import 'reflect-metadata'

import { AppDataSource } from '../utils/data-source'

import { schoolsData } from '../../../scraper/rawData/exports.js'
import { School } from './entity/School'

const main = async () => {
  try {
    await AppDataSource.initialize().then(async (connection) => {
      console.log(`Connected to MongoDb`)

      schoolsData.forEach(async (schoolData) => {
        const school = new School()
        school.slug = schoolData.slug
        school.name = schoolData.name
        school.inState = schoolData.inState

        await AppDataSource.manager.save(school)
        console.log('Saved a new tweet with id: ' + school.id)
      })

      console.log('Loading schools from the database...')
      const schools = await AppDataSource.manager.find(School)
      console.log('Loaded schools: ', schools)
    })
  } catch (error) {
    console.error(error)
  }
}

main()
