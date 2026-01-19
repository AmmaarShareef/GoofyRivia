import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { createCode } from "./game/lobby";
import { addPlayers } from "./game/player";

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.static("public"));

let code = ""
let players: Array<string> = []

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
app.listen(3001, "0.0.0.0", () => {
    console.log("Backend listening on all network interfaces")
})