export async function getRoomCode(){
    const res = await fetch("http://localhost:3001/room-code");
    const code = await res.text();
    return code;
}