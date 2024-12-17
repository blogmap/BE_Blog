import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    ManyToMany,
    OneToMany,
    JoinTable,
} from "typeorm";
import User from "./User";
import Comment from "./Comment";

@Entity()
export default class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
    user: User;

    @Column()
    title: string;

    @Column()
    body: string;

    @Column({ default: 0 })
    upvote: number;

    @Column({ default: 0 })
    downvote: number;

    @ManyToMany(() => User, (user) => user.upVotedPost, { onDelete: "CASCADE" })
    @JoinTable() 
    upVotedUsers: User[];

    @ManyToMany(() => User, (user) => user.downVotedPost, { onDelete: "CASCADE" })
    @JoinTable() 
    downVotedUsers: User[];

    @OneToMany(() => Comment, (comment) => comment.post, { onDelete: "CASCADE" })
    comments: Comment[];

    @Column({ nullable: true }) 
    imageUrl: string;
}
