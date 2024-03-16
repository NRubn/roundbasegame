<?php

/*Ziele:
# Grid [X]
# Player [X]
# Roundbase Movement [X]
//NEW # Make Script extern [X]
# Enemy [ ]
//NEW # Roundbase - Listener (hat noch wer AP) [ ]
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
    </style>
</head>
<body>
    <div id="game-container">
        <h1>Mein Browsergame</h1>
        <p>Willkommen zum aufregenden Browsergame!</p>
        <p>Hier kannst du verschiedene Abenteuer erleben und deine Fähigkeiten verbessern.</p>
        <a href="#" class="button">Starten</a>
    </div>
    <canvas id="gridCanvas" width="300" height="300"></canvas>
    <div id="activehero">hero1</div>
    <div id="roundnumber">0</div>
    <div id="actionpoints">2</div>
    <div id="endround" class="hide"><button>Ende</button></div>
    <script src="resources/js/gamecontroller.js"></script>
    <script src="resources/js/character.js"></script>
    <script src="resources/js/script.js"></script>
    <script>

        // Beispiel: Erstellung von Charakteren und Hinzufügen zum Spiel
        const hero1 = new Character("Hero 1", (canvas.width - cellWidth) / 2, (canvas.height - cellHeight) / 2, 10, 0, 5, 3);
        const hero2 = new Character("Hero 2", (canvas.width - cellWidth) / 2, (canvas.height - cellHeight) / 2, 8, 0, 4, 4);
        gameController.addCharacter(hero1);
        gameController.addCharacter(hero2);

    </script>
</body>
</html>
