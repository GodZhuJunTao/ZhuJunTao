<?php

   include 'connect.php';

    $id=isset($_GET['id']) ? $_GET['id'] : '1';
    $sql="DELETE FROM orderinf WHERE id in($id)";

    $res=$conn->query($sql);

    if($res){
        echo 'yes';
    }
    $conn->close();

?>