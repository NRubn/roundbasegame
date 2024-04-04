<?php
// Daten aus dem Ajax-Anforderungspayload abrufen
$jsonData = file_get_contents('php://input');

// Dateiname festlegen (hier wird der Name aus dem Ajax-Anfrageparameter übernommen)
$gamename = json_decode($jsonData)->gamename;
$filename = 'save-'.$gamename . '.json';

// JSON-Daten formatieren, um sie besser lesbar zu machen
$prettyJsonData = json_encode(json_decode($jsonData), JSON_PRETTY_PRINT);

// Spielstatus in eine Datei schreiben
if (file_put_contents($filename, $prettyJsonData)) {
    http_response_code(200);
} else {
    http_response_code(500);
}
?>