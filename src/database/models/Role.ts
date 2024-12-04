import { Column, Entity,  PrimaryGeneratedColumn,  ManyToMany, JoinTable } from "typeorm";
import User from "./User";
import  Permission  from "./Permission";
@Entity('roles')
export default class Role{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar" , length : 100 , unique: true})
  name!: string   

  @ManyToMany(() => Permission , permissions => permissions.roles, {onDelete:'CASCADE'})
  permissions: Array<Permission>;
  
  @ManyToMany(() => User, user => user.roles)
  users: Array<User>;
  
}




