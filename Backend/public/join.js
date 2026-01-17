const username = document.getElementById("playerName");
const code = document.getElementById("playerCode");
const joinBt = document.getElementById("join");

joinBt.addEventListener("click", () => {
    const user = username.value;
    const rc = code.value;

    const details = {user, rc} // Send details object to backend to verify room code
})