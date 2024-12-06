import { Server } from "socket.io";
import { registerSocketEvents } from "./events";
import http from "http";

export const initWebSocket = (server: http.Server) => {
    const io = new Server(server, {
        cors: {
            origin: "*", 
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        registerSocketEvents(socket)
    });

    return io;
};
