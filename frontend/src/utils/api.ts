export async function getRoomCode(){
    const res = await fetch("http://localhost:3001/room-code");
    const code = await res.text();
    return code;
}

export async function getPlayers(){
    const res = await fetch("http://localhost:3001/lobby");
    const players = await res.json();
    return players;
}