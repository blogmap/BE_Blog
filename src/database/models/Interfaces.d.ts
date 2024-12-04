 interface IComment {
    id: number;
    content: string;
    attachment?: string;
    createdAt: Date;
    user: IUser;
    post: IPost;
}

 interface IPost {
    id: number;
    user: IUser;
    title: string;
    body: string;
    upvote: number;
    downvote: number;
    upVotedUsers: Array<IUser>;
    downVotedUsers: Array<IUser>;
    comments: Array<IComment>;
}

 interface IUser {
    id: number;
    username: string;
    mail: string;
    fullname: string;
    dateOfBirth: Date;
    password: string;
    roles: Array<IRole>;
    forgetPasswordToken: string | null;
    forgetPasswordTokenTime: Date | null;
    posts: Array<IPost>;
    upVotedPost: Array<IPost>;
    downVotedPost: Array<IPost>;
    comments: Array<IComment>;
}

 interface IPermission {
    id: number;
    name: string;
    roles: Array<IRole>;
}

 interface IRole {
    id: number;
    name: string;
    permissions: Array<IPermission>;
    users: Array<IUser>;
}
