import 'reflect-metadata'
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class Game {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  season: number

  @Column()
  week: number

  @Column()
  date: string

  @Column()
  name: string

  @Column()
  slug: string

  @Column()
  mascot: string

  @Column()
  location: string

  @Column()
  opponent: string

  @Column()
  isDistrict: boolean

  @Column()
  result: string

  @Column()
  pointsFor: number

  @Column()
  pointsAgainst: number
}

/*

{"gameSeason":1981,"gameSeasonWeek":10,"gameDate":"","gameTeamName":"Aberdeen","gameTeamUrl":"Aberdeen","gameTeamMascot":"Bulldogs","gameLocation":"","gameOpponentName":"Hamilton","gameisDistrictGame":false,"gameResult":"L","gamePointsFor":0,"gamePointsAgainst":41}

*/
