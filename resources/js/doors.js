/* #DOOR POSITIONS
        (XY)
 II#II 00 01 02 03 04
 I///I 10 11 12 13 14
 #/N/# 20 21 22 23 24
 I///I 30 31 32 33 34
 II#II 40 41 42 43 44

        02
    20      24
        42
*/

class Door {
    constructor(name = "woodendoor", hp = 20, x=0, y=0) {
        this.position = [x, y];
        this.state = "closed"; // State: "closed" or "open"
        this.hp = hp; // Counter for hit points
        this.name = name; // Name of the door
        this.locked = true; // Boolean indicating whether the door is locked
    }

    setPosition(x,y){
        this.position = [x, y];
    }
    // Method to open the door
    dooropen() {
        if (this.state === "closed" && !this.locked) {
            this.state = "open";
            console.log(`The ${this.name} has been opened.`);
        } else {
            console.log(`The ${this.name} cannot be opened.`);
        }
    }

    // Method to close the door
    doorclose() {
        if (this.state === "open") {
            this.state = "closed";
            console.log(`The ${this.name} has been closed.`);
        } else {
            console.log(`The ${this.name} cannot be closed.`);
        }
    }

    // Method to break the door
    doorbreak() {
        if (this.state === "closed" && this.locked) {
            this.hp -= 5; // Reduce the door's hit points by 5
            console.log(`The ${this.name} is being broken. Hit points: ${this.hp}`);
            if (this.hp <= 0) {
                console.log(`The ${this.name} has been broken.`);
                this.state = "open";
                this.locked = false;
            }
        } else {
            console.log(`The ${this.name} cannot be broken.`);
        }
    }
}
