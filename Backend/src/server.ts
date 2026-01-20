import express from "express";
import { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { createCode } from "./game/lobby";

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.static("public"));

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {origin: "*"}
})

let code = ""
let players: Array<string> = []

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

app.get("/room-code", (req: Request, res: Response) => {
    code = createCode();
    res.send(code)
})

app.post("/join", (req: Request, res: Response) => {
    const roomCode = req.body.rc;
    const userName = req.body.user;

    if (roomCode === code) {
        res.send("IN")
        if (!players.includes(userName)){
            players.push(userName)
            console.log(`${userName} joined`)

        io.emit("player-joined", {userName})

        } else {
            console.log(`${userName} rejoined`)
        }
        
    } else {
        res.send("RE")
    }
})

app.get("/lobby", (req: Request, res: Response) => {
    res.send(players)
})

//10.0.0.212
httpServer.listen(3001, "0.0.0.0", () => {
    console.log("Backend listening with Websocket on all network interfaces")
})