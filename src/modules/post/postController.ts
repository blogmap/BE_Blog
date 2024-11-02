import { Request, Response } from "express";
import { createPost_Ser, deletePost_Ser, unDownVotePost_Ser, unUpVotePost_Ser, upDownVotePost_Ser, upUpVotePost_Ser } from "./postService";
import ResponseBuilder from "../../handler/responseBuilder";

export const createPost = async (req: Request, res: Response) => {
    try {
        const userID = req.user?.id;
        
        const user = await createPost_Ser({ ...req.body, userId: userID }); 
        
        return ResponseBuilder.Ok(res, user);
        
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        } else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error');
        }
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const userID= req.user?.id;
        const postid = req.params.id
        console.log('ne', userID, postid)
        const post = await deletePost_Ser({ postid: postid, userId: userID, res }); 
        
        return ResponseBuilder.Ok(res, post);
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        } else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error');
        }
    }
}

export const unDownVotePost = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const postId = req.params.id;
        const post = await unDownVotePost_Ser({ userId, postId, res})
        return ResponseBuilder.Ok(res, post)
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        }
        else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error')
        }
    }
}

export const unUpVotePost = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const postId = req.params.id;
        const post = await unUpVotePost_Ser({ userId, postId, res})
        return ResponseBuilder.Ok(res, post)
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        }
        else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error')
        }
    }
}


export const upDownVotePost = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const postId = req.params.id;
        const post = await upDownVotePost_Ser({ userId, postId, res})
        return ResponseBuilder.Ok(res, post)
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        }
        else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error')
        }
    }
}

export const upUpVotePost = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const postId = req.params.id;
        const post = await upUpVotePost_Ser({ userId, postId, res})
        return ResponseBuilder.Ok(res, post)
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        }
        else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error')
        }
    }
}