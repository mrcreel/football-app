import 'reflect-metadata'
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class School {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  slug: string

  @Column()
  name: string

  @Column()
  inState: boolean
}
