<?php
    # GAME #
?>

<div id="game-container">
    <h2>Mein Browsergame</h2>
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
    //const hero4 = new Character("No Bo4", 2, 3, 20, 0, 4, 4,"blue", "resources/char/hero.svg",'player1');
    //gameController.addCharacter(hero4);
    gameController.startGame()
</script>

