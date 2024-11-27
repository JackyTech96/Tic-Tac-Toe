import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import Player from "./components/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

// Costante che definisce i giocatori con i loro simboli e nomi iniziali
const PLAYERS: Record<string, string> = {
  X: "Player 1",
  O: "Player 2",
};

// Configurazione iniziale della griglia di gioco (3x3), vuota all'inizio
const INITIAL_GAME_BOARD: (string | null)[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// Interfaccia per definire il tipo di un turno di gioco
interface Turn {
  square: { row: number; col: number }; // Coordinate del quadrato selezionato
  player: string; // Simbolo del giocatore che ha effettuato il turno
}

// Funzione per calcolare il giocatore attivo in base ai turni giocati
function deriveActivePlayer(gameTurns: Turn[]) {
  let currentPlayer = "X"; // X inizia per default
  // Se ci sono turni e l'ultimo giocatore è stato "X", allora tocca a "O"
  if (!!gameTurns.length && gameTurns[0].player === "X") currentPlayer = "O";
  return currentPlayer;
}

// Funzione per derivare lo stato attuale della griglia di gioco dai turni
function deriveGameBoard(gameTurns: Turn[]) {
  // Crea una copia della configurazione iniziale per evitare modifiche dirette
  const gameBoard: (string | null)[][] = [
    ...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray]),
  ];
  // Aggiorna la griglia con i turni giocati
  gameTurns.forEach((turn) => {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player; // Segna il simbolo del giocatore
  });
  return gameBoard;
}

// Funzione per determinare se c'è un vincitore
function deriveWinner(
  gameBoard: (string | null)[][], // Stato attuale della griglia
  players: Record<string, string> // Mappa di giocatori e nomi
) {
  let winner;

  // Controlla tutte le combinazioni vincenti
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareCombination =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareCombination =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareCombination =
      gameBoard[combination[2].row][combination[2].column];

    // Se tutte le caselle in una combinazione contengono lo stesso simbolo, c'è un vincitore
    if (
      firstSquareCombination &&
      firstSquareCombination === secondSquareCombination &&
      firstSquareCombination === thirdSquareCombination
    ) {
      // Associa il simbolo vincente al nome del giocatore
      winner = players[firstSquareCombination as keyof typeof players];
    }
  }

  return winner; // Ritorna il nome del vincitore o undefined se nessuno ha vinto
}

function App() {
  // Stato per i nomi dei giocatori
  const [players, setPlayers] = useState(PLAYERS);

  // Stato per i turni di gioco
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);

  // Giocatore attivo calcolato dinamicamente
  const activePlayer = deriveActivePlayer(gameTurns);

  // Griglia di gioco derivata dinamicamente dai turni
  const gameBoard = deriveGameBoard(gameTurns);

  // Determina il vincitore (se esiste)
  const winner = deriveWinner(gameBoard, players);

  // Verifica se la partita è finita in pareggio (tutti i quadrati sono pieni e non c'è vincitore)
  const hasDraw = gameTurns.length === 9 && !winner;

  // Gestisce la selezione di un quadrato durante un turno
  function handleSelectSquare(rowIndex: number, colIndex: number) {
    // Aggiorna i turni di gioco
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns); // Determina il giocatore attivo
      const updatedTurns: Turn[] = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns, // Aggiunge il nuovo turno in cima alla lista
      ];
      return updatedTurns;
    });
  }

  // Riavvia il gioco resettando i turni
  function handleRestartGame() {
    setGameTurns([]); // Resetta i turni a una lista vuota
  }

  // Aggiorna il nome di un giocatore
  function handlePlayerNameChange(player: string, newName: string) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [player]: newName }; // Aggiorna il nome del giocatore
    });
  }

  return (
    <main>
      <div id="game-container">
        {/* Lista dei giocatori */}
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X} // Nome iniziale di "X"
            symbol="X"
            isActive={activePlayer === "X"} // Indica se il giocatore è attivo
            onPlayerNameChange={handlePlayerNameChange} // Callback per cambiare nome
          />
          <Player
            initialName={PLAYERS.O} // Nome iniziale di "O"
            symbol="O"
            isActive={activePlayer === "O"} // Indica se il giocatore è attivo
            onPlayerNameChange={handlePlayerNameChange} // Callback per cambiare nome
          />
        </ol>

        {/* Mostra lo stato finale del gioco (vincitore o pareggio) */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} restartGame={handleRestartGame} />
        )}

        {/* Griglia di gioco */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />

        {/* Registro dei turni */}
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
