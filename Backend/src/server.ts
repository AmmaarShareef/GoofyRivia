import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { createCode } from "./game/lobby";

const app = express();
app.use(cors());

app.use(express.static("public"));

app.get("/room-code", (req: Request, res: Response) => {
    const code = createCode();
    res.send(code)
})

app.listen(3001, "0.0.0.0", () => {
    console.log("Backend listening on all network interfaces")
})