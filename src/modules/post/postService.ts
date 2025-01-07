import { AppDataSource } from "../../database/config";
import Post from "../../database/models/Post"; 
import User from "../../database/models/User"; 
import Comment from "../../database/models/Comment";
import ResponseBuilder from "../../handler/responseBuilder";
import MessageCodes from "../../../src/messageCodes"
const postRepository = AppDataSource.getRepository(Post);
import { application, Response } from "express"; 
import axios from 'axios';
export const createPost_Ser = async (data: any) => {
    const postRepository = AppDataSource.getRepository(Post); 
  
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: data.userId },
    });
  
    if (!user) {
      throw new Error("User not found"); 
    }
  
    const newPost = new Post();
    newPost.title = data.title; 
    newPost.body = data.body;
    newPost.imageUrl = data.imageUrl; 
    newPost.user = user; 
  
    await postRepository.save(newPost);
    console.log('postid', newPost.id.toString());
    console.log('userid', user.id.toString());

    try {
        await axios.post('https://ai.maind.blog/add', {
            id: newPost.id.toString(),
            title: newPost.title,
            content: newPost.body,
            author: user.id.toString(),
            created: Date.now()
        });
    } catch (qdrantError) {
        console.error('Failed to sync post with Qdrant:', qdrantError);
        throw new Error('Post created but failed to sync with Qdrant');
    }
  
    return newPost; 
  };

export const deletePost_Ser = async (data: any) => {
    try {
        console.log('id post', data.postid, data.userId)
        const existedPost = await AppDataSource.getRepository(Post).findOne({
            where: { id: data.postid },
            relations: { user: true },
        });

        if (!existedPost) {
            return ResponseBuilder.NotFound(data.res);
        }
        console.log(existedPost.user.id)
        if (existedPost.user.id !== parseInt(data.userId)) {
            return ResponseBuilder.Forbidden(data.res, MessageCodes.NOT_OWN_POST);
        }

        await AppDataSource.getRepository(Post).delete(data.postid);
        return existedPost
    } catch (err) {
        return ResponseBuilder.InternalServerError(data.res, err);
    }
};

export const unDownVotePost_Ser = async (data: any) => {
    try {
        const existedPost = await AppDataSource.getRepository(Post).findOne({
            where: {id: data.postId},
            relations: { user: true}
        })
        if (!existedPost)
            return ResponseBuilder.NotFound(data.res)
        if (existedPost.user.id !== parseInt(data.userId)) {
            ResponseBuilder.Forbidden(data.res, MessageCodes.NOT_OWN_POST)
        }
        if (existedPost.downvote > 0)
        existedPost.downvote--;
        await AppDataSource.getRepository(Post).save(existedPost); 
        return existedPost;
    } catch (err) {
        return ResponseBuilder.InternalServerError(data.res, err);
    }
}

export const unUpVotePost_Ser = async (data: any) => {
    try {
        const existedPost = await AppDataSource.getRepository(Post).findOne({
            where: {id: data.postId},
            relations: { user: true}
        })
        if (!existedPost)
            return ResponseBuilder.NotFound(data.res)
        if (existedPost.user.id !== parseInt(data.userId)) {
            ResponseBuilder.Forbidden(data.res, MessageCodes.NOT_OWN_POST)
        }
        if ( existedPost.upvote>0 )
            existedPost.upvote--;
        await AppDataSource.getRepository(Post).save(existedPost); 

        return existedPost;
    } catch (err) {
        return ResponseBuilder.InternalServerError(data.res, err);
    }
}

export const upDownVotePost_Ser = async (data: any) => {
    try {
        const existedPost = await AppDataSource.getRepository(Post).findOne({
            where: {id: data.postId},
            relations: { user: true}
        })
        if (!existedPost)
            return ResponseBuilder.NotFound(data.res)
        if (existedPost.user.id !== parseInt(data.userId)) {
            ResponseBuilder.Forbidden(data.res, MessageCodes.NOT_OWN_POST)
        }
        existedPost.downvote++;
        await AppDataSource.getRepository(Post).save(existedPost); 

        return existedPost;
    } catch (err) {
        return ResponseBuilder.InternalServerError(data.res, err);
    }
}

export const upUpVotePost_Ser = async (data: any) => {
    try {
        const existedPost = await AppDataSource.getRepository(Post).findOne({
            where: {id: data.postId},
            relations: { user: true}
        })
        if (!existedPost)
            return ResponseBuilder.NotFound(data.res)
        if (existedPost.user.id !== parseInt(data.userId)) {
            ResponseBuilder.Forbidden(data.res, MessageCodes.NOT_OWN_POST)
        }
        existedPost.upvote++;
        await AppDataSource.getRepository(Post).save(existedPost); 

        return existedPost;
    } catch (err) {
        return ResponseBuilder.InternalServerError(data.res, err);
    }
}

export const getAllPost_Ser = async (data: { res: Response, page: number, pageSize: number }) => {
    try {
        const { page, pageSize } = data;

        const skip = (page - 1) * pageSize;
        const take = pageSize;

        const [allPost, total] = await AppDataSource.getRepository(Post).findAndCount({
            relations: {
                user: true,
                comments: {
                    user: true
                }
            },
            skip, 
            take 
        });

        if (allPost.length === 0) {
            return ResponseBuilder.NotFound(data.res);
        }

        const result = {
            total, 
            page, 
            pageSize, 
            totalPages: Math.ceil(total / pageSize), 
            data: allPost 
        };

        return result;
    } catch (err) {
        return ResponseBuilder.InternalServerError(data.res, err);
    }
};
