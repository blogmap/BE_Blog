import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import User from './User';
import Post from './Post';

@Entity()
export default class Comment implements IComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    
    @Column({ nullable: true })
    attachment: string;


    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne("User", "comments", { onDelete: 'CASCADE' })
    user: IUser;

    @ManyToOne("Post", "comments", { onDelete: 'CASCADE' })
    post: IPost;
}

