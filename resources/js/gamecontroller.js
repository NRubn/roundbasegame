class GameController {
    constructor(roundNumberDisplay, displayCurrentCharacter) {
        this.field = new Field(15, 15);
        this.roundNumber = 0;
        this.characters = [];
        this.currentCharacterIndex = 0;
        this.roundNumberDisplay = roundNumberDisplay; // Rundenanzeige als Parameter übergeben
        this.displayCurrentCharacter = displayCurrentCharacter; // Methode zur Anzeige des aktuellen Charakters als Parameter übergeben
    }

    addCharacter(character) {
        this.characters.push(character);
    }

    startGame() {
        this.drawGrid();
    };

    startNewRound() {
        this.roundNumber++;
        this.currentCharacterIndex = 0; // Setze den Index des aktuellen Charakters zurück
        this.displayCurrentCharacterStats();
        this.characters.forEach(character => {
            character.resetActionPoints();
        });
    }

    getNextCharacter() {
        const nextCharacter = this.characters[this.currentCharacterIndex];
        this.currentCharacterIndex = (this.currentCharacterIndex + 1) % this.characters.length;
        this.displayCurrentCharacterStats();
        this.drawGrid();
        return nextCharacter;
    }

    getCurrentCharacter() {
        return this.characters[this.currentCharacterIndex];
    }

    getAllCharacterCoordinates() {
        return this.characters.map(character => character.position);
    }

    getTotalActionPoints() {
        return this.characters.reduce((total, character) => total + character.actionPoints, 0);
    }

    drawGrid() {
        const ctx = this.field.ctx;
        const cellWidth = this.field.cellWidth;
        const cellHeight = this.field.cellHeight;
        const activeCharacter = this.getCurrentCharacter(); // Aktuellen Charakter abrufen

        ctx.clearRect(0, 0, this.field.width, this.field.height);

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

    moveHero(character, deltaX, deltaY) {
        const newHeroX = character.position[0] + deltaX;
        const newHeroY = character.position[1] + deltaY;

        // Überprüfen, ob das Zielfeld gültig ist und frei von Hindernissen und anderen Charakteren ist
        if (this.isValidMove(newHeroX, newHeroY)) {
            character.position[0] = newHeroX;
            character.position[1] = newHeroY;

            character.actionPoints--;

            if (this.getTotalActionPoints() === 0) {
                this.startNewRound();
            }
            
            this.displayCurrentCharacterStats();
            this.field.clearCanvas();
            this.drawGrid();
        }
    }

    displayCurrentCharacterStats() {
        const currentCharacterStats = this.getCurrentCharacter();

        let actionsHTML = '<div id="actions">';

        if (currentCharacterStats.actions) { // Überprüfen, ob actions definiert ist
            currentCharacterStats.actions.forEach(action => {
                actionsHTML += `
                    <div class="${action}" data-type="${action}"><button class="button">${action}</button></div>
                `;
            });
        }

        actionsHTML += '</div>';
        // Erstellen des HTML-Gerüsts für den aktuellen Charakter
        const characterStatsHTML = `
            <div id="activehero">${currentCharacterStats.name}</div>
            <div class="stats">
                <div id="actionpoints">AP ${currentCharacterStats.actionPoints}</
                <div id="hp"> HP ${currentCharacterStats.hp}</div>
                <div id="xp"> XP ${currentCharacterStats.xp}</div>
                <div id="attack"> AT ${currentCharacterStats.attack}</div>
                <div id="defense"> DE ${currentCharacterStats.defense}</div>
            </div>
            ${actionsHTML}
        `;

        // Elemente einfügen
        document.getElementById("activeherostats").innerHTML = characterStatsHTML;
    }
}
