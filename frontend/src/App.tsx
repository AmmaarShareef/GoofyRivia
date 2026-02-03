import { useEffect, useState } from "react";
import { getRoomCode, getPlayers, getQuestion } from "./utils/api";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const [code, setCode] = useState("0000"); // Change so that it tries to get the current code from backend, if not stick to 0000
  const [players, setPlayer] = useState<string[]>([]);
  const [question, setQ] = useState("");
  const prompt =
    "Generate a brief trivia question (Nothing to come before the question) with 4 options, mark correct answer with a ✅ next to it";

  useEffect(() => {
    const socket = io("http://172.17.65.197:3001");

    socket.on("connect", () => {
      console.log("Connected to backend:", socket.id);
    });

    socket.on("player-joined", (data) => {
      console.log("New player joined:", data.userName);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="full">
        <h1 className="logo"> GoofyRivia </h1>
        <div className="main">
          <div>
            <button
              className="refresh"
              onClick={async () => setPlayer(await getPlayers())}
            >
              Refresh
            </button>
            <p className="players"> Players: {players.join(", ")} </p>
            <div className="circles-container">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}></div>
              ))}
            </div>
          </div>
          <div className="card">
            <button
              className="generate"
              onClick={async () => setCode(await getRoomCode())}
            >
              Generate Room Code
            </button>
            <p>The Room code is:</p>
            <p className="code">{code}</p>
            {/*<button
            className="start"
            onClick={async () => setQ(await getQuestion(prompt))}
          >
            Ask Question!
          </button> */}
          </div>
          <p>{question}</p>
        </div>
      </div>
    </>
  );
}

export default App;
