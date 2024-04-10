<?php
/* ############# 

    Goals Development

############# */
/*

# Level
    # Grid [X]
    # Cards/Fielsd (5x5.) [ ]
        # Blocks [ ]
            # House with Doors [X]
            # Structures [1]
            # Start/Camp [ ]
            # Traps [ ]
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
    # Login [X]
        # User [ ]
        # Chars Collection
    # Multiplayer
    # Mission/Level [ ]
        # GameOver / Win [ ]
    # GameSaves [X]

# KI
    # Atack [ ]
    # Walk [ ]

# Design
    # CSV
    # Img
    # Colors

*/

require_once "logins.php";
$role = 'visitor';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["login"])) {   
    $login = false;
    
    // Benutzername und Passwort aus dem POST erhalten
    $username = $_POST["username"];
    $password = $_POST["password"];

    foreach ($users as $user) {
        if ($user["username"] === $username && $user["password"] === $password) {
            // Anmeldung erfolgreich
            echo "Anmeldung erfolgreich!";
            $login = true;
            $role = $user["role"];
            break;
        }
    }
}else{
    $login = false;
}
echo "Role:";
echo $role;

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mein Browsergame</title>
    <link rel="stylesheet" type="text/css" href="resources\css\style.css">
    <style>
        /*body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        h1 {
            color: #333;
        }*/
        #game-container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #d3d3d3;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            text-align: center;
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
<?php


    if($login == true){
        require_once "game/game.php";
    }else{
        require_once "game/login.php";
    }

?>
</body>
</html>
