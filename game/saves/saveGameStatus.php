<?php

$gamename = json_decode($jsonData)->gamename;
// Hier müssen Sie Ihre Benutzerberechtigungsprüfung implementieren
$userHasSavePermission = false;
if($role === 'admin'){
$userHasSavePermission = true;
}

if (!$userHasSavePermission) {
    http_response_code(403); // Statuscode 403: Zugriff verweigert
    die("Sie haben keine Berechtigung zum Speichern des Spielstands.");
}

// Daten aus dem Ajax-Anforderungspayload abrufen
$jsonData = file_get_contents('php://input');

// Dateiname festlegen (hier wird der Name aus dem Ajax-Anfrageparameter übernommen)

$filename = 'savefiles/save-'.$gamename . '.json';

// JSON-Daten formatieren, um sie besser lesbar zu machen
$prettyJsonData = json_encode(json_decode($jsonData), JSON_PRETTY_PRINT);

// Spielstatus in eine Datei schreiben
if (file_put_contents($filename, $prettyJsonData)) {
    http_response_code(200); // Statuscode 200: OK
} else {
    http_response_code(500); // Statuscode 500: Interner Serverfehler
}
?>
