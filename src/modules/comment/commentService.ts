
import Post from "../../database/models/Post"; 
import User from "../../database/models/User"; 
import ResponseBuilder from "../../handler/responseBuilder";
import MessageCodes from "../../../src/messageCodes"
import { AppDataSource } from "../../database/config";
import Comment from "../../database/models/Comment";
const commentRepository =  AppDataSource.getRepository(Comment)
const userRepository =  AppDataSource.getRepository(User)
const postRepository =  AppDataSource.getRepository(Post)

import { application, Response } from "express"; 

export const createComment_Ser =  async (data: any) => {
    try {
        const existUser = await userRepository.findOne({
            where: {id: data.userId}
        })
        console.log(existUser)
        const existedPost = await postRepository.findOne({
            where: {id: data.postId}
        })
        if (!existUser || !existedPost) {
            return ResponseBuilder.NotFound(data.res, "User or Post not found");
        }
        const newComment = new Comment();
        if (data.body.attachment) newComment.attachment = data.body.attachment
        newComment.content = data.body.content
        newComment.user = existUser
        newComment.post = existedPost
        await commentRepository.save(newComment);
        return existedPost
    } catch (err) {
        return ResponseBuilder.InternalServerError(data.res, err);
    }
    
};


export const updateComment_Ser =  async (data: any) => {
    try {
        const existComment = await commentRepository.findOne({
            where: {id: data.commentId},
            relations: {
                user: true,
                post: {
                    user: true
                }
            }
        })
        if (!existComment)
            return ResponseBuilder.NotFound(data.res, "COMMENT_NOT_FOUND")
        if (existComment.user.id != data.userId)
            return ResponseBuilder.Forbidden(data.res, "NOT_OWN_COMMENT")
        await commentRepository.update(data.commentId, data.body)
        return existComment
    } catch (err) {
        return ResponseBuilder.InternalServerError(data.res, err);
    }
    
};

export const deleteComment_Ser =  async (data: any) => {
    try {
        const existComment = await commentRepository.findOne({
            where: {id: data.commentId},
            relations: {
                user: true,
                post: {
                    user: true
                }
            }
        })
        if (!existComment)
            return ResponseBuilder.NotFound(data.res, "COMMENT_NOT_FOUND")
        if (existComment.user.id != data.userId)
            return ResponseBuilder.Forbidden(data.res, "NOT_OWN_COMMENT")
        await commentRepository.delete(data.commentId)
        return existComment
    } catch (err) {
        return ResponseBuilder.InternalServerError(data.res, err);
    }
    
};
