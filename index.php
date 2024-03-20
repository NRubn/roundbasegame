<?php

/*Ziele:
# Grid [X]
# Player [X]
# Roundbase Movement [X]
//NEW # Make Script extern [X]
# Collusion [X]
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
            <canvas id="gridCanvas" width="500" height="500"></canvas>
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
    <script src="resources/js/field.js"></script>
    <script src="resources/js/resource.js"></script>
    <script src="resources/js/script.js"></script>
    <script>
        console.log("AAAAHHH ES GEHT LOS");
    </script>
</body>
</html>
