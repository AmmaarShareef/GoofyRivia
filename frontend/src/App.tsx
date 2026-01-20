import { useEffect, useState } from "react";
import { getRoomCode, getPlayers } from "./utils/api";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const [code, setCode] = useState("0000"); // Change so that it tries to get the current code from backend, if not stick to 0000
  const [players, setPlayer] = useState<string[]>([]);

  useEffect(() => {
    const socket = io("http://172.17.98.186:3001");

    socket.on("player-joined", (data) => {
      console.log("New player joined:", data.userName);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
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
        </div>
      </div>
    </>
  );
}

export default App;
