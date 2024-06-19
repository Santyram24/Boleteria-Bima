<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "loteria";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

function generarNumeroUnico($conn) {
    do {
        $numero = str_pad(rand(0, 99999), 5, '0', STR_PAD_LEFT);
        $sql = "SELECT numero FROM boletas WHERE numero = '$numero'";
        $result = $conn->query($sql);
    } while ($result->num_rows > 0);
    return $numero;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $conn->real_escape_string($_POST['email']);
    $numerosRifa = json_decode($_POST['numerosRifa']);
    $valorBoleta = $conn->real_escape_string($_POST['valorBoleta']);

    $numerosRifaUnicos = [];
    foreach ($numerosRifa as $numero) {
        $numeroUnico = generarNumeroUnico($conn);
        $numerosRifaUnicos[] = $numeroUnico;
        $sql = "INSERT INTO boletas (numero, email, valor) VALUES ('$numeroUnico', '$email', '$valorBoleta')";
        if ($conn->query($sql) !== TRUE) {
            echo json_encode(['success' => false, 'error' => $conn->error]);
            $conn->close();
            exit();
        }
    }

    echo json_encode(['success' => true, 'numerosRifa' => $numerosRifaUnicos]);
}

$conn->close();


