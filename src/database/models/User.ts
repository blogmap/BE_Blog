import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import Post from "./Post"
@Entity()
@Unique('UNIQUE_USERNAME', ['username'])
@Unique('UNIQUE_MAIL', ['mail'])

export default class User {
    @PrimaryGeneratedColumn()
    id: number  

    @Column()
    username: string

    @Column()
    mail: string

    @Column()
    fullname: string

    @Column()
    dateOfBirth: Date

    @Column()
    password: string

    @Column({ nullable: true })
    role: string; 

    @Column({ type: 'varchar', nullable: true })
    forgetPasswordToken: string | null; 

    @Column({ type: "timestamp", nullable: true })
    forgetPasswordTokenTime: Date | null;

    @OneToMany(() => Post, (post) => post.user, { onDelete: "CASCADE"})
    posts: Array<Post>

    @ManyToMany(() => Post, (post) => post.upVotedUsers, { onDelete: "CASCADE"})
    @JoinTable()
    upVotedPost: Array<Post>
}

module.exports = User