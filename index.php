<?php

/* ############# 

    Goals Development

############# */
/*

# Level
    # Grid [X]
    # Karten/Felder (5x5 z.B.) [ ]
        # Bausteine [ ]
            # House with Doors [X]
            # Hindernisse [ ]
            # Doors [/]
    # Goals [ ]

# Char
    # Player [X]
    # Char Status [X]
    # Char Actions [ ]
    # Char Inventory [ ]
    # EXP [ ]
        # Level [ ]

# Gameplay
    # Roundbase Movement [X]
    # Collusion [X]
    # Enemy [X]
    # Fight
        # Attack/Block [ ]
        # Damage
        # Dead [ ]
        
    # Registration [ ]
    # Login [ ]
        # User [ ]
        # Chars Collection
    # Multiplayer
    # Mission/Level [ ]
        # GameOver / Win [ ]
    # GameSaves [ ]

# KI
    # Atack [ ]
    # Walk [ ]

# Design
    # CSV
    # Img
    # Colors

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
        .stats {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 5px;
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
            <div id="roundnumber">0</div>
            
            <div id="activeherostats">
                <div id="activehero">hero1</div>
                <div id="actionpoints">__</div>
                <div id="hp">__</div>
                <div id="xp">__</div>
                <div id="attack">__</div>
                <div id="defense">__</div>
                <div id="actions">
                    <div class="move" data-type="move"><button class="button">move</button></div>
                    <div class="action" data-type="action"><button class="button">attack</button></div>
                    <div class="wait" data-type="wait"><button class="button">wait</button></div>
                </div>
            </div>
            
            
            </div>
        </div>
        <a href="#" class="button">Starten</a>
        <div id="endround" class="button hide"><button>Ende</button></div>
    </div>
    
    
    
    <script src="resources/js/doors.js"></script>
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
