import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { School } from '../entity/School'
/*
import { Season } from './entity/Season'
import { Game } from './entity/Game'
*/

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: 'mongodb+srv://michael:michael_password@ms-prep-football-archiv.1dbe7gc.mongodb.net/rawData?retryWrites=true&w=majority',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  entities: [School], //, Season, Game],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
})
