<?php
include('database.php');
if (isset($_POST['nombre'])) {
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $query = "INSERT INTO `task` (`nombre`, `descripcion`) VALUES ('$nombre', '$descripcion');";
    //$query = "INSERT INTO 'task' ('nombre','descripcion') VALUES('$nombre','$descripcion);";
    $result = mysqli_query($connection, $query);
    if (!$result) {
        die('Query Error' . mysqli_error($connection));
    }
    echo 'tarea agregada';
}
