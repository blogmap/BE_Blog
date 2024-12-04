import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import  Role from './Role';

@Entity('permissions')
export default class Permission implements IPermission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar", length: 100 , unique: true })
  name!: string; 

  @ManyToMany(() => Role, role => role.permissions)
  @JoinTable()  
  roles: Array<IRole>;

}
