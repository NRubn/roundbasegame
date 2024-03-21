class GameController {
    constructor(roundNumberDisplay, displayCurrentCharacter) {
        this.field = new Field(15, 15);
        this.roundNumber = 0;
        this.characters = [];
        this.currentCharacterIndex = 0;
        this.roundNumberDisplay = roundNumberDisplay; // Rundenanzeige als Parameter übergeben
        this.displayCurrentCharacter = displayCurrentCharacter; // Methode zur Anzeige des aktuellen Charakters als Parameter übergeben
    }

    // Andere Methoden wie addCharacter(), startNewRound(), getNextCharacter(), getCurrentCharacter(), getAllCharacterCoordinates(), getTotalActionPoints() bleiben unverändert...
    // Methode zum Hinzufügen eines Charakters zum Spiel
    addCharacter(character) {
        this.characters.push(character);
    }

    startGame(){
        this.drawGrid();
    };

    // Methode zum Starten einer neuen Runde
    startNewRound() {
        
        this.roundNumber++;
        this.currentCharacterIndex = 0; // Setze den Index des aktuellen Charakters zurück
        this.displayCurrentCharacterStats();
        this.characters.forEach(character => {
            character.resetActionPoints();
        });
    }
    // Methode zur Bestimmung des nächsten Charakters, der ziehen darf
    getNextCharacter() {
        const nextCharacter = this.characters[this.currentCharacterIndex];
        this.currentCharacterIndex = (this.currentCharacterIndex + 1) % this.characters.length;
        this.displayCurrentCharacterStats();
        return nextCharacter;
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
    
    // Funktion zum Zeichnen des Gridmusters und der Charaktere
    drawGrid() {
        const ctx = this.field.ctx;
        const cellWidth = this.field.cellWidth;
        const cellHeight = this.field.cellHeight;
        const activeCharacter = this.getCurrentCharacter(); // Aktuellen Charakter abrufen
    
        for (let x = 0; x < this.field.xfields; x++) {
            for (let y = 0; y < this.field.yfields; y++) {
                ctx.beginPath();
                ctx.rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                ctx.fillStyle = 'white'; // Felder weiß füllen
                ctx.strokeStyle = 'black'; // Rand schwarz
                ctx.lineWidth = 1; // Normale Linienbreite
                ctx.fill();
                ctx.stroke();
            }
        }
    
        this.characters.forEach(character => {
            ctx.fillStyle = character.color;
            ctx.fillRect(character.position[0] * cellWidth, character.position[1] * cellHeight, cellWidth, cellHeight);
            if (character.heroImg.complete) {
                ctx.drawImage(character.heroImg, character.position[0] * cellWidth, character.position[1] * cellHeight, cellWidth, cellHeight);
            }
        });
    
        // Überprüfen, ob der aktive Charakter vorhanden ist
        if (activeCharacter) {
            ctx.strokeStyle = 'yellow'; // Gelber Rand
            ctx.lineWidth = 3; // Dicke des Randes
            ctx.strokeRect(activeCharacter.position[0] * cellWidth, activeCharacter.position[1] * cellHeight, cellWidth, cellHeight);
        }
    
        this.roundNumberDisplay.textContent = this.roundNumber;
        this.field.drawObstacles();
    }
    

    // Methode zur Überprüfung, ob das Zielfeld gültig ist
    isValidMove(newX, newY) {
        // Überprüfen, ob das Zielfeld innerhalb der Grenzen des Spielfelds liegt
        if (newX >= 0 && newX < this.field.xfields && newY >= 0 && newY < this.field.yfields) {
            // Überprüfen, ob das Zielfeld von einem anderen Charakter besetzt ist
            for (const character of this.characters) {
                const [charX, charY] = character.position;
                if (charX === newX && charY === newY) {
                    return false; // Zielfeld ist von einem anderen Charakter besetzt
                }
            }
            // Überprüfen, ob das Zielfeld von einem Hindernis besetzt ist
            for (const obstacle of this.field.obstacles) {
                const [obsX, obsY] = obstacle;
                if (obsX === newX && obsY === newY) {
                    return false; // Zielfeld ist von einem Hindernis besetzt
                }
            }
            return true; // Zielfeld ist gültig
        }
        return false; // Zielfeld liegt außerhalb des Spielfelds
    }
    // Funktion zum Bewegen des Charakters
    moveHero(character, deltaX, deltaY) {
        const newHeroX = character.position[0] + deltaX;
        const newHeroY = character.position[1] + deltaY;

        // Überprüfen, ob das Zielfeld gültig ist und frei von Hindernissen und anderen Charakteren ist
        if (this.isValidMove(newHeroX, newHeroY)) {
            character.position[0] = newHeroX;
            character.position[1] = newHeroY;

            character.actionPoints--;

            //actionPointsDisplay.textContent = character.actionPoints;


            if(this.getTotalActionPoints() === 0){
                this.startNewRound();
            }

            this.field.clearCanvas();
            this.drawGrid();
        }
    }

    displayCurrentCharacterStats() {
        const currentCharacterStats = this.getCurrentCharacter();

        console.log(currentCharacterStats);

        let actionsHTML = '<div id="actions">';

        currentCharacterStats.actions.forEach(action => {
            actionsHTML += `
                <div class="${action}" data-type="${action}"><button class="button">${action}</button></div>
            `;
        });

        actionsHTML += '</div>';
        // Erstellen des HTML-Gerüsts für den aktuellen Charakter
        const characterStatsHTML = `
            <div id="activehero">${currentCharacterStats.name}</div>
            <div class="stats">
                <div id="actionpoints">AP ${currentCharacterStats.actionPoints}</div>
                <div id="hp"> HP ${currentCharacterStats.hp}</div>
                <div id="xp"> XP ${currentCharacterStats.xp}</div>
                <div id="attack"> AT ${currentCharacterStats.attack}</div>
                <div id="defense"> DE ${currentCharacterStats.defense}</div>
            </div>
            ${actionsHTML}
        `;

        // Elemente einfügen
        this.displayCurrentCharacter.innerHTML = characterStatsHTML;
        this.drawGrid();
    }
}
