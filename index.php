<?php

Ziele:
# Grid [X]
# Player [ ]
# Roundbase Movement [ ]
# Enemy [ ]
# Attack/Block [ ]
# GameOver / Win [ ]
# Registration [ ]
# Login [ ]
# Level [ ]
# EXP [ ]
# Future Plans [ ]

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

    <script>
        const canvas = document.getElementById('gridCanvas');
        const ctx = canvas.getContext('2d');

        // Berechne die Breite und Höhe jedes Feldes
        const cellWidth = canvas.width / 5;
        const cellHeight = canvas.height / 5;

        // Zeichne das Gridmuster
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                ctx.beginPath();
                ctx.rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
                ctx.stroke();
            }
        }
    </script>
</body>
</html>
