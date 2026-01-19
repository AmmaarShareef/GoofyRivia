import { useState } from "react";
import { getRoomCode, getPlayers } from "./utils/api";
import Logo from "./assets/GoofyRivia.png";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [players, setPlayer] = useState<string[]>([]);

  return (
    <>
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
          <p>The Room code is {code}</p>
        </div>
      </div>
      <img src={Logo} className="logo" />
    </>
  );
}

export default App;
