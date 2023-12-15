import { GlobalBaseEntity } from 'src/global/global.entity';
import { Column, Entity, Unique } from 'typeorm';
import { EUserStatus } from './user.enum';

@Entity()
@Unique(['username'])
export class UserEntity extends GlobalBaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  age: number;

  @Column()
  status: EUserStatus;
}
