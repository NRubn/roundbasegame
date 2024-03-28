<?php
$config_file = 'config.php';

// Überprüfen, ob die config.php vorhanden ist
if (!file_exists($config_file)) {
    // Falls nicht vorhanden, erstelle die config.php mit den Standardbenutzerdaten
    $users = array(
        array(
            "username" => "admin",
            "email" => "admin@example.com",
            "password" => "admin"
        )
    );
    // Erstelle in der Confog.php deinen Admin-Benutzer
        
    $config_content = '<?php' . PHP_EOL . '$users = ' . var_export($users, true) . ';' . PHP_EOL;

    // Versuche, die Datei zu erstellen und die Benutzerdaten zu speichern
    if (file_put_contents($config_file, $config_content) !== false) {
        echo 'Die Datei config.php wurde erfolgreich erstellt.';
    } else {
        echo 'Fehler beim Erstellen der Datei config.php.';
    }
}

// Einbinden der config.php
require_once $config_file;

?>