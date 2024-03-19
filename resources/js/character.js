class Character {
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
        this.imagePath = imagePath; // Bildpfad des Charakter
        this.heroImg = new Image();
        this.heroImg.src = imagePath; // Laden Sie das Bild des Charakters
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
}