import { Request, Response } from "express";
import { createRole_Ser, getRoleOfUser_Ser, createPermission_Ser, assignRoleToUser_Ser, assignPermissionToRole_Ser } from "./roleService";
import ResponseBuilder from "../../handler/responseBuilder";

export const getRoleOfUser = async (req: Request, res: Response) => {
    try { 
        const userID = req.user?.id;
        
        const user = await getRoleOfUser_Ser({ userId: userID, res }); 
        
        return ResponseBuilder.Ok(res, user);
        
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        } else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error');
        }
    }
};

export const createRole = async (req: Request, res: Response) => {
    try {
        const roleName = req.body.roleName;

        const role = await createRole_Ser({ roleName, res})
        
        return ResponseBuilder.Ok(res, role);
        
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        } else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error');
        }
    }
};

export const createPermission = async (req: Request, res: Response) => {
    try {
        const PermissionName = req.body.PermissionName;

        const role = await createPermission_Ser({ PermissionName, res})
        
        return ResponseBuilder.Ok(res, role);
        
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        } else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error');
        }
    }
};

export const assignRoleToUser = async (req: Request, res: Response) => {
    try {
        const { userId, roleId } = req.body;
        console.log(userId, roleId)
        const role = await assignRoleToUser_Ser({ userId, roleId , res})
        
        return ResponseBuilder.Ok(res, role);
        
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        } else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error');
        }
    }
};
export const assignPermissionToRole = async (req: Request, res: Response) => {
    try {
        const { roleId, permissionId } = req.body;
        // console.log(userId, roleId)
        const permision = await assignPermissionToRole_Ser({ roleId, permissionId , res})
        
        return ResponseBuilder.Ok(res, permision);
        
    } catch (e: unknown) {
        if (e instanceof Error) {
            return ResponseBuilder.BadRequest(res, e.message);
        } else {
            return ResponseBuilder.InternalServerError(res, 'Unexpected error');
        }
    }
};


