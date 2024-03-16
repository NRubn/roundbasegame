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
        ctx.drawImage(heroImg, character.x, character.y, cellWidth, cellHeight);
    });
}

// Event Listener für Tastatureingaben
document.addEventListener('keydown', function(event) {
    const currentCharacter = gameController.getNextCharacter(); // Holen Sie sich den aktuellen Charakter bei jedem Tastenanschlag
    if (currentCharacter.actionPoints > 0) {
        switch(event.key) {
            case 'ArrowLeft':
                moveHero(currentCharacter, -1, 0);
                break;
            case 'ArrowRight':
                moveHero(currentCharacter, 1, 0);
                break;
            case 'ArrowUp':
                moveHero(currentCharacter, 0, -1);
                break;
            case 'ArrowDown':
                moveHero(currentCharacter, 0, 1);
                break;
        }
    }
});

// Funktion zur Aktualisierung der Anzeige des aktuellen Charakters
function displayCurrentCharacter() {
    const currentCharacter = gameController.getNextCharacter(); // Holen Sie sich den aktuellen Charakter
    activeHeroDisplay.textContent = currentCharacter.name; // Aktualisieren Sie die Anzeige
}

// Funktion zum Bewegen des Charakters
function moveHero(character, deltaX, deltaY) {
    const newHeroX = character.x + deltaX * cellWidth;
    const newHeroY = character.y + deltaY * cellHeight;

    if (newHeroX >= 0 && newHeroX <= canvas.width - cellWidth &&
        newHeroY >= 0 && newHeroY <= canvas.height - cellHeight) {
        character.x = newHeroX;
        character.y = newHeroY;

        character.actionPoints--;

        actionPointsDisplay.textContent = character.actionPoints;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
        displayCurrentCharacter(); // Aktualisieren Sie die Anzeige des aktuellen Charakters
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
