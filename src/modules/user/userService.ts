import { AppDataSource } from "../../database/config";
import Post from "../../database/models/Post"; // Nhập mô hình Post
import User from "../../database/models/User"; // Nhập mô hình User
import ResponseBuilder from "../../handler/responseBuilder";
import MessageCodes from "../../../src/messageCodes"
const postRepository = AppDataSource.getRepository(Post);
import { application, Response } from "express"; // Import Response
import Role from "../../database/models/Role";
import Permission from "../../database/models/Permission";

export const getUser_Ser = async (data: any) => {

    const user = await AppDataSource.getRepository(User).findOne({
        where: { id: data.userId},
    })

    if (!user) {
        return ResponseBuilder.NotFound(data.res);
    }

    return user
   
};

export const getProfile_Ser = async (data: any) => {

    const user = await AppDataSource.getRepository(User).findOne({
        where: { id: data.userId},
    })

    if (!user) {
        return ResponseBuilder.NotFound(data.res);
    }

    return user
   
};