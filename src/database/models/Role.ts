import { Column, Entity,  PrimaryGeneratedColumn,  ManyToMany, JoinTable } from "typeorm";
import User from "./User";
import  Permission  from "./Permission";
@Entity('roles')
export default class Role{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar" , length : 100 , unique: true})
  name!: string   

  @ManyToMany(() => Permission , permissions => permissions.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {name: 'role_id', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'permission_id', referencedColumnName: 'id'}
  })  
  permissions?: Permission[];
  
  @ManyToMany(() => User, user => user.roles)
  users?: User[];
  
}

module.exports = Role



