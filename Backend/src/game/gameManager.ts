export interface Player {
  id: string;        // socket ID
  name: string;
  character: string; // emoji or avatar identifier
  alive: boolean;
  answered: boolean;
  answer: string;
  correct: boolean;
}

export interface GameState {
  roomCode: string;
  state: "LOBBY" | "QUESTION" | "SURVIVAL" | "FINAL" | "RESULTS";
  players: Player[];
  currentQuestion: any;
  questionNumber: number;
  totalQuestions: number;
  frozen: boolean; // For pause/freeze feature
}

const games: Map<string, GameState> = new Map(); // Maps are like dictionaries, here we are making a map since different players can have different gameStates

export function createGame(roomCode: string): GameState {
    const game: GameState = {
        roomCode,
        state: "LOBBY",
        players: [],
        currentQuestion: null,
        questionNumber: 0,
        totalQuestions: 5,
        frozen: false
    };
    games.set(roomCode, game)
    return game;
}

export function getGame(roomCode: string): GameState | undefined {
    return games.get(roomCode);
}

export function addPlayers(roomCode: string, player: Player): boolean {
    const game = getGame(roomCode)

    if (!game) return false;

    const existingIndex = game.players.findIndex(p => p.name === player.name) // Find if player exists on add()
    if (existingIndex >= 0) {
        game.players[existingIndex].id = player.id;
        return true;
    }
    // If player doesnt exist then push to array
    game.players.push(player);
    return true;
}

export function removePlayer(roomCode: string, socketId: string): void {
    const game = getGame(roomCode)

    if (!game) return;

    const player = game.players.find(p => p.id === socketId);
    if (player) {
        console.log(`Player ${player.name} disconnected, but can reconnect`);
    }
}
