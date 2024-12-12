import { Socket } from "socket.io";

export const registerSocketEvents = (socket: Socket) => {
    console.log(`client connected: ${socket.id}`);

    socket.on("message", (data) => {
        console.log(`Data post to ${socket.id} sever: ${data}`)
        socket.emit("response", "message received")
    })

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    })
}