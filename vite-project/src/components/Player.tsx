import { useState } from "react";

// Definizione delle proprietà richieste dal componente Player
export interface PlayerProps {
  initialName: string; // Nome iniziale del giocatore
  symbol: string; // Simbolo del giocatore ("X" o "O")
  isActive: boolean; // Indica se il giocatore è attualmente attivo
  onPlayerNameChange: (player: string, newName: string) => void; // Funzione per gestire il cambiamento del nome del giocatore
}

// Componente Player che rappresenta un singolo giocatore
export default function Player({
  initialName,
  symbol,
  isActive,
  onPlayerNameChange,
}: PlayerProps) {
  // Stato per memorizzare il nome del giocatore
  const [playerName, setPlayerName] = useState<string>(initialName);

  // Stato per controllare se il nome del giocatore è in modalità modifica
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Funzione che gestisce il clic sul pulsante "Edit"/"Save"
  function handleEditClick() {
    // Non bisogna fare così in React perché potrebbe causare comportamenti inaspettati.
    // Utilizzare la funzione per garantire che React richiami il valore dinamico attuale.
    // setIsEditing(!isEditing);

    setIsEditing((editing) => !editing); // Alterna lo stato di modifica tra true e false

    // Quando si esce dalla modalità modifica (clic su "Save"), aggiorniamo il nome del giocatore
    if (isEditing) {
      onPlayerNameChange(symbol, playerName);
    }
  }

  // Funzione che gestisce il cambiamento del valore dell'input
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event); // Log dell'evento per debug
    setPlayerName(event.target.value); // Aggiorna lo stato con il nuovo valore inserito
  }

  // Variabile per gestire la visualizzazione del nome del giocatore
  // Mostra il nome come testo normale o come input editabile in base allo stato `isEditing`
  let editablePlayerName: JSX.Element = (
    <span className="player-name">{playerName}</span>
  );
  if (isEditing) {
    editablePlayerName = (
      <input
        type="text" // Campo di testo per modificare il nome
        required // Campo obbligatorio
        value={playerName} // Valore attuale dell'input
        onChange={handleChange} // Funzione per gestire il cambiamento del valore
      />
    );
  }

  // Render del componente Player
  return (
    <li className={isActive ? "active" : undefined}>
      {/* Classe "active" applicata se il giocatore è attivo */}
      <span className="player">
        {/* Mostra il nome del giocatore (modificabile o statico) */}
        {editablePlayerName}
        {/* Mostra il simbolo del giocatore ("X" o "O") */}
        <span className="player-symbol">{symbol}</span>
        {/* Pulsante per alternare tra modalità "Edit" e "Save" */}
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </span>
    </li>
  );
}
