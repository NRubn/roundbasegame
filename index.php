<?php

/*Ziele:
# Grid [X]
# Player [X]
# Roundbase Movement [X]
//NEW # Make Script extern [X]
# Collusion [ ]
# Char Status [ ]
# Enemy [ ]
//NEW # Roundbase - Listener (hat noch wer AP) [X]
# Attack/Block [ ]
# GameOver / Win [ ]
# Registration [ ]
# Login [ ]
# Level [ ]
# EXP [ ]
# Future Plans [ ]
*/

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mein Browsergame</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        h1 {
            color: #333;
        }
        #game-container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .hide{
            display: none;
        }
        #game{
            display: flex;
            justify-content: center;
            align-content: flex-end;
        }
        div#infofield {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    </style>
</head>
<body>
    <div id="game-container">
        <h1>Mein Browsergame</h1>
        <div id="game">
            <div id="field">
            <canvas id="gridCanvas" width="300" height="300"></canvas>
            </div>
            <div id="infofield">
            <div id="activehero">hero1</div>
            <div id="roundnumber">0</div>
            <div id="actionpoints">2</div>
            </div>
        </div>
        <a href="#" class="button">Starten</a>
        <div id="endround" class="button hide"><button>Ende</button></div>
    </div>
    
    
    
    <script src="resources/js/gamecontroller.js"></script>
    <script src="resources/js/character.js"></script>
    <script src="resources/js/script.js"></script>
    <script>

        // Beispiel: Erstellung von Charakteren und Hinzufügen zum Spiel
        const hero1 = new Character("Green Hero 1", 0, 0, 10, 0, 5, 3,"green");
        const hero2 = new Character("Red Hero 2", 1, 1, 8, 0, 4, 4,"red");
        const hero3 = new Character("Blue Bob", 1, 2, 8, 0, 4, 4,"blue");
        gameController.addCharacter(hero1);
        gameController.addCharacter(hero2);
        gameController.addCharacter(hero3);
        gameController.startGame();
    </script>
</body>
</html>
