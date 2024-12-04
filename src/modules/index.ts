import auth from "./auth";
import role from "./role";
import post from "./post";
import comment from "./comment";
import user from "./user";
import { Router } from "express";

interface IRouters {
    [key: string]: Router;
}

export const routers: IRouters = {
    auth,
    role,
    post,
    comment,
    user,
}
