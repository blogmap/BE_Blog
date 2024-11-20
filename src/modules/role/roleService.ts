import { AppDataSource } from "../../database/config";
import Post from "../../database/models/Post"; // Nhập mô hình Post
import User from "../../database/models/User"; // Nhập mô hình User
import ResponseBuilder from "../../handler/responseBuilder";
import MessageCodes from "../../../src/messageCodes"
const postRepository = AppDataSource.getRepository(Post);
import { application, Response } from "express"; // Import Response
import Role from "../../database/models/Role";
import Permission from "../../database/models/Permission";

export const getRoleOfUser_Ser = async (data: any) => {

    const user = await AppDataSource.getRepository(User).findOne({
        where: { id: data.userId},
        relations: ["roles"]
    })

    if (!user) {
        return ResponseBuilder.NotFound(data.res);
    }

    return user.roles
   
};

export const createRole_Ser = async (data: any) => {

    const existRoleName = await AppDataSource.getRepository(Role).find({
        where: { name: data.roleName}
    })

    if ((await existRoleName).length) {
        return ResponseBuilder.BadRequest(data.res)
    }
    await AppDataSource.getRepository(Role).save({ name: data.roleName})

    return existRoleName
   
};

export const createPermission_Ser = async (data: any) => {

    const existPermissionName = await AppDataSource.getRepository(Permission).find({
        where: { name: data.PermissionName}
    })

    if ((await existPermissionName).length) {
        return ResponseBuilder.BadRequest(data.res)
    }
    await AppDataSource.getRepository(Permission).save({ name: data.PermissionName})
    console.log('existPermissionName', existPermissionName)
    return existPermissionName
   
};

export const assignRoleToUser_Ser = async (data: any) => {

    const user = await AppDataSource.getRepository(User).findOne({
        where: {id: data.userId},
        relations: ["roles"],
    })
    if (!user){
        return ResponseBuilder.NotFound(data.res)
    }
    const role = await AppDataSource.getRepository(Role).findOne({
        where: {id: data.roleId}
    })
    if (!role) {
        return ResponseBuilder.NotFound(data.res)
    }
    console.log(user, role)
    if (user.roles.some(existingRole => existingRole.id === role.id)) {
        return ResponseBuilder.BadRequest(data.res, "User already has this role");
    }

    user.roles.push(role);

    await AppDataSource.getRepository(User).save(user);

    return role
    
   
};


export const assignPermissionToRole_Ser = async (data: any) => {

    const role = await AppDataSource.getRepository(Role).findOne({
        where: {id: data.roleId},
        relations: ["permissions"],
    })
    if (!role){
        return ResponseBuilder.NotFound(data.res)
    }
    const permission = await AppDataSource.getRepository(Permission).findOne({
        where: {id: data.permissionId}
    })
    if (!permission) {
        return ResponseBuilder.NotFound(data.res)
    }
    // console.log(user, role)
    if (role.permissions.some(existingPermission => existingPermission.id === permission.id)) {
        return ResponseBuilder.BadRequest(data.res, "Role already has this permision");
    }

    role.permissions.push(permission);

    await AppDataSource.getRepository(Role).save(role);

    return permission
    
   
};