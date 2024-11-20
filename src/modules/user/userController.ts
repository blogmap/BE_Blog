// import { Request, Response } from "express";
// import { createRole_Ser, getRoleOfUser_Ser, createPermission_Ser, assignRoleToUser_Ser, assignPermissionToRole_Ser } from "./roleService";
// import ResponseBuilder from "../../handler/responseBuilder";

// export const getRoleOfUser = async (req: Request, res: Response) => {
//     try {
//         const userID = req.user?.id;
        
//         const user = await getRoleOfUser_Ser({ userId: userID, res }); 
        
//         return ResponseBuilder.Ok(res, user);
        
//     } catch (e: unknown) {
//         if (e instanceof Error) {
//             return ResponseBuilder.BadRequest(res, e.message);
//         } else {
//             return ResponseBuilder.InternalServerError(res, 'Unexpected error');
//         }
//     }
// };
