import { Request, Response } from "express";
import { getUser_Ser,getProfile_Ser } from "./userService";
import ResponseBuilder from "../../handler/responseBuilder";

export const getUser = async (req: Request, res: Response) => {
    try {
        const userID = req.params.id;
        
        const user = await getUser_Ser({ userId: userID, res }); 
        
        return ResponseBuilder.Ok(res, user);
        
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        } else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error');
        }
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        console.log('vpp')
        const userID = req.user?.id;
        console.log('userIfd', userID)
        const user = await getProfile_Ser({ userId: userID, res }); 
        
        return ResponseBuilder.Ok(res, user);
        
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        } else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error');
        }
    }
};