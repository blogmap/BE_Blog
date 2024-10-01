import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"

@Entity()
@Unique('UNIQUE_USERNAME', ['username'])
@Unique('UNIQUE_MAIL', ['mail'])

export default class User {
    @PrimaryGeneratedColumn()
    id!: number  

    @Column()
    username!: string

    @Column()
    mail!: string

    @Column()
    password!: string
}

module.exports = User