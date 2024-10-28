import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import  Role from './Role';

@Entity('permissions')
export default class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar", length: 100 , unique: true })
  name!: string; 

  @ManyToMany(() => Role, role => role.permissions)
  roles?: Role[];

}
module.exports = Permission