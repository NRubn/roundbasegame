// Aktualisiere die Anzeige des aktuellen Helden
const activeHeroDisplay = document.getElementById('activehero');
const roundNumberDisplay = document.getElementById('roundnumber');
const actionPointsDisplay = document.getElementById('actionpoints');
const endRoundButton = document.getElementById('endround');

// Instanziere den GameController
const activeherostatsContainer = document.getElementById('activeherostats');
const gameController = new GameController(roundNumberDisplay,activeherostatsContainer);


// Beispiel: Erstellung von Charakteren und Hinzufügen zum Spiel
const hero1 = new Character("Green Hero 1", 3, 3, 24, 0, 5, 3,"green", "resources/char/hero.svg",'player1');
const hero2 = new Character("Red Hero 2", 1, 1, 19, 0, 4, 4,"red", "resources/char/person-hiking-solid.svg",'player1');
const hero3 = new Character("Blue Bob", 1, 2, 20, 0, 4, 4,"blue", "resources/char/hero.svg",'player1');
const enemy1 = new Character("Blue Bob", 7, 7, 20, 0, 4, 4,"white", "resources/char/spider-solid.svg",'enemy');
const thisplayerteam = 'player1';

hero3.addAction('shoot');
gameController.addCharacter(hero1);
gameController.addCharacter(hero2);
gameController.addCharacter(hero3);
gameController.addCharacter(enemy1);

gameController.field.buildahouse(4,["east","west","south"]);
gameController.field.buildahouse(7,["north","east"]);
gameController.field.buildahouse(8,["west"]);

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
    const currentTeam = gameController.getCurrentCharacterTeam();
    if(currentTeam === thisplayerteam){
        if (currentCharacter.actionPoints > 0 ) {
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
    }else{
        console.log('Not your turn');
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
