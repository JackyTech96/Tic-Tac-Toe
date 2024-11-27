// Interfaccia che definisce le proprietà richieste dal componente GameBoard
export interface GameBoardProps {
  onSelectSquare: (rowIndex: number, colIndex: number) => void; // Funzione per gestire la selezione di una cella
  board: (string | null)[][]; // Stato attuale della griglia di gioco, un array bidimensionale
}

// Componente principale per la visualizzazione e gestione della griglia di gioco
export default function GameBoard({ onSelectSquare, board }: GameBoardProps) {
  // Renderizzazione della griglia di gioco
  // La griglia è rappresentata come una lista ordinata (`<ol>`), dove ogni riga è una lista annidata
  return (
    <ol id="game-board">
      {/* Iterazione sulle righe della griglia */}
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          {/* Ogni riga è un'altra lista ordinata */}
          <ol>
            {/* Iterazione sulle colonne all'interno di ogni riga */}
            {row.map((playerSymbol, colIndex) => (
              <button
                key={colIndex} // Chiave univoca per ogni cella
                onClick={() => onSelectSquare(rowIndex, colIndex)} // Chiamata della funzione al click
                disabled={!!playerSymbol} // Disabilita il pulsante se la cella è già occupata
              >
                {playerSymbol} {/* Mostra il simbolo del giocatore (X o O) */}
              </button>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
