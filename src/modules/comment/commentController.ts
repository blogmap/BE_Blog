import { Request, Response } from "express";
import { createComment_Ser, updateComment_Ser, deleteComment_Ser } from "./commentService";
import ResponseBuilder from "../../handler/responseBuilder";

export const createComment = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const postId = req.params.id;
        const body = req.body
        const post = await createComment_Ser({ userId, postId, res, body})
        return ResponseBuilder.Ok(res, post)
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        }
        else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error')
        }
    }
};


export const updateComment = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const commentId = req.params.id;
        const body = req.body
        const post = await updateComment_Ser({ commentId, userId , res, body })
        return ResponseBuilder.Ok(res, post)
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        }
        else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error')
        }
    }
};



export const deleteComment = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const commentId = req.params.id;
        const post = await deleteComment_Ser({ commentId, userId , res })
        return ResponseBuilder.Ok(res, post)
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        }
        else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error')
        }
    }
};