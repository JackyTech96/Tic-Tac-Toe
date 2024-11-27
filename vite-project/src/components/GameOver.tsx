// Definizione delle proprietà richieste dal componente GameOver
export interface GameOverProps {
  // Il nome del vincitore, se c'è un vincitore. Se non c'è, il valore sarà undefined.
  winner: string | undefined;
  // Funzione per riavviare la partita, da chiamare quando l'utente clicca sul pulsante "Rematch!".
  restartGame: () => void;
}

// Componente GameOver: visualizza il risultato del gioco e offre la possibilità di iniziare una nuova partita.
export default function GameOver({ winner, restartGame }: GameOverProps) {
  return (
    <div id="game-over">
      {/* Titolo che indica che il gioco è terminato */}
      <h2>GAME OVER!</h2>

      {/* Messaggio che indica il vincitore, se esiste */}
      {winner && <p>{winner} won!</p>}

      {/* Messaggio che indica un pareggio, se non c'è un vincitore */}
      {!winner && <p>It's a draw!</p>}

      {/* Pulsante per riavviare la partita */}
      <p>
        <button onClick={restartGame}>Rematch!</button>
      </p>
    </div>
  );
}
