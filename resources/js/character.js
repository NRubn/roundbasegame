class Character {
    constructor(name, x, y, hp, xp, attack, defense) {
        this.name = name;
        this.x = x; // Position x
        this.y = y; // Position y
        this.hp = hp; // Lebenspunkte
        this.xp = xp; // Erfahrungspunkte
        this.attack = attack; // Angriffswert
        this.defense = defense; // Verteidigungswert
        this.actionPoints = 2;
    }

    // Methode zum Zurücksetzen der Aktionspunkte des Charakters
    resetActionPoints() {
        this.actionPoints = 2;
    }
}