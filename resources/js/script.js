const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

// Berechne die Breite und Höhe jedes Feldes
const cellWidth = canvas.width / 5;
const cellHeight = canvas.height / 5;

// Lade das Hero-Bild
const heroImg = new Image();
heroImg.src = 'resources/char/hero.svg';

// Startposition des Hero
let heroX = (canvas.width - cellWidth) / 2;
let heroY = (canvas.height - cellHeight) / 2;

// Aktionspunkte des Hero
let actionPoints = 2;

// Aktuelle Runde
let roundNumber = 0;

// DOM-Elemente
const roundNumberDisplay = document.getElementById('roundnumber');
const actionPointsDisplay = document.getElementById('actionpoints');
const endRoundButton = document.getElementById('endround');

// Warte, bis das Bild geladen ist, bevor es gezeichnet wird
heroImg.onload = function() {
    drawGrid(); // Zeichne das Gridmuster und den Hero
};

// Funktion zum Zeichnen des Gridmusters und des Hero
function drawGrid() {
    // Zeichne das Gridmuster
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            ctx.beginPath();
            ctx.rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
            ctx.stroke();
        }
    }
    
    // Zeichne das Hero-Bild
    ctx.drawImage(heroImg, heroX, heroY, cellWidth, cellHeight);
}

// Event Listener für Tastatureingaben
document.addEventListener('keydown', function(event) {
    if (actionPoints > 0) { // Überprüfe, ob genügend Aktionspunkte vorhanden sind
        switch(event.key) {
            case 'ArrowLeft':
                moveHero(-1, 0); // Bewege den Hero nach links
                break;
            case 'ArrowRight':
                moveHero(1, 0); // Bewege den Hero nach rechts
                break;
            case 'ArrowUp':
                moveHero(0, -1); // Bewege den Hero nach oben
                break;
            case 'ArrowDown':
                moveHero(0, 1); // Bewege den Hero nach unten
                break;
        }
    }
});

// Funktion zum Bewegen des Hero
function moveHero(deltaX, deltaY) {
    // Berechne die neue Position
    const newHeroX = heroX + deltaX * cellWidth;
    const newHeroY = heroY + deltaY * cellHeight;

    // Überprüfe, ob die neue Position innerhalb des Canvas ist
    if (newHeroX >= 0 && newHeroX <= canvas.width - cellWidth &&
        newHeroY >= 0 && newHeroY <= canvas.height - cellHeight) {
        // Aktualisiere die Position des Hero
        heroX = newHeroX;
        heroY = newHeroY;

        // Verringere die Aktionspunkte um 1
        actionPoints--;

        // Aktualisiere die Anzeige der Aktionspunkte
        actionPointsDisplay.textContent = actionPoints;

        // Lösche den vorherigen Hero und zeichne den Hero an der neuen Position
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGrid();
    }
    
    // Überprüfe, ob die Runde beendet ist
    if (isRoundOver()) {
        // Zeige den "Ende"-Button an
        endRoundButton.classList.remove('hide');
    }
}

// Funktion zur Überprüfung, ob die Runde beendet ist
function isRoundOver() {
    return actionPoints === 0;
}

// Event Listener für den "Ende"-Button
endRoundButton.addEventListener('click', function() {
    // Aktualisiere die Aktionspunkte
    actionPoints = 2;
    actionPointsDisplay.textContent = actionPoints;

    // Verstecke den "Ende"-Button
    endRoundButton.classList.add('hide');

    // Erhöhe die Rundennummer
    roundNumber++;
    roundNumberDisplay.textContent = roundNumber;
});
