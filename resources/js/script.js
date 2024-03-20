// Aktualisiere die Anzeige des aktuellen Helden
const activeHeroDisplay = document.getElementById('activehero');
const roundNumberDisplay = document.getElementById('roundnumber');
const actionPointsDisplay = document.getElementById('actionpoints');
const endRoundButton = document.getElementById('endround');

// Instanziere den GameController
const activeherostatsContainer = document.getElementById('activeherostats');
const gameController = new GameController(roundNumberDisplay,activeherostatsContainer);


// Beispiel: Erstellung von Charakteren und Hinzufügen zum Spiel
const hero1 = new Character("Green Hero 1", 0, 0, 24, 0, 5, 3,"green", "resources/char/hero.svg");
const hero2 = new Character("Red Hero 2", 1, 1, 19, 0, 4, 4,"red", "resources/char/person-hiking-solid.svg");
const hero3 = new Character("Blue Bob", 1, 2, 20, 0, 4, 4,"blue", "resources/char/hero.svg");
hero3.addAction('shoot');
gameController.addCharacter(hero1);
gameController.addCharacter(hero2);
gameController.addCharacter(hero3);
gameController.field.addObstacle(8, 6);
gameController.field.addObstacle(7, 6);
gameController.field.addObstacle(6, 6);
gameController.field.addObstacle(6, 7);
gameController.field.addObstacle(6, 8);
gameController.field.addObstacle(6, 10);
gameController.field.addObstacle(6, 11);
gameController.field.addObstacle(6, 12);
gameController.field.addObstacle(7, 12);
gameController.displayCurrentCharacterStats();
gameController.startGame();

// Funktion zum Zeichnen des Gridmusters und der Charaktere
function drawGrid() {
    gameController.drawGrid();
    gameController.displayCurrentCharacterStats();
}

// Event Listener für Tastatureingaben
document.addEventListener('keydown', function(event) {
    const currentCharacter = gameController.getCurrentCharacter();
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

        if (gameController.isValidMove(newPosX, newPosY)) {
            gameController.moveHero(currentCharacter, deltaX, deltaY);
            if (currentCharacter.actionPoints == 0) {
                gameController.getNextCharacter();
                gameController.displayCurrentCharacterStats();
            }
        }
    } else {
        console.log("actionPoints 0");
        gameController.getNextCharacter();
        gameController.displayCurrentCharacterStats();
    }
});

// Funktion zur Aktualisierung der Anzeige des aktuellen Charakters
function displayCurrentCharacterStats() {
    const currentCharacter = gameController.getCurrentCharacter();
    activeHeroDisplay.textContent = currentCharacter.name;
}

// Funktion zur Überprüfung, ob die Runde beendet ist
function isRoundOver() {
    return gameController.characters.every(character => character.actionPoints === 0);
}

// Event Listener für den "Ende"-Button
endRoundButton.addEventListener('click', function() {
    gameController.startNewRound();
    roundNumberDisplay.textContent = gameController.roundNumber;
    endRoundButton.classList.add('hide');
});

gameController.drawGrid(); // Zeichne das Gridmuster und den Hero