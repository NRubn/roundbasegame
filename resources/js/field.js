class Field {
    constructor(xfields, yfields) {
        this.xfields = xfields;
        this.yfields = yfields;
        this.canvas = document.getElementById('gridCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.cellWidth = this.canvas.width / xfields;
        this.cellHeight = this.canvas.height / yfields;
        this.obstacles = [];
    }

    // Methode zum Löschen des Canvas-Bereichs
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Methode zur Überprüfung, ob das Zielfeld gültig ist -> Doppelt vorhanden kann einmal weg
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

    // Methode zum Hinzufügen eines Hindernisses an eine bestimmte Position
    addObstacle(x, y) {
        this.obstacles.push([x, y]);
    }

    // Methode zum Zeichnen aller Hindernisse im Spielfeld
    drawObstacles() {
        this.obstacles.forEach(obstacle => {
            const [x, y] = obstacle;
            this.ctx.fillStyle = 'gray'; // Farbe der Hindernisse
            this.ctx.fillRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
        });
    }

    // Methode zum Löschen aller Hindernisse im Spielfeld
    clearObstacles() {
        this.obstacles = [];
    }

    buildahouse(position, doors = ["nord"]) {
        let xtrax = 0;
        let xtray = 0;
        let blocksize = 5;

        /* Positions:
        /0/ /1/ /2/
        /3/ /4/ /5/
        /6/ /7/ /8/
        */

        switch (position) {
            case 0:
                xtrax = 0 * blocksize;
                xtray = 0 * blocksize;
                break;
            case 1:
                xtrax = 1 * blocksize;
                xtray = 0 * blocksize;
                break;
            case 2:
                xtrax = 2 * blocksize;
                xtray = 0 * blocksize;
                break;
            case 3:
                xtrax = 0 * blocksize;
                xtray = 1 * blocksize;
                break;
            case 4:
                xtrax = 1 * blocksize;
                xtray = 1 * blocksize;
                break;
            case 5:
                xtrax = 2 * blocksize;
                xtray = 1 * blocksize;
                break;
            case 6:
                xtrax = 0 * blocksize;
                xtray = 2 * blocksize;
                break;
            case 7:
                xtrax = 1 * blocksize;
                xtray = 2 * blocksize;
                break;
            case 8:
                xtrax = 2 * blocksize;
                xtray = 2 * blocksize;
                break;
            default:
                xtrax = 0 * blocksize;
                xtray = 0 * blocksize;
                break;
        }
        console.log(xtray);

        //Northwand
        this.addObstacle(0 + xtrax, 0 + xtray);
        this.addObstacle(1 + xtrax, 0 + xtray);
        if (doors.includes("north")) {

        }else{
            this.addObstacle(2 + xtrax, 0 + xtray); // NORTHDOOR
        }
        this.addObstacle(3 + xtrax, 0 + xtray);
        this.addObstacle(4 + xtrax, 0 + xtray);

        //Eastwand
        this.addObstacle(4 + xtrax, 1 + xtray);
        if (doors.includes("east")) {
        }else{
            this.addObstacle(4 + xtrax, 2 + xtray); // EASTDOOR
        }
        this.addObstacle(4 + xtrax, 3 + xtray);
        this.addObstacle(4 + xtrax, 4 + xtray);

        //Westwand
        this.addObstacle(0 + xtrax, 1 + xtray);
        if (doors.includes("west")) {
        }else{
            this.addObstacle(0 + xtrax, 2 + xtray); // WESTDOOR
        }
        this.addObstacle(0 + xtrax, 3 + xtray);
        this.addObstacle(0 + xtrax, 4 + xtray);

        //Southwand
        this.addObstacle(1 + xtrax, 4 + xtray);
        if (doors.includes("south")) {
        }else{
            this.addObstacle(2 + xtrax, 4 + xtray); // SOUTHDOOR
        }
        this.addObstacle(3 + xtrax, 4 + xtray);
    }


}
