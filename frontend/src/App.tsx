import { useState } from "react";
import { getRoomCode, getPlayers } from "./utils/api";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [players, setPlayer] = useState<string[]>([]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={async () => setCode(await getRoomCode())}>
          Generate Room Code
        </button>
        <p>The Room code is {code}</p>
      </div>
      <button onClick={async () => setPlayer(await getPlayers())}>
        Refresh
      </button>
      <p className="players"> Players: {players.join(", ")} </p>
    </>
  );
}

export default App;
