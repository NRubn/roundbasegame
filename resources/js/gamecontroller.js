class GameController {
    constructor() {
        this.roundNumber = 0;
        this.characters = []; // Array zur Speicherung der Charaktere
        this.currentCharacterIndex = 0; // Index des aktuellen Charakters
        this.characterCoordinates = []; // Array zur Speicherung der Koordinaten der Charaktere
    }

    // Methode zum Hinzufügen eines Charakters zum Spiel
    addCharacter(character) {
        console.log("addCharacter");
        console.log(character);
        this.characters.push(character);
        this.characterCoordinates.push(character.position); // Speichere die Koordinaten des Charakters
    }

    // Methode zum Starten einer neuen Runde
    startNewRound() {
        this.roundNumber++;
        this.currentCharacterIndex = 0; // Setze den Index des aktuellen Charakters zurück
        this.characters.forEach(character => {
            character.resetActionPoints(); // Setze die Aktionspunkte jedes Charakters zurück
        });
    }

    // Methode zum Starten des Spiels
    startGame() {
        console.log("startGame");
        this.startNewRound();
        // Zeigen Sie die Rundennummer an
        roundNumberDisplay.textContent = this.roundNumber;
        // Zeigen Sie den aktuellen Charakter an
        displayCurrentCharacter();
    }

    // Methode zur Bestimmung des nächsten Charakters, der ziehen darf
    getNextCharacter() {
        console.log("getNextCharacter");
        let nextCharacterIndex = this.currentCharacterIndex;
        let counter = 0; // Zähler für die Anzahl der durchlaufenden Charaktere
        do {
            nextCharacterIndex = (nextCharacterIndex + 1) % this.characters.length;
            counter++;
        } while (this.characters[nextCharacterIndex].actionPoints === 0 && counter < this.characters.length);

        if (counter === this.characters.length) {
            this.startNewRound(); // Starte eine neue Runde, wenn kein Charakter mehr Aktionspunkte hat
            nextCharacterIndex = 0; // Setze den Index auf den ersten Charakter in der neuen Runde
        }

        this.currentCharacterIndex = nextCharacterIndex;
        return this.characters[this.currentCharacterIndex];
    }

    // Methode zur Rückgabe des aktuellen Charakters
    getCurrentCharacter() {
        return this.characters[this.currentCharacterIndex];
    }

    // Methode zur Rückgabe aller Koordinaten der Charaktere
    getAllCharacterCoordinates() {
        const occupiedCoordinates = [];
        this.characters.forEach(character => {
            occupiedCoordinates.push(character.position);
        });
        return occupiedCoordinates;
    }

    // Methode zur Berechnung der Gesamtaktionen aller Charaktere
    getTotalActionPoints() {
        let totalActionPoints = 0;
        this.characters.forEach(character => {
            totalActionPoints += character.actionPoints;
        });
        return totalActionPoints;
    }
}