<?php

    include('database.php');
    $id = $_POST['id'];

    if(!empty($id)){
        $query = "DELETE FROM task WHERE id = $id";
        $result = mysqli_query($connection,$query);

        if(!$result){
            die('query_error'. mysqli_error($connection));
        }

        echo 'task deleted succesfully';

    }


?>