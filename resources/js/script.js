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
        console.log("draw " + character);
        ctx.drawImage(heroImg, character.x * cellWidth, character.y * cellHeight, cellWidth, cellHeight);
        console.log(heroImg, character.x * cellWidth, character.y * cellHeight, cellWidth, cellHeight);
    });
}

// Event Listener für Tastatureingaben
document.addEventListener('keydown', function(event) {
    console.log(event.key)
    if (gameController.getCurrentCharacter().actionPoints > 0) {
        console.log("actionPoints > 0");
        const currentCharacter = gameController.getNextCharacter(); // Holen Sie sich den aktuellen Charakter bei jedem Tastenanschlag
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
    }else{
    console.log("actionPoints 0");
    }
});

// Funktion zur Aktualisierung der Anzeige des aktuellen Charakters
function displayCurrentCharacter() {
    console.log("displayCurrentCharacter");
    const currentCharacter = gameController.getCurrentCharacter(); // Holen Sie sich den aktuellen Charakter
    activeHeroDisplay.textContent = currentCharacter.name; // Aktualisieren Sie die Anzeige
}

// Funktion zum Bewegen des Charakters
function moveHero(character, deltaX, deltaY) {
    console.log("moveHero");
    const newHeroX = character.x + deltaX;
    const newHeroY = character.y + deltaY;

    if (newHeroX >= 0 && newHeroX < 5 && newHeroY >= 0 && newHeroY < 5) {
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
