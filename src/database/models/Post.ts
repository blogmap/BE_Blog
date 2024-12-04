import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany, JoinColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm"
import User from "./User"
import { userInfo } from "os"
import Comment from "./Comment"

@Entity()
export default class Post implements IPost {
    @PrimaryGeneratedColumn()
    id: number  

    @ManyToOne("User", "posts", { onDelete: "CASCADE"})
    user: IUser

    @Column()
    title: string

    @Column()
    body: string

    @Column({default: 0})
    upvote: number

    @Column({default: 0})
    downvote: number

    @ManyToMany("User", "upVotedPost", { onDelete: "CASCADE"})
    upVotedUsers:Array<IUser>

    @ManyToMany("User", "downVotedPost", { onDelete: "CASCADE"}) 
    downVotedUsers: Array<IUser>

    @OneToMany("Comment", "post", { onDelete: "CASCADE" })
    comments: Array<IComment>;
}
