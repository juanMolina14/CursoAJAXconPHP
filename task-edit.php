<?php 
    include('database.php');

     $nombre = $_POST['nombre'];
     $descripcion = $_POST['descripcion'];
     $id = $_POST['id'];
     
     $query= "UPDATE `task` SET `nombre` = '$nombre', `descripcion` = '$descripcion' WHERE `task`.`id` = $id";

     //$query = "UPDATE task SET nombre = '$nombre', descripcion = '$descripcion' WHERE id ='$id'";
     $result = mysqli_query($connection,$query);
     if(!$result){
         die('query failed');
     }
     echo 'Task updated successfully';

?>