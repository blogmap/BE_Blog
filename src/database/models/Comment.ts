import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import User from './User';
import Post from './Post';

@Entity()
export default class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    
    @Column({ nullable: true })
    attachment: string;


    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
    post: Post;
}

module.exports = Comment;
