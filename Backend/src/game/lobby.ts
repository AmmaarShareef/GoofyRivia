let code: string = ""
let alphaNum: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"

export function createCode(): string {
    code = "" //Resttting the room code
    for (let i=0; i < 4; i++)
    {
        code += alphaNum[Math.floor(Math.random() * alphaNum.length)]
    }

    return code
}