class GameController {
    constructor(roundNumberDisplay, displayCurrentCharacter) {
        this.field = new Field(15, 15, 5);
        this.roundNumber = 0;
        this.characters = [];
        this.teams = [];
        this.currentCharacterIndex = 0;
        this.roundNumberDisplay = roundNumberDisplay; // Rundenanzeige als Parameter übergeben
        this.displayCurrentCharacter = displayCurrentCharacter; // Methode zur Anzeige des aktuellen Charakters als Parameter übergeben
    }

    addCharacter(character) {
        this.characters.push(character);
    }

    addTeam(team) {
        this.teams.push(team);
    }

    startGame() {
        this.drawGrid();
        this.checkCurrentCharacterTeam();
    };

    startNewRound() {
        this.roundNumber++;
        this.currentCharacterIndex = 0; // Setze den Index des aktuellen Charakters zurück
        this.characters.forEach(character => {
            character.resetActionPoints();
        });
        this.displayCurrentCharacterStats();
    }

    getNextCharacter() {
        const nextCharacter = this.characters[this.currentCharacterIndex];
        this.currentCharacterIndex++;
        if (this.currentCharacterIndex >= this.characters.length) {
            this.startNewRound();
        }
        this.displayCurrentCharacterStats();
        this.drawGrid();
        return nextCharacter;
    }
    

    getCurrentCharacter() {
        return this.characters[this.currentCharacterIndex];
    }

    getCurrentCharacterTeam() {
        return this.characters[this.currentCharacterIndex].team;
    }

    getAllCharacterCoordinates() {
        return this.characters.map(character => {
            return {
                position: character.position,
                team: character.team
            };
        });
    }

    getTotalActionPoints() {
        return this.characters.reduce((total, character) => total + character.actionPoints, 0);
    }

    drawGrid() {
        const ctx = this.field.ctx;
        const cellWidth = this.field.cellWidth;
        const cellHeight = this.field.cellHeight;
        const activeCharacter = this.getCurrentCharacter(); // Aktuellen Charakter abrufen

        this.roundNumberDisplay.textContent = this.roundNumber;
        this.field.drawObstacles();
        this.field.drawGridFields(5);

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
            ctx.fillStyle = "green";
            ctx.strokeRect(activeCharacter.position[0] * cellWidth, activeCharacter.position[1] * cellHeight, cellWidth, cellHeight);
        }
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
    /* # SCHLEIFE # */
    checkCurrentCharacterTeam() {
        setInterval(() => {
            const currentCharacter = this.getCurrentCharacter();
            const totalActionPoints = this.getTotalActionPoints();
            if (currentCharacter) {
                //console.log(`${currentCharacter.name} ist im Team ${currentCharacter.team}.`);
                if(currentCharacter.team == 'enemy'){
                    currentCharacter.waitAction();
                    console.log('Der Gegner wartet')
                    gameController.getNextCharacter();
                }
            } else {
                console.log("Kein aktueller Charakter vorhanden.");
            }
            /* ALLE APS Weg */
            //console.log("Total Action Points: " + totalActionPoints);
            if(totalActionPoints == 0){
                this.startNewRound();
            }
        }, 1500); // Alle 1 Sekunde ausführen
    }
}
