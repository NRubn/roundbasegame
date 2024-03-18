// Aktualisiere die Anzeige des aktuellen Helden
const activeHeroDisplay = document.getElementById('activehero');

const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

// Berechne die Breite und Höhe jedes Feldes
const cellWidth = canvas.width / 5;
const cellHeight = canvas.height / 5;

// Lade das Hero-Bild
const heroImg = new Image();
heroImg.src = 'resources/char/hero.svg';

// Instanziere den GameController
const gameController = new GameController();

// DOM-Elemente
const roundNumberDisplay = document.getElementById('roundnumber');
const actionPointsDisplay = document.getElementById('actionpoints');
const endRoundButton = document.getElementById('endround');

// Warte, bis das Bild geladen ist, bevor es gezeichnet wird
heroImg.onload = function() {
    drawGrid(); // Zeichne das Gridmuster und den Hero
};

// Funktion zum Zeichnen des Gridmusters und der Charaktere
function drawGrid() {
    console.log("drawGrid");
    // Zeichne das Gridmuster
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            ctx.beginPath();
            ctx.rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
            ctx.stroke();
        }
    }
    
    // Zeichne die Charaktere
    gameController.characters.forEach(character => {
        // Zeichne das Rechteck mit der gewünschten Farbe
        ctx.fillStyle = character.color; // Hier die gewünschte Farbe einfügen, z.B. "red"
        ctx.fillRect(character.position[0] * cellWidth, character.position[1] * cellHeight, cellWidth, cellHeight);
        
        // Zeichne das Bild des Helden über das Rechteck
        ctx.drawImage(heroImg, character.position[0] * cellWidth, character.position[1] * cellHeight, cellWidth, cellHeight);
    });   
    
    // Aktualisiere die Anzeige der Rundennummer
    roundNumberDisplay.textContent = gameController.roundNumber;
    displayCurrentCharacter();
}

// Event Listener für Tastatureingaben
document.addEventListener('keydown', function(event) {
    const currentCharacter = gameController.getCurrentCharacter(); // Holen Sie sich den aktuellen Charakter bei jedem Tastenanschlag
    const characterPosition = currentCharacter.position;
    
    if (currentCharacter.actionPoints > 0) {
        let deltaX = 0;
        let deltaY = 0;

        switch(event.key) {
            case 'ArrowLeft':
                deltaX = -1;
                break;
            case 'ArrowRight':
                deltaX = 1;
                break;
            case 'ArrowUp':
                deltaY = -1;
                break;
            case 'ArrowDown':
                deltaY = 1;
                break;
        }

        const newPosX = characterPosition[0] + deltaX;
        const newPosY = characterPosition[1] + deltaY;

        // Überprüfen, ob das Zielfeld gültig ist
        if (isValidMove(newPosX, newPosY)) {
            moveHero(currentCharacter, deltaX, deltaY);
        }
    } else {
        console.log("actionPoints 0");
        gameController.getNextCharacter();
        displayCurrentCharacter();
    }
});

// Funktion zur Überprüfung, ob das Zielfeld gültig ist
function isValidMove(newX, newY) {
    // Überprüfen, ob das Zielfeld innerhalb der Grenzen des Spielfelds liegt
    if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5) {
        // Überprüfen, ob das Zielfeld ein Hindernis ist oder von einem anderen Charakter besetzt ist
        for (const character of gameController.characters) {
            const [charX, charY] = character.position;
            if (charX === newX && charY === newY) {
                return false; // Zielfeld ist von einem anderen Charakter besetzt
            }
        }
        return true; // Zielfeld ist gültig
    }
    return false; // Zielfeld liegt außerhalb des Spielfelds
}

// Funktion zur Aktualisierung der Anzeige des aktuellen Charakters
function displayCurrentCharacter() {
    console.log("displayCurrentCharacter");
    const currentCharacter = gameController.getCurrentCharacter(); // Holen Sie sich den aktuellen Charakter
    activeHeroDisplay.textContent = currentCharacter.name; // Aktualisieren Sie die Anzeige
}

// Funktion zum Bewegen des Charakters
function moveHero(character, deltaX, deltaY) {
    const newHeroX = character.position[0] + deltaX;
    const newHeroY = character.position[1] + deltaY;

    // Überprüfen, ob das Zielfeld gültig ist und frei von Hindernissen und anderen Charakteren ist
    if (isValidMove(newHeroX, newHeroY)) {
        character.position[0] = newHeroX;
        character.position[1] = newHeroY;

        character.actionPoints--;

        actionPointsDisplay.textContent = character.actionPoints;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
    }
    
    if (isRoundOver()) {
        endRoundButton.classList.remove('hide');
    }
    
}

// Funktion zur Überprüfung, ob die Runde beendet ist
function isRoundOver() {
    return gameController.characters.every(character => character.actionPoints === 0);
}

// Event Listener für den "Ende"-Button
endRoundButton.addEventListener('click', function() {
    gameController.startNewRound();

    // Aktualisiere die Anzeige der Rundennummer
    roundNumberDisplay.textContent = gameController.roundNumber;

    // Verstecke den "Ende"-Button
    endRoundButton.classList.add('hide');
});
