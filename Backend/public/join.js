const username = document.getElementById("playerName");
const code = document.getElementById("playerCode");
const joinBt = document.getElementById("join");

joinBt.addEventListener("click", async () => {
    const data = {
        user: username.value,
        rc: code.value
    }

    // POST request, send data to server.ts by triggering /join
    const response = await fetch("/join", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await response.text();
    
    if (result === "IN"){
    window.location.href = "lobby.html";
    } else {
    window.location.reload()
    }
}) 