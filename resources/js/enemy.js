/*
/2,2/   /7,2/   /12,2/
/2,7/   /7,7/   /12,7/
/2,12/  /7,12/  /12,12/
*/
class Enemy {
    constructor(name, x, y, hp, xp, attack, defense, color, imagePath) {
        this.name = name;
        this.position = [x, y]; // Position als Array [x, y]
        this.hp = hp; // Lebenspunkte
        this.xp = xp; // Erfahrungspunkte
        this.attack = attack; // Angriffswert
        this.defense = defense; // Verteidigungswert
        this.actionPoints = 2;
        this.color = color;
        this.actions = ['move', 'attack', 'wait'];
        this.imagePath = imagePath; // Bildpfad des Charakters
    }

    // Methode zum Zurücksetzen der Aktionspunkte des Charakters
    resetActionPoints() {
        this.actionPoints = 2;
    }

    // Methode, um die Position des Characters abzurufen
    getPosition() {
        return this.position;
    }

    // Methode, um alle Werte des Characters in einem Array zurückzugeben
    getAllValues() {
        return [this.name, this.position[0], this.position[1], this.hp, this.xp, this.attack, this.defense, this.actionPoints, this.color];
    }

    // Methode zur Überprüfung, ob ein gegnerischer Charakter in der Nähe ist und ihn angreifen
    attackEnemyIfNearby(allCharacters) {
        const nearbyEnemies = allCharacters.filter(character => {
            // Überprüfen, ob der Charakter ein Feind ist und in Reichweite ist
            if (character instanceof Character && character.team !== 'enemy') {
                const [charX, charY] = character.position;
                const [enemyX, enemyY] = this.position;
                // Überprüfen, ob der Charakter in der Nähe ist (eine Position entfernt)
                return Math.abs(charX - enemyX) <= 1 && Math.abs(charY - enemyY) <= 1;
            }
            return false;
        });

        if (nearbyEnemies.length > 0) {
            // Wähle einen zufälligen gegnerischen Charakter aus der Liste aus
            const randomEnemy = nearbyEnemies[Math.floor(Math.random() * nearbyEnemies.length)];
            // Führe einen Angriff auf den ausgewählten gegnerischen Charakter aus
            this.attackCharacter(randomEnemy);
        } else {
            // Kein gegnerischer Charakter in der Nähe, also warten
            this.wait();
        }
    }

    // Methode zum Angriff auf einen anderen Charakter
    attackCharacter(character) {
        // Berechne den Schaden basierend auf dem Angriffswert des Angreifers und der Verteidigung des Verteidigers
        const damage = Math.max(0, this.attack - character.defense);
        // Ziehe den Schaden von den Lebenspunkten des Ziels ab
        character.hp -= damage;
        // Aktualisiere die Aktionspunkte des Angreifers
        this.actionPoints--;
        console.log(`${this.name} greift ${character.name} an und fügt ${damage} Schaden zu.`);
    }

    // Methode zum Warten (Aktion verfallen lassen)
    wait() {
        // Reduziere die Aktionspunkte
        this.actionPoints--;
        console.log(`${this.name} wartet.`);
    }
}
