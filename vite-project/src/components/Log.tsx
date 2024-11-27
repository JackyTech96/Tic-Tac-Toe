// Definizione delle proprietà richieste dal componente Log
export interface LogProps {
  // La lista dei turni giocati, ognuno con le seguenti informazioni:
  // - square: un oggetto con la riga e la colonna selezionate
  // - player: il simbolo del giocatore che ha effettuato la mossa
  turns: { square: { row: number; col: number }; player: string }[];
}

// Componente Log per visualizzare il registro dei turni
export default function Log({ turns }: LogProps) {
  // Render del registro
  return (
    <ol id="log">
      {/* Mappiamo ogni turno per generare una lista ordinata */}
      {turns.map((turn) => (
        // La chiave è una combinazione unica di riga e colonna della mossa
        <li key={`${turn.square.row}${turn.square.col}`}>
          {/* Testo che descrive il turno, con il giocatore e la posizione selezionata */}
          {turn.player} selected ({turn.square.row}, {turn.square.col})
        </li>
      ))}
    </ol>
  );
}
