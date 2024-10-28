import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique, OneToMany, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import Post from "./Post"
import Role from "./Role"
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

    @ManyToMany(() => Role, role => role.users , {onDelete:'CASCADE'})
    @JoinTable({
        name: 'user_roles',
        joinColumn:{name: 'user_id' , referencedColumnName: 'id' },
        inverseJoinColumn:{name:'role_id', referencedColumnName: 'id' },
    })
    roles?: Role[];

    @Column({ type: 'varchar', nullable: true })
    forgetPasswordToken: string | null; 

    @Column({ type: "timestamp", nullable: true })
    forgetPasswordTokenTime: Date | null;
    
    @OneToMany(() => Post, (post) => post.user, { onDelete: "CASCADE"})
    posts: Array<Post>

    @ManyToMany(() => Post, (post) => post.upVotedUsers, { onDelete: "CASCADE"})
    @JoinTable()
    upVotedPost: Array<Post>

    @ManyToMany(() => Post, (post) => post.downVotedUsers, { onDelete: "CASCADE"})
    @JoinTable()
    downVotedPost: Array<Post>
}

module.exports = User