class Field {
    constructor(xfields, yfields) {
        this.xfields = xfields;
        this.yfields = yfields;
        this.canvas = document.getElementById('gridCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.cellWidth = this.canvas.width / xfields;
        this.cellHeight = this.canvas.height / yfields;
    }

    // Methode zur Überprüfung, ob das Zielfeld gültig ist
    isValidMove(newX, newY, characters) {
        // Überprüfen, ob das Zielfeld innerhalb der Grenzen des Spielfelds liegt
        const withinXBounds = newX >= 0 && newX < this.xfields;
        const withinYBounds = newY >= 0 && newY < this.yfields;

        if (withinXBounds && withinYBounds) {
            // Überprüfen, ob das Zielfeld ein Hindernis ist oder von einem anderen Charakter besetzt ist
            for (const character of characters) {
                const [charX, charY] = character.position;
                if (charX === newX && charY === newY) {
                    return false; // Zielfeld ist von einem anderen Charakter besetzt
                }
            }
            return true; // Zielfeld ist gültig
        }
        return false; // Zielfeld liegt außerhalb des Spielfelds
    }
}
