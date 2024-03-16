class GameController {
    constructor() {
        this.roundNumber = 0;
        this.characters = []; // Array zur Speicherung der Charaktere
        this.currentCharacterIndex = 0; // Index des aktuellen Charakters
    }

    // Methode zum Hinzufügen eines Charakters zum Spiel
    addCharacter(character) {
        this.characters.push(character);
    }

    // Methode zum Starten einer neuen Runde
    startNewRound() {
        this.roundNumber++;
        this.currentCharacterIndex = 0; // Setze den Index des aktuellen Charakters zurück
        this.characters.forEach(character => {
            character.resetActionPoints(); // Setze die Aktionspunkte jedes Charakters zurück
        });
    }

// Methode zur Bestimmung des nächsten Charakters, der ziehen darf
    getNextCharacter() {
        let nextCharacter = this.characters[this.currentCharacterIndex];
        this.currentCharacterIndex = (this.currentCharacterIndex + 1) % this.characters.length;
        while (nextCharacter.actionPoints === 0) {
            nextCharacter = this.characters[this.currentCharacterIndex];
            this.currentCharacterIndex = (this.currentCharacterIndex + 1) % this.characters.length;
        }
        if (this.currentCharacterIndex === 0) {
            this.startNewRound();
        }
        return nextCharacter;
    }

    // Methode zum Abrufen des Index des aktuellen Spielers
    getCurrentPlayerIndex() {
        return this.currentCharacterIndex;
    }
}
