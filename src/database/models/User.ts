import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import Role from "./Role"
import Comment from "./Comment"
import Post from "./Post"
@Entity()
@Unique('UNIQUE_USERNAME', ['username'])
@Unique('UNIQUE_MAIL', ['mail'])

export default class User implements IUser {
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

    @ManyToMany("Role", "users", {onDelete:'CASCADE'})
    @JoinTable()
    roles: Array<IRole>;

    @Column({ type: 'varchar', nullable: true })
    forgetPasswordToken: string | null; 

    @Column({ type: "timestamp", nullable: true })
    forgetPasswordTokenTime: Date | null;
    
    @OneToMany("Post", "user", { onDelete: "CASCADE"})
    posts: Array<IPost> 

    @ManyToMany("Post", "upVotedUsers", { onDelete: "CASCADE"})
    @JoinTable()
    upVotedPost: Array<IPost>

    @ManyToMany("Post", "downVotedUsers", { onDelete: "CASCADE"})
    @JoinTable()
    downVotedPost: Array<IPost>

    @OneToMany("Comment", "user", { onDelete: "CASCADE" })
    comments: Array<IComment>;


}
