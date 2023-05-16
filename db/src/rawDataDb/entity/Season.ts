import 'reflect-metadata'
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

/*
{
    "season": 1981,
    "slug": "Aberdeen",
    "district": "1-AA",
    "divisionWins": 3,
    "divisionLosses": 6,
    "divisionTies": 0,
    "overallWins": 0,
    "overallLosses": 0,
    "overallTies": 0,
    "playoffWins": 0,
    "playoffLosses": 41,
    "teamPointsFor": 0,
    "teamPointsAgainst": 41,
    "teamPointsPerGameFor": null,
    "teamPointsPerGameAgainst": null
  },
*/

@Entity()
export class Season {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  slug: string

  @Column()
  season: number

  @Column()
  district: string

  @Column()
  districtWins: number

  @Column()
  districtLosses: number

  @Column()
  districtTies: number

  @Column()
  overallWins: number

  @Column()
  overallLosses: number

  @Column()
  overallTies: number

  @Column()
  playoffWins: number

  @Column()
  playoffLosses: number

  @Column()
  teamPointsFor: number

  @Column()
  teamPointsAgainst: number

  @Column()
  teamPointsPerGameFor: number

  @Column()
  teamPointsPerGameAgainst: number
}
