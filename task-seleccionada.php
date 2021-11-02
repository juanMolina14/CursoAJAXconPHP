<?php
include('database.php');
$id = $_POST['id'];

if (!empty($id)) {
    $query = "SELECT * FROM task WHERE id= $id";
    $result = mysqli_query($connection, $query);

    if(!$result){
        die('Query failed');
    }
    $json= array();

    while($row = mysqli_fetch_array($result)){
        $json[]= array(
            'nombre' => $row['nombre'],
            'descripcion' => $row['descripcion'],
            'id' => $row['id']
        );
    }

    $jsonstring = json_encode($json[0]);
    echo $jsonstring;



    
}






